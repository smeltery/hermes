import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { nextTag } from './release-version.mjs';
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const sha = process.env.TESTED_SHA;
if (!/^[a-f0-9]{40}$/.test(sha ?? '')) throw new Error('Missing tested commit SHA');
git('fetch', 'origin', 'master', '--tags');
if (git('rev-parse', 'origin/master') !== sha) {
  console.log('A newer commit is on master; its own CI run will release it');
  process.exit(0);
}
const existing = git('tag', '--points-at', sha).split('\n').find(tag => /^v\d+\.\d+\.\d+$/.test(tag));
const version = readFileSync('pom.xml', 'utf8').match(/<version>([^<]+)<\/version>/)[1];
const tag = existing ?? nextTag(git('tag', '--list').split('\n'), version);
if (!existing) { git('tag', tag, sha); git('push', 'origin', tag); }
// GITHUB_TOKEN-created tags do not trigger push workflows; dispatch explicitly.
execFileSync('gh', ['workflow', 'run', 'release.yml', '--ref', 'master', '-f', `tag=${tag}`], { stdio: 'inherit' });
