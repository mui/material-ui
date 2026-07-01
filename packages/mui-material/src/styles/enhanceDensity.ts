import { Theme } from './createTheme';
import { private_buttonVars as buttonVars } from '../Button/buttonVars';

/**
 * Named density steps, surfaced as `--mui-density-*` CSS vars. Components wired
 * by `enhanceDensity` pull their spacing tokens from these.
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

export interface DensityOptions {
  /**
   * Override any density step. Defaults derive from `theme.spacing`.
   */
  scale?: Partial<DensityScale> | undefined;
}

type DensityKey = keyof DensityScale;

/**
 * PROTOTYPE-ONLY: explicit per-step px scales for the experiment page. Production
 * scale is settled internally (RFC out-of-scope). `normal` is `undefined` → the
 * spacing-derived `enhanceDensity` default.
 */
export const DENSITY_PRESETS: Record<string, Partial<DensityScale> | undefined> = {
  compact: { xxs: '2px', xs: '4px', sm: '6px', md: '8px', lg: '12px', xl: '18px', xxl: '24px' },
  normal: undefined,
  comfort: { xxs: '6px', xs: '8px', sm: '12px', md: '16px', lg: '24px', xl: '32px', xxl: '40px' },
};

const densityKeys: DensityKey[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

// Default scale: t-shirt steps derived from the theme spacing unit.
const defaultMultiplier: Record<DensityKey, number> = {
  xxs: 0.5,
  xs: 0.75,
  sm: 1,
  md: 1.5,
  lg: 2,
  xl: 3,
  xxl: 4,
};

const cssVar = (key: DensityKey) => `--mui-density-${key}`;

/**
 * Enhances a created theme with a holistic density layer.
 *
 * Does both jobs in one call (mirroring `enhanceHighContrast`):
 * 1. **Emits** the density scale as `--mui-density-*` CSS vars at `:root`
 *    (via `MuiCssBaseline` — requires `<CssBaseline />`) and exposes them on
 *    `theme.density` / `theme.vars.density`.
 * 2. **Maps** each component's sized tokens to density steps through injected
 *    `styleOverrides.root` (e.g. `--Button-medium-pad: var(--mui-density-xs) var(--mui-density-lg)`).
 *
 * `createTheme` is left untouched; without this function components render their
 * literal-px defaults.
 *
 * @param themeInput - The created theme to enhance.
 * @param options - Override the density scale.
 * @returns The enhanced theme.
 *
 * @example
 * const theme = enhanceDensity(createTheme({ cssVariables: true }));
 *
 * @example
 * const theme = enhanceDensity(createTheme(), { scale: { lg: '12px' } });
 */
export default function enhanceDensity<
  T extends {
    spacing: (value: number) => string | number;
    components?: Theme['components'] | undefined;
    vars?: Record<string, any> | undefined;
  },
>(themeInput: T, options?: DensityOptions): T & { density: DensityScale } {
  const scale = densityKeys.reduce((acc, key) => {
    acc[key] = options?.scale?.[key] ?? String(themeInput.spacing(defaultMultiplier[key]));
    return acc;
  }, {} as DensityScale);

  const rootVars = densityKeys.reduce<Record<string, string>>((acc, key) => {
    acc[cssVar(key)] = scale[key];
    return acc;
  }, {});

  const varRefs = densityKeys.reduce((acc, key) => {
    acc[key] = `var(${cssVar(key)})`;
    return acc;
  }, {} as DensityScale);

  const theme = { ...themeInput } as T & { density: DensityScale };
  theme.density = scale;
  theme.vars = { ...themeInput.vars, density: varRefs };

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
    MuiButton: {
      ...c?.MuiButton,
      styleOverrides: {
        ...c?.MuiButton?.styleOverrides,
        root: [
          c?.MuiButton?.styleOverrides?.root,
          {
            // Sized-only: each size's `pad` shorthand (block inline) maps to its
            // own density step, so tuning the scale keeps the per-size matrix.
            // De-prefixed (Option A): emit through the same static map the styled
            // fn reads, so names can't drift. Bare, unprefixed.
            [buttonVars.smallPad]: `${varRefs.xxs} ${varRefs.sm}`,
            [buttonVars.mediumPad]: `${varRefs.xs} ${varRefs.lg}`,
            [buttonVars.largePad]: `${varRefs.sm} ${varRefs.xl}`,
          },
        ],
      },
    },
  };

  return theme;
}
