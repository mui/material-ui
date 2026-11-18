import type { Theme, ThemeOptions } from './createTheme';
import type { CssVarsTheme } from './createThemeWithVars';

export const DEFAULT_STEP_PX = {
  xxSmall: 4,
  xSmall: 8,
  small: 12,
  medium: 16,
  large: 24,
  xLarge: 32,
  xxLarge: 48,
};

export type DensityKey = keyof typeof DEFAULT_STEP_PX;

export const DENSITY_KEYS = Object.keys(DEFAULT_STEP_PX) as DensityKey[];

export const DEFAULT_SIZING_PX = {
  touchTarget: 32,
  iconSize: 16,
};

export type DensitySizingKey = keyof typeof DEFAULT_SIZING_PX;

export const SIZING_KEYS = Object.keys(DEFAULT_SIZING_PX) as DensitySizingKey[];

/** The scale a theme ended up with, in px numbers, for code that needs the
 * values in JS (MUI X derives row heights from `touchTarget + small`). Written
 * to `theme.unstable_densityScale` by `enhanceDensity`. */
export type ResolvedDensityScale = Record<DensitySizingKey, number> & {
  spacing: Record<DensityKey, number>;
};

/**
 * What `enhanceDensity` accepts as its second argument. The steps nest under
 * `spacing` because that is the surface they land on — `theme.spacing('small')`
 * resolves them — while the sizing constants size a box and sit at the top
 * level. Values are px; anything left out keeps its default.
 */
export type DensityScaleOverrides = Partial<Record<DensitySizingKey, number>> & {
  spacing?: Partial<Record<DensityKey, number>> | undefined;
};

const cssVarName = (theme: EnhanceableTheme, name: string) => {
  const prefix = theme.cssVarPrefix ?? 'mui';
  return `--${prefix ? `${prefix}-` : ''}${name}`;
};

const sizingPx = (key: DensitySizingKey, overrides?: DensityScaleOverrides) =>
  `${overrides?.[key] ?? DEFAULT_SIZING_PX[key]}px`;

function densitySizing(
  theme: EnhanceableTheme,
  key: DensitySizingKey,
  overrides?: DensityScaleOverrides,
): string {
  const px = sizingPx(key, overrides);
  return theme.vars ? `var(${cssVarName(theme, key)}, ${px})` : px;
}

export type EnhanceableTheme = Theme &
  Partial<
    Pick<
      CssVarsTheme,
      'rootSelector' | 'cssVarPrefix' | 'generateThemeVars' | 'generateStyleSheets'
    >
  > &
  Pick<ThemeOptions, 'modularCssLayers'>;

export type DensityEnhancedTheme<T extends EnhanceableTheme> = T & {
  components: NonNullable<EnhanceableTheme['components']>;
  vars?: Partial<Record<DensitySizingKey, string>> | undefined;
  unstable_densityScale: ResolvedDensityScale;
} & Record<DensitySizingKey, string>;

export function applyDensity<T extends EnhanceableTheme>(
  themeInput: T,
  scaleOverrides?: DensityScaleOverrides,
): DensityEnhancedTheme<T> {
  const theme = { ...themeInput } as DensityEnhancedTheme<T>;
  theme.components = { ...themeInput.components };

  const prevSpacing = themeInput.spacing as (
    ...args: ReadonlyArray<number | string>
  ) => string | number;

  const stepVarName = (key: DensityKey) => cssVarName(themeInput, `spacing-${key}`);

  const toAbsolutePx = (px: number) => `${px}px`;

  const overrides = scaleOverrides ?? {};

  const stepValues = {} as Record<DensityKey, string>;
  const resolved: Record<string, string> = Object.create(null);
  DENSITY_KEYS.forEach((key) => {
    const px = overrides.spacing?.[key] ?? DEFAULT_STEP_PX[key];
    stepValues[key] = toAbsolutePx(px);

    if (themeInput.vars) {
      const ref = `var(${stepVarName(key)}, ${stepValues[key]})`;
      resolved[key] = ref;
      resolved[`-${key}`] = `calc(${ref} * -1)`;
      return;
    }
    resolved[key] = stepValues[key];
    resolved[`-${key}`] = toAbsolutePx(-px);
  });

  const stepKeys = new Set(Object.keys(resolved));

  const makeKeyedSpacing = (
    base: (...args: ReadonlyArray<number | string>) => string | number,
  ): T['spacing'] => {
    const spacing = (...args: ReadonlyArray<number | string>): string => {
      if (args.length === 1) {
        const only = args[0];
        const step = typeof only === 'string' ? resolved[only] : undefined;
        return step === undefined ? String(base(only)) : step;
      }
      let keyed = false;
      for (let i = 0; i < args.length; i += 1) {
        const arg = args[i];
        if (typeof arg === 'string' && resolved[arg] !== undefined) {
          keyed = true;
          break;
        }
      }
      if (!keyed) {
        return String(base(...args));
      }
      let out = '';
      for (let i = 0; i < args.length; i += 1) {
        const arg = args[i];
        const step = typeof arg === 'string' ? resolved[arg] : undefined;
        out += (i === 0 ? '' : ' ') + (step === undefined ? String(base(arg)) : step);
      }
      return out;
    };
    (spacing as any).mui = true;
    (spacing as any).keys = stepKeys;
    return spacing as T['spacing'];
  };
  theme.spacing = makeKeyedSpacing(prevSpacing);

  const prevGenerateSpacing = (themeInput as any).generateSpacing;
  if (typeof prevGenerateSpacing === 'function') {
    (theme as any).generateSpacing = function generateSpacing(this: unknown) {
      return makeKeyedSpacing(
        prevGenerateSpacing.call(this ?? themeInput) as (
          ...args: ReadonlyArray<number | string>
        ) => string | number,
      );
    };
  }

  SIZING_KEYS.forEach((key) => {
    theme[key] = sizingPx(key, scaleOverrides);
  });
  theme.unstable_densityScale = {
    spacing: Object.fromEntries(
      DENSITY_KEYS.map((key) => [key, overrides.spacing?.[key] ?? DEFAULT_STEP_PX[key]]),
    ) as Record<DensityKey, number>,
    touchTarget: overrides.touchTarget ?? DEFAULT_SIZING_PX.touchTarget,
    iconSize: overrides.iconSize ?? DEFAULT_SIZING_PX.iconSize,
  };

  if (themeInput.vars) {
    const sizingVars = {} as Record<DensitySizingKey, string>;
    SIZING_KEYS.forEach((key) => {
      sizingVars[key] = densitySizing(themeInput, key, scaleOverrides);
    });
    theme.vars = { ...themeInput.vars, ...sizingVars };
    const prevGenerateThemeVars = themeInput.generateThemeVars;
    if (prevGenerateThemeVars) {
      theme.generateThemeVars = () => ({ ...prevGenerateThemeVars(), ...sizingVars });
    }
  }

  if (theme.generateStyleSheets) {
    const rootVars: Record<string, string> = {};
    DENSITY_KEYS.forEach((key) => {
      rootVars[stepVarName(key)] = stepValues[key];
    });
    SIZING_KEYS.forEach((key) => {
      rootVars[cssVarName(themeInput, key)] = sizingPx(key, scaleOverrides);
    });
    const prevStyleSheets = themeInput.generateStyleSheets;
    const rootSelector = themeInput.rootSelector || ':root';
    theme.generateStyleSheets = () => [
      ...(prevStyleSheets ? prevStyleSheets() : []),
      { [rootSelector]: rootVars },
    ];
  }

  return theme;
}
