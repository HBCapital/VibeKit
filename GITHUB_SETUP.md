# FlowOne - GitHub Setup Guide

> Hướng dẫn publish dự án FlowOne lên GitHub để team collaboration

## ✅ Đã Hoàn Thành

- [x] Git repository đã được khởi tạo
- [x] `.gitignore` đã được tạo (ignore node_modules, vendor, .env, etc.)
- [x] `LICENSE` (Apache 2.0) đã được tạo
- [x] Git config (user.name & user.email) đã được setup
- [x] Initial commit đã được tạo với tất cả documentation

**Commit Message**: `Initial commit: FlowOne CMS documentation and project structure`

**Files committed**: 13 files, 4406+ lines

- All `.ai/*.md` documentation
- `README.md`, `ARCHITECTURE.md`, `INSTALLATION.md`
- `.gitignore`, `LICENSE`

---

## 🚀 Bước Tiếp Theo: Publish lên GitHub

### Option 1: Tạo Repository Mới Trên GitHub (Recommended)

#### Bước 1: Tạo Repository trên GitHub.com

1. Truy cập: https://github.com/new
2. Điền thông tin:
   - **Repository name**: `FlowOne` (hoặc `flowone-cms`)
   - **Description**: `Modern, lightweight, secure CMS platform - WordPress alternative`
   - **Visibility**:
     - ✅ **Public** (recommended for open-source)
     - ⚠️ Private (nếu muốn giữ riêng tư ban đầu)
   - **DON'T** initialize with README, .gitignore, or license (chúng ta đã có rồi)
3. Click **"Create repository"**

#### Bước 2: Kết Nối Local Repo với GitHub

GitHub sẽ show instructions, hoặc bạn chạy commands sau:

```bash
# Add remote (thay YOUR_USERNAME bằng GitHub username của bạn)
git remote add origin https://github.com/YOUR_USERNAME/FlowOne.git

# Hoặc nếu dùng SSH
git remote add origin git@github.com:YOUR_USERNAME/FlowOne.git

# Push code lên GitHub
git push -u origin master
```

**Lưu ý**: Nếu main branch của bạn là `main` thay vì `master`, dùng:

```bash
git branch -M main
git push -u origin main
```

#### Bước 3: Verify

Truy cập repository trên GitHub để verify:

```
https://github.com/YOUR_USERNAME/FlowOne
```

---

### Option 2: Tạo Repo Qua GitHub CLI (gh)

Nếu bạn đã cài GitHub CLI:

```bash
# Authenticate (nếu chưa)
gh auth login

# Tạo repo và push một lúc
gh repo create FlowOne --public --source=. --remote=origin --push

# Mở repo trên browser
gh repo view --web
```

---

## 👥 Team Collaboration Setup

### 1. Mời Team Members

**Via GitHub Web**:

1. Vào: `https://github.com/YOUR_USERNAME/FlowOne/settings/access`
2. Click **"Invite a collaborator"**
3. Nhập GitHub username hoặc email
4. Chọn role:
   - **Admin**: Full access
   - **Write**: Push code, merge PRs
   - **Read**: View only

**Via GitHub CLI**:

```bash
gh repo edit --add-collaborator TEAMMATE_USERNAME
```

### 2. Team Members Clone Repository

Team members chạy:

```bash
# Clone qua HTTPS
git clone https://github.com/YOUR_USERNAME/FlowOne.git

# Hoặc qua SSH
git clone git@github.com:YOUR_USERNAME/FlowOne.git

cd FlowOne
```

### 3. Branch Protection (Optional nhưng Recommended)

Bảo vệ `main`/`master` branch khỏi direct push:

1. Vào: `Settings` → `Branches` → `Add rule`
2. Branch name pattern: `main` (hoặc `master`)
3. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass (khi có CI/CD)
   - ✅ Include administrators (apply cho admin)
4. Save

### 4. Setup GitHub Actions (CI/CD) - Optional

Tạo `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check Markdown
        uses: DavidAnson/markdownlint-cli2-action@v11
        with:
          globs: "**/*.md"
```

---

## 📋 Git Workflow cho Team

### Recommended Workflow: Feature Branches

```bash
# 1. Tạo feature branch
git checkout -b feature/authentication

# 2. Code & commit
git add .
git commit -m "feat: implement user authentication"

# 3. Push lên GitHub
git push origin feature/authentication

# 4. Tạo Pull Request trên GitHub
# Vào: https://github.com/YOUR_USERNAME/FlowOne/pulls
# Click "New Pull Request"

# 5. Review & Merge (via GitHub UI)

# 6. Update local main
git checkout main
git pull origin main

# 7. Delete feature branch
git branch -d feature/authentication
```

### Commit Message Convention

Sử dụng [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: new feature
fix: bug fix
docs: documentation changes
style: code formatting
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

**Examples**:

```bash
git commit -m "feat: add plugin sandboxing system"
git commit -m "fix: resolve SQLite connection pooling issue"
git commit -m "docs: update INSTALLATION.md with Docker setup"
```

---

## 🔒 Security Best Practices

### 1. Không Commit Sensitive Data

`.gitignore` đã configured để ignore:

- `.env` files (database credentials, API keys)
- `composer.lock` (nếu có conflicts)
- `node_modules/`, `vendor/`
- SQLite database files
- Upload directories (optional)

### 2. Sử dụng Secrets cho CI/CD

Nếu cần credentials trong GitHub Actions:

1. Vào: `Settings` → `Secrets and variables` → `Actions`
2. Add secrets như `DATABASE_PASSWORD`, `API_KEY`
3. Dùng trong workflows: `${{ secrets.DATABASE_PASSWORD }}`

### 3. Review Code Before Merge

- Luôn create Pull Request, không direct push lên `main`
- Ít nhất 1 reviewer approve trước khi merge
- Run tests & checks trước khi approve

---

## 📊 Project Management (Optional)

### GitHub Projects

Tạo project board để track công việc:

1. Vào: `Projects` tab → `New project`
2. Template: **Board** hoặc **Table**
3. Add tasks từ `TODO.md` vào board
4. Link với Issues & Pull Requests

### GitHub Issues

Sử dụng Issues để track bugs & features:

```bash
# Create issue via CLI
gh issue create --title "Implement plugin system" --body "See TODO.md Phase 3"

# List issues
gh issue list
```

---

## 🆘 Troubleshooting

### Authentication Failed

Nếu push bị lỗi authentication:

**HTTPS**: Cần Personal Access Token

1. Vào: `Settings` → `Developer settings` → `Personal access tokens` → `Tokens (classic)`
2. Generate new token với `repo` scope
3. Dùng token thay vì password khi push

**SSH**: Setup SSH key

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub: Settings → SSH and GPG keys → New SSH key
# Paste nội dung file ~/.ssh/id_ed25519.pub
```

### Merge Conflicts

```bash
# Fetch latest changes
git fetch origin main

# Merge và resolve conflicts
git merge origin/main

# Sau khi resolve, commit
git add .
git commit -m "merge: resolve conflicts with main"
git push
```

---

## ✅ Quick Checklist

- [ ] Repository created on GitHub
- [ ] Local repo connected to remote (`git remote -v`)
- [ ] Code pushed successfully (`git push -u origin main`)
- [ ] Team members invited as collaborators
- [ ] Branch protection rules configured
- [ ] README.md displays correctly on GitHub
- [ ] LICENSE visible on repo
- [ ] `.gitignore` working (no `.env`, `node_modules` committed)

---

## 📝 Next Steps After Setup

1. **Development**: Begin Phase 1 implementation (see `TODO.md`)
2. **CI/CD**: Setup GitHub Actions for tests & deployment
3. **Documentation**: Keep `.ai/*.md` files updated
4. **Issues**: Create issues from `TODO.md` checklist
5. **Milestones**: Track progress via GitHub Milestones

---

**Repository URL (example)**:  
`https://github.com/YOUR_USERNAME/FlowOne`

**Happy Collaborating! 🚀**
