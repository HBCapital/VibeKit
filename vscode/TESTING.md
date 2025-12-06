# Testing VibeKit VSCode Extension

> Hướng dẫn test extension từ development đến production

## 🎯 Tổng Quan

Extension VibeKit cần được test ở 3 levels:

1. **Development Testing** - Test trong Extension Development Host
2. **Manual Testing** - Test các tính năng chính
3. **Production Testing** - Test VSIX package

---

## 🚀 Development Testing

### Bước 1: Chuẩn Bị

```bash
# Di chuyển vào thư mục extension
cd c:\Users\Admin\Download\VibeKit\extensions\vscode

# Cài đặt dependencies (nếu chưa)
npm install

# Compile TypeScript
npm run compile
```

### Bước 2: Launch Extension Development Host

**Cách 1: Sử dụng F5**

1. Mở thư mục `vscode` trong VSCode
2. Nhấn `F5` (hoặc Run → Start Debugging)
3. Một cửa sổ VSCode mới sẽ mở (Extension Development Host)

**Cách 2: Sử dụng Command Palette**

1. `Ctrl+Shift+P` → `Debug: Start Debugging`
2. Chọn "Run Extension"

### Bước 3: Verify Extension Loaded

Trong Extension Development Host:

1. Kiểm tra status bar → Phải thấy icon VibeKit
2. `Ctrl+Shift+P` → Gõ "VibeKit" → Phải thấy các commands

---

## ✅ Manual Testing Checklist

### Test 1: Configure Repository

```
1. Ctrl+Shift+P → "VibeKit: Configure Git Repository"
2. Nhập: https://github.com/HBCapital/VibeCoding
3. ✓ Phải thấy message: "Repository set to..."
```

### Test 2: Sync Rules & Agents

```
1. Click vào VibeKit icon trong status bar
   HOẶC
   Ctrl+Shift+P → "VibeKit: Sync Rules & Agents"

2. ✓ Phải thấy progress notification "Fetching from Git..."
3. ✓ Phải thấy "Reading rules and agents..."
4. ✓ Phải thấy "Syncing rules..." và "Syncing agents..."
5. ✓ Kết thúc với: "✓ VibeKit: Synced X file(s) successfully"
```

### Test 3: Verify Synced Files

**Kiểm tra files đã được sync:**

```bash
# Mở workspace folder và check:

# Cursor users:
ls .cursorrules          # Phải có file
ls .cursor/agents/       # Phải có 47 files .md

# Windsurf users:
ls .windsurfrules        # Phải có file
ls .windsurf/agents/     # Phải có 47 files .md

# Antigravity users:
ls .antigravity/rules/   # Phải có vibekit.md
ls .antigravity/agents/  # Phải có 47 files .md
```

### Test 4: Provider Detection

```
1. Ctrl+Shift+P → "VibeKit: Show Current Provider"
2. ✓ Phải hiển thị provider đúng (Cursor/Windsurf/Antigravity)
3. ✓ Phải có setup instructions
```

### Test 5: Auto-Sync

```
1. Ctrl+Shift+P → "VibeKit: Enable Auto-Sync"
2. ✓ Message: "Auto-sync enabled"
3. Đợi 30 phút (hoặc thay đổi syncInterval trong settings)
4. ✓ Extension phải tự động sync
5. Ctrl+Shift+P → "VibeKit: Disable Auto-Sync"
```

### Test 6: Status Bar

```
1. ✓ Icon hiển thị đúng:
   - $(cloud-download) - Chưa sync
   - $(sync~spin) - Đang sync
   - $(check) - Đã sync thành công
   - $(error) - Có lỗi

2. ✓ Tooltip hiển thị:
   - Provider name
   - Last sync time
   - "Click to sync"
```

### Test 7: Keyboard Shortcut

```
1. Nhấn: Ctrl+Shift+V Ctrl+Shift+S
2. ✓ Phải trigger sync command
```

### Test 8: Settings

```
1. Ctrl+, → Search "VibeKit"
2. ✓ Kiểm tra các settings:
   - vibekit.gitRepo
   - vibekit.gitBranch
   - vibekit.autoSync
   - vibekit.syncInterval
   - vibekit.provider
   - vibekit.gitToken
```

---

## 🔍 Testing với Git Repository Khác Nhau

### Test Public Repo

```
Repository: https://github.com/HBCapital/VibeCoding
Branch: main
Token: (để trống)
```

### Test Private Repo

```
Repository: https://github.com/user/private-repo
Branch: main
Token: ghp_xxxxxxxxxxxx (GitHub Personal Access Token)
```

### Test SSH URL

```
Repository: git@github.com:user/repo.git
Branch: main
```

### Test GitHub Shorthand

```
Repository: HBCapital/VibeCoding
Branch: main
```

---

## 📦 Production Testing (VSIX Package)

### Bước 1: Build VSIX Package

```bash
cd c:\Users\Admin\Download\VibeKit\extensions\vscode

# Install vsce if not installed
npm install -g @vscode/vsce

# Package extension
npm run package
# hoặc
vsce package

# Output: vibekit-vscode-0.0.1.vsix
```

### Bước 2: Install VSIX

```bash
# Cách 1: Command line
code --install-extension vibekit-vscode-0.0.1.vsix

# Cách 2: VSCode UI
# Extensions → ... (More Actions) → Install from VSIX
```

### Bước 3: Test Installed Extension

1. **Restart VSCode**
2. Verify extension trong Extensions panel
3. Chạy lại tất cả manual tests ở trên

### Bước 4: Uninstall (sau khi test xong)

```bash
code --uninstall-extension vibekit.vibekit-vscode
```

---

## 🐛 Debugging

### View Extension Logs

```
1. Ctrl+Shift+P → "Developer: Show Logs"
2. Chọn "Extension Host"
3. Tìm logs có prefix [VibeKit]
```

### Common Issues

**Issue 1: Extension không load**

```
Solution:
- Check package.json activationEvents
- Restart Extension Development Host
- npm run compile lại
```

**Issue 2: Sync fails**

```
Solution:
- Check Git repository URL
- Check internet connection
- Check Git token (nếu private repo)
- View logs: Developer Tools → Console
```

**Issue 3: Files không được tạo**

```
Solution:
- Check provider detection
- Check workspace folder exists
- Check file permissions
```

---

## ✨ Test Scenarios

### Scenario 1: First Time User

```
1. Install extension
2. Open workspace
3. Configure repo
4. Sync
5. Verify files created
6. Try using /vibekit command in AI editor
```

### Scenario 2: Existing User

```
1. Extension đã installed
2. Có files cũ từ sync trước
3. Sync lại
4. Verify files được update
5. Check không có duplicate files
```

### Scenario 3: Multiple Workspaces

```
1. Open workspace A → Sync
2. Open workspace B → Sync
3. Verify mỗi workspace có files riêng
4. Switch giữa workspaces
5. Verify extension hoạt động đúng
```

---

## 📊 Test Results Template

```markdown
## Test Results - [Date]

### Environment

- VSCode Version:
- OS: Windows 11
- Extension Version: 0.0.1

### Tests Passed ✓

- [ ] Configure Repository
- [ ] Sync Rules & Agents
- [ ] Verify Files Created
- [ ] Provider Detection
- [ ] Auto-Sync
- [ ] Status Bar
- [ ] Keyboard Shortcut
- [ ] Settings

### Tests Failed ✗

- None

### Issues Found

- None

### Notes

- All 47 commands synced successfully
- Extension works with Cursor/Windsurf/Antigravity
```

---

## 🚀 Quick Test Script

Chạy script này để test nhanh:

```bash
# Test script
cd c:\Users\Admin\Download\VibeKit\extensions\vscode

# 1. Clean build
npm run clean
npm install
npm run compile

# 2. Run tests (if available)
npm test

# 3. Package
npm run package

# 4. Install locally
code --install-extension vibekit-vscode-0.0.1.vsix

# 5. Manual testing
# (Follow checklist above)

# 6. Uninstall
code --uninstall-extension vibekit.vibekit-vscode
```

---

## 📝 Next Steps

Sau khi test xong:

1. ✅ Fix any bugs found
2. ✅ Update CHANGELOG.md
3. ✅ Update version in package.json
4. ✅ Create Git tag
5. ✅ Publish to VSCode Marketplace (optional)

---

**Happy Testing! 🎉**
