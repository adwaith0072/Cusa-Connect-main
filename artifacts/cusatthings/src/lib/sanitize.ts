import { LIMITS, POST_TAGS, type FeedPost, type PostTag, type Tone } from '../data/campus.ts';

export type Comment = { id: string; name: string; text: string; createdAt: number };

const TONES: Tone[] = ['coral', 'teal', 'yellow'];

const clip = (value: unknown, max: number) => (typeof value === 'string' ? value.slice(0, max) : '');

export function sanitizePosts(value: unknown): FeedPost[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 200).flatMap((item): FeedPost[] => {
    if (!item || typeof item !== 'object') return [];
    const p = item as Record<string, unknown>;
    const title = clip(p.title, LIMITS.title).trim();
    const body = clip(p.body, LIMITS.body).trim();
    const id = clip(p.id, 60);
    if (!title || !body || !id || typeof p.createdAt !== 'number') return [];
    const tag = POST_TAGS.includes(p.tag as PostTag) ? (p.tag as PostTag) : 'Campus';
    const tone = TONES.includes(p.tone as Tone) ? (p.tone as Tone) : 'coral';
    return [{ id, initials: 'YOU', name: 'You', tag, title, body, tone, createdAt: p.createdAt }];
  });
}

export function sanitizeComments(value: unknown): Record<string, Comment[]> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const out: Record<string, Comment[]> = {};
  for (const [postId, list] of Object.entries(value as Record<string, unknown>).slice(0, 300)) {
    if (!Array.isArray(list)) continue;
    out[postId] = list.slice(0, 200).flatMap((item): Comment[] => {
      if (!item || typeof item !== 'object') return [];
      const c = item as Record<string, unknown>;
      const text = clip(c.text, LIMITS.comment).trim();
      if (!text || typeof c.createdAt !== 'number') return [];
      return [{ id: clip(c.id, 60) || `c-${c.createdAt}`, name: clip(c.name, LIMITS.author).trim() || 'You', text, createdAt: c.createdAt }];
    });
  }
  return out;
}

