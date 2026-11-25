// The 3 AM Excuse — a hardware wallet's one-line refusal, 3 AM, 108 chars.
// Writes the entry to /output/entry.txt (the kit gate: UTF-8, 1-200 chars).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const LINE =
  "At 3 AM my screensaver kicks in: a photo of you, asleep, not buying a frog coin. I keep it there for morale.";

mkdirSync(OUTPUT_DIR, { recursive: true });

// Gate guard: the sealed scorer needs 1-200 chars, non-whitespace, one line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line is ${LINE.length} chars, outside the 1-200 gate`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("line must be a single non-blank line");
}

writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE, "utf8");
console.log(`wrote ${LINE.length} chars to ${join(OUTPUT_DIR, "entry.txt")}`);
