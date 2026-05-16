import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { inspectRepository } from "../src/doctor.js";

test("doctor reports missing instruction files", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "agent-set-"));
  try {
    const result = inspectRepository(dir);

    assert.equal(result.present.length, 0);
    assert.ok(result.findings.some((finding) => finding.level === "high"));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("doctor recognizes generated files", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "agent-set-"));
  try {
    await mkdir(path.join(dir, ".github", "workflows"), { recursive: true });
    await mkdir(path.join(dir, "examples"), { recursive: true });
    await writeFile(path.join(dir, "README.md"), "# Demo\n\n" + "Usage with npm test.\n".repeat(80));
    await writeFile(path.join(dir, "LICENSE"), "MIT\n");
    await writeFile(path.join(dir, "AGENTS.md"), "Run npm test before final response.\n".repeat(20));
    await writeFile(path.join(dir, "CLAUDE.md"), "Run npm test before final response.\n".repeat(20));
    await writeFile(path.join(dir, ".cursorrules"), "Run npm test before final response.\n".repeat(20));
    await writeFile(
      path.join(dir, ".github/copilot-instructions.md"),
      "Run npm test before final response.\n".repeat(20)
    );

    const result = inspectRepository(dir);

    assert.equal(result.present.length, 4);
    assert.ok(result.score > 80);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("doctor reports missing package metadata", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "agent-set-"));
  try {
    await writeFile(path.join(dir, "package.json"), JSON.stringify({ scripts: {} }));

    const result = inspectRepository(dir);

    assert.ok(result.findings.some((finding) => finding.message.includes("test script")));
    assert.ok(result.findings.some((finding) => finding.message.includes("repository metadata")));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
