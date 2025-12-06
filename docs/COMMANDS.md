# VibeKit Slash Command Groups

> Reference document for all available slash commands organized by category

## 📋 Overview

VibeKit provides slash commands organized into logical groups. Use these commands with your AI coding assistant by prefixing with `/` (e.g., `/doc-readme`).

---

## 🆘 Help Command

| Command            | Purpose                                                |
| ------------------ | ------------------------------------------------------ |
| `/vibekit`         | Show help, quick start guide, and command overview     |
| `/vibekit list`    | List all 47 commands                                   |
| `/vibekit <group>` | Show commands in specific group (e.g., `/vibekit doc`) |

**Start here if you're new to VibeKit!**

---

## 📝 doc- | Documentation Group

Generate various documentation files.

| Command             | Purpose                                     |
| ------------------- | ------------------------------------------- |
| `/doc`              | Meta command (lists available doc commands) |
| `/doc-api`          | Generate API documentation                  |
| `/doc-architect`    | Generate architecture documentation         |
| `/doc-architecture` | Generate ARCHITECTURE.md                    |
| `/doc-business`     | Generate BUSINESS.md                        |
| `/doc-contributing` | Generate CONTRIBUTING.md                    |
| `/doc-install`      | Generate INSTALLATION.md                    |
| `/doc-log`          | Generate changelog                          |
| `/doc-migration`    | Generate MIGRATION.md                       |
| `/doc-prd`          | Generate Product Requirements Document      |
| `/doc-readme`       | Generate README.md                          |
| `/doc-risks`        | Generate RISKS.md                           |
| `/doc-roadmap`      | Generate ROADMAP.md                         |
| `/doc-security`     | Generate SECURITY.md                        |
| `/doc-techstack`    | Generate TECH_STACK.md                      |
| `/doc-todo`         | Generate TODO.md task tracking              |
| `/doc-writer`       | General technical writing assistance        |

---

## 🔍 review- | Code Review Group

Analyze and review code for quality, security, and architecture.

| Command             | Purpose                                                   |
| ------------------- | --------------------------------------------------------- |
| `/review`           | Meta command (lists review options)                       |
| `/review-code`      | General code review                                       |
| `/review-architect` | Architecture review and guidance                          |
| `/review-audit`     | Comprehensive audit (security, performance, dependencies) |

---

## 🧪 test- | Testing Group

Create and manage tests.

| Command | Purpose                             |
| ------- | ----------------------------------- |
| `/test` | Generate tests and testing strategy |

---

## 🐛 debug- | Debugging Group

Find and fix issues.

| Command  | Purpose                                  |
| -------- | ---------------------------------------- |
| `/debug` | Debug issues with systematic methodology |

---

## ♻️ refactor- | Refactoring Group

Improve code quality without changing behavior.

| Command     | Purpose                          |
| ----------- | -------------------------------- |
| `/refactor` | Refactor code for better quality |

---

## 🚀 deploy- | DevOps Group

CI/CD, deployment, and infrastructure.

| Command          | Purpose                                      |
| ---------------- | -------------------------------------------- |
| `/deploy-devops` | CI/CD pipelines, Docker, K8s, infrastructure |

---

## 📰 update- | Maintenance Group

Update and maintain documentation and code.

| Command   | Purpose                                    |
| --------- | ------------------------------------------ |
| `/update` | Update documentation to match current code |

---

## 🎨 design- | UI/UX Group

User interface and experience design.

| Command      | Purpose                          |
| ------------ | -------------------------------- |
| `/design-ui` | UI/UX design guidance and review |

---

## 🗄️ db- | Database Group

Database design and optimization.

| Command | Purpose                                |
| ------- | -------------------------------------- |
| `/db`   | Database design, queries, optimization |

---

## 🚀 init- | Initialization Group

Project setup and initialization.

| Command | Purpose                                  |
| ------- | ---------------------------------------- |
| `/init` | Initialize new project with guided setup |

---

## 💻 lang- | Language Specific Group

Best practices for specific programming languages.

| Command     | Purpose                   |
| ----------- | ------------------------- |
| `/lang-ts`  | TypeScript best practices |
| `/lang-js`  | JavaScript best practices |
| `/lang-php` | PHP best practices        |

---

## 🔀 git- | Version Control Group

Git workflows, commit messages, and PR management.

| Command         | Purpose                                             |
| --------------- | --------------------------------------------------- |
| `/git-commit`   | Generate conventional commit messages               |
| `/git-pr`       | Generate PR descriptions                            |
| `/git-workflow` | Git workflow guidance (Git Flow, GitHub Flow, etc.) |

---

## ⚡ perf- | Performance Group

Performance profiling and optimization.

| Command          | Purpose                                      |
| ---------------- | -------------------------------------------- |
| `/perf-profile`  | Profile performance and identify bottlenecks |
| `/perf-optimize` | Optimize code for better performance         |

---

## 🔐 sec- | Security Group

Security audits and best practices.

| Command          | Purpose                                     |
| ---------------- | ------------------------------------------- |
| `/sec-audit`     | Comprehensive security audit (OWASP Top 10) |
| `/sec-practices` | Security best practices and secure coding   |

---

## 🌐 api- | API Design Group

API design and documentation.

| Command       | Purpose                     |
| ------------- | --------------------------- |
| `/api-design` | Design RESTful/GraphQL APIs |
| `/api-docs`   | Generate API documentation  |

---

## 🔄 migrate- | Migration Group

Database and code migrations.

| Command         | Purpose                                       |
| --------------- | --------------------------------------------- |
| `/migrate-db`   | Database schema migrations                    |
| `/migrate-code` | Code migrations (framework/language upgrades) |

---

## 🧹 clean- | Cleanup Group

Code and dependency cleanup.

| Command       | Purpose                             |
| ------------- | ----------------------------------- |
| `/clean-code` | Remove dead code and unused imports |
| `/clean-deps` | Audit and cleanup dependencies      |

---

## 🔧 default | Fallback

| Command    | Purpose                                           |
| ---------- | ------------------------------------------------- |
| `/default` | Default behavior when no specific command matches |

---

## 📊 Command Statistics

**Total Commands**: 47

| Group    | Count |
| -------- | ----- |
| doc-     | 17    |
| review-  | 4     |
| lang-    | 3     |
| git-     | 3     |
| perf-    | 2     |
| sec-     | 2     |
| api-     | 2     |
| migrate- | 2     |
| clean-   | 2     |
| vibekit  | 1     |
| Others   | 9     |

---

## Usage Examples

```bash
# Get help and see all commands
/vibekit

# Generate README for current project
/doc-readme

# Review code for security issues
/review-audit

# Start new project
/init

# Generate tests
/test

# Create commit message
/git-commit

# Security audit
/sec-audit

# Performance profiling
/perf-profile
```

---

**Last Updated**: 2025-12-05
