import Link from "next/link";
import { Brand } from "@/components/MarketingLayout";
import { BrandIcon } from "@/components/BrandIcon";
import { repository } from "@/lib/site";
import { DocsNavigation } from "@/docs/DocsNavigation";
import { MobileNavigation } from "@/docs/MobileNavigation";
import { DocsSearch } from "@/docs/search/DocsSearch";
import { searchCatalog } from "@/docs/content";
import "@/docs/docs.css";
import "@/docs/docs-content.css";
import "@/docs/docs-mobile.css";
import "@/docs/actions/doc-actions.css";
import "@/docs/search/search.css";
import "@/docs/rendering/code.css";
import "@/docs/hermes.css";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="docs-page">
      <header className="docs-header">
        <a className="skip-link" href="#docs-main">
          Skip to content
        </a>
        <MobileNavigation />
        <Link href="/" aria-label="Hermes home">
          <Brand />
        </Link>
        <span className="docs-header-label">Documentation</span>
        <nav aria-label="Documentation">
          <Link href="/docs/api/core">API reference</Link>
          <Link href="/docs/examples">Examples</Link>
          <a className="brand-heading" href={repository}>
            <BrandIcon name="github" size={16} />
            GitHub ↗
          </a>
        </nav>
        <DocsSearch searchable={searchCatalog()} />
      </header>
      <div className="docs-layout">
        <aside className="docs-sidebar" aria-label="Documentation navigation">
          <DocsNavigation />
        </aside>
        {children}
      </div>
    </div>
  );
}
