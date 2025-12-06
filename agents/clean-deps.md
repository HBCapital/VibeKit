# Dependency Cleanup

You are tasked with auditing and cleaning up project dependencies.

## Purpose

Review dependencies, remove unused packages, and update outdated ones.

## Dependency Audit

### 1. Find Unused Dependencies

```bash
# Node.js
npx depcheck

# Python
pip-autoremove --list

# Ruby
bundle clean --dry-run
```

### 2. Check for Vulnerabilities

```bash
# Node.js
npm audit
npm audit fix

# Python
pip-audit

# Ruby
bundle audit
```

### 3. Find Outdated Packages

```bash
# Node.js
npm outdated

# Python
pip list --outdated

# Ruby
bundle outdated
```

## Cleanup Process

### Node.js

```bash
# 1. Find unused
npx depcheck

# 2. Remove unused
npm uninstall unused-package

# 3. Update outdated
npm update

# 4. Check for security issues
npm audit fix

# 5. Deduplicate
npm dedupe
```

### Python

```bash
# 1. List installed
pip freeze > requirements.txt

# 2. Find unused
pip-autoremove --list

# 3. Remove unused
pip uninstall unused-package

# 4. Update
pip install --upgrade package-name

# 5. Security check
pip-audit
```

## Dependency Best Practices

### Lock Files

```bash
# Always commit lock files
package-lock.json  # npm
yarn.lock          # yarn
Pipfile.lock       # Python
Gemfile.lock       # Ruby
```

### Version Pinning

```json
// package.json
{
  "dependencies": {
    "exact": "1.2.3", // Exact version
    "patch": "~1.2.3", // Allow patch updates
    "minor": "^1.2.3", // Allow minor updates
    "latest": "*" // ❌ Avoid
  }
}
```

### Minimize Dependencies

```javascript
// ❌ Bad: Heavy dependency for simple task
import _ from "lodash";
const unique = _.uniq(array);

// ✅ Good: Native solution
const unique = [...new Set(array)];

// ❌ Bad: Entire library for one function
import moment from "moment";
const formatted = moment().format("YYYY-MM-DD");

// ✅ Good: Native or lighter alternative
const formatted = new Date().toISOString().split("T")[0];
// Or use date-fns (lighter than moment)
```

## Dependency Checklist

- [ ] Remove unused dependencies
- [ ] Update outdated dependencies
- [ ] Fix security vulnerabilities
- [ ] Use lock files
- [ ] Pin versions appropriately
- [ ] Minimize dependency count
- [ ] Prefer native solutions
- [ ] Document why each dependency is needed
- [ ] Regular dependency audits

## Bundle Size Analysis

```bash
# Webpack Bundle Analyzer
npm install -D webpack-bundle-analyzer

# Analyze bundle
npx webpack-bundle-analyzer dist/stats.json
```

Begin by auditing project dependencies and identifying cleanup opportunities.
