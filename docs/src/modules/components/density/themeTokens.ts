// Theme-level tokens (theme.typography.*, theme.shape.*). Unlike component
// styleOverrides these aren't in the codegen table — the structure below is
// hand-authored (stable, rarely changes) while values are read live off the
// built preset theme, so nothing drifts. Edits apply onto theme.typography /
// theme.shape, not theme.components.

export interface ThemeTokenKnob {
  /** override/mapping key (also the input's stable id) */
  id: string;
  /** input label */
  label: string;
  /** path into the theme, e.g. ['typography','h1','fontSize'] */
  path: readonly string[];
  /** numeric → coerce input to a number (lineHeight, radius); else keep string */
  numeric?: boolean;
  /** presets this token is confirmed "per design" for (hand-authored, like densityKnobs.done) */
  done?: Array<'high' | 'medium' | 'low'>;
}
export interface ThemeTokenSlot {
  /** heading (typography variant); '' = knobs sit directly under the group */
  key: string;
  knobs: ThemeTokenKnob[];
}
export interface ThemeTokenGroup {
  /** accordion title */
  key: string;
  slots: ThemeTokenSlot[];
}

const TYPOGRAPHY_VARIANTS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'button',
] as const;

const DONE_MEDIUM: Array<'high' | 'medium' | 'low'> = ['medium'];
// Variants the preset patches (per design, medium); h4/h5/h6/subtitle keep master.
const TYPOGRAPHY_DONE_MEDIUM = new Set<string>(['h1', 'h2', 'h3', 'body1', 'body2', 'button']);

export const themeTokenGroups: ThemeTokenGroup[] = [
  {
    key: 'Typography',
    slots: TYPOGRAPHY_VARIANTS.map((v) => {
      const done = TYPOGRAPHY_DONE_MEDIUM.has(v) ? { done: DONE_MEDIUM } : {};
      return {
        key: v,
        knobs: [
          {
            id: `typography.${v}.fontSize`,
            label: 'fontSize',
            path: ['typography', v, 'fontSize'],
            ...done,
          },
          {
            id: `typography.${v}.lineHeight`,
            label: 'lineHeight',
            path: ['typography', v, 'lineHeight'],
            numeric: true,
            ...done,
          },
        ],
      };
    }),
  },
  {
    key: 'Border Radius',
    slots: [
      {
        key: '',
        knobs: [
          {
            id: 'shape.borderRadius',
            label: 'radius',
            path: ['shape', 'borderRadius'],
            numeric: true,
          },
        ],
      },
    ],
  },
  {
    key: 'Spacing',
    slots: [
      {
        key: '',
        knobs: [
          // theme.spacing is var-backed in cssVariables mode (var(--mui-spacing));
          // canvas overrides ride --mui-spacing like radius rides --mui-shape-*.
          // theme.spacing is a FUNCTION, so the placeholder can't be read off the
          // theme — the sidebar special-cases it to PRESET_THEME_INPUT.spacing.
          {
            id: 'spacing',
            label: 'base (px)',
            path: ['spacing'],
            numeric: true,
          },
        ],
      },
    ],
  },
];

/**
 * Per-preset USERLAND theme inputs — the composition layer. `enhance*Density`
 * itself only makes components density-aware (scale vars + re-authored
 * component CSS); type ramps, radius and spacing base are ordinary theme
 * design, authored here as `createTheme()` inputs set BEFORE the enhancer —
 * what a real design system does in userland. Shared by the playground
 * (base theme + placeholders) and the export.
 *
 * Values from the design-system token export: h1–h3/body1/caption pair
 * fontSize+lineHeight token-for-token (font-size/line-height variable xxl…s);
 * h4–h6/subtitle/body2 interpolate (h4 = h3/body1 midpoint, h5/subtitle1 =
 * body1 fs, h6/subtitle2 = body2 fs; subtitle lh = body lh + 2px; body2 =
 * body1 −1px fs / −2px lh); button mirrors body1. Radius =
 * border-radius/variable/m (4/6/8). Spacing: the unit stays MUI's 8 for every
 * preset — the density core assumes a fixed 8px base (steps derive as
 * multipliers on it), and overall tightening is the scaling dial's job.
 */
export type PresetThemeInput = {
  typography: Record<string, Record<string, string | number>>;
  shape: { borderRadius: number };
  spacing: number;
};

export const PRESET_THEME_INPUT: Record<'high' | 'medium' | 'low', PresetThemeInput> = {
  high: {
    typography: {
      h1: { fontSize: '1.5rem', lineHeight: 1.25 }, // 24/30
      h2: { fontSize: '1.25rem', lineHeight: 1.3 }, // 20/26
      h3: { fontSize: '0.875rem', lineHeight: 1.571428571 }, // 14/22
      h4: { fontSize: '0.8125rem', lineHeight: 1.538461538 }, // 13/20
      h5: { fontSize: '0.75rem', lineHeight: 1.5 }, // 12/18
      h6: { fontSize: '0.6875rem', lineHeight: 1.454545455 }, // 11/16
      subtitle1: { fontSize: '0.75rem', lineHeight: 1.5 }, // 12/18
      subtitle2: { fontSize: '0.6875rem', lineHeight: 1.454545455 }, // 11/16
      body1: { fontSize: '0.75rem', lineHeight: 1.333333333 }, // 12/16
      body2: { fontSize: '0.6875rem', lineHeight: 1.272727273 }, // 11/14
      caption: { fontSize: '0.6875rem', lineHeight: 1.272727273 }, // 11/14
      button: {
        fontSize: '0.75rem',
        lineHeight: 1.333333333,
        textTransform: 'initial',
        letterSpacing: 0,
      }, // = body1
    },
    shape: { borderRadius: 4 },
    spacing: 8,
  },
  medium: {
    typography: {
      h1: { fontSize: '1.75rem', lineHeight: 1.285714286 }, // 28/36
      h2: { fontSize: '1.5rem', lineHeight: 1.25 }, // 24/30
      h3: { fontSize: '1rem', lineHeight: 1.625 }, // 16/26
      h4: { fontSize: '0.9375rem', lineHeight: 1.6 }, // 15/24
      h5: { fontSize: '0.875rem', lineHeight: 1.571428571 }, // 14/22
      h6: { fontSize: '0.8125rem', lineHeight: 1.538461538 }, // 13/20
      subtitle1: { fontSize: '0.875rem', lineHeight: 1.571428571 }, // 14/22
      subtitle2: { fontSize: '0.8125rem', lineHeight: 1.538461538 }, // 13/20
      body1: { fontSize: '0.875rem', lineHeight: 1.428571429 }, // 14/20
      body2: { fontSize: '0.8125rem', lineHeight: 1.384615385 }, // 13/18
      caption: { fontSize: '0.75rem', lineHeight: 1.5 }, // 12/18
      button: {
        fontSize: '0.875rem',
        lineHeight: 1.428571429,
        textTransform: 'initial',
        letterSpacing: 0,
      }, // = body1
    },
    shape: { borderRadius: 6 },
    spacing: 8,
  },
  low: {
    typography: {
      h1: { fontSize: '1.875rem', lineHeight: 1.266666667 }, // 30/38
      h2: { fontSize: '1.625rem', lineHeight: 1.230769231 }, // 26/32
      h3: { fontSize: '1.25rem', lineHeight: 1.4 }, // 20/28
      h4: { fontSize: '1.125rem', lineHeight: 1.444444444 }, // 18/26
      h5: { fontSize: '1rem', lineHeight: 1.5 }, // 16/24
      h6: { fontSize: '0.9375rem', lineHeight: 1.466666667 }, // 15/22
      subtitle1: { fontSize: '1rem', lineHeight: 1.5 }, // 16/24
      subtitle2: { fontSize: '0.9375rem', lineHeight: 1.466666667 }, // 15/22
      body1: { fontSize: '1rem', lineHeight: 1.375 }, // 16/22
      body2: { fontSize: '0.9375rem', lineHeight: 1.333333333 }, // 15/20
      caption: { fontSize: '0.875rem', lineHeight: 1.428571429 }, // 14/20
      button: { fontSize: '1rem', lineHeight: 1.375, textTransform: 'initial', letterSpacing: 0 }, // = body1
    },
    shape: { borderRadius: 8 },
    spacing: 8,
  },
};

/** Flat id → knob lookup across every token group (done + path resolution). */
const tokenKnobById: Record<string, ThemeTokenKnob> = {};
for (const group of themeTokenGroups) {
  for (const slot of group.slots) {
    for (const knob of slot.knobs) {
      tokenKnobById[knob.id] = knob;
    }
  }
}

/** True when `id` is a theme-token knob (vs a component/density row id). */
export const isTokenId = (id: string): boolean => id in tokenKnobById;

/** Presets a token knob is confirmed "per design" for — mirrors knobDonePresets. */
export const tokenDonePresets = (id: string): readonly string[] => tokenKnobById[id]?.done ?? [];

/** Live value at a token path on the built preset theme (placeholder/default). */
export function readThemeToken(theme: unknown, path: readonly string[]): string {
  let node: unknown = theme;
  for (const seg of path) {
    if (node == null) {
      return '';
    }
    node = (node as Record<string, unknown>)[seg];
  }
  return node == null ? '' : String(node);
}

/** Immutably set `value` at `path`, cloning nodes along the way. */
export function setThemeToken<T>(root: T, path: readonly string[], value: unknown): T {
  if (path.length === 0) {
    return value as T;
  }
  const [head, ...rest] = path;
  const node = (root ?? {}) as Record<string, unknown>;
  return { ...node, [head]: setThemeToken(node[head], rest, value) } as T;
}

/** Coerce a typed string to the token's runtime type. */
export function coerceToken(raw: string, numeric?: boolean): string | number {
  const v = raw.trim();
  if (numeric) {
    const n = Number(v);
    if (v !== '' && Number.isFinite(n)) {
      return n;
    }
  }
  return v;
}
