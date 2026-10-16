#!/usr/bin/env bash
set -euo pipefail
: "${RELEASE_TAG:?Set RELEASE_TAG}"
if [[ ! "$RELEASE_TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo 'Expected vMAJOR.MINOR.PATCH' >&2; exit 1
fi
git fetch origin master --tags
git merge-base --is-ancestor "$RELEASE_TAG" origin/master
test "$(git rev-parse HEAD)" = "$(git rev-list -n 1 "$RELEASE_TAG")"
mvn -B -ntp versions:set -DnewVersion="${RELEASE_TAG#v}" -DgenerateBackupPoms=false
mvn -B -ntp clean verify source:jar javadoc:jar
bash scripts/check-processor.sh
mkdir -p dist/package
cp LICENSE dist/package/
cp pom.xml dist/package/hermes-parent.pom
for module in hermes-api hermes-core hermes-processor hermes-spring-boot-starter hermes-kotlin; do
  test -f "$module/target/$module-${RELEASE_TAG#v}.jar"
  cp "$module"/target/*.jar dist/package/
  cp "$module/pom.xml" "dist/package/$module.pom"
done
tar -C dist/package -czf "dist/hermes-$RELEASE_TAG.tar.gz" .
(cd dist && shasum -a 256 "hermes-$RELEASE_TAG.tar.gz" > SHA256SUMS)
