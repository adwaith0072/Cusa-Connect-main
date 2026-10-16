import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Guidelines } from './parts';

const CORE_SWATCHES = [
  { name: 'Primary', className: 'bg-primary' },
  { name: 'Secondary', className: 'bg-secondary' },
  { name: 'Accent', className: 'bg-accent' },
] as const;

const SUPPORTING_SWATCHES = [
  { name: 'Background', className: 'border bg-background' },
  { name: 'Foreground', className: 'bg-foreground' },
  { name: 'Muted', className: 'bg-muted' },
  { name: 'Destructive', className: 'bg-destructive' },
  { name: 'Border', className: 'bg-border' },
] as const;

const TYPE_SCALE = [
  { label: 'Display', className: 'text-4xl font-bold' },
  { label: 'Heading', className: 'text-2xl font-semibold' },
  { label: 'Body', className: 'text-base' },
  { label: 'Label', className: 'text-sm font-medium' },
  { label: 'Caption', className: 'text-sm text-muted-foreground' },
] as const;

const SPACING_SCALE = [
  { label: '4', className: 'w-4' },
  { label: '8', className: 'w-8' },
  { label: '12', className: 'w-12' },
  { label: '16', className: 'w-16' },
  { label: '24', className: 'w-24' },
] as const;

const COLOR_GUIDELINES = [
  { kind: 'do' as const, text: 'Use Ink and Paper as the high-contrast foundation; let Saffron, Coral, and Teal carry meaning.' },
  { kind: 'do' as const, text: 'Reserve Saffron for primary action and wayfinding so it remains easy to spot.' },
  { kind: 'dont' as const, text: 'Do not introduce extra brand colors when an existing semantic role can carry the meaning.' },
];

const TYPOGRAPHY_GUIDELINES = [
  { kind: 'do' as const, text: 'Use Barlow Condensed for confident, compact headlines and scene-setting moments.' },
  { kind: 'do' as const, text: 'Use Manrope for approachable reading and DM Mono for labels, timestamps, and coordinates.' },
  { kind: 'dont' as const, text: 'Do not use the display face for long paragraphs or dense utility controls.' },
];

const IMAGERY_GUIDELINES = [
  { kind: 'do' as const, text: 'Show real campus energy: students, shared spaces, food, movement, and nearby Kerala destinations.' },
  { kind: 'do' as const, text: 'Keep imagery documentary and tactile with restrained saturation and strong contrast.' },
  { kind: 'dont' as const, text: 'Do not use generic stock imagery that could belong to any campus or city.' },
];

const MOTION_GUIDELINES = [
  { kind: 'do' as const, text: 'Use quick reveals, sliding rules, and layered entrances to make browsing feel active without becoming noisy.' },
  { kind: 'do' as const, text: 'Keep motion purposeful: introduce a story, reveal a place, or guide attention to the next action.' },
  { kind: 'dont' as const, text: 'Do not animate every element at once or make essential information depend on motion.' },
];

const TONE_GUIDELINES = [
  { kind: 'do' as const, text: 'Write like a well-connected campus friend: direct, curious, local, and generous with useful context.' },
  { kind: 'do' as const, text: 'Make room for discovery across departments, clubs, food spots, hangouts, and trips.' },
  { kind: 'dont' as const, text: 'Do not sound corporate, overly formal, or exclusive to one department or friend group.' },
];

function Swatch({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  return (
    <div className="space-y-2">
      <div className={`h-16 rounded-lg ${className}`} />
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
}

export function OverviewPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-xl border bg-card p-5 text-card-foreground">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Campus editorial palette
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {CORE_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border bg-card p-5 text-card-foreground">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Typography
          </h2>
          <div className="mt-4 space-y-3">
            {TYPE_SCALE.map((entry) => (
              <p key={entry.label} className={`${entry.className} ${entry.label === 'Display' || entry.label === 'Heading' ? 'font-display' : ''}`}>
                {entry.label}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-xl border bg-card p-5 text-card-foreground">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            In use
          </h2>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Share a campus moment</CardTitle>
              <CardDescription>
                Components composed from the CusatThings tokens.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="overview-name">What’s happening?</Label>
                <Input id="overview-name" placeholder="A club meet, food find, or campus tip…" />
              </div>
              <div className="flex items-center gap-2">
                <Switch defaultChecked id="overview-notify" />
                <Label htmlFor="overview-notify">Share with the campus</Label>
                <Badge className="ml-auto">New</Badge>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button>Save</Button>
              <Button variant="outline">Cancel</Button>
            </CardFooter>
          </Card>
        </section>
      </div>

      <section className="space-y-4 rounded-xl border bg-card p-5 text-card-foreground">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Components
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>
    </div>
  );
}

export function ColorsPage() {
  return (
    <div className="space-y-8 rounded-xl border bg-card p-6 text-card-foreground">
      <section className="space-y-4">
        <div>
          <h2 className="font-semibold">Brand colors</h2>
          <p className="text-sm text-muted-foreground">
            The core roles used for emphasis, supporting actions, and accents.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {CORE_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="font-semibold">Semantic and surface colors</h2>
          <p className="text-sm text-muted-foreground">
            Roles for text, backgrounds, borders, muted content, and danger.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {SUPPORTING_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>
    </div>
  );
}

export function FontsPage() {
  return (
    <div className="space-y-8 rounded-xl border bg-card p-6 text-card-foreground">
      <section>
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Font family
        </h2>
        <p className="mt-4 font-display text-5xl font-bold tracking-tight">The quick brown fox</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Barlow Condensed leads; Manrope supports reading; DM Mono marks the way.
        </p>
      </section>

      <section className="space-y-4 border-t pt-6">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Type scale
        </h2>
        {TYPE_SCALE.map((entry) => (
          <div key={entry.label} className="grid gap-2 sm:grid-cols-[88px_1fr]">
            <span className="pt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {entry.label}
            </span>
            <p className={`${entry.className} ${entry.label === 'Display' || entry.label === 'Heading' ? 'font-display' : ''}`}>Find your people, place, and next plan.</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export function LayoutPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-xl border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Spacing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The spacing scale, derived from the base spacing token.
        </p>
        <div className="mt-6 space-y-4">
          {SPACING_SCALE.map((space) => (
            <div key={space.label} className="flex items-center gap-4">
              <span className="w-8 text-xs text-muted-foreground">
                {space.label}
              </span>
              <div className={`h-3 rounded-full bg-primary ${space.className}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Radius</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Corner treatments derive from the base radius token.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[
            { label: 'Small', className: 'rounded-sm' },
            { label: 'Medium', className: 'rounded-md' },
            { label: 'Large', className: 'rounded-lg' },
            { label: 'Extra large', className: 'rounded-xl' },
          ].map((radius) => (
            <div
              key={radius.label}
              className={`flex h-24 items-end border bg-muted p-3 ${radius.className}`}
            >
              <span className="text-xs font-medium">{radius.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function BrandPage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-xl border bg-[#080b12] p-6 text-[#e9e4d6] sm:p-8">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <div className="flex size-36 shrink-0 items-center justify-center rounded-2xl bg-[#e9e4d6] p-4">
            <img
              src="/references/cusatthings-logo.png"
              alt="CusatThings logo"
              className="size-full object-contain"
            />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9da4ad]">Brand lockup</p>
            <h2 className="mt-2 font-display text-6xl font-bold leading-[0.8] tracking-tight text-[#f4a340]">CUSAT<br />THINGS</h2>
            <p className="mt-4 max-w-md text-sm text-[#9da4ad]">A shared visual language for campus life, local discovery, and the people who make CUSAT feel like home.</p>
          </div>
        </div>
      </section>
      <section className="rounded-xl border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Brand use</h2>
        <p className="mt-1 text-sm text-muted-foreground">Keep the mark clear, high-contrast, and connected to the student-community context.</p>
        <div className="mt-5">
          <Guidelines items={[
            { kind: 'do', text: 'Use the provided logo as the primary mark and preserve its clear space.' },
            { kind: 'do', text: 'Pair the mark with Ink, Paper, or a single strong accent from the palette.' },
            { kind: 'dont', text: 'Do not redraw, stretch, recolor, or place the mark over busy imagery.' },
          ]} />
        </div>
      </section>
    </div>
  );
}

export function GuidelinesPage() {
  const sections = [
    ['Color', 'Keep the palette recognizable and meaningful.', COLOR_GUIDELINES],
    ['Typography', 'Use contrast between condensed expression and friendly utility.', TYPOGRAPHY_GUIDELINES],
    ['Imagery', 'Make campus life feel specific to CUSAT and Kerala.', IMAGERY_GUIDELINES],
    ['Motion', 'Create momentum while keeping the experience readable.', MOTION_GUIDELINES],
    ['Student-community tone', 'Make every surface feel open, useful, and close to campus life.', TONE_GUIDELINES],
  ] as const;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {sections.map(([title, description, items]) => (
        <section key={title} className="rounded-xl border bg-card p-6 text-card-foreground">
          <h2 className="font-display text-2xl font-bold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          <div className="mt-5">
            <Guidelines items={items} />
          </div>
        </section>
      ))}
    </div>
  );
}
