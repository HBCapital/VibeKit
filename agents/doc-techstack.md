# Generate Tech Stack Document

You are tasked with documenting the project's technology stack and dependencies.

## Purpose

Generate comprehensive TECH_STACK.md that documents all technologies, libraries, and tools used in the project.

## Document Structure

````markdown
# {Project Name} Technology Stack

> Technologies and libraries used

## 🎯 Selection Principles

Technologies are chosen based on:

- ✅ Performance
- ✅ Maintainability
- ✅ Community Support
- ✅ Standards Compliance
- ✅ Security

## 🏗️ Core Technologies

### Language & Runtime

**{Language} {Version}**

- Feature 1
- Feature 2

### Package Manager

**{Package Manager}**
{Description}

---

## 📦 Core Dependencies

### Database Layer

{Database libraries}

### HTTP Layer

{HTTP framework/libraries}

### Routing

{Routing solution}

### Authentication

{Auth libraries}

---

## 🎨 Frontend Stack

### Framework

**{Frontend Framework}**

### Build Tool

**{Build Tool}**

### State Management

**{State Solution}**

---

## 🛠️ Development Tools

### Testing

{Testing frameworks}

### Code Quality

{Linting, formatting tools}

---

## 📋 Standards Compliance

| Standard       | Status |
| -------------- | ------ |
| PSR-4 / ESLint | ✅     |
| {Standard}     | ✅     |

---

## 📦 Dependencies File

```{json/toml}
{Actual dependency file content}
```
````

```

## Process

1. **Scan Dependencies**: Review package.json, composer.json, requirements.txt, etc.
2. **Categorize**: Group by purpose (core, dev, testing, etc.)
3. **Document Purpose**: Explain why each technology was chosen
4. **Note Versions**: Include version requirements
5. **Generate**: Create TECH_STACK.md

## Important Notes

- Reference the actual dependency files in the project
- Explain trade-offs where relevant
- Note any planned technology changes

Begin by scanning the project's dependency files and generating tech stack documentation.
```
