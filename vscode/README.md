# VibeKit VSCode Extension

> Sync VibeKit's 47 professional slash commands and global rules to your AI editor

[![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)](https://github.com/HBCapital/VibeCoding)
[![License](https://img.shields.io/badge/license-Apache%202.0-green.svg)](LICENSE)

## 🎯 What is VibeKit?

VibeKit is a professional development workflow automation system that provides **47 slash commands** organized into 18 groups, covering everything from documentation generation to security audits.

This VSCode extension syncs VibeKit's rules and commands from a Git repository to your AI-powered editor (Cursor, Windsurf, or Antigravity).

## ✨ Features

- 🎯 **47 Slash Commands** organized in 18 groups
- 📝 **Global Rules** for consistent AI behavior
- 🔄 **Auto-Sync** from Git repository
- 🎨 **Multi-Editor Support** (Cursor, Windsurf, Antigravity)
- 🔐 **Private Repos** supported with authentication
- ⚡ **One-Click Sync** via status bar or command palette

## 📦 Command Groups

| Group        | Commands | Purpose                                           |
| ------------ | -------- | ------------------------------------------------- |
| **doc-**     | 17       | Documentation generation (README, API docs, etc.) |
| **review-**  | 4        | Code review and audits                            |
| **git-**     | 3        | Git workflows, commits, PRs                       |
| **lang-**    | 3        | Language-specific best practices                  |
| **perf-**    | 2        | Performance profiling & optimization              |
| **sec-**     | 2        | Security audits & best practices                  |
| **api-**     | 2        | API design & documentation                        |
| **migrate-** | 2        | Database & code migrations                        |
| **clean-**   | 2        | Code & dependency cleanup                         |
| **Others**   | 10       | Testing, debugging, refactoring, etc.             |

**Total**: 47 commands + 1 help command (`/vibekit`)

## 🚀 Quick Start

### 1. Install Extension

Install from VSCode Marketplace or:

```bash
code --install-extension vibekit-vscode
```

### 2. Configure Git Repository

Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run:

```
VibeKit: Configure Git Repository
```

Enter your VibeKit repository URL:

- Public: `https://github.com/HBCapital/VibeCoding`
- Private: `https://YOUR_TOKEN@github.com/user/repo`
- SSH: `git@github.com:user/repo.git`

### 3. Sync Rules & Commands

Click the VibeKit icon in the status bar, or run:

```
VibeKit: Sync Rules & Agents
```

### 4. Start Using Commands

In your AI editor, type:

```
/vibekit
```

This shows all available commands and quick start guide.

## 🎨 Supported Editors

### Cursor

- Rules: `.cursorrules`
- Commands: `.cursor/agents/*.md`

### Windsurf

- Rules: `.windsurfrules`
- Commands: `.windsurf/agents/*.md`

### Antigravity (Google)

- Rules: `.antigravity/rules/*.md`
- Commands: `.antigravity/agents/*.md`

The extension auto-detects your editor or you can manually select it in settings.

## ⚙️ Configuration

| Setting                | Default  | Description                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `vibekit.gitRepo`      | `""`     | Git repository URL                                 |
| `vibekit.gitBranch`    | `"main"` | Branch to sync from                                |
| `vibekit.gitToken`     | `""`     | Authentication token (optional)                    |
| `vibekit.autoSync`     | `false`  | Enable automatic syncing                           |
| `vibekit.syncInterval` | `30`     | Auto-sync interval (minutes)                       |
| `vibekit.provider`     | `"auto"` | Editor provider (auto/cursor/windsurf/antigravity) |

## 📝 Commands

| Command                             | Keybinding                  | Description               |
| ----------------------------------- | --------------------------- | ------------------------- |
| `VibeKit: Sync Rules & Agents`      | `Ctrl+Shift+V Ctrl+Shift+S` | Sync from Git             |
| `VibeKit: Configure Git Repository` | -                           | Set repository URL        |
| `VibeKit: Enable Auto-Sync`         | -                           | Enable automatic syncing  |
| `VibeKit: Disable Auto-Sync`        | -                           | Disable automatic syncing |
| `VibeKit: Show Current Provider`    | -                           | Display provider info     |

## 🔧 Development

See [DEV_GUIDE.md](DEV_GUIDE.md) for development instructions.

## 🧪 Testing

See [TESTING.md](TESTING.md) for testing guide.

## 📄 License

Apache 2.0 - See [LICENSE](https://github.com/HBCapital/VibeCoding/blob/main/LICENSE)

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](https://github.com/HBCapital/VibeCoding/blob/main/docs/CONTRIBUTING.md)

## 🔗 Links

- [VibeKit Repository](https://github.com/HBCapital/VibeCoding)
- [Command Reference](https://github.com/HBCapital/VibeCoding/blob/main/docs/COMMANDS.md)
- [Issues](https://github.com/HBCapital/VibeCoding/issues)

---

**Made with ❤️ by the VibeKit team**
