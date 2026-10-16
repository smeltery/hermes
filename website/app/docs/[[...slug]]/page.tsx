import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BookOpen, Code2, Terminal } from "lucide-react";
import { pages, getDoc } from "@/docs/content";
import { Markdown } from "@/docs/Markdown";
import { DocActions } from "@/docs/actions/DocActions";
import { BrandIcon } from "@/components/BrandIcon";
import { repository } from "@/lib/site";

interface Props {
  params: Promise<{ slug?: string[] }>;
}
export const dynamicParams = false;
export function generateStaticParams() {
  return pages.map((page) => ({
    slug: page.path === "/docs" ? [] : page.path.slice(6).split("/"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const page = getDoc("/docs" + (slug.length ? "/" + slug.join("/") : ""));
  if (!page) return { title: "Page not found — Hermes docs" };
  const title = `${page.title} — Hermes docs`;
  return {
    title,
    description: page.description,
    alternates: process.env.NEXT_PUBLIC_SITE_URL
      ? { canonical: page.path }
      : undefined,
    openGraph: {
      title,
      description: page.description,
      ...(process.env.NEXT_PUBLIC_SITE_URL ? { url: page.path } : {}),
    },
    twitter: { title, description: page.description },
  };
}

export default async function DocPage({ params }: Props) {
  const { slug = [] } = await params;
  const page = getDoc("/docs" + (slug.length ? "/" + slug.join("/") : ""));
  if (!page) notFound();
  const index = pages.findIndex((item) => item.path === page.path);
  const next = pages[index + 1];
  const source =
    page.path === "/docs/examples"
      ? "website/src/docs/content/examples.md"
      : page.source;
  const toc = page.sections.map((section) => (
    <a href={`#${section.id}`} key={section.id}>
      {section.title}
    </a>
  ));
  const brands = page.path.includes("spring-boot")
    ? (["spring"] as const)
    : page.path.includes("kotlin")
      ? (["kotlin"] as const)
      : page.path.includes("graalvm")
        ? (["graalvm"] as const)
        : page.path.includes("installation") ||
            page.path.includes("quick-start")
          ? (["java", "maven", "gradle"] as const)
          : [];
  return (
    <>
      <main className="docs-main" id="docs-main">
        <details className="mobile-toc">
          <summary>On this page</summary>
          <nav aria-label="On this page">{toc}</nav>
        </details>
        <header className="doc-article-heading">
          <p className="eyebrow">{page.group}</p>
          <div className="doc-brands">
            {brands.map((name) => (
              <BrandIcon key={name} name={name} size={22} />
            ))}
          </div>
          <h1>{page.title}</h1>
          <p className="docs-lead">{page.description}</p>
        </header>
        {page.intro && (
          <div className="doc-introduction">
            <Markdown text={page.intro} file={page.file} />
          </div>
        )}
        {page.path === "/docs/examples" && (
          <div className="doc-card-grid">
            {[
              {
                title: "Java application",
                path: "/docs/getting-started/basic-usage",
                icon: Terminal,
                description:
                  "LoggerFactory, levels, and parameterized messages.",
              },
              {
                title: "Spring Boot service",
                path: "/docs/integrations/spring-boot",
                icon: Code2,
                description:
                  "A starter and YAML configuration for your service.",
              },
              {
                title: "Kotlin project",
                path: "/docs/integrations/kotlin",
                icon: Code2,
                description:
                  "Idiomatic extensions, suppliers, and scoped context.",
              },
              {
                title: "Structured logging",
                path: "/docs/advanced/json-logging",
                icon: BookOpen,
                description: "JSON output for your logging pipeline.",
              },
            ].map((card) => (
              <Link className="doc-card" href={card.path} key={card.path}>
                <card.icon size={22} />
                <strong>{card.title}</strong>
                <p>{card.description}</p>
                <ArrowUpRight className="doc-card-arrow" size={16} />
              </Link>
            ))}
          </div>
        )}
        {page.sections.map((section) => (
          <section id={section.id} key={section.id}>
            <h2>{section.title}</h2>
            <Markdown text={section.markdown} file={page.file} />
          </section>
        ))}
        {next && (
          <Link className="doc-next" href={next.path}>
            <span>Continue reading</span>
            {next.title} →
          </Link>
        )}
        <div className="mobile-doc-actions">
          <DocActions
            key={page.path}
            markdown={page.markdown}
            source={source}
          />
        </div>
        <footer className="docs-footer">
          <Link href="/">← Hermes home</Link>
          <a href={`${repository}/blob/master/${source}`}>
            View documentation source ↗
          </a>
        </footer>
      </main>
      <aside className="docs-toc" aria-label="Page contents and actions">
        <p>ON THIS PAGE</p>
        {toc}
        <DocActions key={page.path} markdown={page.markdown} source={source} />
      </aside>
    </>
  );
}
