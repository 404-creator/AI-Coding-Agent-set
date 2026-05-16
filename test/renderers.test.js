import assert from "node:assert/strict";
import { test } from "node:test";
import { renderAll } from "../src/renderers.js";

test("renderAll creates every target instruction file", () => {
  const files = renderAll({
    profileName: "react",
    selectedSkills: ["frontend-polish", "code-review"],
    projectName: "demo"
  });

  assert.ok(files["AGENTS.md"].includes("React Frontend"));
  assert.ok(files["CLAUDE.md"].includes("demo"));
  assert.ok(files[".cursorrules"].includes("frontend-polish"));
  assert.ok(files[".github/copilot-instructions.md"].includes("GitHub Copilot"));
  assert.ok(files[".agentset/skills/frontend-polish.md"].includes("Frontend Polish"));
});

test("manifest includes selected profile and skills", () => {
  const files = renderAll({
    profileName: "fastapi",
    selectedSkills: ["api-review"],
    projectName: "api"
  });

  const manifest = JSON.parse(files[".agentset/manifest.json"]);
  assert.equal(manifest.profile, "fastapi");
  assert.deepEqual(manifest.skills, ["api-review"]);
});

test("renderAll creates each selected known skill card", () => {
  const files = renderAll({
    profileName: "node",
    selectedSkills: ["cli-designer", "repo-doctor", "test-writer"],
    projectName: "tool"
  });

  assert.ok(files[".agentset/skills/cli-designer.md"]);
  assert.ok(files[".agentset/skills/repo-doctor.md"]);
  assert.ok(files[".agentset/skills/test-writer.md"]);
});
