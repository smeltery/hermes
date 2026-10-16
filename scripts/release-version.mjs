export function nextTag(tags, initial) {
  const versions = tags.filter(tag => /^v\d+\.\d+\.\d+$/.test(tag))
    .map(tag => tag.slice(1).split('.').map(Number))
    .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
  if (!versions.length) {
    if (!/^\d+\.\d+\.\d+$/.test(initial)) throw new Error('Initial POM version must be a release version');
    return `v${initial}`;
  }
  const [major, minor, patch] = versions.at(-1);
  return `v${major}.${minor}.${patch + 1}`;
}
