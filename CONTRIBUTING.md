# Contributing

Use the [Flox environment and commands](docs/development/tooling.md), install the
pre-commit hook, and run `bun run check` before opening a pull request.

Keep changes focused, use conventional commit messages, and document public API
changes in `docs/src/`. Prefer small cohesive modules. New code must fit the
[LOC budget](docs/development/tooling.md#loc-budget); explain budget changes in the PR.
Do not commit credentials, generated build outputs, or dependency directories.

Pre-commit invokes the same check entry point as CI. It intentionally checks the
whole repository so changes to shared code cannot bypass downstream checks.
CI also tests Java 21. The shared checks build both documentation frontends.
