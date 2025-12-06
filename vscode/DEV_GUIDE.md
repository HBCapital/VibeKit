# VibeKit VSCode Extension - Development Guide

## Cấu trúc dự án

```
vscode/
├── .vscode/                    # VSCode configuration
│   ├── launch.json            # Debug configuration
│   ├── tasks.json             # Build tasks
│   └── extensions.json        # Recommended extensions
├── src/                       # Source code
│   ├── extension.ts           # Main entry point
│   └── test/                  # Tests
│       ├── runTest.ts         # Test runner
│       └── suite/
│           ├── index.ts       # Test suite setup
│           └── extension.test.ts  # Sample tests
├── out/                       # Compiled JavaScript (generated)
├── images/                    # Icons and assets
├── node_modules/              # Dependencies (generated)
├── package.json               # Extension manifest
├── tsconfig.json              # TypeScript config
├── .eslintrc.json            # ESLint config
├── .gitignore                # Git ignore rules
├── .vscodeignore             # Files to exclude from package
├── README.md                 # User documentation
├── CHANGELOG.md              # Version history
└── DEV_GUIDE.md              # This file
```

## Bắt đầu phát triển

### 1. Cài đặt dependencies

```bash
cd vscode
npm install
```

### 2. Compile TypeScript

```bash
# Compile một lần
npm run compile

# Watch mode (tự động compile khi có thay đổi)
npm run watch
```

### 3. Debug extension

1. Mở thư mục `vscode` trong VSCode
2. Nhấn `F5` hoặc chọn "Run Extension" từ Debug panel
3. Một cửa sổ VSCode mới sẽ mở (Extension Development Host)
4. Test các commands và tính năng trong cửa sổ này

### 4. Chạy tests

```bash
npm test
```

## Thêm tính năng mới

### Thêm Command mới

1. **Cập nhật `package.json`**:

```json
{
  "contributes": {
    "commands": [
      {
        "command": "vibekit.myNewCommand",
        "title": "VibeKit: My New Command"
      }
    ]
  }
}
```

2. **Implement trong `src/extension.ts`**:

```typescript
const myCommand = vscode.commands.registerCommand(
  "vibekit.myNewCommand",
  () => {
    vscode.window.showInformationMessage("My new command!");
  }
);

context.subscriptions.push(myCommand);
```

### Thêm Configuration mới

1. **Cập nhật `package.json`**:

```json
{
  "contributes": {
    "configuration": {
      "properties": {
        "vibekit.myNewSetting": {
          "type": "string",
          "default": "default value",
          "description": "My new setting description"
        }
      }
    }
  }
}
```

2. **Sử dụng trong code**:

```typescript
const config = vscode.workspace.getConfiguration("vibekit");
const myValue = config.get("myNewSetting");
```

### Thêm Keyboard Shortcut

```json
{
  "contributes": {
    "keybindings": [
      {
        "command": "vibekit.myCommand",
        "key": "ctrl+shift+v ctrl+shift+m",
        "mac": "cmd+shift+v cmd+shift+m",
        "when": "editorTextFocus"
      }
    ]
  }
}
```

## Testing

### Unit Tests

Tạo file test trong `src/test/suite/`:

```typescript
import * as assert from "assert";
import * as vscode from "vscode";

suite("My Feature Test Suite", () => {
  test("Should do something", () => {
    assert.strictEqual(1 + 1, 2);
  });
});
```

### Integration Tests

Test với VSCode API:

```typescript
test("Should execute command", async () => {
  await vscode.commands.executeCommand("vibekit.myCommand");
  // Assert expected behavior
});
```

## Packaging & Publishing

### Tạo VSIX package

```bash
npm run package
```

Tạo file `vibekit-vscode-x.x.x.vsix` có thể cài đặt thủ công.

### Cài đặt từ VSIX

```bash
code --install-extension vibekit-vscode-0.0.1.vsix
```

### Publish lên Marketplace

1. Tạo Publisher account tại [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
2. Tạo Personal Access Token
3. Login:

```bash
npx vsce login <publisher-name>
```

4. Publish:

```bash
npm run publish
```

## Best Practices

### 1. Performance

- Lazy load modules khi có thể
- Sử dụng `activationEvents` phù hợp
- Dispose resources đúng cách

### 2. Error Handling

```typescript
try {
  // Your code
} catch (error) {
  vscode.window.showErrorMessage(`Error: ${error.message}`);
}
```

### 3. User Feedback

```typescript
// Progress indicator
vscode.window.withProgress(
  {
    location: vscode.ProgressLocation.Notification,
    title: "Processing...",
    cancellable: true,
  },
  async (progress, token) => {
    // Long running task
  }
);
```

### 4. Configuration Changes

```typescript
vscode.workspace.onDidChangeConfiguration((e) => {
  if (e.affectsConfiguration("vibekit")) {
    // Reload configuration
  }
});
```

## Debugging Tips

### 1. Console Logging

```typescript
console.log("Debug message"); // Hiển thị trong Debug Console
```

### 2. Breakpoints

- Set breakpoints trong VSCode
- Debug trong Extension Development Host

### 3. Extension Host Log

Xem log chi tiết:

- Help > Toggle Developer Tools
- Console tab

## Resources

- [VSCode Extension API](https://code.visualstudio.com/api)
- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Testing Extensions](https://code.visualstudio.com/api/working-with-extensions/testing-extension)

## Troubleshooting

### Extension không activate

- Kiểm tra `activationEvents` trong `package.json`
- Xem Extension Host log để tìm lỗi

### Commands không hiển thị

- Verify command ID trong `package.json` và code
- Reload window: `Ctrl+Shift+P` > "Reload Window"

### TypeScript errors

```bash
# Clean và rebuild
rm -rf out/
npm run compile
```

## Versioning

Tuân theo [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

Update version trong `package.json` và `CHANGELOG.md` trước khi release.
