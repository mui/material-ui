import { Theme } from './createTheme';

/**
 * Named density steps, surfaced as `--mui-density-*` CSS vars. Presets assign a
 * component's sized tokens to these steps (via `densityVars` + `addRootOverride`).
 */
export interface DensityScale {
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export type DensityKey = keyof DensityScale;

export const DENSITY_KEYS: DensityKey[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

/** Theme shape the presets can enhance in place. */
export type EnhanceableTheme = {
  components?: Theme['components'] | undefined;
  typography?: Record<string, any> | undefined;
  vars?: Record<string, any> | undefined;
};

const cssVar = (key: DensityKey) => `--mui-density-${key}`;

/**
 * `var(--mui-density-*)` reference for each step. Presets read these to emit a
 * component's density value at a chosen step, e.g. `padding: `${densityVars.xs} ${densityVars.lg}``.
 */
export const densityVars: DensityScale = DENSITY_KEYS.reduce((acc, key) => {
  acc[key] = `var(${cssVar(key)})`;
  return acc;
}, {} as DensityScale);

/**
 * PRIVATE density core shared by the three `enhance*Density` presets. Not
 * re-exported from the styles barrel — presets are the public surface.
 *
 * **Scale emission only.** Emits the scale as `--mui-density-*` CSS vars at
 * `:root` (via `MuiCssBaseline` — requires `<CssBaseline />`) and exposes it on
 * `theme.density` / `theme.vars.density`. It is **component-agnostic**: it does
 * NOT touch any `Mui*` component. Each preset maps component vars → density
 * steps itself (`addRootOverride`), so a preset can point the same token at a
 * different step than its siblings.
 *
 * @param themeInput - The created theme to enhance.
 * @param scale - The preset's 7-step scale.
 * @returns The enhanced theme.
 */
export function applyDensity<T extends EnhanceableTheme>(
  themeInput: T,
  scale: DensityScale,
): T & { density: DensityScale; components: NonNullable<EnhanceableTheme['components']> } {
  const rootVars = DENSITY_KEYS.reduce<Record<string, string>>((acc, key) => {
    acc[cssVar(key)] = scale[key];
    return acc;
  }, {});

  const theme = { ...themeInput } as T & {
    density: DensityScale;
    components: NonNullable<EnhanceableTheme['components']>;
  };
  theme.density = scale;
  theme.vars = { ...themeInput.vars, density: densityVars };

  const c = themeInput.components;
  const existingBaseline = c?.MuiCssBaseline?.styleOverrides;
  const baselineObject =
    existingBaseline && typeof existingBaseline === 'object' ? existingBaseline : undefined;

  theme.components = {
    ...c,
    MuiCssBaseline: {
      ...c?.MuiCssBaseline,
      styleOverrides: {
        ...baselineObject,
        ':root': {
          ...(baselineObject as any)?.[':root'],
          ...rootVars,
        },
      },
    },
  };

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
