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

export const themeTokenGroups: ThemeTokenGroup[] = [
  {
    key: 'Typography',
    slots: TYPOGRAPHY_VARIANTS.map((v) => ({
      key: v,
      knobs: [
        { id: `typography.${v}.fontSize`, label: 'fontSize', path: ['typography', v, 'fontSize'] },
        {
          id: `typography.${v}.lineHeight`,
          label: 'lineHeight',
          path: ['typography', v, 'lineHeight'],
          numeric: true,
        },
      ],
    })),
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
];

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
