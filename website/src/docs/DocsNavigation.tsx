'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import catalog from './catalog.json';

export function DocsNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const current = usePathname();
  const groups = [...new Set(catalog.map((page) => page.group))];
  return (
    <>
      <nav aria-label="Documentation pages">
        <Link href="/docs/api/core" onClick={onNavigate}>
          API overview
        </Link>
        {groups.map((group) => (
          <div className="docs-nav-group" key={group}>
            <p>{group}</p>
            {catalog
              .filter((page) => page.group === group)
              .map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  onClick={onNavigate}
                  aria-current={current === page.path ? 'page' : undefined}
                >
                  {page.title}
                </Link>
              ))}
          </div>
        ))}
      </nav>
      <Link onClick={onNavigate} className="docs-home" href="/">
        ← Back to Hermes
      </Link>
    </>
  );
}
