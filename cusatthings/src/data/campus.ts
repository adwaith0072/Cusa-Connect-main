/**
 * Editorial content for CusatThings. Edit this file to change what the site shows.
 * User-generated content (posts, comments, saves) lives in the browser, see lib/storage.ts.
 */

export type Tone = 'coral' | 'teal' | 'yellow';
export type PostTag = 'Campus' | 'Food' | 'Commute' | 'Lost & found';

export const POST_TAGS: PostTag[] = ['Campus', 'Food', 'Commute', 'Lost & found'];

export const LIMITS = { title: 80, body: 500, comment: 280, author: 30 } as const;

export type FeedPost = {
  id: string;
  initials: string;
  name: string;
  tag: PostTag;
  title: string;
  body: string;
  tone: Tone;
  /** Epoch ms. Omitted for starter posts that ship with the site. */
  createdAt?: number;
};

/** Evergreen starter posts that explain how the noticeboard works. */
export const starterPosts: FeedPost[] = [
  {
    id: 'starter-library',
    initials: 'CT',
    name: 'CusatThings',
    tag: 'Campus',
    title: 'Check library hours before exam weeks',
    body: 'Hours often change during internals and exams. Look for the notice at the entrance and carry your ID.',
    tone: 'teal',
  },
  {
    id: 'starter-lost',
    initials: 'CT',
    name: 'CusatThings',
    tag: 'Lost & found',
    title: 'Lost or found something? Post it here',
    body: 'Describe the item, where it turned up, and where it can be collected. Avoid posting phone numbers publicly.',
    tone: 'yellow',
  },
  {
    id: 'starter-bus',
    initials: 'CT',
    name: 'CusatThings',
    tag: 'Commute',
    title: 'Know a bus or ferry timing that works?',
    body: 'Share the route, the stop and the time you rely on. A good timing saves everyone a wait.',
    tone: 'coral',
  },
];

export type FoodType = 'Chai & snacks' | 'Quick bites' | 'Kerala plates' | 'Late night';

export const foodFilters: Array<'Everything' | FoodType> = [
  'Everything',
  'Chai & snacks',
  'Quick bites',
  'Kerala plates',
  'Late night',
];

export const foodSpots: Array<{
  id: string;
  name: string;
  detail: string;
  price: string;
  type: FoodType;
  open: string;
  color: string;
}> = [
  { id: 'salkara', name: 'Salkara Chai', detail: 'Kalamassery · 8 min walk', price: '₹', type: 'Chai & snacks', open: '10:30 pm', color: 'bg-[#f2b84b]' },
  { id: 'campus-cafe', name: 'Campus Café', detail: 'CUSAT South Gate · 3 min walk', price: '₹₹', type: 'Quick bites', open: '8:00 pm', color: 'bg-[#8fc9bd]' },
  { id: 'thattukada', name: 'Night Thattukada', detail: 'Pipeline Road · 12 min ride', price: '₹', type: 'Kerala plates', open: '1:00 am', color: 'bg-[#ef8062]' },
  { id: 'rolls', name: 'Rolls & More', detail: 'HMT Junction · 15 min ride', price: '₹₹', type: 'Late night', open: '12:30 am', color: 'bg-[#9fa9d9]' },
];

export type TripGroup = 'Half day' | 'Full day';
export const tripGroups: TripGroup[] = ['Half day', 'Full day'];

export const trips: Array<{
  id: string;
  title: string;
  distance: string;
  time: string;
  group: TripGroup;
  line: string;
  bg: string;
}> = [
  { id: 'fort-kochi', title: 'Fort Kochi, slowly', distance: '22 km', time: 'half day', group: 'Half day', line: 'Ferry, old streets, a bench by the water. The best kind of academic break.', bg: 'bg-[#b5573a]' },
  { id: 'kadamakkudy', title: 'Kadamakkudy sunset', distance: '27 km', time: 'evening', group: 'Half day', line: 'Pack chai and catch the last gold over the paddy fields.', bg: 'bg-[#3f7a70]' },
  { id: 'cherai', title: 'Cherai when it rains', distance: '31 km', time: 'full day', group: 'Full day', line: 'A beach, a bus playlist, and absolutely no group project talk.', bg: 'bg-[#8a6d12]' },
];

export type PlaceKind = 'academic' | 'essential' | 'stay' | 'community';

export const placeKinds: Array<{ key: 'All' | PlaceKind; label: string }> = [
  { key: 'All', label: 'All' },
  { key: 'academic', label: 'Academic' },
  { key: 'essential', label: 'Essentials' },
  { key: 'stay', label: 'Stay' },
  { key: 'community', label: 'People' },
];

export const mapPlaces: Array<{
  id: string;
  name: string;
  short: string;
  x: number;
  y: number;
  kind: PlaceKind;
  note: string;
}> = [
  { id: 'soet', name: 'School of Engineering', short: 'SOE', x: 31, y: 29, kind: 'academic', note: 'Main academic cluster: labs, lecture halls, and the best corridor breeze.' },
  { id: 'cse', name: 'CSE Department', short: 'CSE', x: 56, y: 23, kind: 'academic', note: 'Department of Computer Science and Engineering.' },
  { id: 'library', name: 'Central Library', short: 'LIB', x: 43, y: 56, kind: 'essential', note: 'The quietest corner is on level two.' },
  { id: 'canteen', name: 'Main Canteen', short: 'EAT', x: 67, y: 63, kind: 'essential', note: 'Meals, banana fry, and the campus noticeboard.' },
  { id: 'hostel', name: 'Valia Hostel', short: 'VH', x: 78, y: 38, kind: 'stay', note: 'North campus residential cluster.' },
  { id: 'union', name: 'Students’ Union', short: 'SU', x: 23, y: 68, kind: 'community', note: 'Clubs, announcements, and someone always lending a charger.' },
];

export type CampusEvent = {
  id: string;
  title: string;
  kicker: string;
  place: string;
  /** ISO date (YYYY-MM-DD). Leave undefined while the date is not confirmed. */
  date?: string;
  note: string;
  cost: string;
};

/** Replace these with real listings. Events with a past `date` are hidden automatically. */
export const events: CampusEvent[] = [
  { id: 'open-mic', title: 'Open mic at the amphitheatre', kicker: 'Music · poetry', place: 'Amphitheatre', note: 'No auditions.', cost: 'Free' },
  { id: 'film-society', title: 'Film Society screening', kicker: 'Campus club', place: 'Seminar Hall 2', note: 'Ask the Film Society for the current title.', cost: 'Free' },
];

export const navItems = [
  { id: 'feed', label: 'Campus feed' },
  { id: 'pulse', label: 'Campus pulse' },
  { id: 'food', label: 'Food nearby' },
  { id: 'trips', label: 'Quick trips' },
  { id: 'map', label: 'Campus map' },
] as const;
