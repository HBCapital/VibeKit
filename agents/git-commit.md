# Generate Git Commit Message

You are tasked with creating well-formatted, conventional commit messages.

## Purpose

Generate clear, descriptive commit messages following best practices and conventional commits format.

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes (dependencies, configs)
- `revert`: Revert previous commit

## Guidelines

### Subject Line

- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at the end
- Max 50 characters
- Be specific and descriptive

### Body (Optional)

- Explain what and why, not how
- Wrap at 72 characters
- Separate from subject with blank line

### Footer (Optional)

- Reference issues: `Closes #123`
- Breaking changes: `BREAKING CHANGE: description`

## Examples

```
feat(auth): add JWT token refresh mechanism

Implement automatic token refresh to improve user experience.
Tokens now refresh 5 minutes before expiration.

Closes #456
```

```
fix(api): resolve race condition in user creation

Previously, concurrent user creation requests could create
duplicate users. Added database-level unique constraint and
proper error handling.
```

## Process

1. **Analyze Changes**: Review staged files and changes
2. **Identify Type**: Determine commit type
3. **Write Subject**: Clear, concise description
4. **Add Body**: If changes need explanation
5. **Add Footer**: If closing issues or breaking changes

Begin by analyzing the staged changes and generating an appropriate commit message.
