import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight, Bookmark, CalendarDays, Check, ChevronRight, CircleDot, Clock3, Coffee,
  Compass, ExternalLink, Flame, Heart, Instagram, Layers3, MapPin, Menu, MessageCircle,
  Navigation, Plus, Search, Send, Share2, Sparkles, Ticket, Trash2, Utensils, X,
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  LIMITS, POST_TAGS, events, foodFilters, foodSpots, mapPlaces, navItems, placeKinds,
  starterPosts, tripGroups, trips,
  type CampusEvent, type FeedPost, type PlaceKind, type PostTag, type Tone, type TripGroup,
} from '@/data/campus';
import { sanitizeComments, sanitizePosts, type Comment } from '@/lib/sanitize';
import { stringList, useStoredState } from '@/lib/storage';
import { timeAgo, todayLabel } from '@/lib/time';
import logo from '@/assets/logo.png';

type Modal = 'share' | 'map' | null;

const navIcons = { feed: MessageCircle, pulse: Flame, food: Coffee, trips: Compass, map: MapPin } as const;
const feedFilters = ['All', ...POST_TAGS, 'Saved'] as const;

const newId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17363a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f0e8]';

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function getLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function upcoming(event: CampusEvent, today = getLocalDateString()) {
  return !event.date || event.date >= today;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeFeed, setActiveFeed] = useState<(typeof feedFilters)[number]>('All');
  const [userPosts, setUserPosts] = useStoredState<FeedPost[]>('posts', [], sanitizePosts);
  const [comments, setComments] = useStoredState<Record<string, Comment[]>>('comments', {}, sanitizeComments);
  const [liked, setLiked] = useStoredState<string[]>('liked', [], stringList);
  const [saved, setSaved] = useStoredState<string[]>('saved-posts', [], stringList);
  const [savedPlaces, setSavedPlaces] = useStoredState<string[]>('saved-places', [], stringList);
  const [going, setGoing] = useStoredState<string[]>('going', [], stringList);
  const [modal, setModal] = useState<Modal>(null);
  const [commentPostId, setCommentPostId] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const toastTimer = useRef<number | undefined>(undefined);
  const [draft, setDraft] = useState<{ title: string; body: string; tag: PostTag }>({ title: '', body: '', tag: 'Campus' });
  const [commentDraft, setCommentDraft] = useState({ name: '', text: '' });
  const [foodFilter, setFoodFilter] = useState<(typeof foodFilters)[number]>('Everything');
  const [tripGroup, setTripGroup] = useState<TripGroup>('Half day');
  const [mapFilter, setMapFilter] = useState<'All' | PlaceKind>('All');
  const [selectedId, setSelectedId] = useState(mapPlaces[0].id);

  const sectionIds = useMemo(() => navItems.map((n) => n.id), []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMobileOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const showToast = (message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2400);
  };

  const allPosts = useMemo(() => [...userPosts].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)).concat(starterPosts), [userPosts]);
  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allPosts.filter((post) => {
      const matchesSearch = !query || `${post.title} ${post.body} ${post.tag}`.toLowerCase().includes(query);
      const matchesTag = activeFeed === 'All' || (activeFeed === 'Saved' ? saved.includes(post.id) : post.tag === activeFeed);
      return matchesSearch && matchesTag;
    });
  }, [allPosts, search, activeFeed, saved]);

  const filteredFood = foodSpots.filter((spot) => foodFilter === 'Everything' || spot.type === foodFilter);
  const visibleTrips = trips.filter((trip) => trip.group === tripGroup);
  const visiblePlaces = mapPlaces.filter((place) => mapFilter === 'All' || place.kind === mapFilter);
  const selectedPlace = visiblePlaces.find((p) => p.id === selectedId) ?? visiblePlaces[0];
  const visibleEvents = events.filter((event) => upcoming(event));

  const toggle = (list: string[], set: (next: string[]) => void, id: string) =>
    set(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);

  const draftValid = draft.title.trim().length > 0 && draft.body.trim().length > 0;
  const publishPost = () => {
    if (!draftValid) return;
    const post: FeedPost = {
      id: newId('post'), initials: 'YOU', name: 'You', tag: draft.tag,
      title: draft.title.trim().slice(0, LIMITS.title), body: draft.body.trim().slice(0, LIMITS.body),
      tone: 'coral', createdAt: Date.now(),
    };
    setUserPosts((current) => [post, ...current].slice(0, 200));
    setDraft({ title: '', body: '', tag: 'Campus' });
    setModal(null);
    setActiveFeed('All');
    setSearch('');
    showToast('Posted to your noticeboard.');
  };

  const deletePost = (id: string) => {
    if (!window.confirm('Delete this post?')) return;
    setUserPosts((current) => current.filter((p) => p.id !== id));
    setSaved((current) => current.filter((p) => p !== id));
    setLiked((current) => current.filter((p) => p !== id));
    setComments((current) => {
      const { [id]: _removed, ...rest } = current;
      return rest;
    });
    showToast('Post deleted.');
  };

  const commentPost = allPosts.find((p) => p.id === commentPostId) ?? null;
  const addComment = () => {
    const text = commentDraft.text.trim();
    if (!commentPostId || !text) return;
    const comment: Comment = {
      id: newId('c'), name: commentDraft.name.trim().slice(0, LIMITS.author) || 'You',
      text: text.slice(0, LIMITS.comment), createdAt: Date.now(),
    };
    setComments((current) => ({ ...current, [commentPostId]: [...(current[commentPostId] ?? []), comment].slice(-200) }));
    setCommentDraft((d) => ({ ...d, text: '' }));
  };

  return (
    <div className="grain min-h-[100dvh] overflow-x-hidden bg-[#f4f0e8] text-[#17363a]">
      <a href="#feed" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded-lg focus:bg-[#17363a] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#fff8e9]">Skip to content</a>

      <div className="fixed left-0 right-0 top-0 z-40 border-b border-[#d9d2c5] bg-[#f4f0e8]/95 backdrop-blur-sm lg:hidden">
        <div className="flex h-[68px] items-center justify-between px-5">
          <button data-testid="button-mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} className={`rounded-full p-2 text-[#17363a] ${focusRing}`} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} aria-controls="mobile-nav">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <button data-testid="button-mobile-logo" onClick={() => scrollToId('top')} className={`h-10 w-10 overflow-hidden rounded-lg bg-[#17363a] ${focusRing}`} aria-label="CusatThings, back to top">
            <img src={logo} alt="" className="h-full w-full object-cover" />
          </button>
          <button data-testid="button-mobile-share" onClick={() => setModal('share')} className={`rounded-full bg-[#c9502f] p-2.5 text-[#fff8e9] ${focusRing}`} aria-label="Share a tip">
            <Plus size={19} />
          </button>
        </div>
        {mobileOpen && <div id="mobile-nav" className="border-t border-[#d9d2c5] bg-[#f4f0e8] px-5 py-4">
          <nav aria-label="Sections" className="grid gap-1">
            {navItems.map((item) => { const Icon = navIcons[item.id]; return <button key={item.id} data-testid={`mobile-nav-${item.id}`} onClick={() => { scrollToId(item.id); setMobileOpen(false); }} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold hover:bg-[#e7dfd3] ${focusRing}`}><Icon size={17} />{item.label}</button>; })}
          </nav>
        </div>}
      </div>

      <aside className="fixed bottom-0 left-0 top-0 z-30 hidden w-[250px] flex-col border-r border-[#d9d2c5] bg-[#f4f0e8] px-7 py-7 lg:flex">
        <button data-testid="button-sidebar-logo" onClick={() => scrollToId('top')} className={`mb-12 flex items-center gap-3 text-left ${focusRing}`}>
          <span className="h-12 w-12 overflow-hidden rounded-[13px] bg-[#17363a]"><img src={logo} alt="" className="h-full w-full object-cover" /></span>
          <span><span className="display block text-lg font-bold tracking-[-.04em]">CusatThings</span><span className="section-label text-[#566761]">student commons</span></span>
        </button>
        <div className="section-label mb-4 text-[#566761]">Explore campus</div>
        <nav aria-label="Sections" className="space-y-1">
          {navItems.map((item) => { const Icon = navIcons[item.id]; const active = activeSection === item.id; return <button key={item.id} data-testid={`nav-${item.id}`} onClick={() => scrollToId(item.id)} aria-current={active ? 'true' : undefined} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold transition-colors hover:bg-[#e8e0d4] ${active ? 'bg-[#e8e0d4]' : ''} ${focusRing}`}><Icon size={17} className="text-[#b8431f]" /><span>{item.label}</span>{active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#c9502f]" />}</button>; })}
        </nav>
        <div className="mt-auto">
          <div className="mb-4 rounded-2xl bg-[#17363a] p-4 text-[#fff8e9]">
            <p className="display text-[15px] font-semibold leading-tight">Know something the noticeboard should?</p>
            <button data-testid="button-sidebar-share" onClick={() => setModal('share')} className={`mt-4 flex items-center gap-1 text-xs font-bold text-[#f5c85a] ${focusRing}`}>Add a tip <ArrowUpRight size={13} /></button>
          </div>
          <a data-testid="link-instagram" href="https://www.instagram.com/cusathings/?hl=en" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-2 text-xs font-semibold text-[#566761] hover:text-[#b8431f] ${focusRing}`}><Instagram size={15} /> @cusathings <ExternalLink size={11} className="ml-auto" /><span className="sr-only">(opens in a new tab)</span></a>
        </div>
      </aside>

      <main className="lg:pl-[250px]">
        <div id="top" className="mx-auto max-w-[1370px] px-5 pb-16 pt-[92px] sm:px-8 lg:px-14 lg:pt-10">
          <header className="mb-8 hidden items-center justify-between lg:flex">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#566761]"><MapPin size={14} className="text-[#b8431f]" /> South Kalamassery, Kochi <span className="mx-2 text-[#9a9184]" aria-hidden>/</span> {todayLabel()}</div>
            <button data-testid="button-header-share" onClick={() => setModal('share')} className={`flex items-center gap-2 rounded-full bg-[#c9502f] px-4 py-2.5 text-xs font-bold text-[#fff8e9] transition-transform hover:-translate-y-0.5 ${focusRing}`}><Plus size={15} /> Share a tip</button>
          </header>

          <section aria-labelledby="hero-title" className="rise relative mb-14 overflow-hidden rounded-[28px] bg-[#17363a] px-7 py-10 text-[#fff8e9] sm:px-12 sm:py-14 lg:px-16 lg:py-[72px]">
            <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[38px] border-[#f5c85a]/20" /><div className="absolute -bottom-40 right-32 h-72 w-72 rounded-full border-[1px] border-[#8fc9bd]/35" />
            <div className="relative max-w-[760px]">
              <div className="section-label mb-5 flex items-center gap-2 text-[#f5c85a]"><span className="h-2 w-2 rounded-full bg-[#f5c85a]" /> the unofficial campus layer</div>
              <h1 id="hero-title" className="display max-w-[700px] text-[clamp(2.8rem,6.5vw,6.2rem)] font-bold leading-[.94] tracking-[-.075em]">Everything happening<br /><span className="text-[#f5c85a]">around CUSAT.</span></h1>
              <p className="mt-7 max-w-[510px] text-[15px] leading-7 text-[#d3e0d9] sm:text-[17px]">Useful things, good food, spontaneous plans, and the tiny campus knowledge nobody puts on a noticeboard.</p>
              <div className="mt-9 flex flex-wrap gap-3"><button data-testid="button-hero-feed" onClick={() => scrollToId('feed')} className={`flex items-center gap-2 rounded-full bg-[#c9502f] px-5 py-3 text-sm font-bold text-[#fff8e9] transition-transform hover:-translate-y-1 ${focusRing}`}>See the noticeboard <ChevronRight size={16} /></button><button data-testid="button-hero-map" onClick={() => scrollToId('map')} className={`flex items-center gap-2 rounded-full border border-[#8fb0aa] px-5 py-3 text-sm font-bold text-[#fff8e9] hover:bg-[#264c4e] ${focusRing}`}>Find your way around <Navigation size={15} /></button></div>
            </div>
            <div aria-hidden className="float absolute bottom-7 right-8 hidden w-48 rotate-[-5deg] rounded-2xl bg-[#f5c85a] p-5 text-[#17363a] shadow-2xl sm:block lg:right-16 lg:w-56">
              <div className="mb-8 flex items-center justify-between"><CircleDot size={18} /><span className="section-label">field note</span></div><p className="display text-[18px] font-bold leading-tight">“The best plans usually start with ‘are you free tonight?’”</p>
            </div>
          </section>

          <section id="feed" aria-labelledby="feed-title" className="mb-24 scroll-mt-24">
            <SectionHeading id="feed-title" eyebrow="01 / the noticeboard" title="Campus, in the know." description="Tips and notices you add are saved in this browser for now." action={<button data-testid="button-share-feed" onClick={() => setModal('share')} className={`flex items-center gap-2 rounded-full border border-[#8f887c] px-4 py-2.5 text-xs font-bold hover:bg-[#e8e0d4] ${focusRing}`}><Share2 size={14} /> Share something</button>} />
            <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-center">
              <div className="relative flex-1"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#566761]" aria-hidden /><input data-testid="input-feed-search" type="search" aria-label="Search the noticeboard" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tips, food, notices…" className="h-12 w-full rounded-xl border border-[#b9b1a3] bg-[#f8f4ec] pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-[#6b7a73] focus:border-[#b8431f] focus:ring-2 focus:ring-[#b8431f]/25" /></div>
              <div role="group" aria-label="Filter posts" className="flex gap-1 overflow-x-auto rounded-xl bg-[#e8e0d4] p-1">{feedFilters.map((filter) => <button key={filter} data-testid={`filter-feed-${filter.toLowerCase().replaceAll(' ', '-')}`} aria-pressed={activeFeed === filter} onClick={() => setActiveFeed(filter)} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${activeFeed === filter ? 'bg-[#17363a] text-[#fff8e9]' : 'text-[#566761] hover:text-[#17363a]'} ${focusRing}`}>{filter}{filter === 'Saved' && saved.length > 0 ? ` (${saved.length})` : ''}</button>)}</div>
            </div>
            <div className="mt-7 grid gap-4 lg:grid-cols-[1.32fr_1fr_1fr]">
              {filteredPosts.length ? filteredPosts.map((post, index) => (
                <PostCard key={post.id} post={post} featured={index === 0 && filteredPosts.length > 2} liked={liked.includes(post.id)} saved={saved.includes(post.id)} commentCount={comments[post.id]?.length ?? 0}
                  onLike={() => toggle(liked, setLiked, post.id)}
                  onSave={() => { toggle(saved, setSaved, post.id); showToast(saved.includes(post.id) ? 'Removed from saved.' : 'Saved for later.'); }}
                  onComment={() => setCommentPostId(post.id)}
                  onDelete={post.createdAt ? () => deletePost(post.id) : undefined} />
              )) : <EmptyFeed saved={activeFeed === 'Saved'} onReset={() => { setSearch(''); setActiveFeed('All'); }} />}
            </div>
          </section>

          <section id="pulse" aria-labelledby="pulse-title" className="mb-24 scroll-mt-24">
            <div className="grid gap-8 lg:grid-cols-[.9fr_1.55fr]">
              <div><div className="section-label mb-4 text-[#b8431f]">02 / campus pulse</div><h2 id="pulse-title" className="display max-w-[370px] text-4xl font-bold leading-[.98] tracking-[-.06em] sm:text-5xl">A little more life after class.</h2><p className="mt-5 max-w-[350px] text-sm leading-6 text-[#566761]">Clubs, screenings, pop-ups, and the things that make a Tuesday feel less like a Tuesday.</p></div>
              <div className="relative overflow-hidden rounded-[24px] bg-[#e7d6c2] p-6 sm:p-8"><div aria-hidden className="absolute right-5 top-5 text-[#9a4f3b]"><Sparkles size={28} /></div><div className="section-label text-[#7a4330]">happening on campus</div>
                {visibleEvents.length ? <ul className="mt-10 grid gap-3 sm:grid-cols-2">{visibleEvents.map((event, index) => {
                  const isGoing = going.includes(event.id);
                  return <li key={event.id} data-testid={`card-event-${event.id}`} className={`flex flex-col justify-between rounded-2xl p-5 ${index % 2 === 0 ? 'bg-[#b8431f] text-[#fff8e9]' : 'bg-[#fff8e9]'}`}>
                    <div><div className="mb-8 flex items-center justify-between">{index % 2 === 0 ? <Ticket size={22} aria-hidden /> : <CalendarDays size={22} aria-hidden />}<span className="section-label">{event.date ? new Date(`${event.date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'date tba'}</span></div>
                      <h3 className="display text-xl font-bold leading-tight">{event.title}</h3><p className={`mt-3 text-xs ${index % 2 === 0 ? 'text-[#ffe9d6]' : 'text-[#566761]'}`}>{event.kicker} · {event.note}</p></div>
                    <div className="mt-8 flex items-center justify-between gap-2 text-xs"><span className="flex items-center gap-1"><MapPin size={13} aria-hidden /> {event.place}</span>
                      <button data-testid={`button-rsvp-${event.id}`} aria-pressed={isGoing} onClick={() => { toggle(going, setGoing, event.id); showToast(isGoing ? 'Removed from your plans.' : 'Added to your plans on this device.'); }} className={`rounded-full px-3 py-1.5 font-bold ${index % 2 === 0 ? 'bg-[#fff8e9] text-[#17363a]' : 'bg-[#17363a] text-[#fff8e9]'} ${focusRing}`}>{isGoing ? 'Going ✓' : 'I’m interested'}</button></div>
                  </li>;
                })}</ul> : <p className="mt-10 rounded-2xl bg-[#fff8e9] p-6 text-sm text-[#566761]">No upcoming events are listed right now.</p>}
              </div>
            </div>
          </section>

          <section id="food" aria-labelledby="food-title" className="mb-24 scroll-mt-24">
            <SectionHeading id="food-title" eyebrow="03 / the important stuff" title="Where are we eating?" description="A field guide to nearby fuel, with closing times." />
            <div role="group" aria-label="Filter food" className="mt-7 flex gap-2 overflow-x-auto pb-2">{foodFilters.map((filter) => <button key={filter} data-testid={`filter-food-${filter.toLowerCase().replaceAll(' ', '-')}`} aria-pressed={foodFilter === filter} onClick={() => setFoodFilter(filter)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${foodFilter === filter ? 'bg-[#17363a] text-[#fff8e9]' : 'border border-[#b9b1a3] text-[#566761]'} ${focusRing}`}>{filter}</button>)}</div>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{filteredFood.map((spot) => <li key={spot.id} data-testid={`card-food-${spot.id}`} className="overflow-hidden rounded-2xl border border-[#d9d2c5] bg-[#f8f4ec]"><div className={`relative h-24 ${spot.color} p-4`}><Utensils aria-hidden className="absolute bottom-4 left-4 text-[#17363a]/60" size={29} /></div><div className="p-5"><div className="flex items-start justify-between gap-2"><div><h3 className="display text-lg font-bold">{spot.name}</h3><p className="mt-1 text-xs text-[#566761]">{spot.detail}</p></div><span className="text-xs font-bold text-[#b8431f]" aria-label={`Price ${spot.price}`}>{spot.price}</span></div><div className="mt-6 flex items-center justify-between text-[11px] font-semibold text-[#566761]"><span className="flex items-center gap-1"><Clock3 size={12} aria-hidden /> Open until {spot.open}</span><span className="rounded-full bg-[#e8e0d4] px-2 py-1">{spot.type}</span></div></div></li>)}</ul>
            {!filteredFood.length && <p className="mt-4 text-sm text-[#566761]">Nothing listed for this filter yet.</p>}
          </section>

          <section id="trips" aria-labelledby="trips-title" className="mb-24 scroll-mt-24 overflow-hidden rounded-[26px] bg-[#d8e5dc] px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><div className="section-label mb-4 text-[#2f5f57]">04 / get out a bit</div><h2 id="trips-title" className="display text-4xl font-bold leading-[.98] tracking-[-.06em] sm:text-5xl">The Kochi<br /><span className="text-[#b8431f]">escape plan.</span></h2></div><div role="group" aria-label="Trip length" className="flex gap-1 rounded-xl bg-[#c5d8cd] p-1">{tripGroups.map((tab) => <button key={tab} data-testid={`tab-trip-${tab.toLowerCase().replaceAll(' ', '-')}`} aria-pressed={tripGroup === tab} onClick={() => setTripGroup(tab)} className={`rounded-lg px-3 py-2 text-xs font-bold ${tripGroup === tab ? 'bg-[#17363a] text-[#fff8e9]' : 'text-[#2f5f57]'} ${focusRing}`}>{tab}</button>)}</div></div>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">{visibleTrips.map((trip, index) => <li key={trip.id} data-testid={`card-trip-${trip.id}`} className={`relative min-h-[260px] overflow-hidden rounded-2xl p-6 text-[#fff8e9] ${trip.bg}`}><div className="flex items-start justify-between"><span className="section-label text-[#fff8e9]">{String(index + 1).padStart(2, '0')} / route</span><Compass size={20} aria-hidden /></div><div className="absolute bottom-6 left-6 right-6"><h3 className="display text-2xl font-bold">{trip.title}</h3><p className="mt-2 max-w-[250px] text-sm leading-5 text-[#fff8e9]/90">{trip.line}</p><div className="mt-5 flex gap-3 text-[10px] font-bold uppercase tracking-wider text-[#fff8e9]/90"><span>{trip.distance}</span><span aria-hidden>·</span><span>{trip.time}</span></div></div></li>)}</ul>
          </section>

          <section id="map" aria-labelledby="map-title" className="mb-16 scroll-mt-24">
            <SectionHeading id="map-title" eyebrow="05 / find your bearings" title="Campus, decoded." description="A hand-drawn map of the places you actually need. Pick a marker." action={<button data-testid="button-map-help" onClick={() => setModal('map')} className={`flex items-center gap-2 rounded-full border border-[#8f887c] px-4 py-2.5 text-xs font-bold hover:bg-[#e8e0d4] ${focusRing}`}><Layers3 size={14} /> Map key</button>} />
            <div className="mt-7 overflow-hidden rounded-[25px] border border-[#b3c4b9] bg-[#d8e5dc]">
              <div className="flex flex-col border-b border-[#b3c4b9] bg-[#e9f0e7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2 text-sm font-bold"><span className="h-2.5 w-2.5 rounded-full bg-[#c9502f]" /> CUSAT / South Kalamassery</div><div role="group" aria-label="Filter places" className="mt-3 flex gap-1 overflow-x-auto sm:mt-0">{placeKinds.map(({ key, label }) => <button key={key} data-testid={`filter-map-${key}`} aria-pressed={mapFilter === key} onClick={() => setMapFilter(key)} className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold ${mapFilter === key ? 'bg-[#17363a] text-[#fff8e9]' : 'text-[#2f5f57]'} ${focusRing}`}>{label}</button>)}</div></div>
              <div className="grid lg:grid-cols-[1.5fr_.7fr]">
                <div className="map-grid relative min-h-[390px] overflow-hidden bg-[#d8e5dc]"><div aria-hidden className="absolute left-[12%] top-[43%] h-3/4 w-[70%] rotate-[-15deg] rounded-[48%] border-[18px] border-[#a9cbbd]/55" /><div aria-hidden className="absolute left-[3%] top-[51%] h-[2px] w-[94%] rotate-[8deg] bg-[#e7b762]/70" /><div aria-hidden className="absolute left-[18%] top-[18%] h-48 w-2 rotate-[30deg] bg-[#b0d0c1]/55" /><div aria-hidden className="absolute right-[8%] top-[11%] h-24 w-32 rounded-[50%] bg-[#a9cbbd]/40" />
                  {visiblePlaces.map((place) => { const isSel = selectedPlace?.id === place.id; return <button key={place.id} data-testid={`map-marker-${place.id}`} aria-pressed={isSel} aria-label={place.name} onClick={() => setSelectedId(place.id)} style={{ left: `${place.x}%`, top: `${place.y}%` }} className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-transform hover:scale-110 ${isSel ? 'z-10' : ''} ${focusRing}`}><span className={`flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#d8e5dc] text-[10px] font-bold shadow-md ${isSel ? 'bg-[#c9502f] text-[#fff8e9]' : 'bg-[#17363a] text-[#fff8e9]'}`}>{place.short}</span><span className="mt-1 rounded bg-[#e9f0e7]/95 px-1.5 py-0.5 text-[10px] font-bold text-[#2c554e]">{place.name}</span></button>; })}
                  <p className="absolute bottom-2 left-3 text-[10px] font-semibold text-[#2c554e]">Schematic map, not to scale.</p>
                </div>
                <div className="bg-[#17363a] p-6 text-[#fff8e9] sm:p-8" aria-live="polite">
                  {selectedPlace ? <>
                    <div className="section-label text-[#8fc9bd]">{placeKinds.find((k) => k.key === selectedPlace.kind)?.label ?? 'place'}</div><div className="mt-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c9502f]"><MapPin size={22} aria-hidden /></div><h3 className="display mt-5 text-2xl font-bold leading-tight">{selectedPlace.name}</h3><p className="mt-3 text-sm leading-6 text-[#c6d6ce]">{selectedPlace.note}</p>
                    <button data-testid="button-map-details" aria-pressed={savedPlaces.includes(selectedPlace.id)} onClick={() => { const was = savedPlaces.includes(selectedPlace.id); toggle(savedPlaces, setSavedPlaces, selectedPlace.id); showToast(was ? `Removed ${selectedPlace.name}.` : `Saved ${selectedPlace.name}.`); }} className={`mt-8 flex items-center gap-2 text-xs font-bold text-[#f5c85a] ${focusRing}`}>{savedPlaces.includes(selectedPlace.id) ? 'Saved ✓' : 'Save this spot'} <Bookmark size={14} fill={savedPlaces.includes(selectedPlace.id) ? 'currentColor' : 'none'} /></button>
                    {savedPlaces.length > 0 && <div className="mt-6 border-t border-[#2f5557] pt-4"><div className="section-label mb-2 text-[#8fc9bd]">your saved spots</div><div className="flex flex-wrap gap-2">{savedPlaces.map((id) => mapPlaces.find((p) => p.id === id)).filter((p): p is (typeof mapPlaces)[number] => Boolean(p)).map((p) => <button key={p.id} onClick={() => { setMapFilter('All'); setSelectedId(p.id); }} className={`rounded-full bg-[#264c4e] px-3 py-1 text-[11px] font-bold ${focusRing}`}>{p.short}</button>)}</div></div>}
                  </> : <p className="text-sm text-[#c6d6ce]">No places in this filter.</p>}
                </div>
              </div>
            </div>
          </section>

          <footer className="border-t border-[#d9d2c5] py-8"><div className="flex flex-col justify-between gap-4 text-xs text-[#566761] sm:flex-row sm:items-center"><p><span className="font-bold text-[#17363a]">CusatThings</span> · made around campus, for campus.</p><p>Unofficial student community · not affiliated with the university administration</p></div></footer>
        </div>
      </main>

      <Dialog open={modal === 'share'} onOpenChange={(open) => !open && setModal(null)}>
        <DialogContent data-testid="modal-share" className="max-w-[500px] rounded-[25px] border-0 bg-[#f8f4ec] p-6 sm:p-8">
          <DialogHeader><div className="section-label text-[#b8431f]">add to the noticeboard</div><DialogTitle className="display text-3xl font-bold tracking-[-.05em]">What’s worth sharing?</DialogTitle><DialogDescription className="text-[#566761]">Saved in this browser only. Don’t post phone numbers or other personal details.</DialogDescription></DialogHeader>
          <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); publishPost(); }}>
            <div><label htmlFor="post-title" className="sr-only">Title</label><input id="post-title" data-testid="input-post-title" required maxLength={LIMITS.title} value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="Give it a clear title" className="h-12 w-full rounded-xl border border-[#b9b1a3] bg-[#fffaf2] px-4 text-sm outline-none focus:border-[#b8431f] focus:ring-2 focus:ring-[#b8431f]/25" /></div>
            <div><label htmlFor="post-body" className="sr-only">Details</label><textarea id="post-body" data-testid="input-post-body" required maxLength={LIMITS.body} value={draft.body} onChange={(event) => setDraft({ ...draft, body: event.target.value })} placeholder="The useful bit goes here…" rows={4} className="w-full resize-none rounded-xl border border-[#b9b1a3] bg-[#fffaf2] p-4 text-sm outline-none focus:border-[#b8431f] focus:ring-2 focus:ring-[#b8431f]/25" /><p className="mt-1 text-right text-[11px] text-[#566761]">{draft.body.length}/{LIMITS.body}</p></div>
            <div role="group" aria-label="Category" className="flex gap-2 overflow-x-auto">{POST_TAGS.map((tag) => <button type="button" key={tag} data-testid={`tag-post-${tag.toLowerCase().replaceAll(' ', '-')}`} aria-pressed={draft.tag === tag} onClick={() => setDraft({ ...draft, tag })} className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold ${draft.tag === tag ? 'bg-[#17363a] text-[#fff8e9]' : 'border border-[#b9b1a3] text-[#566761]'} ${focusRing}`}>{tag}</button>)}</div>
            <button type="submit" data-testid="button-publish-post" disabled={!draftValid} className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#c9502f] text-sm font-bold text-[#fff8e9] transition-opacity disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}><Send size={16} aria-hidden /> Publish to the noticeboard</button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={modal === 'map'} onOpenChange={(open) => !open && setModal(null)}>
        <DialogContent data-testid="modal-map-key" className="max-w-[390px] rounded-[25px] border-0 bg-[#f8f4ec] p-7">
          <DialogHeader><div className="section-label text-[#b8431f]">map key</div><DialogTitle className="display text-2xl font-bold">How to read it</DialogTitle><DialogDescription className="sr-only">Legend for the campus map</DialogDescription></DialogHeader>
          <div className="space-y-4">{[['bg-[#c9502f]', 'Selected place'], ['bg-[#17363a]', 'Other places']].map(([color, label]) => <div key={label} className="flex items-center gap-3 text-sm font-semibold"><span className={`h-3 w-3 rounded-full ${color}`} /> {label}</div>)}
            <p className="border-t border-[#d9d2c5] pt-5 text-xs leading-5 text-[#566761]">Pick a marker to read the note for that place. Positions are approximate: the map is schematic and not to scale. Use the filters to narrow places by type.</p></div>
        </DialogContent>
      </Dialog>

      <Dialog open={commentPost !== null} onOpenChange={(open) => { if (!open) setCommentPostId(null); }}>
        <DialogContent data-testid="modal-comments" className="max-w-[500px] rounded-[25px] border-0 bg-[#f8f4ec] p-6 sm:p-8">
          <DialogHeader><div className="section-label text-[#b8431f]">comments</div><DialogTitle className="display text-2xl font-bold tracking-[-.04em]">{commentPost?.title}</DialogTitle><DialogDescription className="text-[#566761]">Comments are saved in this browser only.</DialogDescription></DialogHeader>
          <ul className="max-h-[40vh] space-y-3 overflow-y-auto" aria-label="Comments">{(commentPost ? comments[commentPost.id] ?? [] : []).map((c) => <li key={c.id} className="rounded-xl bg-[#efe8dc] p-3"><p className="text-xs font-bold">{c.name} <span className="font-medium text-[#566761]">· {timeAgo(c.createdAt)}</span></p><p className="mt-1 whitespace-pre-wrap break-words text-sm">{c.text}</p></li>)}
            {commentPost && !(comments[commentPost.id]?.length) && <li className="text-sm text-[#566761]">No comments yet. Add the first one.</li>}</ul>
          <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); addComment(); }}>
            <label htmlFor="comment-name" className="sr-only">Your name (optional)</label><input id="comment-name" data-testid="input-comment-name" maxLength={LIMITS.author} value={commentDraft.name} onChange={(event) => setCommentDraft({ ...commentDraft, name: event.target.value })} placeholder="Name (optional)" className="h-11 w-full rounded-xl border border-[#b9b1a3] bg-[#fffaf2] px-4 text-sm outline-none focus:border-[#b8431f] focus:ring-2 focus:ring-[#b8431f]/25" />
            <label htmlFor="comment-text" className="sr-only">Comment</label><textarea id="comment-text" data-testid="input-comment-text" required maxLength={LIMITS.comment} rows={3} value={commentDraft.text} onChange={(event) => setCommentDraft({ ...commentDraft, text: event.target.value })} placeholder="Add a comment…" className="w-full resize-none rounded-xl border border-[#b9b1a3] bg-[#fffaf2] p-3 text-sm outline-none focus:border-[#b8431f] focus:ring-2 focus:ring-[#b8431f]/25" />
            <button type="submit" data-testid="button-add-comment" disabled={!commentDraft.text.trim()} className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#c9502f] text-sm font-bold text-[#fff8e9] disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}><Send size={15} aria-hidden /> Post comment</button>
          </form>
        </DialogContent>
      </Dialog>

      <div role="status" aria-live="polite" className="pointer-events-none fixed bottom-5 left-1/2 z-[60] -translate-x-1/2">
        {toast && <div data-testid="status-toast" className="flex items-center gap-2 rounded-full bg-[#17363a] px-5 py-3 text-xs font-bold text-[#fff8e9] shadow-xl"><Check size={15} className="text-[#f5c85a]" aria-hidden /> {toast}</div>}
      </div>
    </div>
  );
}

function SectionHeading({ id, eyebrow, title, description, action }: { id: string; eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="section-label mb-3 text-[#b8431f]">{eyebrow}</div><h2 id={id} className="display text-4xl font-bold leading-none tracking-[-.06em] sm:text-5xl">{title}</h2><p className="mt-4 max-w-[430px] text-sm leading-6 text-[#566761]">{description}</p></div>{action}</div>;
}

const toneClass: Record<Tone, string> = { coral: 'bg-[#ed7557]', teal: 'bg-[#8fc9bd]', yellow: 'bg-[#f5c85a]' };

function PostCard({ post, featured, liked, saved, commentCount, onLike, onSave, onComment, onDelete }: {
  post: FeedPost; featured?: boolean; liked: boolean; saved: boolean; commentCount: number;
  onLike: () => void; onSave: () => void; onComment: () => void; onDelete?: () => void;
}) {
  return (
    <article data-testid={`card-post-${post.id}`} className={`flex flex-col justify-between rounded-2xl border border-[#d9d2c5] bg-[#f8f4ec] p-5 ${featured ? 'min-h-[310px] lg:row-span-2' : 'min-h-[210px]'}`}>
      <div>
        <div className="mb-7 flex items-center justify-between gap-2"><div className="flex items-center gap-2.5"><span aria-hidden className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${toneClass[post.tone]} text-[#17363a]`}>{post.initials}</span><div><p className="text-xs font-bold">{post.name}</p><p className="text-[11px] text-[#566761]">{post.createdAt ? timeAgo(post.createdAt) : 'Starter tip'}</p></div></div><span className="rounded-full bg-[#e8e0d4] px-2.5 py-1 text-[11px] font-bold text-[#566761]">{post.tag}</span></div>
        <h3 className={`display break-words font-bold leading-tight tracking-[-.035em] ${featured ? 'text-2xl' : 'text-lg'}`}>{post.title}</h3>
        <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-[#566761]">{post.body}</p>
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-[#e1dbd0] pt-4 text-xs text-[#566761]">
        <div className="flex items-center gap-4">
          <button data-testid={`button-like-${post.id}`} aria-pressed={liked} onClick={onLike} className={`flex items-center gap-1.5 transition-colors ${liked ? 'text-[#b8431f]' : 'hover:text-[#b8431f]'} ${focusRing}`}><Heart size={15} fill={liked ? 'currentColor' : 'none'} aria-hidden /> {liked ? 'Helpful' : 'Mark helpful'}</button>
          <button data-testid={`button-comment-${post.id}`} onClick={onComment} aria-label={`Comments (${commentCount})`} className={`flex items-center gap-1.5 hover:text-[#b8431f] ${focusRing}`}><MessageCircle size={15} aria-hidden /> {commentCount}</button>
        </div>
        <div className="flex items-center gap-1">
          {onDelete && <button data-testid={`button-delete-${post.id}`} onClick={onDelete} aria-label="Delete post" className={`rounded-full p-1.5 hover:bg-[#e8e0d4] ${focusRing}`}><Trash2 size={15} aria-hidden /></button>}
          <button data-testid={`button-save-${post.id}`} aria-pressed={saved} aria-label={saved ? 'Remove from saved' : 'Save post'} onClick={onSave} className={`rounded-full p-1.5 ${saved ? 'bg-[#f5c85a] text-[#17363a]' : 'hover:bg-[#e8e0d4]'} ${focusRing}`}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'} aria-hidden /></button>
        </div>
      </div>
    </article>
  );
}

function EmptyFeed({ saved, onReset }: { saved: boolean; onReset: () => void }) {
  return <div data-testid="empty-feed" className="col-span-full rounded-2xl border border-dashed border-[#8f887c] bg-[#f8f4ec] px-6 py-12 text-center"><Search className="mx-auto text-[#b8431f]" size={25} aria-hidden /><h3 className="display mt-4 text-lg font-bold">{saved ? 'Nothing saved yet.' : 'Nothing on that noticeboard.'}</h3><p className="mt-2 text-sm text-[#566761]">{saved ? 'Tap the bookmark on a post to keep it here.' : 'Try another search, or be the first to share it.'}</p><button data-testid="button-reset-feed" onClick={onReset} className={`mt-5 text-xs font-bold text-[#b8431f] underline-offset-2 hover:underline ${focusRing}`}>Clear filters</button></div>;
}
