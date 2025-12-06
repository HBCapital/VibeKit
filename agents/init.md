---
description: Project Initialization Guide
---

# Project Initialization Guide

> Instructions for AI when initializing a new project using VibeCoding template

## Overview

This template provides a comprehensive structure for starting new software projects with proper documentation, development guidelines, and team collaboration standards.

## Initialization Process

When a user requests to create a new project using VibeCoding template, follow these steps:

### Step 0: Project Idea Analysis (FIRST STEP - CRITICAL)

**Before asking any other questions**, gather the core project idea:

**Question 0**: **What is your project idea?**

Ask the user to describe:

- **Project concept**: What are you building? What problem does it solve?
- **Key features**: What are the main features you envision?
- **Target users**: Who will use this?
- **Why this project**: What's the motivation behind building this?

**AI Response Required**:

After receiving the user's project idea, you MUST:

1. **Analyze** the project concept thoroughly
2. **Suggest additional features** that would complement the core idea:

   - Essential features they might have missed
   - Nice-to-have features for better UX
   - Technical features (authentication, API, admin panel, etc.)
   - Scalability features (caching, CDN, etc.)

3. **Present suggestions** to the user in an organized format:

   ```
   Based on your project idea, here are suggested features:

   **Core Features** (Essential):
   - [Feature 1]
   - [Feature 2]

   **Enhanced Features** (Recommended):
   - [Feature 3]
   - [Feature 4]

   **Technical Features**:
   - [Feature 5]
   - [Feature 6]

   Which of these would you like to include?
   ```

4. **Wait for confirmation** before proceeding to Step 1

**IMPORTANT**: Do NOT proceed to Step 1 (Basic Information) until the user has reviewed and confirmed the feature list.

---

### Step 1: Gather Project Information

**IMPORTANT INSTRUCTION FOR AI**:
When asking the following questions, **do not just list the options**. You MUST:

1. **Analyze** the user's project context (from Step 0).
2. **Provide a recommendation** for the best choice.
3. **Briefly explain pros/cons** of the options relative to their specific project.

_Example_:

> "For a Real-time Chat App (your project), I recommend **Node.js** over PHP because:
>
> - **Node.js**: Excellent for real-time (WebSockets), non-blocking I/O.
> - **PHP**: Traditional strength is request-response, requires extra setup for real-time."

After the user confirms the feature list, ask the following questions:

#### Basic Information

1. **Project Name**: What is the name of your project?
2. **Project Description**: Describe your project in 1-2 sentences
3. **Tagline**: A catchy one-liner that summarizes the project's value proposition

#### Project Type

4. **What type of project are you building?**
   - Web Application (Full-stack)
   - API/Backend Service
   - CMS/Content Platform
   - Mobile Backend
   - E-commerce Platform
   - SaaS Application
   - Internal Tool/Dashboard
   - Library/Framework
   - Other (specify)

#### Technology Stack

5. **Backend Language/Framework**: (Choose or specify)

   - Python (FastAPI, Django, Flask)
   - Node.js (Express, NestJS, Fastify)
   - PHP (Laravel, Symfony, Custom)
   - Java (Spring Boot)
   - Go
   - Ruby (Rails)
   - Other

6. **Frontend Framework**: (if applicable)

   - Vue.js (Vue 3, Nuxt)
   - React (Next.js, Create React App)
   - Angular
   - Svelte (SvelteKit)
   - Plain HTML/CSS/JS
   - None (API only)
   - Other

7. **Database**:

   - PostgreSQL
   - MySQL/MariaDB
   - MongoDB
   - SQLite
   - Redis
   - Multiple databases
   - Other

8. **Additional Technologies**: (optional)
   - Caching (Redis, Memcached)
   - Message Queue (RabbitMQ, Kafka)
   - Search Engine (Elasticsearch, Algolia)
   - File Storage (S3, Local, CDN)
   - Other services

#### Project Scope

9. **Target Audience**: Who is this project for?

   - Developers/Technical users
   - End users/Consumers
   - Businesses (B2B)
   - Internal team
   - Multiple segments (specify)

10. **Market Focus**: (if applicable)
    - Global
    - Specific region/country
    - Industry-specific
    - Niche market

#### Architecture & Design

11. **Architecture Style**:

    - Monolithic
    - Microservices
    - Modular Monolith
    - Serverless
    - Hybrid

12. **API Design**: (if applicable)
    - RESTful API
    - GraphQL
    - gRPC
    - Webhook-based
    - Multiple APIs

#### Business Context

13. **Is this a commercial project?** (Yes/No)

    - If Yes: What's the business model?
      - SaaS (Subscription)
      - Freemium
      - Enterprise/B2B
      - Marketplace/Commission
      - Open-core
      - Traditional license

14. **Project Goals**: What are the main objectives?

    - List 3-5 key goals

15. **Core Features**: What are the essential features for MVP?
    - List main features

#### Development Context

16. **Team Size**:

    - Solo developer
    - Small team (2-5)
    - Medium team (6-15)
    - Large team (16+)

17. **Development Timeline**:

    - MVP timeline estimate
    - Key milestones

18. **Special Requirements**: Any specific requirements?

    - Performance targets
    - Security requirements
    - Compliance needs (GDPR, HIPAA, etc.)
    - Scalability requirements
    - Other constraints

19. **License**: What license do you want to use for this project?

    - MIT License (permissive, simple)
    - Apache 2.0 (permissive, includes patent grant)
    - GPL v3 (copyleft, requires derivatives to be open-source)
    - BSD 3-Clause (permissive, similar to MIT)
    - Proprietary/Commercial (closed-source)
    - Other (specify)

20. **Project Openness**: Is this an open-source project?

    - Yes - Open to public contributions
    - No - Closed-source/proprietary
    - Partially - Open-core (core is open, extensions are commercial)

21. **Security Configuration**: (if applicable)

    - Will you have a public security vulnerability reporting process?
    - Do you plan to run a bug bounty program?
    - Security contact email
    - Expected security response time (24h, 48h, etc.)

22. **Deployment Strategy**: Where will this project be deployed?

    - Cloud Platform (AWS, Google Cloud, Azure, DigitalOcean)
    - Containerization (Docker, Kubernetes, Docker Compose)
    - Traditional Hosting (VPS, Shared hosting)
    - Serverless (AWS Lambda, Vercel, Netlify)
    - On-premise
    - Not decided yet

23. **CI/CD Requirements**: Do you need automated pipelines?

    - Automated testing pipeline? (Yes/No)
    - Automated deployment? (Yes/No)
    - CI/CD Platform preference:
      - GitHub Actions
      - GitLab CI
      - Jenkins
      - CircleCI
      - Travis CI
      - Other / Not decided

24. **Testing Strategy**: What testing approach do you prefer?

    - Unit testing required? (Yes/No/Maybe)
    - Integration testing required? (Yes/No/Maybe)
    - E2E testing required? (Yes/No/Maybe)
    - Test coverage target: (e.g., 80%, No specific target)
    - Testing frameworks preference: (Auto-select based on tech stack / Let AI suggest)

25. **Monitoring & Observability**: Do you need monitoring tools?

    - Application Performance Monitoring?
      - Yes (Sentry, New Relic, Datadog, AppSignal)
      - No
      - Not sure
    - Logging Strategy?
      - Centralized logging (ELK, Loki, CloudWatch)
      - Simple file-based logging
      - No specific requirements
    - Analytics?
      - Google Analytics
      - Mixpanel
      - Plausible
      - Custom analytics
      - None

26. **Git Repository**: Do you want to initialize a Git repository?

    - Yes, initialize Git and create initial commit
    - Yes, and connect to remote repository
      - Repository URL (SSH recommended): `git@github.com:username/repo.git`
      - Alternative HTTPS: `https://github.com/username/repo.git`
    - No, I'll handle Git manually later

    **Note**: SSH is recommended over HTTPS for better security and convenience.

---

## Step 2: Generate Project Files

Once you have gathered the necessary information, proceed to:

### 2.1 Create Project Context File

Create `.ai/PROJECT_CONTEXT.md` with the gathered information for future AI reference:

```markdown
# Project Context

**Project Name**: [name]
**Type**: [type]
**Tech Stack**: [stack summary]
**Target Audience**: [audience]

## Key Decisions

- Architecture: [choice and rationale]
- Database: [choice and rationale]
- API Design: [choice and rationale]

## Goals

1. [goal 1]
2. [goal 2]
   ...

## MVP Features

- [feature 1]
- [feature 2]
  ...
```

### 2.2 Generate Documentation (On-Demand)

**IMPORTANT**: Do NOT auto-generate documentation files. Instead, inform the user about available slash commands to create documentation when needed:

**Available Doc Commands:**

- `/doc-readme` - Generate README.md
- `/doc-todo` - Generate TODO.md task tracking
- `/doc-architecture` - Generate ARCHITECTURE.md
- `/doc-techstack` - Generate TECH_STACK.md
- `/doc-install` - Generate INSTALLATION.md
- `/doc-roadmap` - Generate ROADMAP.md
- `/doc-contributing` - Generate CONTRIBUTING.md
- `/doc-security` - Generate SECURITY.md
- `/doc-business` - Generate BUSINESS.md
- `/doc-risks` - Generate RISKS.md
- `/doc-migration` - Generate MIGRATION.md

**Suggest to user**: "You can create any documentation file later using `/doc-xxx` commands. Which docs would you like to create now?"

### 2.3 Generate LICENSE File

Based on the user's license choice, create the appropriate `LICENSE` file:

- **MIT License**: Use standard MIT license text with current year and project name
- **Apache 2.0**: Use Apache 2.0 license text
- **GPL v3**: Use GPL v3 license text
- **BSD 3-Clause**: Use BSD 3-Clause license text
- **Proprietary**: Create custom license or "All Rights Reserved" notice
- **Other**: Use user-specified license text

### 2.4 Update .gitignore

Add `.ai/` to `.gitignore` to prevent committing AI context files:

```gitignore
# AI Context
.ai/
```

### 2.5 Create Directory Structure

Based on the chosen tech stack, create appropriate directory structure:

**For Backend Projects:**

```
src/
├── api/
├── models/
├── services/
├── utils/
└── config/
tests/
docs/
```

**For Full-stack Projects:**

```
backend/
├── src/
└── tests/
frontend/
├── src/
├── public/
└── tests/
docs/
```

Adjust according to framework conventions.

### 2.6 Generate Optional Documentation Files (If User Requests)

Based on user's preference, use the corresponding slash command:

- **CONTRIBUTING.md** - Use `/doc-contributing` (if open-source)
- **SECURITY.md** - Use `/doc-security` (if public security process needed)

---

### 2.7 Initialize Git Repository

**If user chose** to initialize Git (Question 26):

1. **Initialize Git repository**:

   ```bash
   git init
   git add .
   git commit -m "Initial commit from VibeCoding template"
   ```

2. **If remote repository specified**:

   - Verify SSH/HTTPS URL format
   - **Recommend SSH** if user provided HTTPS:

     ```
     ⚠️ Note: SSH is recommended for better security and convenience:
     - HTTPS: https://github.com/username/repo.git
     - SSH: git@github.com:username/repo.git

     Would you like to use SSH instead?
     ```

3. **Add remote and push**:

   ```bash
   git remote add origin [repository-url]
   git branch -M main
   git push -u origin main
   ```

4. **Create .gitignore** if not exists:
   - Ensure `.ai/` is in .gitignore
   - Add language/framework-specific ignores

---

## Step 3: Customize Documentation

### Required Documentation Files

Based on project type, ensure these files are populated:

- ✅ `README.md` - Project overview (from template)
- ✅ `docs/ARCHITECTURE.md` - Architecture details
- ✅ `docs/TECH_STACK.md` - Technology choices and rationale
- ✅ `docs/INSTALLATION.md` - Setup instructions
- ✅ `docs/GUIDELINE.md` - Development guidelines (keep as-is)
- ✅ `LICENSE` - License file (generated based on user choice)

### Conditional Documentation Files

Generate based on user responses:

- `docs/CONTRIBUTING.md` - Contribution guide (if open-source project)
- `docs/SECURITY.md` - Security practices and reporting (if public security process)

### Optional Documentation Files

Include if relevant to the project:

- `docs/ROADMAP.md` - Development roadmap (from template)
- `docs/BUSINESS.md` - Business model (if commercial)
- `docs/RISKS.md` - Risk analysis
- `docs/MIGRATION.md` - Migration guide (if replacing existing solution)

---

## Step 4: Finalize

1. **Review generated files** for consistency
2. **Update cross-references** between documents
3. **Verify Git setup** (if initialized):
   - Confirm remote repository connection
   - Ensure SSH keys are configured (if using SSH)
   - Verify initial commit was successful
4. **Confirm with user** that all information is correct
5. **Provide next steps**:
   - Set up development environment (see `docs/INSTALLATION.md`)
   - Install dependencies
   - Configure CI/CD pipeline (if requested)
   - Set up deployment infrastructure (if specified)
   - Start development following `docs/GUIDELINE.md`

---

## Placeholder Reference

Common placeholders used in templates:

| Placeholder               | Description          | Example                               |
| ------------------------- | -------------------- | ------------------------------------- |
| `{{PROJECT_NAME}}`        | Project name         | "FlowOne CMS"                         |
| `{{PROJECT_DESCRIPTION}}` | Short description    | "Modern, lightweight CMS"             |
| `{{TAGLINE}}`             | One-liner value prop | "One platform for all business flows" |
| `{{BACKEND_FRAMEWORK}}`   | Backend tech         | "FastAPI", "Laravel", "Express"       |
| `{{FRONTEND_FRAMEWORK}}`  | Frontend tech        | "Vue 3", "React", "Angular"           |
| `{{DATABASE}}`            | Database choice      | "PostgreSQL", "MongoDB"               |
| `{{ARCHITECTURE_TYPE}}`   | Architecture style   | "Microservices", "Monolithic"         |
| `{{TARGET_AUDIENCE}}`     | Primary users        | "Developers", "SMEs", "Enterprises"   |
| `{{MARKET_FOCUS}}`        | Geographic/industry  | "Vietnam", "Global", "FinTech"        |
| `{{BUSINESS_MODEL}}`      | Revenue model        | "SaaS", "Open-core", "Freemium"       |
| `{{MVP_FEATURES}}`        | Core features list   | Bullet points of features             |
| `{{TECH_STACK_SUMMARY}}`  | Brief tech overview  | "Python + Vue + PostgreSQL"           |
| `{{LICENSE_TYPE}}`        | License choice       | "MIT License", "Apache 2.0", "GPL v3" |

---

## Notes for AI

- **Be thorough**: Ask all necessary questions before generating files
- **Be adaptive**: Adjust questions based on project type
- **Be helpful**: Suggest best practices for chosen tech stack
- **Be clear**: Explain why certain information is needed
- **Don't assume**: If unclear, ask for clarification
- **Batch questions**: Group related questions together to minimize back-and-forth
