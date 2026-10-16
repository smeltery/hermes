import type { SearchPage } from '../types';

export interface SearchResult {
  page: SearchPage;
  href: string;
  excerpt: string;
  section?: string;
  score: number;
}

export function searchPages(
  pages: SearchPage[],
  query: string,
): SearchResult[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) {
    return [
      '/docs',
      '/docs/getting-started/quick-start',
      '/docs/getting-started/installation',
      '/docs/user-guide/mdc',
      '/docs/integrations/spring-boot',
      '/docs/examples',
    ].flatMap((path) => {
      const page = pages.find((item) => item.path === path);
      return page
        ? [{ page, href: page.path, excerpt: page.description, score: 0 }]
        : [];
    });
  }
  return pages
    .flatMap((page) => {
      const title = page.title.toLowerCase();
      const description = page.description.toLowerCase();
      const all = [
        title,
        description,
        ...page.sections.map((section) =>
          `${section.title} ${section.text}`.toLowerCase(),
        ),
      ].join(' ');
      if (!terms.every((term) => all.includes(term))) return [];
      const ranked = page.sections
        .map((section) => ({
          section,
          score: terms.reduce(
            (sum, term) =>
              sum +
              (section.title.toLowerCase().includes(term) ? 8 : 0) +
              (section.text.toLowerCase().includes(term) ? 2 : 0),
            0,
          ),
        }))
        .sort((a, b) => b.score - a.score);
      const best = ranked[0];
      const titleMatch = terms.every((term) => title.includes(term));
      const text = titleMatch
        ? page.description
        : (best?.section.text ?? page.description);
      const start = Math.max(0, text.toLowerCase().indexOf(terms[0]) - 55);
      return [
        {
          page,
          href: page.path + (!titleMatch && best ? `#${best.section.id}` : ''),
          excerpt: `${start ? '…' : ''}${text.slice(start, start + 190)}${text.length > start + 190 ? '…' : ''}`,
          section: !titleMatch ? best?.section.title : undefined,
          score: terms.reduce(
            (sum, term) =>
              sum +
              (title.includes(term) ? 20 : 0) +
              (description.includes(term) ? 5 : 0),
            best?.score ?? 0,
          ),
        },
      ];
    })
    .sort(
      (a, b) => b.score - a.score || a.page.title.localeCompare(b.page.title),
    );
}
