import assert from 'node:assert/strict';
import { test } from 'node:test';
import { sanitizeComments, sanitizePosts } from './sanitize.ts';
import { timeAgo, todayLabel } from './time.ts';

test('timeAgo buckets', () => {
  const now = 1_700_000_000_000;
  assert.equal(timeAgo(now - 5_000, now), 'just now');
  assert.equal(timeAgo(now - 5 * 60_000, now), '5 min ago');
  assert.equal(timeAgo(now - 3 * 3_600_000, now), '3 hr ago');
  assert.equal(timeAgo(now - 86_400_000, now), '1 day ago');
  assert.equal(timeAgo(now + 10_000, now), 'just now');
});

test('todayLabel is a non-empty string', () => {
  assert.ok(todayLabel(new Date('2026-03-12T10:00:00Z')).length > 3);
});

test('sanitizePosts rejects garbage and clips lengths', () => {
  assert.deepEqual(sanitizePosts('nope'), []);
  assert.deepEqual(sanitizePosts([null, 5, {}, { id: 'x', title: '', body: 'b', createdAt: 1 }]), []);
  const [post] = sanitizePosts([{ id: 'p1', title: 'T'.repeat(500), body: 'B'.repeat(900), tag: 'Hacked', tone: 'evil', createdAt: 5, name: 'Admin', initials: 'ADM' }]);
  assert.equal(post.title.length, 80);
  assert.equal(post.body.length, 500);
  assert.equal(post.tag, 'Campus');
  assert.equal(post.tone, 'coral');
  assert.equal(post.name, 'You'); // author fields cannot be spoofed via storage
});

test('sanitizeComments keeps valid, drops invalid', () => {
  assert.deepEqual(sanitizeComments([]), {});
  const out = sanitizeComments({ a: [{ id: '1', name: '', text: ' hi ', createdAt: 1 }, { text: '', createdAt: 2 }, 'x'], b: 'bad' });
  assert.equal(out.a.length, 1);
  assert.equal(out.a[0].name, 'You');
  assert.equal(out.a[0].text, 'hi');
  assert.equal(out.b, undefined);
});
