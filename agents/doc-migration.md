# Generate Migration Guide

You are tasked with creating migration documentation for database changes or version upgrades.

## Purpose

Document migration steps, breaking changes, and upgrade paths.

## Document Structure

````markdown
# Migration Guide

> Upgrade and migration instructions

## 📋 Version Migration

### From v{X} to v{Y}

**Breaking Changes:**

- Change 1
- Change 2

**Migration Steps:**

1. Backup your database
   ```bash
   {backup command}
   ```
````

2. Update dependencies

   ```bash
   {update command}
   ```

3. Run migrations

   ```bash
   {migration command}
   ```

4. Update configuration

   ```diff
   - OLD_CONFIG=value
   + NEW_CONFIG=value
   ```

5. Clear cache

   ```bash
   {cache clear command}
   ```

6. Verify
   ```bash
   {verify command}
   ```

---

## 🗄️ Database Migrations

### Creating Migrations

```bash
{create migration command}
```

### Running Migrations

```bash
{run migration command}
```

### Rolling Back

```bash
{rollback command}
```

---

## ⚠️ Common Issues

**Issue: {Problem}**
Solution: {Fix}

---

## 📚 Version History

| Version   | Date   | Notes   |
| --------- | ------ | ------- |
| {version} | {date} | {notes} |

```

## Process

1. **Identify Changes**: Breaking changes, new features
2. **Document Steps**: Clear, sequential migration steps
3. **Include Rollback**: How to undo if needed
4. **Generate**: Create MIGRATION.md

Begin by analyzing version changes and generating migration documentation.
```
