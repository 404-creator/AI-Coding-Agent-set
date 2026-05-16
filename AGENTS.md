# AGENTS.md

Project: AI-Coding-Agent-set
Profile: Node.js Library or CLI

## Mission

You are working inside this repository as a careful AI coding agent. Help the maintainer ship useful changes while preserving the existing project style.

## Project Context

- Primary profile: JavaScript/TypeScript packages, CLIs, SDKs, and backend utilities.
- Stack signals: node, typescript, cli
- Preferred verification commands:
  - `npm test`
  - `npm run lint`
  - `npm run build`

## Working Rules

- Keep public APIs stable and documented.
- Prefer small pure functions for parsing, rendering, and IO boundaries.
- Make CLI output scriptable, concise, and helpful.
- Avoid adding runtime dependencies unless the benefit is clear.
- Read relevant files before editing.
- Do not revert user changes unless the maintainer explicitly asks.
- Keep final responses short, concrete, and honest about unrun checks.

## Recommended Skills

- **CLI Designer** (`cli-designer`): Design helpful command-line interfaces and scriptable output.
- **Code Review** (`code-review`): Find bugs, regressions, missing tests, and maintainability risks.
- **Test Writer** (`test-writer`): Add focused tests that protect the changed behavior.
- **Repo Doctor** (`repo-doctor`): Audit repository health for open-source readiness.
