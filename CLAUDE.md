# CLAUDE.md

## Repository

AI-Coding-Agent-set uses the **Node.js Library or CLI** profile.

## Behavior

- Keep public APIs stable and documented.
- Prefer small pure functions for parsing, rendering, and IO boundaries.
- Make CLI output scriptable, concise, and helpful.
- Avoid adding runtime dependencies unless the benefit is clear.
- Prefer small, reviewable patches.
- Run the most relevant verification command when practical.
- If a command cannot run, explain the blocker and likely impact.

## Useful Commands

- `npm test`
- `npm run lint`
- `npm run build`

## Skills

- **CLI Designer** (`cli-designer`): Design helpful command-line interfaces and scriptable output.
- **Code Review** (`code-review`): Find bugs, regressions, missing tests, and maintainability risks.
- **Test Writer** (`test-writer`): Add focused tests that protect the changed behavior.
- **Repo Doctor** (`repo-doctor`): Audit repository health for open-source readiness.
