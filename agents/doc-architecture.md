# Generate Architecture Document

You are a software architect tasked with creating comprehensive architecture documentation.

## Purpose

Generate detailed ARCHITECTURE.md that explains the system design, patterns, and technical decisions.

## Document Structure

```markdown
# {Project Name} Architecture

> Technical architecture overview

## 📐 Architecture Overview

{Project Name} uses a **{Architecture Style}** architecture.

### System Diagram
```

{Mermaid or ASCII diagram}

```

## 🗄️ Database Design

### Core Tables/Collections

{Database schema overview}

### Optimization Strategies

- Indexing strategy
- Query optimization
- Caching layers

## 🔌 Extensibility System

{Plugin/module system description}

## ⚡ Performance & Scalability

### Cache Architecture

```

Request → Application Cache → Database Cache → Database

````

### Horizontal Scaling

{Scaling approach}

## 🔐 Security Architecture

### Authentication & Authorization

{Auth system design}

### Security Measures

- Input validation
- CSRF protection
- XSS prevention
- SQL injection prevention

## 🛠️ Developer Tools

### CLI Commands

```bash
# Available commands
````

### Testing Framework

{Testing approach}

```

## Process

1. **Analyze Codebase**: Review existing code structure
2. **Identify Patterns**: Detect architectural patterns in use
3. **Document Decisions**: Explain why choices were made
4. **Create Diagrams**: Visual representations of architecture
5. **Generate Document**: Complete ARCHITECTURE.md

## Key Sections to Cover

- Overall architecture style (monolith, microservices, etc.)
- Database design and relationships
- API design patterns
- Security layers
- Caching strategy
- Scalability considerations
- Development workflow

Begin by analyzing the project structure and generating comprehensive architecture documentation.
```
