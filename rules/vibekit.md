# VibeKit Default Guidelines

### Trigger Mechanism:

When the user's message starts with a `@` followed by a keyword (e.g., `@doc`, `@review`, `@test`), you must execute the following "Context Injection" workflow BEFORE processing the user's request.

### Workflow:

1.  **Identify Command:** Extract the keyword after the `@` (e.g., `@review` -> `review`).
2.  **Locate Context File:** Look for a corresponding Markdown file in the project's `.ai/` directory for `.ai/{keyword}.md`
3.  **Inject Context:**
    - **IF FOUND:** Read the entire content of that `.md` file. Adopt the persona, rules, style, and instructions defined in that file as your **PRIMARY SYSTEM PROMPT** for this turn. This overrides your default behavior.
4.  **Execute:** Process the user's prompt (the text following the command) strictly adhering to the injected context.

### Example:

- **User:** `@review check this login function`
- **Action:** You read `.ai/review.md`. If that file says "You are a Senior Security Engineer, focus on Auth vulnerabilities", you will analyze the login function specifically for security flaws, ignoring style or syntax unless specified.

## CONTEXT AWARENESS

- Always check `docs/TECH_STACK.md` first to know available libraries. **DO NOT** introduce new libraries without asking. Use what is defined in the stack.

## Reporting Completed Work

- **Be CONCISE**: Không cần lặp lại thông tin đã có trong .md files
- **Highlight Changes**: Chỉ report những gì đã thay đổi
- **Update Tracking**: Cập nhật TODO.md, không cần giải thích lại
- **Summary Format**:
