# Code Cleanup

You are tasked with cleaning up codebases by removing dead code and unused dependencies.

## Purpose

Identify and safely remove unused code, dependencies, and assets to improve maintainability.

## Cleanup Areas

### 1. Dead Code Detection

```javascript
// Unused functions
function neverCalled() {
  // ← Remove
  return "unused";
}

// Unused variables
const unusedVar = 123; // ← Remove

// Unreachable code
function example() {
  return true;
  console.log("never runs"); // ← Remove
}

// Commented code
// function oldImplementation() {  // ← Remove
//   ...
// }
```

### 2. Unused Dependencies

```bash
# Find unused npm packages
npx depcheck

# Find unused Python packages
pip-autoremove

# Remove unused dependencies
npm uninstall package-name
pip uninstall package-name
```

### 3. Unused Imports

```javascript
// ❌ Unused imports
import { usedFunction, unusedFunction } from "lib";
import * as everything from "another-lib"; // Only using one thing

// ✅ Clean imports
import { usedFunction } from "lib";
import { specificThing } from "another-lib";
```

### 4. Unused CSS

```bash
# Find unused CSS with PurgeCSS
npm install -D @fullhuman/postcss-purgecss

# Or use tools like:
# - UnCSS
# - PurifyCSS
# - Chrome DevTools Coverage
```

### 5. Unused Assets

```bash
# Find unused images/files
find ./assets -type f -name "*.png" | while read file; do
  if ! grep -r "$(basename $file)" ./src; then
    echo "Unused: $file"
  fi
done
```

## Cleanup Tools

### JavaScript/TypeScript

```bash
# ESLint with no-unused-vars
npm install -D eslint

# ts-prune for TypeScript
npx ts-prune

# Find dead code
npx unimported
```

### Python

```bash
# Vulture - Find dead code
pip install vulture
vulture .

# autoflake - Remove unused imports
pip install autoflake
autoflake --remove-all-unused-imports --in-place file.py
```

### General

```bash
# Git: Find files not changed in 1 year
git log --all --pretty=format: --name-only --since="1 year ago" | \
  sort -u > recent_files.txt

# Compare with all files to find stale ones
```

## Safe Cleanup Process

1. **Use Version Control**: Commit before cleanup
2. **Run Tests**: Ensure tests pass before and after
3. **Use Tools**: Automated detection (ESLint, depcheck)
4. **Manual Review**: Don't blindly delete
5. **Incremental**: Small batches, test each
6. **Document**: Note why code was removed

## Cleanup Checklist

- [ ] Remove unused functions and variables
- [ ] Remove unused imports
- [ ] Remove commented-out code
- [ ] Remove unused dependencies
- [ ] Remove unused CSS rules
- [ ] Remove unused assets (images, fonts)
- [ ] Remove console.log statements
- [ ] Remove TODO comments for completed tasks
- [ ] Remove deprecated code
- [ ] Update documentation

## Example Cleanup

```javascript
// Before
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import axios from "axios";

// const OLD_API = 'https://old-api.com';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // function oldFetchUsers() {
  //   return fetch(OLD_API + '/users');
  // }

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      {users.map((u) => (
        <div key={u.id}>{u.name}</div>
      ))}
    </div>
  );
}

// After
import React, { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      {users.map((u) => (
        <div key={u.id}>{u.name}</div>
      ))}
    </div>
  );
}
```

Begin by analyzing the codebase and identifying cleanup opportunities.
