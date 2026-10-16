import { readFileSync } from 'node:fs';
import { files } from './files.mjs';
const budget = JSON.parse(readFileSync('scripts/loc-budget.json', 'utf8'));
export function lineCount(text) { return text ? text.trimEnd().split('\n').length : 0; }
if (import.meta.main) {
  let total = 0;
  const errors = [];
  for (const file of files().filter(file => /\.(?:java|kt|tsx?|m?js|css|md|sh|yml|yaml|toml|xml|json)$/.test(file) && file !== 'WARP.md')) {
    const count = lineCount(readFileSync(file, 'utf8'));
    total += count;
    const cap = budget.exceptions[file] ?? budget.perFile;
    if (count > cap) errors.push(`${file}: ${count} lines exceeds ${cap}`);
  }
  if (total > budget.total) errors.push(`Total ${total} exceeds ${budget.total}`);
  console.log(`LOC: ${total}/${budget.total}; default file cap ${budget.perFile}`);
  if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
}
