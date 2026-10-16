# Documentation renderer

`catalog.json` maps routes to the canonical Markdown in `docs/src/` at the
repository root. Update that source once for both the website and MkDocs.
Markdown and code highlighting render on the server. Search indexes section text;
relative links resolve through the catalog. Raw Markdown HTML is disabled.

The docs shell is adapted from smeltery/convrt revision
`b66e8dd48f37517779739f34b0038705101a1a70`; its license is retained in
`website/public/licenses/convrt.txt`. Hermes supplies its own branding and content.

Run `bun run --cwd website test:docs` from the root. Exercise search, clipboard
fallback, mobile navigation, and TOCs in Maestri after UI changes.
