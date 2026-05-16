import { agentTargets, profiles, skills } from "./catalog.js";

export function renderAll({ profileName, selectedSkills, projectName }) {
  const profile = profiles[profileName] ?? profiles.generic;
  const skillObjects = selectedSkills.map((name) => [name, skills[name]]).filter(([, skill]) => skill);

  return {
    [agentTargets.codex.file]: renderCodex({ profile, skillObjects, projectName }),
    [agentTargets.claude.file]: renderClaude({ profile, skillObjects, projectName }),
    [agentTargets.cursor.file]: renderCursor({ profile, skillObjects, projectName }),
    [agentTargets.copilot.file]: renderCopilot({ profile, skillObjects, projectName }),
    ".agentset/manifest.json": renderManifest({ profileName, selectedSkills, projectName }),
    ...Object.fromEntries(
      skillObjects.map(([name, skill]) => [`.agentset/skills/${name}.md`, renderSkill(name, skill)])
    )
  };
}

export function renderCodex({ profile, skillObjects, projectName }) {
  return `# AGENTS.md

Project: ${projectName}
Profile: ${profile.label}

## Mission

You are working inside this repository as a careful AI coding agent. Help the maintainer ship useful changes while preserving the existing project style.

## Project Context

- Primary profile: ${profile.description}
- Stack signals: ${profile.stacks.join(", ")}
- Preferred verification commands:
${profile.testCommands.map((command) => `  - \`${command}\``).join("\n")}

## Working Rules

${profile.conventions.map((rule) => `- ${rule}`).join("\n")}
- Read relevant files before editing.
- Do not revert user changes unless the maintainer explicitly asks.
- Keep final responses short, concrete, and honest about unrun checks.

## Recommended Skills

${renderSkillList(skillObjects)}
`;
}

export function renderClaude({ profile, skillObjects, projectName }) {
  return `# CLAUDE.md

## Repository

${projectName} uses the **${profile.label}** profile.

## Behavior

${profile.conventions.map((rule) => `- ${rule}`).join("\n")}
- Prefer small, reviewable patches.
- Run the most relevant verification command when practical.
- If a command cannot run, explain the blocker and likely impact.

## Useful Commands

${profile.testCommands.map((command) => `- \`${command}\``).join("\n")}

## Skills

${renderSkillList(skillObjects)}
`;
}

export function renderCursor({ profile, skillObjects }) {
  return `You are an AI coding assistant for a ${profile.label} repository.

Rules:
${profile.conventions.map((rule) => `- ${rule}`).join("\n")}
- Make minimal, coherent edits.
- Preserve existing formatting and naming patterns.
- Prefer clear tests over broad refactors.

Verification commands to consider:
${profile.testCommands.map((command) => `- ${command}`).join("\n")}

Skills:
${skillObjects.map(([name, skill]) => `- ${name}: ${skill.summary}`).join("\n")}
`;
}

export function renderCopilot({ profile, skillObjects, projectName }) {
  return `# GitHub Copilot Instructions

Repository: ${projectName}
Profile: ${profile.label}

Follow these repository expectations:

${profile.conventions.map((rule) => `- ${rule}`).join("\n")}

When suggesting code, include tests or verification notes for behavior changes.

Preferred checks:

${profile.testCommands.map((command) => `- \`${command}\``).join("\n")}

Relevant skills:

${renderSkillList(skillObjects)}
`;
}

export function renderSkill(name, skill) {
  return `# ${skill.label}

ID: ${name}

${skill.summary}

## Checklist

${skill.body.map((item) => `- ${item}`).join("\n")}
`;
}

function renderSkillList(skillObjects) {
  if (!skillObjects.length) return "- No skills selected.";
  return skillObjects.map(([name, skill]) => `- **${skill.label}** (\`${name}\`): ${skill.summary}`).join("\n");
}

function renderManifest({ profileName, selectedSkills, projectName }) {
  return `${JSON.stringify(
    {
      project: projectName,
      profile: profileName,
      skills: selectedSkills,
      generatedBy: "ai-coding-agent-set",
      schemaVersion: 1
    },
    null,
    2
  )}\n`;
}
