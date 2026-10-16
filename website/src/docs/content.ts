import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import catalog from './catalog.json';
import type { DocPage, DocMeta, SearchPage } from './types';

export const pages: DocMeta[] = catalog;
export const groups = [...new Set(pages.map((page) => page.group))];

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[`*]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function getDoc(route: string): DocPage | undefined {
  const page = pages.find((item) => item.path === route);
  if (!page) return undefined;
  const markdown = fs.readFileSync(
    path.join(process.cwd(), '../docs/src', page.file),
    'utf8',
  );
  const body = markdown.replace(/^# .*\n+/, '');
  const chunks = body.split(/(?=^## )/m);
  const intro = chunks[0]?.startsWith('## ') ? '' : (chunks.shift() ?? '');
  const ids = new Map<string, number>();
  const sections = chunks.map((chunk) => {
    const [heading, ...lines] = chunk.split('\n');
    const title = heading.replace(/^## /, '');
    const slug = slugify(title);
    const count = ids.get(slug) ?? 0;
    ids.set(slug, count + 1);
    return {
      id: `${slug}${count ? `-${count}` : ''}`,
      title,
      markdown: lines.join('\n').trim(),
    };
  });
  return {
    ...page,
    markdown,
    intro: intro.trim() === page.description ? '' : intro,
    sections,
  };
}

export function searchCatalog(): SearchPage[] {
  return pages.map((meta) => {
    const page = getDoc(meta.path)!;
    return {
      ...meta,
      sections: page.sections.map((section) => ({
        id: section.id,
        title: section.title,
        text: section.markdown.replace(/[#*`>|]/g, '').replace(/\s+/g, ' '),
      })),
    };
  });
}

export function resolveDocLink(href: string, file: string): string {
  if (/^(?:[a-z]+:|#|\/)/i.test(href)) return href;
  const [target, fragment] = href.split('#');
  const resolved = path.posix.normalize(
    path.posix.join(path.posix.dirname(file), target),
  );
  const page = pages.find((item) => item.file === resolved);
  if (page) return page.path + (fragment ? `#${fragment}` : '');
  if (resolved === 'LICENSE' || resolved === '../LICENSE')
    return 'https://github.com/smeltery/hermes/blob/master/LICENSE';
  return (
    'https://github.com/smeltery/hermes/blob/master/' +
    path.posix.normalize(path.posix.join('docs/src', resolved)) +
    (fragment ? `#${fragment}` : '')
  );
}
