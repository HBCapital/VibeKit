# VibeKit Monorepo Guide

Hướng dẫn quản lý monorepo cho VibeKit với nhiều extensions.

## 🏗️ Cấu trúc Monorepo

```
VibeKit/
├── extensions/              # Tất cả extensions
│   ├── vscode/             # VSCode extension
│   │   ├── src/
│   │   ├── package.json
│   │   └── ...
│   ├── zed/                # Zed extension
│   │   ├── src/
│   │   ├── package.json
│   │   └── ...
│   └── README.md
├── docs/                   # Shared documentation
├── agents/                 # AI agents configuration
├── rules/                  # Shared rules/configs
├── package.json           # Root package.json (workspace config)
├── .gitignore            # Root gitignore
└── README.md             # Main README
```

## 📦 Workspace Configuration

Dự án sử dụng **npm workspaces** để quản lý nhiều packages.

### Root `package.json`

```json
{
  "private": true,
  "workspaces": ["extensions/*"]
}
```

### Lợi ích của Workspaces:

1. **Shared Dependencies**: Dependencies chung được hoist lên root
2. **Linked Packages**: Các packages tự động link với nhau
3. **Unified Commands**: Chạy scripts cho tất cả packages cùng lúc
4. **Faster Installs**: Giảm duplicate dependencies

## 🚀 Workflow

### 1. Cài đặt Dependencies

```bash
# Từ root directory
npm install

# Hoặc cài đặt cho specific extension
npm run install:vscode
npm run install:zed
```

### 2. Development

```bash
# Build tất cả
npm run build

# Watch mode cho VSCode
npm run watch:vscode

# Watch mode cho Zed
npm run watch:zed
```

### 3. Testing

```bash
# Test tất cả
npm test

# Test specific extension
npm run test:vscode
npm run test:zed
```

### 4. Linting

```bash
# Lint tất cả
npm run lint

# Lint specific extension
npm run lint:vscode
npm run lint:zed
```

## 📝 Thêm Extension Mới

### Bước 1: Tạo thư mục

```bash
mkdir extensions/new-editor
cd extensions/new-editor
```

### Bước 2: Initialize package

```bash
npm init -y
```

### Bước 3: Cập nhật root `package.json`

Thêm scripts mới:

```json
{
  "scripts": {
    "install:new-editor": "cd extensions/new-editor && npm install",
    "build:new-editor": "cd extensions/new-editor && npm run build",
    "test:new-editor": "cd extensions/new-editor && npm test"
  }
}
```

### Bước 4: Cập nhật build scripts

Thêm vào `build`, `test`, `lint` scripts:

```json
{
  "scripts": {
    "build": "npm run build:vscode && npm run build:zed && npm run build:new-editor"
  }
}
```

## 🔄 Versioning Strategy

### Independent Versioning

Mỗi extension có version riêng:

- `vscode/package.json` → `0.0.1`
- `zed/package.json` → `0.0.1`

### Release Process

1. Update CHANGELOG cho extension cụ thể
2. Bump version trong `package.json` của extension
3. Build và test
4. Create git tag: `vscode-v0.0.1` hoặc `zed-v0.0.1`
5. Publish

## 🛠️ Shared Code

### Tạo Shared Package (Optional)

Nếu cần chia sẻ code giữa các extensions:

```bash
mkdir extensions/shared
cd extensions/shared
npm init -y
```

Cập nhật `package.json`:

```json
{
  "name": "@vibekit/shared",
  "version": "0.0.1",
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```

Sử dụng trong extensions:

```json
{
  "dependencies": {
    "@vibekit/shared": "*"
  }
}
```

## 📊 Dependencies Management

### Shared Dependencies

Cài đặt ở root cho tất cả workspaces:

```bash
npm install -D typescript eslint --workspace-root
```

### Extension-specific Dependencies

Cài đặt cho specific extension:

```bash
npm install @types/vscode --workspace=vscode
```

## 🧪 Testing Strategy

### Unit Tests

Mỗi extension có test suite riêng:

```bash
vscode/src/test/
zed/src/test/
```

### Integration Tests

Có thể tạo shared integration tests:

```bash
tests/integration/
```

## 📦 Publishing

### VSCode Extension

```bash
cd vscode
npm run package  # Tạo .vsix
vsce publish     # Publish lên marketplace
```

### Zed Extension

```bash
cd zed
npm run package  # Tạo package theo format của Zed
# Publish theo hướng dẫn của Zed
```

## 🔍 Troubleshooting

### Workspace không hoạt động

```bash
# Xóa tất cả node_modules
npm run clean

# Reinstall
npm install
```

### Dependencies conflict

```bash
# Kiểm tra duplicate dependencies
npm ls <package-name>

# Dedupe
npm dedupe
```

### Build errors

```bash
# Clean build
npm run clean
npm run build
```

## 📚 Resources

- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [Monorepo Best Practices](https://monorepo.tools/)
- [VSCode Extension Publishing](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

## 🎯 Best Practices

1. **Keep extensions independent**: Mỗi extension có thể build và test độc lập
2. **Share common configs**: ESLint, TypeScript configs có thể share
3. **Version independently**: Mỗi extension có lifecycle riêng
4. **Document changes**: Mỗi extension có CHANGELOG riêng
5. **Test thoroughly**: Test cả individual và integration
6. **Use consistent naming**: Prefix packages với `@vibekit/`

## 🚦 CI/CD Considerations

### GitHub Actions Example

```yaml
name: Build All Extensions

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - run: npm test
```

### Selective Building

Chỉ build extension đã thay đổi:

```yaml
- name: Check changed files
  id: changes
  run: |
    if git diff --name-only HEAD~1 | grep "vscode"; then
      echo "vscode=true" >> $GITHUB_OUTPUT
    fi
```
