import test from 'node:test';
import assert from 'node:assert/strict';
import { searchPages } from '../src/docs/search/search.ts';

const pages = [
  { path: '/docs', title: 'Overview', description: 'Start using Hermes', group: 'Start here', sections: [{ id: 'context', title: 'Context', text: 'MDC keeps request context' }] },
  { path: '/docs/user-guide/mdc', title: 'MDC', description: 'Request context with cleanup', group: 'Guides', sections: [{ id: 'cleanup', title: 'Cleanup', text: 'Clear the context when a request finishes' }] },
];
test('empty and whitespace searches show available popular pages', () => {
  assert.deepEqual(searchPages(pages, '  ').map(x => x.href), ['/docs', '/docs/user-guide/mdc']);
});
test('title matches rank above mentions and point to the page', () => {
  assert.equal(searchPages(pages, 'mdc')[0].href, '/docs/user-guide/mdc');
});
test('section matches return a valid fragment and excerpt', () => {
  const result = searchPages(pages, 'finishes')[0];
  assert.equal(result.href, '/docs/user-guide/mdc#cleanup');
  assert.match(result.excerpt, /finishes/);
});
test('all terms must match and unknown queries return no results', () => {
  assert.equal(searchPages(pages, 'request cleanup').length, 1);
  assert.equal(searchPages(pages, 'no-such-topic').length, 0);
});
