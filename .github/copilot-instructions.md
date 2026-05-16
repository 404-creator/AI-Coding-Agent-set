# GitHub Copilot Instructions

Repository: AI-Coding-Agent-set
Profile: Node.js Library or CLI

Follow these repository expectations:

- Keep public APIs stable and documented.
- Prefer small pure functions for parsing, rendering, and IO boundaries.
- Make CLI output scriptable, concise, and helpful.
- Avoid adding runtime dependencies unless the benefit is clear.

When suggesting code, include tests or verification notes for behavior changes.

Preferred checks:

- `npm test`
- `npm run lint`
- `npm run build`

Relevant skills:

- **CLI Designer** (`cli-designer`): Design helpful command-line interfaces and scriptable output.
- **Code Review** (`code-review`): Find bugs, regressions, missing tests, and maintainability risks.
- **Test Writer** (`test-writer`): Add focused tests that protect the changed behavior.
- **Repo Doctor** (`repo-doctor`): Audit repository health for open-source readiness.
