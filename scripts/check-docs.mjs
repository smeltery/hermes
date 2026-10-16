import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import Slugger from 'github-slugger';
import { JSDOM } from 'jsdom';
import { files } from './files.mjs';

const markdown = new MarkdownIt({ html: true });
const dom = new JSDOM('');
globalThis.window = dom.window;
globalThis.document = dom.window.document;
const { default: mermaid } = await import('mermaid');
mermaid.initialize({ startOnLoad: false, securityLevel: 'strict' });

export function headings(source) {
  const slugger = new Slugger();
  const tokens = markdown.parse(source, {});
  return new Set(tokens.flatMap((token, index) => token.type === 'heading_open'
    ? [slugger.slug(tokens[index + 1].content.replace(/[`*]/g, ''))] : []));
}

export async function validate(file, source) {
  const errors = [];
  const tokens = markdown.parse(source, {});
  for (const token of tokens) {
    if (token.type === 'fence' && token.info.trim() === 'mermaid') {
      try { await mermaid.parse(token.content); }
      catch (error) { errors.push(`${file}:${token.map[0] + 1}: invalid Mermaid: ${error.message}`); }
    }
    const links = (token.children ?? []).flatMap(child => {
      const href = child.attrGet('href') ?? child.attrGet('src');
      return href ? [href] : [];
    });
    if (token.type === 'html_block' || token.type === 'inline') {
      for (const match of token.content.matchAll(/(?:src|href)="([^"]+)"/g)) links.push(match[1]);
    }
    for (const href of links) {
      if (/^(?:[a-z][\w+.-]*:|\/\/)/i.test(href)) continue;
      const [name, fragment] = decodeURIComponent(href).split('#');
      const target = name ? path.resolve(path.dirname(file), name.split('?')[0]) : path.resolve(file);
      if (!existsSync(target)) errors.push(`${file}: missing link target ${href}`);
      else if (fragment && target.endsWith('.md') && !headings(readFileSync(target, 'utf8')).has(fragment)) {
        errors.push(`${file}: missing heading ${href}`);
      }
    }
  }
  return errors;
}

if (import.meta.main) {
  const documents = files().filter(file => file.endsWith('.md') && file !== 'WARP.md');
  const errors = (await Promise.all(documents.map(file => validate(file, readFileSync(file, 'utf8'))))).flat();
  if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
  console.log(`Validated links and Mermaid in ${documents.length} Markdown files`);
}
