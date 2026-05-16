import { existsSync } from "node:fs";
import path from "node:path";
import { agentTargets, profiles, skills } from "./catalog.js";
import { detectProfile } from "./detector.js";
import { inspectRepository } from "./doctor.js";
import { renderAll } from "./renderers.js";
import { writeFiles } from "./writer.js";

export async function run(argv) {
  const command = argv[0] ?? "help";
  const args = parseArgs(argv.slice(1));

  if (command === "help" || args.help) return printHelp();
  if (command === "version" || args.version) return printVersion();
  if (command === "list") return printList(args);
  if (command === "doctor") return runDoctor(args);
  if (command === "init") return runInit(args);

  throw new Error(`unknown command "${command}". Run "agent-set help".`);
}

async function runInit(args) {
  const outputDir = path.resolve(args.output ?? process.cwd());
  const profileName = args.profile ?? detectProfile(outputDir);
  if (!profiles[profileName]) {
    throw new Error(`unknown profile "${profileName}". Run "agent-set list profiles".`);
  }

  const selectedSkills = normalizeSkills(args.skills ?? profiles[profileName].recommendedSkills.join(","));
  assertKnownSkills(selectedSkills);
  const projectName = args.name ?? path.basename(outputDir);
  const files = renderAll({ profileName, selectedSkills, projectName });
  const existing = Object.keys(files).filter((file) => existsSync(path.join(outputDir, file)));

  if (existing.length && !args.force && !args.dryRun) {
    throw new Error(`refusing to overwrite existing files: ${existing.join(", ")}. Use --force.`);
  }

  const written = await writeFiles(files, outputDir, {
    overwrite: Boolean(args.force),
    dryRun: Boolean(args.dryRun)
  });

  console.log(`${args.dryRun ? "Previewed" : "Generated"} ${written.length} files for ${profiles[profileName].label}.`);
  for (const item of written) console.log(`- ${item.path}`);
}

function runDoctor(args) {
  const cwd = path.resolve(args.path ?? process.cwd());
  const result = inspectRepository(cwd);

  if (args.json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log(`AI Agent Readiness Score: ${result.score}/100`);
  console.log(`Present: ${result.present.length ? result.present.join(", ") : "none"}`);
  console.log(`Missing: ${result.missing.length ? result.missing.join(", ") : "none"}`);

  if (!result.findings.length) {
    console.log("No major issues found.");
    return;
  }

  console.log("\nFindings:");
  for (const finding of result.findings) {
    console.log(`- [${finding.level}] ${finding.message}`);
  }
}

function printList(args) {
  const kind = args._[0] ?? "all";
  if (kind === "profiles" || kind === "all") {
    console.log("Profiles:");
    for (const [name, profile] of Object.entries(profiles)) {
      console.log(`- ${name}: ${profile.label} - ${profile.description}`);
    }
  }

  if (kind === "skills" || kind === "all") {
    if (kind === "all") console.log("");
    console.log("Skills:");
    for (const [name, skill] of Object.entries(skills)) {
      console.log(`- ${name}: ${skill.label} - ${skill.summary}`);
    }
  }

  if (kind === "targets") {
    console.log("Targets:");
    for (const [name, target] of Object.entries(agentTargets)) {
      console.log(`- ${name}: ${target.label} -> ${target.file}`);
    }
  }
}

function printHelp() {
  console.log(`AI Coding Agent Set

Usage:
  agent-set init [--profile react] [--skills code-review,test-writer] [--output .] [--force]
  agent-set doctor [--path .] [--json]
  agent-set list [profiles|skills|targets]
  agent-set version

Options:
  --profile <name>     Choose a profile. Defaults to auto-detection.
  --skills <list>      Comma-separated skill IDs.
  --output <dir>       Directory to generate files into.
  --name <name>        Project name used inside generated instructions.
  --force              Overwrite existing generated files.
  --dry-run            Print the files that would be created.
  --json               Output JSON for doctor.
  --help               Show help.
`);
}

function printVersion() {
  console.log("0.1.0");
}

function normalizeSkills(value) {
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((name, index, array) => array.indexOf(name) === index);
}

function assertKnownSkills(selectedSkills) {
  const unknown = selectedSkills.filter((name) => !skills[name]);
  if (unknown.length) {
    throw new Error(`unknown skill "${unknown.join(", ")}". Run "agent-set list skills".`);
  }
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      args._.push(token);
      continue;
    }

    const [rawKey, inlineValue] = token.slice(2).split("=");
    const key = rawKey.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    if (inlineValue !== undefined) {
      args[key] = inlineValue;
      continue;
    }

    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    index += 1;
  }
  return args;
}
