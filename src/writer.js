import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function writeFiles(files, outputDir, { overwrite = false, dryRun = false } = {}) {
  const written = [];
  for (const [relativePath, content] of Object.entries(files)) {
    const absolutePath = path.join(outputDir, relativePath);
    if (dryRun) {
      written.push({ path: relativePath, status: "preview" });
      continue;
    }

    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, content, { flag: overwrite ? "w" : "wx" });
    written.push({ path: relativePath, status: "created" });
  }
  return written;
}
