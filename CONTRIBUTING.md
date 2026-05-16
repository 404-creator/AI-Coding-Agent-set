# Contributing

Thanks for helping improve AI Coding Agent Set.

## Good Contributions

Useful changes usually fall into one of these categories:

- A new project profile with realistic conventions and verification commands.
- A focused skill card for a repeatable coding workflow.
- Better repository detection.
- Better CLI ergonomics.
- Tests for generated output and edge cases.

## Development

```bash
npm test
node ./bin/agent-set.js list profiles
node ./bin/agent-set.js init --profile react --dry-run
```

## Profile Guidelines

Profiles should be practical, not inspirational. Include:

- A clear label.
- A short description.
- Stack tags.
- Verification commands.
- Four to six concrete conventions.
- Three recommended skills.

## Skill Guidelines

Skills should be compact behavior cards. Include:

- A short summary.
- Three to five checklist items.
- Rules that are observable in the agent's output.

Avoid vague advice such as "write clean code" unless it is paired with concrete behavior.
