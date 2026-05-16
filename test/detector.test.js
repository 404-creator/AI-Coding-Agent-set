import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { detectProfile } from "../src/detector.js";

test("detects React from package dependencies", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "agent-set-"));
  try {
    await writeFile(
      path.join(dir, "package.json"),
      JSON.stringify({ dependencies: { react: "^19.0.0" } })
    );

    assert.equal(detectProfile(dir), "react");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("detects FastAPI from requirements", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "agent-set-"));
  try {
    await writeFile(path.join(dir, "requirements.txt"), "fastapi\nuvicorn\n");

    assert.equal(detectProfile(dir), "fastapi");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
