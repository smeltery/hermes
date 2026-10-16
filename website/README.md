# Hermes website

The Hermes marketing site uses Next.js 15, React 18, TypeScript, and pnpm. Its warm ivory and terracotta design is based on the Convrt reference, with original Hermes content and illustrations.

## Run locally

```sh
cd website
pnpm install --frozen-lockfile
pnpm dev
```

Development and production previews use http://localhost:3003.

```sh
pnpm exec tsc --noEmit
pnpm lint
pnpm build
pnpm start
```

No environment variables are needed for local use. For a public deployment, set `NEXT_PUBLIC_SITE_URL` to its actual HTTPS origin before building. This enables indexing, canonical metadata, and the sitemap. Without it, preview pages and robots.txt disallow indexing. The existing Vercel configuration remains the deployment entrypoint.

## Content and components

- `app/page.tsx`: hero, capabilities, process, architecture, integrations, closing.
- `src/components/MarketingLayout.tsx`: navigation and footer.
- `src/lib/site.ts`: shared repository destination.
- `src/components/sections/CodeExamplesSection.tsx`: Java, Spring Boot, and Kotlin examples; output is illustrative, not live execution.
- `src/components/sections/QuickStartSection.tsx`: Maven/Gradle setup and source-build fallback.
- `src/components/CodeBlock.tsx`: copy controls with honest clipboard failure feedback.
- `src/styles/globals.css`: design tokens and responsive layouts.
- `public/brands/`: technology brand icons with provenance in `NOTICE.txt`.
- `public/favicon.svg`, `public/og-image.svg`, `public/og-image.png`: original Hermes brand assets; the PNG is the social preview.

Product claims and snippets come from the root README and implementation. Keep package coordinates and versions synchronized with the root pom.xml. Maven compiler configuration is linked from the installation section. Existing homepage anchor URLs are retained. An unknown route returns a real 404 with a home link.

## Browser verification

Use Maestri portals to inspect production at desktop, tablet, mobile, and 320px widths. Exercise each language and build-tool button, clipboard success/failure, mobile menu (including Escape), section links, and 404 recovery. Check keyboard focus, reduced motion, horizontal overflow, internal fragment targets, and automated accessibility findings. Local reports and screenshots live in `.website-studio/`, excluded from Git and deployment.

## Integrated documentation

The Convrt-style documentation is available at `/docs`. Its grouped sidebar, per-page table of contents, search and preview dialog, code copying, Markdown copying, chat links, and mobile navigation use Hermes branding. See `src/docs/README.md` for content and attribution. Run `pnpm test:docs` to check search ranking and edge cases. All catalog routes are statically generated and included in the production sitemap when `NEXT_PUBLIC_SITE_URL` is set.
