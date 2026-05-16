import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { agentTargets } from "./catalog.js";

const expectedFiles = Object.values(agentTargets).map((target) => target.file);

export function inspectRepository(cwd) {
  const findings = [];
  const present = expectedFiles.filter((file) => existsSync(path.join(cwd, file)));
  const missing = expectedFiles.filter((file) => !existsSync(path.join(cwd, file)));

  if (!present.length) {
    findings.push({
      level: "high",
      message: "No AI coding agent instruction files were found."
    });
  }

  for (const file of present) {
    const content = readFileSync(path.join(cwd, file), "utf8");
    if (content.length < 300) {
      findings.push({
        level: "medium",
        message: `${file} is very short; add project-specific rules and verification commands.`
      });
    }
    if (!/test|lint|build|pytest|cargo|go test/i.test(content)) {
      findings.push({
        level: "medium",
        message: `${file} does not mention verification commands.`
      });
    }
  }

  if (!existsSync(path.join(cwd, "README.md"))) {
    findings.push({
      level: "medium",
      message: "README.md is missing; open-source visitors need a quick start."
    });
  } else if (readFileSync(path.join(cwd, "README.md"), "utf8").length < 800) {
    findings.push({
      level: "low",
      message: "README.md is short; include install, usage, examples, and development notes."
    });
  }

  if (!existsSync(path.join(cwd, "LICENSE"))) {
    findings.push({
      level: "low",
      message: "LICENSE is missing; add one before promoting the repository."
    });
  }

  if (!existsSync(path.join(cwd, ".github", "workflows"))) {
    findings.push({
      level: "low",
      message: "No GitHub Actions workflow directory found; add CI before relying on external contributions."
    });
  }

  if (!hasExamples(cwd)) {
    findings.push({
      level: "low",
      message: "No examples directory or example files found; add a minimal usage example."
    });
  }

  const packageJson = readJson(path.join(cwd, "package.json"));
  if (packageJson) {
    if (!packageJson.scripts?.test) {
      findings.push({
        level: "medium",
        message: "package.json does not define a test script."
      });
    }
    if (!packageJson.repository) {
      findings.push({
        level: "low",
        message: "package.json is missing repository metadata."
      });
    }
    if (!packageJson.bugs || !packageJson.homepage) {
      findings.push({
        level: "low",
        message: "package.json is missing bugs or homepage metadata."
      });
    }
  }

  return {
    score: score(findings, present.length),
    present,
    missing,
    findings
  };
}

function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function hasExamples(cwd) {
  if (existsSync(path.join(cwd, "examples"))) return true;
  try {
    return readdirSync(cwd).some((entry) => /^example/i.test(entry));
  } catch {
    return false;
  }
}

function score(findings, presentCount) {
  const penalty = findings.reduce((total, finding) => {
    if (finding.level === "high") return total + 35;
    if (finding.level === "medium") return total + 15;
    return total + 5;
  }, 0);
  return Math.max(0, Math.min(100, 50 + presentCount * 12 - penalty));
}
