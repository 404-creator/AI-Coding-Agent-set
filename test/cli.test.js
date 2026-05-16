import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../bin/agent-set.js", import.meta.url));

test("CLI prints a version", () => {
  const result = spawnSync(process.execPath, [cli, "version"], { encoding: "utf8" });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /^0\.1\.0/);
});

test("CLI rejects unknown skills", () => {
  const result = spawnSync(process.execPath, [cli, "init", "--skills", "missing-skill", "--dry-run"], {
    encoding: "utf8"
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /unknown skill/);
});
