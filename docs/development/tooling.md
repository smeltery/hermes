# Development tooling

## Reproducible environment

Install [Flox](https://flox.dev/docs/install-flox/), then run `flox activate` at the
repository root. The committed manifest and lock pin Java 17, Maven, Bun, Node,
Python, pre-commit, actionlint, and shellcheck on Linux and macOS.
The activation hook sets `JAVA_HOME` to the pinned JDK. No global package install
or automatic network download runs in that hook. The check script creates a local
Python virtual environment and installs the pinned MkDocs requirements.

```sh
bun install --frozen-lockfile
pre-commit install --install-hooks
bun run check
```

CI uses the same Flox environment and `scripts/check.sh`. A separate JDK 21 job
checks runtime compatibility. Update the manifest with `flox edit` and commit both
the manifest and generated lock after running the checks.

## Commands

| Command | Purpose |
| --- | --- |
| `bun run check` | Documentation, workflows, shell, LOC, JVM tests, processor smoke, website |
| `bun run check:docs` | Markdown lint, local links and anchors, Mermaid syntax |
| `bun run check:loc` | File and aggregate source budgets |
| `bun run test:tooling` | Validator and release-version regression tests |
| `mvn -B -ntp clean verify` | Compile all modules and run JVM tests |
| `bun run website:dev` | Website and docs on localhost:3003 |
| `flox services start website` | Start the website using the Flox service definition |
| `bun run og` | Render the checked-in social SVG to PNG |
| `pre-commit run --all-files` | Same checks as CI before committing |

Bun owns the single root lockfile and the website workspace. Node runs Next.js;
Maven remains the Java/Kotlin build system. Do not add npm or pnpm lockfiles.

## Documentation and images

User-facing pages live in `docs/src/`. The website's catalog supplies routes and
navigation; its loader reads these files directly. MkDocs uses the same directory.
Run `python3 -m venv .venv`, `.venv/bin/pip install -r docs/requirements.txt`, then
`.venv/bin/mkdocs build --strict -f docs/mkdocs.yml` to validate that frontend.

The 1200×630 social card is `website/public/og-image.svg`; run `bun run og` after
editing it. Commit the PNG too. The README and website metadata use this PNG.

## LOC budget

`scripts/loc-budget.json` defines per-file and aggregate physical line limits.
Source, CSS, scripts, docs, workflows, and manifests count; dependencies, generated
outputs, assets, and lockfiles do not. New source files must stay below the default
file cap. Existing exceptions are explicit, capped baselines, not blanket exclusions.

Prefer removing duplicate content and dependencies before increasing a budget.
Budget changes require a rationale in the pull request. Do not compress readable
code onto one line to bypass the check.
