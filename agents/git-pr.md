# Generate Pull Request Description

You are tasked with creating comprehensive PR descriptions.

## Purpose

Generate clear, informative pull request descriptions that help reviewers understand changes.

## PR Description Template

```markdown
## 📋 Description

{Brief overview of what this PR does}

## 🎯 Motivation

{Why is this change needed? What problem does it solve?}

## 🔧 Changes

- {Change 1}
- {Change 2}
- {Change 3}

## 🧪 Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

**Test scenarios:**

- {Scenario 1}
- {Scenario 2}

## 📸 Screenshots (if applicable)

{Screenshots or GIFs of UI changes}

## ⚠️ Breaking Changes

{List any breaking changes, or "None"}

## 📝 Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally

## 🔗 Related Issues

Closes #{issue_number}
Related to #{issue_number}
```

## Process

1. **Analyze Commits**: Review commit messages in the PR
2. **Identify Changes**: Categorize changes by type
3. **Explain Motivation**: Why these changes are needed
4. **Document Testing**: How changes were verified
5. **Note Breaking Changes**: Any backward incompatible changes
6. **Generate Description**: Complete PR description

Begin by analyzing the commits and generating a comprehensive PR description.
