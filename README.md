# AI Coding Agent Set

> Generate practical instructions, skill cards, and guardrails for Codex, Claude Code, Cursor, and GitHub Copilot.

AI Coding Agent Set is a small zero-dependency CLI that turns a repository into a clearer workspace for AI coding agents. It detects the project type, generates agent instruction files, adds reusable skill cards, and checks whether a repository is ready for AI-assisted development.

中文简介：这是一个面向 AI 编程助手的配置生成器。它可以一键生成 `AGENTS.md`、`CLAUDE.md`、`.cursorrules`、GitHub Copilot instructions 和一组可复用 skills，让 Codex、Claude Code、Cursor、Copilot 更懂你的项目规则、验证命令和协作方式。

## Why This Exists

Most teams already use AI coding agents, but their repositories rarely tell the agent what "good work" means:

- Which commands should be run before a final answer?
- Which project conventions matter?
- How should code review findings be reported?
- What should the agent do differently for React, FastAPI, LaTeX, ML, or research code?

This project makes those rules explicit and portable.

## Features

- Multi-agent output: Codex, Claude Code, Cursor, and GitHub Copilot.
- Project detection: React, Next.js, Node.js, Python, FastAPI, data science, LaTeX, and research repos.
- Skill library: code review, test writing, frontend polish, paper reading, repo health, API review, and more.
- Repo doctor: score your repository's AI-agent readiness.
- Zero runtime dependencies: pure Node.js, easy to audit and fork.
- Automation-friendly: no required interactive prompt.
- Safe defaults: refuses to overwrite generated files unless `--force` is used.

## Quick Start

```bash
npx ai-coding-agent-set init
```

Generate for a specific stack:

```bash
npx ai-coding-agent-set init --profile react
```

Pick skills manually:

```bash
npx ai-coding-agent-set init --profile fastapi --skills code-review,test-writer,api-review
```

Preview without writing files:

```bash
npx ai-coding-agent-set init --profile research --dry-run
```

Check an existing repository:

```bash
npx ai-coding-agent-set doctor
```

Use the local CLI during development:

```bash
node ./bin/agent-set.js init --profile node --dry-run
node ./bin/agent-set.js doctor --json
```

## Generated Files

| File | Target |
| --- | --- |
| `AGENTS.md` | Codex / OpenAI Codex |
| `CLAUDE.md` | Claude Code |
| `.cursorrules` | Cursor |
| `.github/copilot-instructions.md` | GitHub Copilot |
| `.agentset/skills/*.md` | Portable skill cards |
| `.agentset/manifest.json` | Generated metadata |

## Profiles

| Profile | Use case |
| --- | --- |
| `generic` | Mixed or unknown repositories |
| `react` | React, Vite, frontend apps |
| `nextjs` | Next.js full-stack apps |
| `node` | Node.js CLIs, libraries, SDKs |
| `python` | Python scripts and packages |
| `fastapi` | FastAPI services |
| `data-science` | ML, notebooks, experiments |
| `latex` | Papers, theses, reports |
| `research` | Paper reproduction and academic code |

List all profiles:

```bash
npx ai-coding-agent-set list profiles
```

## Skills

Skills are small behavior cards that tell the agent how to work in a specific mode.

Current skills:

- `code-review`
- `test-writer`
- `frontend-polish`
- `cli-designer`
- `repo-doctor`
- `data-analysis`
- `paper-reader`
- `api-review`
- `writing-review`

List all skills:

```bash
npx ai-coding-agent-set list skills
```

## Example

```bash
agent-set init --profile react --skills frontend-polish,code-review,test-writer
```

This creates:

```text
AGENTS.md
CLAUDE.md
.cursorrules
.github/copilot-instructions.md
.agentset/manifest.json
.agentset/skills/frontend-polish.md
.agentset/skills/code-review.md
.agentset/skills/test-writer.md
```

## Doctor

The doctor command checks whether a repository gives AI agents enough guidance.

```bash
agent-set doctor --json
```

It checks for:

- Agent instruction files.
- Verification commands.
- README.
- License.
- Short or generic instruction files.
- CI workflow.
- npm test script, when `package.json` is present.
- Example files or directories.
- Package metadata that helps open-source users find the project.

Example JSON output:

```json
{
  "score": 92,
  "present": ["AGENTS.md", "CLAUDE.md"],
  "missing": [".cursorrules", ".github/copilot-instructions.md"],
  "findings": []
}
```

## Local Development

```bash
git clone https://github.com/404-creator/AI-Coding-Agent-set.git
cd AI-Coding-Agent-set
npm test
node ./bin/agent-set.js init --profile node --dry-run
```

Useful checks before publishing:

```bash
npm test
npm pack --dry-run
node ./bin/agent-set.js doctor --path .
```

## Roadmap

- More framework profiles: Vue, Svelte, Django, Rust, Go, Java, Flutter.
- Web UI for generating instructions without installing the CLI.
- Community skill registry.
- GitHub Action mode for automatic repo doctor reports.
- Better project detection from lockfiles and framework config files.
- Bilingual output templates.
- Template customization through a local config file.

## Contributing

High-quality profiles and skills are welcome. A good contribution should be:

- Specific to a real workflow.
- Short enough that agents will actually follow it.
- Explicit about verification commands and safety rules.
- Tested with `npm test` when it changes code.

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
