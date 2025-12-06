# Generate Security Documentation

You are tasked with creating SECURITY.md for the project.

## Purpose

Document security policies, vulnerability reporting process, and security best practices.

## Document Structure

```markdown
# Security Policy

## 🔐 Supported Versions

| Version       | Supported |
| ------------- | --------- |
| {version}     | ✅        |
| {old version} | ❌        |

## 🚨 Reporting a Vulnerability

**Please do NOT create public issues for security vulnerabilities.**

### How to Report

1. Email: {security@example.com}
2. Subject: "[SECURITY] {Brief description}"
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity

## 🏆 Bug Bounty Program

{If applicable}

## 🛡️ Security Measures

### Authentication

- {Auth mechanisms}

### Data Protection

- {Encryption, etc.}

### Input Validation

- {Sanitization approach}

## 📋 Security Checklist

For contributors:

- [ ] Input validation on all user inputs
- [ ] Parameterized queries for database
- [ ] CSRF protection on forms
- [ ] Proper authentication checks
- [ ] Secure session handling

## 📚 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- {Other resources}
```

## Process

1. **Analyze Project**: Check existing security measures
2. **Identify Risks**: Common vulnerabilities for this tech stack
3. **Document Process**: Clear reporting and response process
4. **Generate**: Create SECURITY.md

Begin by analyzing the project and generating security documentation.
