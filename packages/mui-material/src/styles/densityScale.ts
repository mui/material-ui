import { Theme } from './createTheme';

/**
 * Named density steps, surfaced as `--<prefix>-density-*` CSS vars. Presets assign a
 * component's sized tokens to these steps (via `theme.vars.density` + `addRootOverride`).
 */
export interface DensityScale {
  'xx-small': string;
  'x-small': string;
  small: string;
  medium: string;
  large: string;
  'x-large': string;
  'xx-large': string;
}

export type DensityKey = keyof DensityScale;

/**
 * Per-step multipliers on the spacing unit. The unit is ASSUMED fixed at MUI's
 * default 8px — presets never read a custom base; steps derive as
 * `m × var(--<prefix>-spacing)` so they follow the scaling dial automatically.
 */
export type DensityMultipliers = Record<DensityKey, number>;

/** Options accepted by every `enhance*Density` preset. */
export type DensityOptions = {
  /**
   * Global fine-tune multiplier (default 1) attached to spacing, font-size,
   * unit-carrying line-heights and border-radius. CSS-vars themes only for
   * now — emitted as `--<prefix>-scaling` and multiplied into the spacing /
   * radius var values and the typography leaves. Unitless line-heights are
   * left alone (they already scale with font-size). Static themes record
   * `theme.scaling` but nothing reflows yet.
   */
  scaling?: number | undefined;
};

export const DENSITY_KEYS: DensityKey[] = [
  'xx-small',
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
];

/** Theme shape the presets can enhance in place. */
export type EnhanceableTheme = {
  components?: Theme['components'] | undefined;
  typography?: Record<string, any> | undefined;
  spacing?: ((...args: ReadonlyArray<number | string>) => string | number) | undefined;
  shape?: { borderRadius?: number | string | undefined } | undefined;
  scaling?: number | undefined;
  breakpoints?: { up: (key: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => string } | undefined;
  vars?: Record<string, any> | undefined;
  // CSS-vars theme machinery (present when `createTheme({ cssVariables: … })`):
  cssVarPrefix?: string | undefined;
  rootSelector?: string | undefined;
  generateThemeVars?: (() => Record<string, any>) | undefined;
  generateStyleSheets?: (() => Array<Record<string, any>>) | undefined;
};

/**
 * PRIVATE density core shared by the three `enhance*Density` presets. Not
 * re-exported from the styles barrel — presets are the public surface.
 *
 * **Scale + scaling emission only.** Exposes the scale on `theme.density` (raw
 * px off the fixed 8px spacing unit), and for a CSS-vars theme rides the
 * theme's own vars channel — `theme.vars.density` + wrapped
 * `generateThemeVars`/`generateStyleSheets` — so `ThemeProvider` materialises
 * the `--<prefix>-density-*` vars itself (same channel as the palette vars; no
 * `<CssBaseline />` needed). On that channel the steps derive from the spacing
 * unit (`calc(m * var(--<prefix>-spacing))`) and the spacing/radius var VALUES
 * are re-emitted multiplied by the `--<prefix>-scaling` dial, so
 * spacing/type/radius and every density step follow `options.scaling` (and any
 * runtime var change) with no per-component work. For a static theme nothing
 * else is emitted: presets read raw px straight off `theme.density`. It is
 * **component-agnostic**: it does NOT touch any `Mui*` component. Each preset
 * maps component vars → density steps itself (`addRootOverride`), so a preset
 * can point the same token at a different step than its siblings.
 *
 * @param themeInput - The created theme to enhance.
 * @param multipliers - The preset's 7-step multipliers on the spacing unit.
 * @param options - Shared density options (`scaling`).
 * @returns The enhanced theme.
 */
export function applyDensity<T extends EnhanceableTheme>(
  themeInput: T,
  multipliers: DensityMultipliers,
  options?: DensityOptions,
): T & { density: DensityScale; components: NonNullable<EnhanceableTheme['components']> } {
  const theme = { ...themeInput } as T & {
    density: DensityScale;
    components: NonNullable<EnhanceableTheme['components']>;
  };
  const scaling = options?.scaling ?? 1;
  theme.scaling = scaling;
  theme.components = { ...themeInput.components };

  // Vars theme: intercept theme.spacing so EVERY caller's output rides the
  // dial — `theme.spacing(2)` → `calc(calc(2 * var(--<prefix>-spacing)) *
  // var(--<prefix>-scaling))`. Wrapped per ARGUMENT (an output token is one
  // value per arg but may itself contain spaces — `calc(...)`); explicit
  // string args ('auto', '3px') are author-written CSS and pass through.
  const prefix = themeInput.cssVarPrefix ?? 'mui';
  const cssVar = (name: string) => `--${prefix ? `${prefix}-` : ''}${name}`;
  const prevSpacing = themeInput.spacing;
  if (themeInput.vars && typeof prevSpacing === 'function') {
    const spacing = (...argsInput: ReadonlyArray<number | string>): string => {
      const args = argsInput.length === 0 ? [1] : argsInput;
      return args
        .map((arg) => {
          const out = prevSpacing(arg);
          return typeof arg === 'number' ? `calc(${out} * var(${cssVar('scaling')}))` : out;
        })
        .join(' ');
    };
    (spacing as any).mui = true;
    theme.spacing = spacing as typeof prevSpacing;
  }

  // Steps ARE spacing: theme.spacing(m) — px on a static theme, the scaled
  // spacing calc on a vars theme, so every step rides the dial automatically.
  const stepValue = theme.spacing ?? ((v: number | string) => `${Number(v) * 8}px`);
  theme.density = DENSITY_KEYS.reduce((acc, key) => {
    acc[key] = String(stepValue(multipliers[key]));
    return acc;
  }, {} as DensityScale);

  // CSS-vars theme only — static themes keep raw px on `theme.density` and
  // presets fall back to it via `theme.vars || theme`.
  if (themeInput.vars) {
    // Same var-name join rule as the theme's own vars (createGetCssVar):
    // `--<prefix>-density-*`, prefix-less when cssVarPrefix is ''.
    const varName = (key: DensityKey) => cssVar(`density-${key}`);
    const refs = DENSITY_KEYS.reduce((acc, key) => {
      acc[key] = `var(${varName(key)})`;
      return acc;
    }, {} as DensityScale);
    const rootVars: Record<string, string> = {
      // The dial itself. --<prefix>-spacing keeps its own 8px value — scaling
      // rides the intercepted theme.spacing() output, not the var value.
      [cssVar('scaling')]: String(scaling),
    };
    DENSITY_KEYS.forEach((key) => {
      // The step var carries theme.spacing(m) verbatim — one source of truth.
      rootVars[varName(key)] = theme.density[key];
    });
    // Radius × dial — reads the (userland-composed) theme.shape.
    const radius = themeInput.shape?.borderRadius;
    if (typeof radius === 'number') {
      rootVars[cssVar('shape-borderRadius')] = `calc(${radius}px * var(${cssVar('scaling')}))`;
    }

    theme.vars = { ...themeInput.vars, density: refs, scaling: `var(${cssVar('scaling')})` };
    // `CssVarsProvider` rebuilds `vars` from `generateThemeVars()` — wrap it or
    // the provider-composed theme silently drops `vars.density`.
    const prevThemeVars = themeInput.generateThemeVars;
    theme.generateThemeVars = () => ({
      ...(prevThemeVars ? prevThemeVars() : themeInput.vars),
      density: refs,
      scaling: `var(${cssVar('scaling')})`,
    });
    const prevStyleSheets = themeInput.generateStyleSheets;
    theme.generateStyleSheets = () => [
      ...(prevStyleSheets ? prevStyleSheets() : []),
      { [themeInput.rootSelector || ':root']: rootVars },
    ];

    // Type × dial: wrap variant fontSize (and unit-carrying line-heights —
    // unitless ratios already scale with font-size). Only variant OBJECTS are
    // touched; scalar typography leaves (base fontSize number, pxToRem,
    // fontFamily, weights) feed JS math and must stay raw.
    const typography: Record<string, any> = { ...themeInput.typography };
    for (const [variant, styles] of Object.entries(typography)) {
      if (!styles || typeof styles !== 'object' || styles.fontSize == null) {
        continue;
      }
      const next = { ...styles };
      next.fontSize =
        typeof next.fontSize === 'number'
          ? `calc(${next.fontSize}px * var(${cssVar('scaling')}))`
          : `calc(${next.fontSize} * var(${cssVar('scaling')}))`;
      // number = unitless ratio, already scales with fontSize — skip; any
      // string is a length and rides the dial.
      if (typeof next.lineHeight === 'string') {
        next.lineHeight = `calc(${next.lineHeight} * var(${cssVar('scaling')}))`;
      }
      typography[variant] = next;
    }
    theme.typography = typography;
  }

  return theme;
}

/**
 * Attach a `styleOverrides` object to a component slot, preserving any existing
 * overrides for that slot (array-wrapped). Presets use this to add their
 * component-var → density-step assignments after `applyDensity`.
 *
 * Defaults to the `root` slot (Button, MenuItem, …). Pass `slot` for components
 * whose density seams live on a non-root slot — e.g. Tooltip has no `root` slot,
 * so its tokens land on `tooltip` (the bubble, ancestor of the arrow).
 *
 * **Mutates `components` in place** — pass the enhanced theme's `components`
 * (fresh, owned by `applyDensity`), never a theme's shared `components`.
 */
export function addRootOverride(
  components: NonNullable<EnhanceableTheme['components']>,
  name: string,
  overrides: Record<string, unknown>,
  slot: string = 'root',
): void {
  const component = (components as any)[name];
  (components as any)[name] = {
    ...component,
    styleOverrides: {
      ...component?.styleOverrides,
      [slot]: [component?.styleOverrides?.[slot], overrides],
    },
  };
}

/**
 * Attach theme `defaultProps` for a component, preserving anything the consuming
 * theme already set (an explicit user default wins over the preset's). For seams
 * CSS cannot reach — e.g. the X DataGrid's row/header heights, which feed the
 * virtualizer's JS math and only apply through props.
 *
 * **Mutates `components` in place** — same contract as `addRootOverride`.
 */
export function addDefaultProps(
  components: NonNullable<EnhanceableTheme['components']>,
  name: string,
  defaults: Record<string, unknown>,
): void {
  const component = (components as any)[name];
  (components as any)[name] = {
    ...component,
    defaultProps: { ...defaults, ...component?.defaultProps },
  };
}
