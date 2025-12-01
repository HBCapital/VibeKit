# FlowOne Security Strategy

> Security strategy for FlowOne CMS

## 🎯 Security-First Approach

FlowOne is designed with **security as the top priority**, not an afterthought. Each component is built with security best practices.

## 🔐 Core Security Features

### 1. Authentication & Session Management

#### Password Security

```php
// Using Argon2id (recommended over bcrypt)
$hash = password_hash($password, PASSWORD_ARGON2ID, [
    'memory_cost' => 65536,  // 64 MB
    'time_cost' => 4,        // 4 iterations
    'threads' => 3           // 3 parallel threads
]);

// Verify password
if (password_verify($password, $hash)) {
    // Password is correct
}

// Rehash if needed (algorithm updated)
if (password_needs_rehash($hash, PASSWORD_ARGON2ID)) {
    $newHash = password_hash($password, PASSWORD_ARGON2ID);
}
```

**Password Requirements**:

- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, symbols
- Check against common passwords list (have-i-been-pwned)
- Password strength indicator in UI

#### Session Security

```php
// Secure session configuration
session_set_cookie_params([
    'lifetime' => 0,           // Session cookie
    'path' => '/',
    'domain' => '.example.com',
    'secure' => true,          // HTTPS only
    'httponly' => true,        // No JavaScript access
    'samesite' => 'Strict'     // CSRF protection
]);

// Regenerate session ID on login
session_regenerate_id(true);
```

#### Two-Factor Authentication (2FA)

- **TOTP** (Time-based One-Time Password) using Google Authenticator
- **Backup codes** for recovery
- **SMS OTP** (optional, via Twilio)

```php
// Enable 2FA
$secret = TwoFactor::generateSecret();
$qrCode = TwoFactor::getQRCode($secret, $user->email);

// Verify TOTP
if (TwoFactor::verify($secret, $userInput)) {
    // 2FA passed
}
```

---

### 2. Authorization & Access Control

#### Role-Based Access Control (RBAC)

```php
// Define permissions
$admin = Role::create('admin', [
    'posts.create', 'posts.read', 'posts.update', 'posts.delete',
    'users.create', 'users.read', 'users.update', 'users.delete',
    'settings.update', 'plugins.manage', 'themes.manage'
]);

$editor = Role::create('editor', [
    'posts.create', 'posts.read', 'posts.update', 'posts.delete'
]);

// Check permission
if (Auth::user()->can('posts.delete')) {
    Post::delete($id);
} else {
    throw new UnauthorizedException();
}
```

#### Field-Level Permissions

```php
// Protect sensitive fields
Field::protect('users.password_hash', function($user) {
    return $user->isAdmin();
});

// Hide fields based on role
if (!Auth::user()->can('users.view_email')) {
    $user->makeHidden(['email']);
}
```

---

### 3. Input Validation & Sanitization

#### Request Validation

```php
// Validate all inputs
$validated = Request::validate([
    'email' => 'required|email|max:255',
    'title' => 'required|string|max:255|no_html',
    'content' => 'required|string|sanitize_html',
    'status' => 'in:draft,published',
    'published_at' => 'nullable|date|after:now'
]);
```

#### HTML Sanitization

```php
// Allow only safe HTML tags
$clean = HtmlPurifier::clean($userInput, [
    'allowed_tags' => ['p', 'strong', 'em', 'a', 'ul', 'ol', 'li'],
    'allowed_attributes' => ['href', 'title', 'alt']
]);
```

#### SQL Injection Prevention

```php
// Always use prepared statements (PDO)
$stmt = $pdo->prepare('SELECT * FROM posts WHERE id = ?');
$stmt->execute([$id]);

// Query builder auto-escapes
Post::where('title', $userInput)->get();  // Safe
```

---

### 4. CSRF Protection

#### Token Generation & Validation

```php
// Generate CSRF token for form
<form method="POST">
    @csrf
    <!-- Form fields -->
</form>

// Middleware validates token automatically
class CsrfMiddleware {
    public function handle($request, $next) {
        if (!$this->tokensMatch($request)) {
            throw new TokenMismatchException();
        }
        return $next($request);
    }
}
```

#### Double-Submit Cookie Pattern

- Token in both cookie (HttpOnly) and hidden form field
- Server verifies both match

---

### 5. XSS (Cross-Site Scripting) Prevention

#### Auto-Escaping in Templates

```twig
{# Twig auto-escapes by default #}
<h1>{{ post.title }}</h1>  {# Safe #}

{# Explicitly mark trusted content #}
<div>{{ post.content|raw }}</div>  {# Only for sanitized content #}
```

#### Content Security Policy (CSP)

```php
// Set CSP headers
header("Content-Security-Policy:
    default-src 'self';
    script-src 'self' 'nonce-{$nonce}' https://cdn.example.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self';
    connect-src 'self' https://api.example.com;
");
```

---

### 6. File Upload Security

#### Validation & Restrictions

```php
// Validate file uploads
$validated = Request::validate([
    'file' => 'required|file|max:10240|mimes:jpg,png,pdf'
]);

// Check MIME type (not just extension)
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file->path());

if (!in_array($mimeType, $allowedTypes)) {
    throw new InvalidFileTypeException();
}
```

#### Storage Outside Web Root

```php
// Store uploads outside public directory
$path = storage_path('uploads/' . $filename);
move_uploaded_file($tmpFile, $path);

// Serve via controller with access control
Route::get('/files/{id}', function($id) {
    $file = Media::findOrFail($id);

    if (!Auth::user()->canView($file)) {
        abort(403);
    }

    return response()->file($file->path);
});
```

#### Image Validation

```php
// Verify image integrity
$image = imagecreatefromstring(file_get_contents($file));
if (!$image) {
    throw new InvalidImageException();
}

// Strip EXIF data (privacy & security)
$image = Image::make($file)->stripExif();
```

---

### 7. Plugin Sandboxing

#### Permission Model

```php
// Plugin manifest declares capabilities
{
  "permissions": [
    "posts.read",
    "posts.write",
    "settings.seo"
  ]
}

// Check before execution
if (!Plugin::can('my-plugin', 'posts.write')) {
    throw new InsufficientPermissionsException();
}
```

#### Resource Limits

```php
// Limit plugin execution
set_time_limit(30);  // Max 30 seconds
ini_set('memory_limit', '128M');

// Monitor resource usage
$startMemory = memory_get_usage();
$plugin->execute();
$endMemory = memory_get_usage();

if (($endMemory - $startMemory) > 64 * 1024 * 1024) {
    Log::warning("Plugin {$plugin->name} used excessive memory");
}
```

#### Safe Mode

```php
// Automatic disable on error
try {
    $plugin->activate();
} catch (\Throwable $e) {
    $plugin->disable();
    Log::error("Plugin {$plugin->name} failed activation", [
        'exception' => $e
    ]);
    throw new PluginActivationFailedException();
}
```

---

### 8. API Security

#### JWT Authentication

```php
// Issue JWT token
$token = JWT::encode([
    'uid' => $user->id,
    'exp' => time() + (7 * 24 * 60 * 60),  // 7 days
    'iat' => time(),
    'iss' => 'flowone'
], config('app.key'), 'HS256');

// Verify token
$decoded = JWT::decode($token, config('app.key'), ['HS256']);
```

#### Rate Limiting

```php
// Limit API requests
RateLimit::for('api', function ($request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});

// Stricter limits for sensitive endpoints
RateLimit::for('login', function ($request) {
    return Limit::perMinute(5)->by($request->ip());
});
```

#### CORS Configuration

```php
// Configure CORS
header('Access-Control-Allow-Origin: https://example.com');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Max-Age: 86400');
```

---

### 9. Signed Packages

#### Package Signing

```bash
# Developer signs plugin
openssl dgst -sha256 -sign private.key -out plugin.sig plugin.zip
```

#### Signature Verification

```php
// Verify package signature
$publicKey = file_get_contents('publisher.pub');
$signature = file_get_contents('plugin.sig');
$package = file_get_contents('plugin.zip');

$verified = openssl_verify(
    $package,
    $signature,
    $publicKey,
    OPENSSL_ALGO_SHA256
);

if ($verified !== 1) {
    throw new InvalidSignatureException();
}
```

---

### 10. Database Security

#### Prepared Statements (Always)

```php
// Never concatenate user input
// ❌ BAD
$sql = "SELECT * FROM users WHERE email = '$email'";

// ✅ GOOD
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
```

#### Principle of Least Privilege

```sql
-- Database user with limited privileges
GRANT SELECT, INSERT, UPDATE, DELETE ON flowone.* TO 'flowone_app'@'localhost';

-- Admin user for migrations only
GRANT ALL PRIVILEGES ON flowone.* TO 'flowone_admin'@'localhost';
```

---

## 🛡️ Security Headers

```php
// Security headers middleware
header('X-Frame-Options: SAMEORIGIN');
header('X-Content-Type-Options: nosniff');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: geolocation=(), microphone=(), camera=()');
header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
```

---

## 🔍 Security Auditing

### Logging Security Events

```php
// Log all authentication attempts
Log::info('Login attempt', [
    'email' => $email,
    'ip' => $request->ip(),
    'user_agent' => $request->userAgent()
]);

// Log authorization failures
Log::warning('Unauthorized access attempt', [
    'user_id' => Auth::id(),
    'resource' => 'posts.delete',
    'ip' => $request->ip()
]);
```

### Failed Login Tracking

```php
// Track failed attempts
if (!Auth::attempt($credentials)) {
    $attempts = Cache::increment("login_attempts:{$ip}");

    if ($attempts > 5) {
        // Lock account temporarily
        Cache::put("login_locked:{$ip}", true, now()->addMinutes(15));
        throw new TooManyAttemptsException();
    }
}
```

---

## 📋 Security Checklist

### Development Phase

- [ ] All inputs validated and sanitized
- [ ] SQL queries use prepared statements
- [ ] Passwords hashed with Argon2id
- [ ] CSRF tokens on all forms
- [ ] Output escaped in templates
- [ ] File uploads validated
- [ ] Security headers configured
- [ ] CSP policy defined

### Pre-Release

- [ ] Security audit completed
- [ ] Penetration testing performed
- [ ] Dependencies scanned for vulnerabilities
- [ ] Code review by security expert
- [ ] OWASP Top 10 checklist verified
- [ ] Bug bounty program prepared

### Production

- [ ] SSL/TLS certificate installed
- [ ] Firewall configured
- [ ] Intrusion detection active
- [ ] Logging & monitoring enabled
- [ ] Backup & disaster recovery plan
- [ ] Incident response plan documented

---

## 🐛 Reporting Security Vulnerabilities

**DO NOT** open public GitHub issues for security vulnerabilities.

Instead, email: **security@flowone.dev**

We take security seriously and will respond within 24 hours.

### Bug Bounty Program

- **Critical**: $500 - $2,000
- **High**: $200 - $500
- **Medium**: $50 - $200
- **Low**: Recognition in Hall of Fame

---

**Security is a continuous process, not a one-time effort.**
