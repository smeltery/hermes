import { test, expect } from 'bun:test';
import { headings, validate } from './check-docs.mjs';
import { nextTag } from './release-version.mjs';
import { lineCount } from './check-loc.mjs';

test('Markdown catches broken paths and heading fragments', async () => {
  expect(await validate('README.md', '[bad](missing-file.md)')).toHaveLength(1);
  expect(await validate('README.md', '[bad](README.md#missing-heading)')).toHaveLength(1);
  expect(await validate('README.md', '[ok](README.md#develop)')).toEqual([]);
  expect([...headings('# Heading\n## Heading')]).toEqual(['heading', 'heading-1']);
});
test('Mermaid accepts valid diagrams and rejects malformed syntax', async () => {
  expect(await validate('README.md', '```mermaid\nflowchart LR\n A --> B\n```')).toEqual([]);
  expect(await validate('README.md', '```mermaid\nnot a diagram\n```')).toHaveLength(1);
});
test('release version ignores prereleases and sorts numerically', () => {
  expect(nextTag([], '1.0.0')).toBe('v1.0.0');
  expect(nextTag(['v1.9.9', 'v1.10.0', 'v2.0.0-rc.1', 'junk'], '1.0.0')).toBe('v1.10.1');
  expect(() => nextTag([], '1.0.0-SNAPSHOT')).toThrow();
});
test('LOC counts physical lines, including interior whitespace', () => {
  expect(lineCount('one\n\nthree\n')).toBe(3);
  expect(lineCount('')).toBe(0);
});
