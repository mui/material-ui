import { Theme } from './createTheme';
import { CssVarsTheme } from './createThemeWithVars';

/** Named steps of the spacing scale, surfaced as `--<prefix>-spacing-*` CSS
 * vars and resolvable through `theme.spacing('<key>')`. */
export interface DensityScale {
  xxSmall: string;
  xSmall: string;
  small: string;
  medium: string;
  large: string;
  xLarge: string;
  xxLarge: string;
}

export type DensityKey = keyof DensityScale;

export const DEFAULT_STEP_PX: Record<DensityKey, number> = {
  xxSmall: 4,
  xSmall: 8,
  small: 12,
  medium: 16,
  large: 24,
  xLarge: 32,
  xxLarge: 48,
};

export const DENSITY_KEYS = Object.keys(DEFAULT_STEP_PX) as DensityKey[];

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

/** The spacing unit as a px number, or `null` when a step cannot be restated as
 * a multiple of it. Only a number or a `<number>px` string qualifies: an array
 * has no unit, `rem`/`em`/`%` have no px equivalent, and a function need not be
 * linear, so multiplying its unit would not land back on the step's value. */
function toPxUnit(unit: unknown): number | null {
  if (typeof unit === 'number') {
    return unit;
  }
  if (typeof unit !== 'string' || !unit.endsWith('px')) {
    return null;
  }
  const value = Number(unit.slice(0, -2));
  // `Number` yields NaN for anything else ending in px, `calc(1px)` included.
  return Number.isFinite(value) ? value : null;
}

/**
 * PRIVATE density core behind `enhanceDensity`: the keyed `theme.spacing`
 * wrapper + the `--<prefix>-spacing-*` step emission. No `theme.density` node.
 */
export function applyDensity<T extends EnhanceableTheme>(
  themeInput: T,
  /** Per-step replacement in px. Numbers keep every step resolvable in JS too
   * (MUI X derives virtualized heights off the same ladder). */
  scaleOverrides?: Partial<Record<DensityKey, number>>,
) {
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

  // The ladder is absolute px: a `scale` override is a number, which can only
  // mean px (MUI X reads those same numbers to derive sizes in JS), so every
  // step has to be on those terms. A vars theme restates that px as a multiple
  // of the unit variable — the same length, but reachable from plain CSS; a
  // static theme, or a unit with no px equivalent, emits the length itself.
  const unitPx = themeInput.vars ? toPxUnit((prevSpacing as { unit?: unknown }).unit) : null;
  const stepValue = (px: number) => (unitPx ? String(prevSpacing(px / unitPx)) : `${px}px`);

  const overrides = scaleOverrides ?? {};

  const stepValues = {} as Record<DensityKey, string>;
  // Every key AND its negated pull resolved once per theme, so the wrapper is a
  // hash lookup instead of per-call key parsing. Null-prototype: on a bare `{}`
  // inherited members (`toString`) would read as steps.
  const resolved: Record<string, string> = Object.create(null);
  DENSITY_KEYS.forEach((key) => {
    // An override simply moves the step's px anchor; both take the same path.
    const px = overrides[key] ?? DEFAULT_STEP_PX[key];
    stepValues[key] = stepValue(px);

    if (themeInput.vars) {
      // Fallback to the computed step: the definitions only mount through
      // `generateStyleSheets()`, which a nested provider reusing the prefix or
      // `disableStyleSheetGeneration` skips — a bare ref would then compute
      // to unset in every emission.
      const ref = `var(${stepVarName(key)}, ${stepValues[key]})`;
      resolved[key] = ref;
      resolved[`-${key}`] = `calc(${ref} * -1)`;
      return;
    }
    resolved[key] = stepValues[key];
    resolved[`-${key}`] = stepValue(-px);
  });

  const stepKeys = new Set(Object.keys(resolved));

  // Key-free calls are the hot path (sx/gap/Stack route every spacing value
  // through here at style-computation time) — delegate wholesale so the
  // wrapper adds one function hop, not a second map/join pass.
  const makeKeyedSpacing = (
    base: (...args: ReadonlyArray<number | string>) => string | number,
  ): T['spacing'] => {
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
    // `createSpacing` early-returns on this flag, so re-running createTheme
    // over an enhanced theme keeps the wrapper.
    (spacing as any).mui = true;
    (spacing as any).unit = (base as any).unit;
    // `createUnaryUnit` hands this very function to the sx spacing props, so
    // advertising the step names is what lets `sx={{ p: 'small' }}` resolve.
    (spacing as any).keys = stepKeys;
    return spacing as T['spacing'];
  };
  theme.spacing = makeKeyedSpacing(prevSpacing);

  // `CssVarsProvider` rebuilds `theme.spacing = theme.generateSpacing()` on
  // mount — without wrapping the generator too, the rebuilt function has no
  // `keys` and `sx={{ p: 'small' }}` emits the raw name.
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

  if (theme.generateStyleSheets) {
    // Steps ship as raw declarations only, never onto `theme.vars.spacing`:
    // that stays the unit `getPath` reads straight through — a string, or an
    // array for array spacing — and re-keying it by step name would break
    // every consumer of both shapes.
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
