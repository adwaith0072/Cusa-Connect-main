/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#e9e4d6",
      "foreground": "#080b12",
      "border": "#cfc8b8",
      "card": "#f2eee3",
      "cardForeground": "#080b12",
      "popover": "#f2eee3",
      "popoverForeground": "#080b12",
      "primary": "#f4a340",
      "primaryForeground": "#080b12",
      "secondary": "#64b7a6",
      "secondaryForeground": "#080b12",
      "muted": "#ddd8ca",
      "mutedForeground": "#55606b",
      "accent": "#ed6d54",
      "accentForeground": "#080b12",
      "destructive": "#c7433e",
      "destructiveForeground": "#f7f1e3",
      "input": "#cfc8b8",
      "ring": "#f4a340",
      "chart1": "#f4a340",
      "chart2": "#64b7a6",
      "chart3": "#ed6d54",
      "chart4": "#080b12",
      "chart5": "#9da4ad",
      "sidebar": "#111825",
      "sidebarForeground": "#e9e4d6",
      "sidebarBorder": "#303746",
      "sidebarPrimary": "#f4a340",
      "sidebarPrimaryForeground": "#080b12",
      "sidebarAccent": "#1c2633",
      "sidebarAccentForeground": "#e9e4d6",
      "sidebarRing": "#f4a340"
    },
    "dark": {
      "background": "#080b12",
      "foreground": "#e9e4d6",
      "border": "#303746",
      "card": "#111825",
      "cardForeground": "#e9e4d6",
      "popover": "#111825",
      "popoverForeground": "#e9e4d6",
      "primary": "#f4a340",
      "primaryForeground": "#080b12",
      "secondary": "#64b7a6",
      "secondaryForeground": "#080b12",
      "muted": "#1c2633",
      "mutedForeground": "#9da4ad",
      "accent": "#ed6d54",
      "accentForeground": "#080b12",
      "destructive": "#c7433e",
      "destructiveForeground": "#f7f1e3",
      "input": "#303746",
      "ring": "#f4a340",
      "chart1": "#f4a340",
      "chart2": "#64b7a6",
      "chart3": "#ed6d54",
      "chart4": "#e9e4d6",
      "chart5": "#9da4ad",
      "sidebar": "#111825",
      "sidebarForeground": "#e9e4d6",
      "sidebarBorder": "#303746",
      "sidebarPrimary": "#f4a340",
      "sidebarPrimaryForeground": "#080b12",
      "sidebarAccent": "#1c2633",
      "sidebarAccentForeground": "#e9e4d6",
      "sidebarRing": "#f4a340"
    }
  },
  "fontFamily": {
    "sans": [
      "Manrope",
      "sans-serif"
    ],
    "serif": [
      "Barlow Condensed",
      "Arial Narrow",
      "sans-serif"
    ],
    "display": [
      "Barlow Condensed",
      "Arial Narrow",
      "sans-serif"
    ],
    "body": [
      "Manrope",
      "sans-serif"
    ],
    "mono": [
      "DM Mono",
      "monospace"
    ]
  },
  "radius": "0.25rem",
  "spacing": "0.25rem"
} as const;

export type Tokens = typeof tokens;
export default tokens;
