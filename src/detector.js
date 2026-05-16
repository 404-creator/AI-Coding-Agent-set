import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const fileSignals = [
  ["nextjs", ["next.config.js", "next.config.mjs", "next.config.ts"]],
  ["react", ["vite.config.js", "vite.config.ts", "src/App.jsx", "src/App.tsx"]],
  ["python", ["pyproject.toml", "requirements.txt", "setup.py"]],
  ["fastapi", ["main.py", "app/main.py"]],
  ["latex", ["main.tex", "thesis.tex"]],
  ["data-science", ["notebooks", "notebook", "data"]]
];

export function detectProfile(cwd) {
  const packageJson = readJson(path.join(cwd, "package.json"));
  if (packageJson) {
    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    };
    if (deps.next) return "nextjs";
    if (deps.react || deps.vite) return "react";
    return "node";
  }

  const pyproject = readText(path.join(cwd, "pyproject.toml"));
  const requirements = readText(path.join(cwd, "requirements.txt"));
  const pythonHints = `${pyproject}\n${requirements}`.toLowerCase();
  if (pythonHints.includes("fastapi")) return "fastapi";
  if (pythonHints.includes("pandas") || pythonHints.includes("torch") || pythonHints.includes("scikit-learn")) {
    return "data-science";
  }

  for (const [profile, files] of fileSignals) {
    if (files.some((file) => existsSync(path.join(cwd, file)))) return profile;
  }

  if (hasTexFile(cwd)) return "latex";
  return "generic";
}

function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function readText(file) {
  try {
    return readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

function hasTexFile(cwd) {
  try {
    return readdirSync(cwd).some((entry) => entry.endsWith(".tex"));
  } catch {
    return false;
  }
}
