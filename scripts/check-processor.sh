#!/usr/bin/env bash
set -euo pipefail
sources=hermes-examples/target/generated-sources/annotations
if ! test -d "$sources" || ! find "$sources" -name '*HermesLogger.java' -print -quit | grep -q .; then
  echo 'Annotation processor did not generate any logger sources' >&2
  exit 1
fi
printf 'Annotation processor generated logger sources\n'
