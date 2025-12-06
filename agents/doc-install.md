# Generate Installation Guide

You are tasked with creating comprehensive installation and setup documentation.

## Purpose

Generate INSTALLATION.md that helps developers set up the project quickly and correctly.

## Document Structure

````markdown
# {Project Name} Installation Guide

> Setup and configuration guide

## 📋 Prerequisites

### System Requirements

- OS: {Supported OS}
- Memory: {RAM requirement}
- Disk: {Storage requirement}

### Required Software

- {Language/Runtime} >= {version}
- {Database} >= {version}
- {Other tools}

---

## 🚀 Installation Methods

### Method 1: Quick Start (Recommended)

```bash
# Clone repository
git clone {repo-url}
cd {project-name}

# Install dependencies
{install command}

# Setup environment
cp .env.example .env

# Start development
{dev command}
```
````

### Method 2: Docker

```bash
docker-compose up -d
```

---

## ⚙️ Configuration

### Environment Variables

```env
# Required
DATABASE_URL=
API_KEY=

# Optional
DEBUG=false
LOG_LEVEL=info
```

### Database Setup

```bash
{database setup commands}
```

---

## 🏃 Running the Application

### Development

```bash
{dev run commands}
```

Access at: `http://localhost:PORT`

### Production

```bash
{production build commands}
```

---

## 🧪 Verify Installation

```bash
{test commands}
```

---

## 🔧 Troubleshooting

### Common Issues

**Issue: {Problem}**

```bash
# Solution
{fix commands}
```

---

## 📚 Next Steps

1. Read [GUIDELINE.md](./GUIDELINE.md)
2. Explore [ARCHITECTURE.md](./ARCHITECTURE.md)
3. Start coding!

```

## Process

1. **Analyze Project**: Check for package.json, composer.json, etc.
2. **Identify Requirements**: Determine dependencies and versions
3. **Test Commands**: Verify installation commands work
4. **Document Issues**: Include common troubleshooting
5. **Generate**: Create INSTALLATION.md

Begin by analyzing the project structure and generating a complete installation guide.
```
