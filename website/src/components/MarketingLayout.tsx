"use client";

import Link from "next/link";
import { BrandIcon } from "./BrandIcon";

import { useEffect, useRef, useState } from "react";
import { DocsSearch } from "@/docs/search/DocsSearch";
import catalog from "@/docs/catalog.json";
import "@/docs/search/search.css";
import "@/styles/marketing-menu.css";
import {
  Menu,
  X,
  Search,
  ArrowRight,
  BookOpen,
  Layers,
  ArrowUpRight,
  Zap,
} from "lucide-react";

import { repository } from "@/lib/site";

export function Brand() {
  return (
    <span className="brand">
      <span className="brand-mark">
        <Zap size={19} fill="currentColor" aria-hidden="true" />
      </span>
      hermes<span className="brand-dot">.</span>
    </span>
  );
}

export function MarketingNav() {
  const menu = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const search = useRef<HTMLDivElement>(null);
  const overflow = useRef<string | null>(null);
  const [open, setOpen] = useState(false);
  function closeMenu() {
    menu.current?.close();
  }
  function openMenu() {
    overflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.showModal();
    setOpen(true);
  }
  function openSearch() {
    closeMenu();
    requestAnimationFrame(() =>
      search.current?.querySelector("button")?.click(),
    );
  }
  useEffect(
    () => () => {
      if (overflow.current !== null)
        document.body.style.overflow = overflow.current;
    },
    [],
  );

  const links = (
    <>
      <Link href="/#how-it-works">How it works</Link>
      <Link href="/#features">Features</Link>
      <Link href="/#quick-start">Get started</Link>
      <Link href="/docs">
        Docs <ArrowUpRight size={13} />
      </Link>
      <a href={repository}>
        <BrandIcon name="github" size={15} /> GitHub
      </a>
    </>
  );
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <nav className="navigation" aria-label="Primary">
        <Link href="/" aria-label="Hermes home">
          <Brand />
        </Link>
        <div className="desktop-links">{links}</div>
        <div className="marketing-mobile-controls">
          <div className="marketing-search" ref={search}>
            <DocsSearch
              searchable={catalog.map((page) => ({ ...page, sections: [] }))}
            />
          </div>
          <button
            className="marketing-menu-toggle"
            ref={toggle}
            onClick={openMenu}
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-controls="marketing-menu"
          >
            Menu <Menu size={18} strokeWidth={1.6} />
          </button>
        </div>
        <dialog
          id="marketing-menu"
          className="marketing-menu"
          ref={menu}
          aria-labelledby="marketing-menu-title"
          onClose={() => {
            setOpen(false);
            document.body.style.overflow = overflow.current ?? "";
            overflow.current = null;
            toggle.current?.focus();
          }}
          onKeyDown={(event) => {
            if (
              (event.metaKey || event.ctrlKey) &&
              event.key.toLowerCase() === "k"
            )
              closeMenu();
            if (event.key === "Escape") {
              event.preventDefault();
              closeMenu();
            }
          }}
        >
          <div className="marketing-menu-header">
            <Link href="/" onClick={closeMenu} aria-label="Hermes home">
              <Brand />
            </Link>
            <button
              className="marketing-menu-close"
              autoFocus
              onClick={closeMenu}
              aria-label="Close navigation"
            >
              <X size={22} strokeWidth={1.6} />
            </button>
          </div>
          <div className="marketing-menu-content">
            <p className="eyebrow">A little direction goes a long way</p>
            <h2 id="marketing-menu-title">What’s next?</h2>
            <button className="marketing-menu-search" onClick={openSearch}>
              <Search size={18} /> <span>Search documentation</span>
              <kbd>⌘ K</kbd>
            </button>
            <nav
              className="marketing-menu-cards"
              aria-label="Mobile navigation"
            >
              <Link
                className="featured"
                href="/#quick-start"
                onClick={closeMenu}
              >
                <Zap size={24} />
                <span>
                  <strong>Get started</strong>
                  <small>Add a little Hermes to your application.</small>
                </span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/#how-it-works" onClick={closeMenu}>
                <BookOpen size={24} />
                <strong>How it works</strong>
                <small>From setup to your first log message.</small>
              </Link>
              <Link href="/#features" onClick={closeMenu}>
                <Layers size={24} />
                <strong>Explore features</strong>
                <small>Context, structure, and reliable delivery.</small>
              </Link>
            </nav>
            <div className="marketing-menu-section">
              <h3>Build with Hermes</h3>
              <span>Your stack. Your way.</span>
            </div>
            <nav
              className="marketing-menu-tools"
              aria-label="Integration documentation"
            >
              {[
                {
                  name: "Java",
                  icon: "java" as const,
                  href: "/docs/getting-started/quick-start",
                  label: "Quick start",
                },
                {
                  name: "Spring Boot",
                  icon: "spring" as const,
                  href: "/docs/integrations/spring-boot",
                  label: "Integration",
                },
                {
                  name: "Kotlin",
                  icon: "kotlin" as const,
                  href: "/docs/integrations/kotlin",
                  label: "DSL",
                },
                {
                  name: "GraalVM",
                  icon: "graalvm" as const,
                  href: "/docs/integrations/graalvm",
                  label: "Native image",
                },
              ].map((item) => (
                <Link key={item.name} href={item.href} onClick={closeMenu}>
                  <BrandIcon name={item.icon} size={30} />
                  <span>{item.name}</span>
                  <small>{item.label}</small>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
              <Link href="/docs" onClick={closeMenu}>
                <BookOpen size={30} />
                <span>Documentation</span>
                <ArrowUpRight size={16} />
              </Link>
            </nav>
          </div>
          <div className="marketing-menu-footer">
            <a href={repository}>
              <BrandIcon name="github" size={20} /> GitHub
            </a>
            <a href={`${repository}/issues`}>Feedback &amp; issues ↗</a>
          </div>
        </dialog>
      </nav>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="shell footer">
      <div className="footer-top">
        <div>
          <Link href="/" aria-label="Hermes home">
            <Brand />
          </Link>
          <p>
            A little less boilerplate.
            <br />A lot more signal.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span>Build with Hermes</span>
            <Link href="/#quick-start">Quick start</Link>
            <Link href="/#code-examples">Code examples</Link>
            <Link href="/docs">Documentation ↗</Link>
          </div>
          <div>
            <span>In the open</span>
            <a href={repository}>Source on GitHub ↗</a>
            <a href={`${repository}/issues`}>Issues & feedback ↗</a>
            <a href={`${repository}/blob/master/LICENSE`}>
              PolyForm Shield license ↗
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Hermes · A Java logging library</span>
        <Link href="/#top">Back to top ↑</Link>
      </div>
    </footer>
  );
}
