```bash
# Backup database
mysqldump -u username -p database_name > wordpress_backup.sql

# Backup files
tar -czf wordpress_files.tar.gz /var/www/wordpress/
```

### 2. Export WordPress Content

**Via WordPress Admin:**

1. Go to **Tools → Export**
2. Select **All content**
3. Download the WXR (WordPress eXtended RSS) file

**Via WP-CLI:**

```bash
wp export --path=/var/www/wordpress
```

### 3. Audit Current Site

```bash
# Check total posts
wp post list --post_type=post --format=count

# Check custom post types
wp post-type list

# Check plugins
wp plugin list

# Check media files
wp media list --format=count
```

## 🚀 Migration Process

### Step 1: Install FlowOne

```bash
# Install FlowOne
composer create-project flowone/flowone my-new-site
cd my-new-site

# Configure database
cp .env.example .env
# Edit .env with your database credentials

# Run installer
php flowone install
```

### Step 2: Run WordPress Importer

```bash
# Basic import
flowone import:wordpress /path/to/wordpress-export.xml

# With options
flowone import:wordpress /path/to/wordpress-export.xml \
    --download-media \           # Download media from WordPress site
    --preserve-ids \             # Keep original post IDs
    --import-comments \          # Import comments
    --user-mapping=mapping.json  # Map WordPress users to FlowOne users
```

### Step 3: Import Configuration

#### User Mapping

Create `mapping.json` to map WordPress users to FlowOne users:

```json
{
  "user_mapping": {
    "1": "admin@flowone.dev", // WP user ID 1 → FlowOne admin
    "2": "editor@flowone.dev", // WP user ID 2 → FlowOne editor
    "default": "imported@flowone.dev" // Fallback user
  },
  "role_mapping": {
    "administrator": "admin",
    "editor": "editor",
    "author": "author",
    "contributor": "author",
    "subscriber": "viewer"
  }
}
```

#### Content Type Mapping

```json
{
  "post_type_mapping": {
    "post": "post",
    "page": "page",
    "product": "product", // WooCommerce
    "portfolio": "portfolio", // Custom post type
    "attachment": "media"
  }
}
```

### Step 4: SEO Metadata Migration

FlowOne automatically imports SEO metadata from popular plugins:

#### Yoast SEO

```php
// Imported fields
- Meta title → post.meta.seo.title
- Meta description → post.meta.seo.description
- Focus keyword → post.meta.seo.keyword
- Canonical URL → post.meta.seo.canonical
- Open Graph data → post.meta.seo.og.*
- Twitter Card → post.meta.seo.twitter.*
```

#### Rank Math

```php
// Imported fields
- Title → post.meta.seo.title
- Description → post.meta.seo.description
- Schema markup → post.meta.seo.schema
```

### Step 5: Media Migration

```bash
# Download all media from WordPress site
flowone import:media https://old-site.com \
    --source-path=/wp-content/uploads/ \
    --dest-path=storage/uploads/

# Rewrite URLs in content
flowone migrate:rewrite-urls \
    --old-domain=old-site.com \
    --new-domain=new-site.com
```

### Step 6: URL Structure & Redirects

#### Create 301 Redirects

```bash
# Generate redirect rules
flowone migrate:redirects \
    --format=nginx \
    --output=redirects.conf
```

**Generated Nginx config:**

```nginx
# redirects.conf
location = /old-post-slug {
    return 301 /new-post-slug;
}

location ~ ^/category/(.+)$ {
    return 301 /categories/$1;
}
```

#### Permalink Structure

```env
# .env - Match WordPress permalink structure
PERMALINK_STRUCTURE=/%postname%/
# or
PERMALINK_STRUCTURE=/%year%/%monthnum%/%postname%/
```

## 🔧 Manual Tasks

### 1. Plugin Functionality

WordPress plugins need manual porting. Common scenarios:

#### Contact Forms

**WordPress (Contact Form 7)**:

```php
[contact-form-7 id="123"]
```

**FlowOne**:

```bash
# Install FlowOne Contact plugin
flowone plugin:install contact-form

# Create form in admin UI
# Embed with shortcode
[flowone-form id="contact"]
```

#### SEO

**WordPress (Yoast)**:

- Automatic during import (metadata preserved)

**FlowOne**:

```bash
# Install SEO plugin
flowone plugin:install seo-optimizer

# Metadata already imported, configure additional settings in admin
```

#### E-commerce (WooCommerce)

```bash
# Install FlowOne E-commerce plugin (if available)
flowone plugin:install ecommerce

# Import products
flowone import:products /path/to/woocommerce-products.csv
```

### 2. Theme Migration

WordPress themes cannot be automatically converted. Options:

#### Option A: Use FlowOne Default Theme

```bash
# Activate default theme
flowone theme:activate flowone-default

# Customize in admin UI
```

#### Option B: Create Custom Theme

```bash
# Scaffold new theme
flowone theme:create my-custom-theme

# Port WordPress template logic to Twig
# Example: single.php → templates/single.twig
```

**WordPress single.php:**

```php
<?php get_header(); ?>
<article>
    <h1><?php the_title(); ?></h1>
    <div><?php the_content(); ?></div>
</article>
<?php get_footer(); ?>
```

**FlowOne single.twig:**

```twig
{% extends "layouts/default.twig" %}

{% block content %}
    <article>
        <h1>{{ post.title }}</h1>
        <div>{{ post.content|raw }}</div>
    </article>
{% endblock %}
```

### 3. Custom Functionality

#### WordPress Hooks

**WordPress:**

```php
add_action('save_post', function($post_id) {
    // Custom logic
});
```

**FlowOne:**

```php
Hook::addAction('post.saved', function($post) {
    // Custom logic
});
```

#### Shortcodes

**WordPress:**

```php
add_shortcode('my_shortcode', function($atts) {
    return 'Output';
});
```

**FlowOne:**

```php
Shortcode::register('my_shortcode', function($atts) {
    return view('shortcodes.my_shortcode', $atts);
});
```

## 🧪 Testing Migration

### 1. Verify Content

```bash
# Compare post counts
flowone stats:content

# Output:
# Posts: 150
# Pages: 12
# Media: 450
# Users: 5
```

### 2. Check Media Files

```bash
# Verify all media files downloaded
flowone migrate:verify-media

# Output:
# Total: 450
# Downloaded: 448
# Failed: 2 (see log)
```

### 3. Test URLs

```bash
# Check for broken links
flowone migrate:check-links --output=broken-links.txt
```

### 4. SEO Verification

```bash
# Export sitemap and compare
flowone sitemap:generate
diff old-sitemap.xml public/sitemap.xml
```

## 📊 Migration Report Example

```
╔══════════════════════════════════════════════════════╗
║        WordPress → FlowOne Migration Report          ║
╠══════════════════════════════════════════════════════╣
║ Posts Imported:          150 / 150   ✅             ║
║ Pages Imported:           12 / 12    ✅             ║
║ Media Files:             448 / 450   ⚠️             ║
║ Users Imported:            5 / 5     ✅             ║
║ Categories:               20 / 20    ✅             ║
║ Tags:                     85 / 85    ✅             ║
║ Comments:                500 / 500   ✅             ║
╠══════════════════════════════════════════════════════╣
║ Failed Media:                                        ║
║  - image-123.jpg (404 Not Found)                     ║
║  - video-456.mp4 (File too large)                    ║
╠══════════════════════════════════════════════════════╣
║ Redirect Rules Generated: redirects.conf             ║
║ Migration Log: storage/logs/migration.log            ║
╚══════════════════════════════════════════════════════╝
```

## 🚨 Common Issues & Solutions

### Issue 1: Media Import Fails

**Problem**: Large files timeout during download

**Solution**:

```bash
# Increase timeout
flowone import:media --timeout=300

# Or upload manually via SFTP/FTP
# Then run rewrite-urls command
```

### Issue 2: Duplicate Content

**Problem**: Posts imported multiple times

**Solution**:

```bash
# Use --preserve-ids to avoid duplicates
flowone import:wordpress export.xml --preserve-ids

# Or clean up duplicates
flowone migrate:deduplicate
```

### Issue 3: Broken Internal Links

**Problem**: Links still point to old domain

**Solution**:

```bash
# Run URL rewriter again
flowone migrate:rewrite-urls \
    --old-domain=old-site.com \
    --new-domain=new-site.com \
    --dry-run  # Test first

# Then run for real
flowone migrate:rewrite-urls \
    --old-domain=old-site.com \
    --new-domain=new-site.com
```

## 📝 Post-Migration Checklist

- [ ] All content imported successfully
- [ ] Media files downloaded and accessible
- [ ] SEO metadata preserved
- [ ] 301 redirects configured
- [ ] Internal links rewritten
- [ ] Plugins replaced with FlowOne equivalents
- [ ] Theme customized
- [ ] Test forms and contact functionality
- [ ] Verify search functionality
- [ ] Check sitemap.xml
- [ ] Test on staging before going live
- [ ] Update DNS when ready

## 🆘 Need Help?

- 📖 [Full Documentation](https://docs.flowone.dev/migration)
- 💬 [Discord Community](https://discord.gg/flowone)
- 📧 [Email Support](mailto:support@flowone.dev)
- 🎥 [Video Tutorial](https://youtube.com/flowone-migration)

---

**Migration is a big step. Take your time and test thoroughly!**
