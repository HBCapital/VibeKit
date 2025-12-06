# VibeKit Setup Guide

Hướng dẫn thiết lập và phát triển VibeKit monorepo.

## 🎯 Tổng quan Cấu trúc

VibeKit được tổ chức theo mô hình **monorepo** với **npm workspaces**:

```
VibeKit/
├── extensions/              # 📦 Tất cả extensions (workspaces)
│   ├── vscode/             # VSCode extension
│   │   ├── src/
│   │   ├── package.json    # Extension-specific dependencies
│   │   └── ...
│   ├── zed/                # Zed extension (coming soon)
│   │   └── README.md
│   └── README.md           # Extensions overview
├── docs/                   # 📚 Shared documentation
├── agents/                 # 🤖 AI agents configuration
├── rules/                  # 📋 Shared rules/configs
├── package.json           # 🔧 Root package.json (workspace config)
├── .gitignore            # Git ignore rules
├── MONOREPO.md          # Monorepo management guide
└── README.md            # Main README
```

## ✅ Câu trả lời cho câu hỏi của bạn

### 1. Cấu trúc thư mục có ổn không?

**✅ RẤT ỔN!** Đây là cách tổ chức chuẩn cho monorepo:

- ✅ Tách biệt rõ ràng giữa các extensions
- ✅ Dễ dàng thêm extensions mới
- ✅ Shared configuration ở root level
- ✅ Independent versioning cho mỗi extension
- ✅ Có thể build/test riêng từng extension

### 2. Làm sao để tạo sub?

**"Sub" ở đây là npm workspaces**. Đã được cấu hình trong `package.json`:

```json
{
  "workspaces": ["extensions/*"]
}
```

Điều này có nghĩa:

- Tất cả thư mục trong `extensions/` là workspaces
- Mỗi workspace có `package.json` riêng
- Dependencies được quản lý tập trung

## 🚀 Bắt đầu Development

### Bước 1: Cài đặt Dependencies

```bash
# Từ root directory
cd VibeKit
npm install
```

Lệnh này sẽ:

- Cài đặt dependencies của root
- Tự động cài đặt dependencies của tất cả workspaces
- Link các workspaces với nhau

### Bước 2: Build Extensions

```bash
# Build tất cả
npm run build

# Hoặc build từng extension
npm run build:vscode
npm run build:zed
```

### Bước 3: Development Mode

```bash
# VSCode extension - watch mode
npm run watch:vscode

# Sau đó mở vscode trong VSCode và nhấn F5
```

## 📦 Thêm Extension Mới

### Ví dụ: Thêm extension cho Cursor

```bash
# 1. Tạo thư mục
mkdir extensions/cursor
cd extensions/cursor

# 2. Initialize package
npm init -y

# 3. Cập nhật package.json
# Thêm name, version, scripts, etc.

# 4. Quay về root và cài đặt
cd ../..
npm install
```

### Cập nhật Root Scripts

Thêm vào `package.json` ở root:

```json
{
  "scripts": {
    "install:cursor": "cd extensions/cursor && npm install",
    "build:cursor": "cd extensions/cursor && npm run build",
    "build": "npm run build:vscode && npm run build:zed && npm run build:cursor"
  }
}
```

## 🎨 Lợi ích của Monorepo

### 1. Shared Dependencies

```bash
# Cài đặt TypeScript cho tất cả workspaces
npm install -D typescript --workspace-root
```

### 2. Independent Versions

```
vscode/package.json → "version": "1.0.0"
zed/package.json    → "version": "0.1.0"
```

### 3. Unified Commands

```bash
npm test        # Test tất cả
npm run lint    # Lint tất cả
npm run build   # Build tất cả
```

### 4. Code Sharing (Optional)

Có thể tạo shared package:

```bash
mkdir extensions/shared
# Các extensions khác có thể import từ @vibekit/shared
```

## 🔧 Workflow Thực tế

### Scenario 1: Phát triển VSCode Extension

```bash
# Terminal 1: Watch mode
npm run watch:vscode

# Terminal 2: VSCode
cd vscode
code .
# Nhấn F5 để debug
```

### Scenario 2: Thêm Feature Mới

```bash
# 1. Create branch
git checkout -b feature/new-command

# 2. Develop
cd vscode
# Edit code...

# 3. Test
npm test

# 4. Build
npm run compile

# 5. Commit
git add .
git commit -m "feat(vscode): add new command"
```

### Scenario 3: Release Extension

```bash
# 1. Update version
cd vscode
npm version patch  # hoặc minor, major

# 2. Update CHANGELOG
# Edit CHANGELOG.md

# 3. Build
npm run compile

# 4. Package
npm run package

# 5. Publish
vsce publish

# 6. Tag
git tag vscode-v0.0.2
git push --tags
```

## 📊 Dependencies Management

### Cài đặt cho specific workspace

```bash
# Cài đặt cho VSCode extension
npm install @types/vscode --workspace=vscode

# Hoặc
cd vscode
npm install @types/vscode
```

### Cài đặt cho tất cả workspaces

```bash
# Từ root
npm install -D eslint --workspaces
```

### Kiểm tra dependencies

```bash
# Xem dependency tree
npm ls

# Xem dependencies của specific workspace
npm ls --workspace=vscode
```

## 🧪 Testing Strategy

### Unit Tests

Mỗi extension có test suite riêng:

```bash
npm run test:vscode
npm run test:zed
```

### Integration Tests

Có thể tạo shared tests:

```bash
mkdir tests/integration
# Test interaction giữa các extensions
```

## 🔍 Troubleshooting

### Issue: Workspace không được nhận diện

**Solution:**

```bash
# Xóa node_modules và reinstall
rm -rf node_modules extensions/*/node_modules
npm install
```

### Issue: Dependencies conflict

**Solution:**

```bash
# Dedupe dependencies
npm dedupe

# Hoặc clean install
npm ci
```

### Issue: Build errors

**Solution:**

```bash
# Clean và rebuild
npm run clean
npm run build
```

## 📚 Resources

- [npm Workspaces Documentation](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [Monorepo Tools](https://monorepo.tools/)
- [VSCode Extension Guide](https://code.visualstudio.com/api)
- [Zed Extension Guide](https://zed.dev/docs/extensions)

## 🎯 Next Steps

1. ✅ Cấu trúc monorepo đã sẵn sàng
2. ✅ VSCode extension đã có cấu trúc cơ bản
3. 🚧 Phát triển Zed extension
4. 🚧 Thêm shared utilities (nếu cần)
5. 🚧 Setup CI/CD pipeline

## 💡 Tips

1. **Luôn chạy commands từ root** để đảm bảo consistency
2. **Sử dụng workspace scripts** thay vì cd vào từng thư mục
3. **Keep extensions independent** - mỗi extension có thể hoạt động độc lập
4. **Document changes** trong CHANGELOG của từng extension
5. **Version independently** - không cần sync versions giữa các extensions

---

**Chúc bạn phát triển thành công! 🚀**
