# Hermes website

Next.js, React, and TypeScript. Run commands at the repository root:

```sh
flox activate
bun install --frozen-lockfile
bun run website:dev
bun run website:build
bun run --cwd website start
```

The preview uses port 3003. User documentation comes directly from `docs/src/`;
[the catalog](src/docs/catalog.json) defines its navigation and routes.

Set `NEXT_PUBLIC_SITE_URL` to the deployed HTTPS origin before building to enable
indexing, canonical metadata, and the sitemap. Without it, previews are noindex.
Deploy with the repository available as the build root; the website needs `docs/`.
For Vercel, enable access to files outside the `website` root, use
`cd .. && bun install --frozen-lockfile` as install command, and `bun run build`
as the website build command.

Brand assets live in `public/`. Regenerate the social PNG with `bun run og` from
the root. See [tooling](../docs/development/tooling.md) and
[contributing](../CONTRIBUTING.md) for CI, hooks, and LOC limits.

Use Maestri portals for desktop/mobile navigation, search, copying, empty/error
states, and responsive checks. Local evidence in `.website-studio/` is not deployed.
