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
 * **Scale emission only.** Exposes the scale on `theme.density`, and for a
 * CSS-vars theme rides the theme's own vars channel — `theme.vars.density` +
 * wrapped `generateThemeVars`/`generateStyleSheets` — so `ThemeProvider`
 * materialises the `--<prefix>-density-*` vars itself (same channel as the
 * palette vars; no `<CssBaseline />` needed). For a static theme nothing else
 * is emitted: presets read raw px straight off `theme.density`. It is
 * **component-agnostic**: it does NOT touch any `Mui*` component. Each preset
 * maps component vars → density steps itself (`addRootOverride`), so a preset
 * can point the same token at a different step than its siblings.
 *
 * @param themeInput - The created theme to enhance.
 * @param scale - The preset's 7-step scale.
 * @returns The enhanced theme.
 */
export function applyDensity<T extends EnhanceableTheme>(
  themeInput: T,
  scale: DensityScale,
): T & { density: DensityScale; components: NonNullable<EnhanceableTheme['components']> } {
  const theme = { ...themeInput } as T & {
    density: DensityScale;
    components: NonNullable<EnhanceableTheme['components']>;
  };
  theme.density = scale;
  theme.components = { ...themeInput.components };

  // CSS-vars theme only — static themes keep raw px on `theme.density` and
  // presets fall back to it via `theme.vars || theme`.
  if (themeInput.vars) {
    // Same var-name join rule as the theme's own vars (createGetCssVar):
    // `--<prefix>-density-*`, prefix-less when cssVarPrefix is ''.
    const prefix = themeInput.cssVarPrefix ?? 'mui';
    const varName = (key: DensityKey) => `--${prefix ? `${prefix}-` : ''}density-${key}`;
    const refs = DENSITY_KEYS.reduce((acc, key) => {
      acc[key] = `var(${varName(key)})`;
      return acc;
    }, {} as DensityScale);
    const rootVars = DENSITY_KEYS.reduce<Record<string, string>>((acc, key) => {
      acc[varName(key)] = scale[key];
      return acc;
    }, {});

    theme.vars = { ...themeInput.vars, density: refs };
    // `CssVarsProvider` rebuilds `vars` from `generateThemeVars()` — wrap it or
    // the provider-composed theme silently drops `vars.density`.
    const prevThemeVars = themeInput.generateThemeVars;
    theme.generateThemeVars = () => ({
      ...(prevThemeVars ? prevThemeVars() : themeInput.vars),
      density: refs,
    });
    const prevStyleSheets = themeInput.generateStyleSheets;
    theme.generateStyleSheets = () => [
      ...(prevStyleSheets ? prevStyleSheets() : []),
      { [themeInput.rootSelector || ':root']: rootVars },
    ];
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
