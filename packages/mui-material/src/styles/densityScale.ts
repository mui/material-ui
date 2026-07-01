import { Theme } from './createTheme';
import { private_buttonVars as buttonVars } from '../Button/buttonVars';

/**
 * Named density steps, surfaced as `--mui-density-*` CSS vars. Components wired
 * by the `enhance*Density` presets pull their spacing tokens from these.
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

/**
 * Per-variant typography reflow applied alongside the scale. Handled here (not
 * via component vars) so every family that renders `theme.typography.<variant>`
 * tracks the preset. Currently only `button` is reflowed.
 */
export interface DensityTypographyVariant {
  fontSize?: string | undefined;
  lineHeight?: number | string | undefined;
}

export interface DensityTypography {
  button?: DensityTypographyVariant | undefined;
}

export interface DensityConfig {
  scale: DensityScale;
  typography?: DensityTypography | undefined;
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
 * PRIVATE density core shared by the three `enhance*Density` presets. Not
 * re-exported from the styles barrel — presets are the public surface.
 *
 * Does both jobs in one call (mirroring `enhanceHighContrast`):
 * 1. **Emits** the scale as `--mui-density-*` CSS vars at `:root` (via
 *    `MuiCssBaseline` — requires `<CssBaseline />`) and exposes it on
 *    `theme.density` / `theme.vars.density`.
 * 2. **Maps** each family's sized tokens (`private_*Vars`) to density steps
 *    through injected `styleOverrides.root`. The mapping is identical across
 *    presets — only the scale values differ — so it lives here once.
 *
 * Also merges `config.typography` into `theme.typography.button`.
 *
 * @param themeInput - The created theme to enhance.
 * @param config - The preset's scale + typography.
 * @returns The enhanced theme.
 */
export function applyDensity<T extends EnhanceableTheme>(
  themeInput: T,
  config: DensityConfig,
): T & { density: DensityScale } {
  const { scale, typography } = config;

  const rootVars = DENSITY_KEYS.reduce<Record<string, string>>((acc, key) => {
    acc[cssVar(key)] = scale[key];
    return acc;
  }, {});

  const varRefs = DENSITY_KEYS.reduce((acc, key) => {
    acc[key] = `var(${cssVar(key)})`;
    return acc;
  }, {} as DensityScale);

  const theme = { ...themeInput } as T & { density: DensityScale };
  theme.density = scale;
  theme.vars = { ...themeInput.vars, density: varRefs };

  if (typography) {
    theme.typography = { ...themeInput.typography };
    (Object.keys(typography) as (keyof DensityTypography)[]).forEach((variant) => {
      theme.typography![variant] = { ...themeInput.typography?.[variant], ...typography[variant] };
    });
  }

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
            // Emit through the same static map the styled fn reads — names can't
            // drift. Bare, unprefixed.
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
