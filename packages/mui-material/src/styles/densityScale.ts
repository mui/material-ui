import { Theme } from './createTheme';
import { CssVarsTheme } from './createThemeWithVars';

/** Named steps of the spacing scale, surfaced as `--<prefix>-spacing-*` CSS
 * vars and resolvable through `theme.spacing('<key>')`. */
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

// Type-level only: without `enhanceDensity` the strings pass through verbatim.
declare module '@mui/system' {
  interface SpacingKeyOverrides extends Record<DensityKey | `-${DensityKey}`, true> {}
}

/** A real `createTheme()` result. The CSS-vars machinery is `Partial`-picked
 * because `CssVarsProperties` hides it behind the `CssThemeVariables` flag
 * while a `cssVariables: true` theme still carries it at runtime. */
export type EnhanceableTheme = Theme &
  Partial<
    Pick<
      CssVarsTheme,
      'rootSelector' | 'cssVarPrefix' | 'generateThemeVars' | 'generateStyleSheets'
    >
  >;

/** How far each step sits along the spacing unit. Internal: the ladder's
 * shape is the enhancer's to define, not something a caller passes in. */
const STEP_MULTIPLIERS: Record<DensityKey, number> = {
  'xx-small': 0.5,
  'x-small': 1,
  small: 1.5,
  medium: 2,
  large: 3,
  'x-large': 4,
  'xx-large': 6,
};

/**
 * PRIVATE density core behind `enhanceDensity`: the keyed `theme.spacing`
 * wrapper + the `--<prefix>-spacing-*` step emission. No `theme.density` node.
 */
export function applyDensity<T extends EnhanceableTheme>(
  themeInput: T,
  /** Per-step replacement in px. Numbers keep every step resolvable in JS too
   * (MUI X derives virtualized heights off the same ladder). */
  scaleOverrides?: Partial<Record<DensityKey, number>>,
): T & { components: NonNullable<EnhanceableTheme['components']> } {
  const theme = { ...themeInput } as T & {
    components: NonNullable<EnhanceableTheme['components']>;
  };
  theme.components = { ...themeInput.components };

  const prefix = themeInput.cssVarPrefix ?? 'mui';
  const cssVar = (name: string) => `--${prefix ? `${prefix}-` : ''}${name}`;
  // The Spacing interface is overloaded (0-4 fixed args) — widen to the rest
  // shape once so per-arg delegation and whole-call spreads both type.
  const prevSpacing = themeInput.spacing as (
    ...args: ReadonlyArray<number | string>
  ) => string | number;

  const stepVarName = (key: DensityKey) => cssVar(`spacing-${key}`);

  // Array spacing indexes whole steps — fractional multipliers land on holes
  // (empty values) — so the ladder falls back to its canonical 8px basis.
  const stepValue: (multiplier: number) => string = Array.isArray((prevSpacing as any).unit)
    ? (multiplier) => `${multiplier * 8}px`
    : (multiplier) => String(prevSpacing(multiplier));

  const overrides = scaleOverrides ?? {};

  const stepValues = {} as Record<DensityKey, string>;
  // Every key AND its negated pull resolved once per theme, so the wrapper is a
  // hash lookup instead of per-call key parsing. Null-prototype: on a bare `{}`
  // inherited members (`toString`) would read as steps.
  const resolved: Record<string, string> = Object.create(null);
  DENSITY_KEYS.forEach((key) => {
    // An override is px, so both directions stay plain lengths; an unoverridden
    // step goes back through the spacing unit.
    const override = overrides[key];
    stepValues[key] = override === undefined ? stepValue(STEP_MULTIPLIERS[key]) : `${override}px`;
    const negated = override === undefined ? stepValue(-STEP_MULTIPLIERS[key]) : `${-override}px`;

    if (themeInput.vars) {
      const ref = `var(${stepVarName(key)})`;
      resolved[key] = ref;
      resolved[`-${key}`] = `calc(${ref} * -1)`;
      return;
    }
    resolved[key] = stepValues[key];
    resolved[`-${key}`] = negated;
  });

  // Key-free calls are the hot path (sx/gap/Stack route every spacing value
  // through here at style-computation time) — delegate wholesale so the
  // wrapper adds one function hop, not a second map/join pass.
  const spacing = (...args: ReadonlyArray<number | string>): string => {
    let keyed = false;
    for (let i = 0; i < args.length; i += 1) {
      const arg = args[i];
      if (typeof arg === 'string' && resolved[arg] !== undefined) {
        keyed = true;
        break;
      }
    }
    if (!keyed) {
      return String(prevSpacing(...args));
    }
    let out = '';
    for (let i = 0; i < args.length; i += 1) {
      const arg = args[i];
      const step = typeof arg === 'string' ? resolved[arg] : undefined;
      out += (i === 0 ? '' : ' ') + (step === undefined ? String(prevSpacing(arg)) : step);
    }
    return out;
  };
  // `createSpacing` early-returns on this flag, so re-running createTheme over
  // an enhanced theme keeps the wrapper.
  (spacing as any).mui = true;
  (spacing as any).unit = (prevSpacing as any).unit;
  // `createUnaryUnit` hands this very function to the sx spacing props, so
  // advertising the step names is what lets `sx={{ p: 'small' }}` resolve.
  (spacing as any).keys = new Set(Object.keys(resolved));
  theme.spacing = spacing;

  if (themeInput.vars) {
    const rootVars: Record<string, string> = {};
    DENSITY_KEYS.forEach((key) => {
      rootVars[stepVarName(key)] = stepValues[key];
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
