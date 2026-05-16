export const profiles = {
  generic: {
    label: "Generic Project",
    description: "A safe default for mixed or unknown repositories.",
    stacks: ["general"],
    testCommands: ["npm test", "pytest", "go test ./...", "cargo test"],
    conventions: [
      "Read the nearest README and existing files before editing.",
      "Keep changes scoped to the user request.",
      "Prefer existing project patterns over new abstractions.",
      "Document any command that cannot be run locally."
    ],
    recommendedSkills: ["code-review", "test-writer", "repo-doctor"]
  },
  react: {
    label: "React Frontend",
    description: "React, Vite, SPA, component libraries, and browser UI projects.",
    stacks: ["react", "vite", "typescript", "frontend"],
    testCommands: ["npm run lint", "npm test", "npm run build"],
    conventions: [
      "Preserve the existing component structure and design tokens.",
      "Prefer accessible semantic HTML and keyboard-friendly controls.",
      "Avoid layout shifts by giving repeated UI elements stable dimensions.",
      "Verify responsive states for mobile and desktop viewports."
    ],
    recommendedSkills: ["frontend-polish", "code-review", "test-writer"]
  },
  nextjs: {
    label: "Next.js App",
    description: "Next.js App Router, server components, API routes, and full-stack apps.",
    stacks: ["nextjs", "react", "typescript", "full-stack"],
    testCommands: ["npm run lint", "npm test", "npm run build"],
    conventions: [
      "Keep server-only logic out of client components.",
      "Use framework routing, metadata, and data-fetching primitives.",
      "Treat environment variables as secrets unless documented otherwise.",
      "Check loading, error, empty, and mobile states for user-facing pages."
    ],
    recommendedSkills: ["frontend-polish", "code-review", "test-writer"]
  },
  node: {
    label: "Node.js Library or CLI",
    description: "JavaScript/TypeScript packages, CLIs, SDKs, and backend utilities.",
    stacks: ["node", "typescript", "cli"],
    testCommands: ["npm test", "npm run lint", "npm run build"],
    conventions: [
      "Keep public APIs stable and documented.",
      "Prefer small pure functions for parsing, rendering, and IO boundaries.",
      "Make CLI output scriptable, concise, and helpful.",
      "Avoid adding runtime dependencies unless the benefit is clear."
    ],
    recommendedSkills: ["cli-designer", "code-review", "test-writer"]
  },
  python: {
    label: "Python Project",
    description: "Python packages, scripts, automation, and notebooks.",
    stacks: ["python"],
    testCommands: ["python -m pytest", "python -m py_compile"],
    conventions: [
      "Use pathlib and structured parsers instead of ad hoc path/string handling.",
      "Keep notebooks reproducible and move reusable logic into modules.",
      "Prefer explicit configuration over hidden global state.",
      "Report package or environment assumptions in the final response."
    ],
    recommendedSkills: ["data-analysis", "code-review", "test-writer"]
  },
  fastapi: {
    label: "FastAPI Service",
    description: "FastAPI APIs, services, and Python backends.",
    stacks: ["python", "fastapi", "api"],
    testCommands: ["python -m pytest", "ruff check .", "mypy ."],
    conventions: [
      "Keep request validation in Pydantic models.",
      "Separate route handlers from business logic when complexity grows.",
      "Return stable error shapes for client-facing APIs.",
      "Add tests around authentication, validation, and edge cases."
    ],
    recommendedSkills: ["api-review", "code-review", "test-writer"]
  },
  "data-science": {
    label: "Data Science",
    description: "ML experiments, analysis scripts, notebooks, and reports.",
    stacks: ["python", "ml", "notebook"],
    testCommands: ["python -m pytest", "python -m py_compile"],
    conventions: [
      "Preserve reproducibility: seeds, splits, metrics, and data paths matter.",
      "Separate experiment configuration from training/evaluation code.",
      "Do not overwrite original datasets or result files without permission.",
      "Explain metric changes and evaluation assumptions clearly."
    ],
    recommendedSkills: ["data-analysis", "paper-reader", "repo-doctor"]
  },
  latex: {
    label: "LaTeX / Thesis",
    description: "Papers, theses, reports, and academic writing projects.",
    stacks: ["latex", "writing"],
    testCommands: ["xelatex -interaction=nonstopmode -halt-on-error main.tex", "bibtex main"],
    conventions: [
      "Keep citation keys, labels, and bibliography style consistent.",
      "Avoid rewriting large sections when a focused edit is requested.",
      "Check generated auxiliary files before reporting success.",
      "Preserve institution or journal formatting requirements."
    ],
    recommendedSkills: ["paper-reader", "writing-review", "repo-doctor"]
  },
  research: {
    label: "Research Reproduction",
    description: "Paper reproduction, experiment baselines, and academic code.",
    stacks: ["research", "python", "ml"],
    testCommands: ["python -m pytest", "python -m py_compile"],
    conventions: [
      "Track the exact paper claim, dataset, split, and metric being reproduced.",
      "Keep baseline code readable before optimizing.",
      "Store experiment outputs with clear timestamps and configuration snapshots.",
      "Call out any gap between the paper protocol and available implementation."
    ],
    recommendedSkills: ["paper-reader", "data-analysis", "test-writer"]
  }
};

export const skills = {
  "code-review": {
    label: "Code Review",
    summary: "Find bugs, regressions, missing tests, and maintainability risks.",
    body: [
      "Prioritize correctness, security, data loss, and user-visible regressions.",
      "Lead with findings ordered by severity and cite file/line references.",
      "Keep summaries brief; avoid praising code unless it clarifies risk.",
      "When no issue is found, state residual risk and any unrun tests."
    ]
  },
  "test-writer": {
    label: "Test Writer",
    summary: "Add focused tests that protect the changed behavior.",
    body: [
      "Start from the behavior being changed, not from implementation details.",
      "Cover the smallest useful success path plus important edge cases.",
      "Prefer existing test helpers, fixtures, and naming conventions.",
      "Make failing tests easy to diagnose from the assertion message."
    ]
  },
  "frontend-polish": {
    label: "Frontend Polish",
    summary: "Improve responsive layout, accessibility, visual hierarchy, and states.",
    body: [
      "Use existing design tokens, spacing, and component conventions.",
      "Check mobile, tablet, desktop, empty, loading, error, and long-text states.",
      "Keep interactive controls familiar: icons, toggles, tabs, menus, and sliders.",
      "Avoid text overflow, layout shifts, and decorative elements that hide content."
    ]
  },
  "cli-designer": {
    label: "CLI Designer",
    summary: "Design helpful command-line interfaces and scriptable output.",
    body: [
      "Make the default command safe and useful without many flags.",
      "Provide --help, --dry-run, --json, and clear non-zero failures when relevant.",
      "Keep output concise and deterministic for CI logs.",
      "Never require interactive input for automation paths."
    ]
  },
  "repo-doctor": {
    label: "Repo Doctor",
    summary: "Audit repository health for open-source readiness.",
    body: [
      "Check README clarity, install steps, license, tests, CI, examples, and contribution path.",
      "Separate quick wins from deeper architecture work.",
      "Suggest issues that a first-time contributor could realistically pick up.",
      "Score health only when the rubric is explicit."
    ]
  },
  "data-analysis": {
    label: "Data Analysis",
    summary: "Make analysis reproducible, inspectable, and statistically honest.",
    body: [
      "Preserve raw data and record transformations.",
      "Report assumptions, missing values, sample sizes, and metric definitions.",
      "Prefer tables and plots that answer a concrete question.",
      "Separate exploration from final reproducible scripts."
    ]
  },
  "paper-reader": {
    label: "Paper Reader",
    summary: "Turn papers into reproducible implementation and explanation plans.",
    body: [
      "Extract the problem, method, datasets, metrics, ablations, and limitations.",
      "Map formulas to code-level variables and tensor shapes when possible.",
      "Flag missing details that affect reproduction.",
      "Create a staged implementation plan before writing large code."
    ]
  },
  "api-review": {
    label: "API Review",
    summary: "Review API behavior, validation, error handling, and compatibility.",
    body: [
      "Check request validation, auth boundaries, status codes, and error schemas.",
      "Protect backward compatibility unless a breaking change is explicit.",
      "Add tests for malformed input and permission failures.",
      "Document externally visible behavior changes."
    ]
  },
  "writing-review": {
    label: "Writing Review",
    summary: "Improve technical writing while preserving author intent.",
    body: [
      "Clarify claims, definitions, transitions, and evidence.",
      "Preserve required academic formatting and terminology.",
      "Avoid changing mathematical meaning without calling it out.",
      "Prefer direct edits plus a short rationale for major changes."
    ]
  }
};

export const agentTargets = {
  codex: {
    file: "AGENTS.md",
    label: "Codex / OpenAI Codex"
  },
  claude: {
    file: "CLAUDE.md",
    label: "Claude Code"
  },
  cursor: {
    file: ".cursorrules",
    label: "Cursor"
  },
  copilot: {
    file: ".github/copilot-instructions.md",
    label: "GitHub Copilot"
  }
};
