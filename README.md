# FlowOne CMS

> One platform for all business flows.

**FlowOne** is a modern, lightweight, fast, and secure CMS platform - designed to replace WordPress with an architecture optimized for the modern era.

## 📋 Overview

FlowOne is built with the philosophy of **simple yet powerful**, focusing on excellent developer experience (DX) and high performance out-of-the-box.

### 🎯 Core Strengths

- **⚡ Fast**: Performance-optimized with JIT PHP 8.4+, cache layers and asset optimization
- **🪶 Lightweight**: Minimal architecture, zero bloat, SQLite support for lightweight deployment
- **🔒 Secure by Default**: Security-first approach with plugin sandboxing and signed packages
- **🎨 Excellent Developer Experience**:
  - Simple and safe for beginners
  - Powerful tools for professional developers
  - Robust CLI and Composer-native
- **🚀 High Performance Out-of-the-box**: Multi-layer caching, CDN-ready, optimized queries
- **📱 Mobile & Web App Ready**: REST + GraphQL APIs, headless-ready architecture
- **🔧 Simple Setup**: 1-click installer, SQLite for dev, production-ready configs
- **🔌 Easy Headless Integration**: API-first design, decoupled frontend/backend

### ❌ WordPress Problems That FlowOne Solves

| WordPress Problem                        | FlowOne Solution                                          |
| ---------------------------------------- | --------------------------------------------------------- |
| **Legacy codebase**                      | Modern PHP 8.4+ with PSR standards                        |
| **Plugin/theme security issues**         | Plugin sandboxing, signed packages, permission model      |
| **Bloat and poor performance**           | Lightweight core, lazy loading, optimized DB queries      |
| **Outdated admin UX**                    | Modern SPA admin UI (Vue.js)                              |
| **Complex migration between DB engines** | Unified DB abstraction layer (SQLite/MySQL/MariaDB)       |
| **Update conflicts plugin-core**         | Versioning system, compatibility checks, rollback support |

## 🎯 Market Positioning

FlowOne targets 3 main audience segments:

### 1. **Developers & Agencies** 👨‍💻

- Need **fast, lightweight, extensible** tools
- Want to participate in or create monetizable ecosystems
- Value excellent developer experience and modern tooling

### 2. **SME (Small & Medium Enterprises)** 🏢

- Want **fast, secure** websites without needing IT teams
- Need sufficient tools for **basic digital transformation**
- Prioritize cost-effective and easy-to-maintain solutions

### 3. **Headless CMS Users** 🔌

- Need flexible backend for React/Vue/Angular/mobile apps
- Require API-first architecture
- Want complete control over frontend experience

## 🌍 Scope & Vision

- **Phase 1**: Focus on **Vietnam** market (Vietnamese-first features, docs, support)
- **Phase 2**: **Global** expansion with i18n support and international marketplace

## 📚 Related Documentation

- [**ARCHITECTURE.md**](./ARCHITECTURE.md) - System architecture and technical design
- [**INSTALLATION.md**](./INSTALLATION.md) - Installation and configuration guide
- [**ROADMAP.md**](./ROADMAP.md) - Development roadmap and MVP features
- [**TECH_STACK.md**](./TECH_STACK.md) - Technology stack details
- [**SECURITY.md**](./SECURITY.md) - Security strategy
- [**MIGRATION.md**](./MIGRATION.md) - WordPress migration guide
- [**BUSINESS.md**](./BUSINESS.md) - Business model and go-to-market
- [**RISKS.md**](./RISKS.md) - Risk analysis and solutions

## 🚀 Quick Start

```bash
# Install FlowOne CLI
composer global require flowone/cli

# Create new project
flowone new my-project

# Serve locally (SQLite dev mode)
cd my-project
flowone serve

# Visit http://localhost:8000
```

## 🤝 Contributing

FlowOne is an **open-core** project (Apache 2.0 License). We welcome all contributions from the community!

- 📖 [Contribution Guidelines](./CONTRIBUTING.md)
- 💬 [Discord Community](https://discord.gg/flowone)
- 🐛 [Issue Tracker](https://github.com/flowone/flowone/issues)

## 📄 License

**FlowOne Licensing Model:**

- **Core Platform**: Apache 2.0 License - see [LICENSE](./LICENSE)
- **Plugin & Theme SDK**: Apache 2.0 License
- **Plugins & Themes**: Developers can choose:
  - Apache 2.0 (open-source)
  - MIT (open-source)
  - Commercial (proprietary)
  - Dual-license (Open-source + Pro versions)

This flexible licensing allows both open-source collaboration and commercial opportunities for the ecosystem.

---

**Built with ❤️ by the FlowOne Team**
