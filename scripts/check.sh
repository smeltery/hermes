#!/usr/bin/env bash
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
bun run check:docs
bun run check:loc
bun run test:tooling
actionlint
shellcheck scripts/*.sh
git diff --check
mvn -B -ntp clean verify
bash scripts/check-processor.sh
bun run --cwd website test:docs
bun run --cwd website build
python3 -m venv .venv
env -u PYTHONPATH .venv/bin/pip install --disable-pip-version-check -q -r docs/requirements.txt
env -u PYTHONPATH .venv/bin/mkdocs build --strict -f docs/mkdocs.yml
