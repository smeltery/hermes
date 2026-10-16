# Hermes documentation

The docs shell, navigation proportions, search presentation, code styling, and page actions are adapted from smeltery/convrt (revision b66e8dd48f37517779739f34b0038705101a1a70). Its PolyForm Shield notice is retained at public/licenses/convrt.txt. Hermes uses its own branding, palette, and documentation content.

`catalog.json` defines routes, titles, descriptions, grouping, content paths and source links. Markdown content lives in `content/`; it was migrated from the repository's `docs/src/`. Update this copy when changing the website documentation. The original MkDocs tree remains available for its existing deployment. Overview, examples, performance and the appender/layout reference were revised against the implementation; old benchmark claims are not treated as measurements.

Markdown and syntax highlighting render on the server. Search receives a bounded section-text index, rather than all code blocks. Relative Markdown links resolve to local docs routes. Diagrams are native SVG/HTML with readable descriptions, without a third-party diagram service. Raw HTML is not enabled.

Page actions copy the displayed Markdown. Chat links open a provider with the documentation in its prompt; they do not submit messages automatically. No content is sent until the visitor follows a link. Source links use the repository's master branch.

Test the search algorithm with `pnpm test:docs`. Verify desktop/mobile navigation, TOCs, code copying, Markdown fallback, search keyboard shortcuts and zero results in Maestri portals. Production routes and metadata are generated from the catalog; unknown docs routes return a real 404.
