import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
export function files() {
  return [...new Set(execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' }).split('\0'))]
    .filter(file => file && existsSync(file));
}
