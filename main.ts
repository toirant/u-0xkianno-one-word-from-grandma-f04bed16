// One Word From Grandma — entry program.
//
// The task: send exactly one word, the word a grandma would text about AI.
// Our word is "Al" — short, warm, and exactly the kind of thing a grandma
// types when she means the AI by name, like an old friend at the table.
//
// The program writes that single word to /output/entry.txt, the one file
// the gate checks (UTF-8 text, 1-30 characters, not only whitespace).

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// The one word grandma would text about AI.
const WORD = "Al";

// The gate only accepts 1-30 characters of non-whitespace UTF-8 text,
// so refuse to write anything that would fail it before touching disk.
function assertGate(word: string): void {
  if (word.length < 1 || word.length > 30 || word.trim().length === 0) {
    throw new Error(`entry word fails the gate: ${JSON.stringify(word)}`);
  }
}

function main(): void {
  assertGate(WORD);

  // Create the output directory when it is missing. Never remove the
  // directory itself: the grader mounts it and runs as an unprivileged
  // user, so deleting it would fail with EBUSY / EACCES.
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Clear only the files inside the output directory, never the dir.
  for (const name of readdirSync(OUTPUT_DIR)) {
    rmSync(join(OUTPUT_DIR, name), { force: true, recursive: true });
  }

  writeFileSync(OUTPUT_FILE, WORD, "utf8");
}

main();
