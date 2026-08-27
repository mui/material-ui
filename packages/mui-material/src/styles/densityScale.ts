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
  /** Sizing, not a ladder step: the touch-target box (24/32/44). Specific to
   * anchor (medium-size) cells — small/large sizes stay on the plain ladder. */
  'touch-target': string;
}

export type DensityKey = keyof DensityScale;

/** Per-step multipliers on the spacing unit (assumed at MUI's 8px default). */
export type DensityMultipliers = Record<DensityKey, number>;

export const DENSITY_KEYS: DensityKey[] = [
  'xx-small',
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
  'touch-target',
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

const isDensityKey = (value: string): value is DensityKey =>
  (DENSITY_KEYS as string[]).includes(value);

/**
 * PRIVATE density core behind `enhanceDensity`: the keyed `theme.spacing`
 * wrapper + the `--<prefix>-spacing-*` step emission. No `theme.density` node.
 */
export function applyDensity<T extends EnhanceableTheme>(
  themeInput: T,
  multipliers: DensityMultipliers,
  scaleOverrides?: Partial<Record<DensityKey, string | number>>,
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

  const overrides: Partial<Record<DensityKey, string>> = {};
  for (const [key, value] of Object.entries(scaleOverrides ?? {})) {
    overrides[key as DensityKey] = typeof value === 'number' ? `${value}px` : value;
  }

  const resolveKey: (key: DensityKey, negative: boolean) => string = themeInput.vars
    ? (key, negative) => {
        const ref = `var(${stepVarName(key)})`;
        return negative ? `calc(${ref} * -1)` : ref;
      }
    : (key, negative) => {
        const override = overrides[key];
        if (override !== undefined) {
          return negative ? `calc(${override} * -1)` : override;
        }
        return stepValue(negative ? -multipliers[key] : multipliers[key]);
      };

  const isKeyArg = (arg: number | string): boolean =>
    typeof arg === 'string' &&
    (isDensityKey(arg) || (arg.startsWith('-') && isDensityKey(arg.slice(1))));

  // Key-free calls are the hot path (sx/gap/Stack route every spacing value
  // through here at style-computation time) — delegate wholesale so the
  // wrapper adds one function hop, not a second map/join pass.
  const spacing = (...args: ReadonlyArray<number | string>): string => {
    if (!args.some(isKeyArg)) {
      return String(prevSpacing(...args));
    }
    return args
      .map((arg) => {
        if (typeof arg === 'string') {
          if (isDensityKey(arg)) {
            return resolveKey(arg, false);
          }
          if (arg.startsWith('-') && isDensityKey(arg.slice(1))) {
            return resolveKey(arg.slice(1) as DensityKey, true);
          }
        }
        return String(prevSpacing(arg));
      })
      .join(' ');
  };
  // `createSpacing` early-returns on this flag, so re-running createTheme over
  // an enhanced theme keeps the wrapper.
  (spacing as any).mui = true;
  (spacing as any).unit = (prevSpacing as any).unit;
  theme.spacing = spacing;

  if (themeInput.vars) {
    const rootVars: Record<string, string> = {};
    DENSITY_KEYS.forEach((key) => {
      rootVars[stepVarName(key)] = overrides[key] ?? stepValue(multipliers[key]);
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

/**
 * Attach a `styleOverrides` object to a component slot, preserving existing
 * overrides (array-wrapped). **Mutates `components` in place** — pass the
 * enhanced theme's `components` (fresh, owned by `applyDensity`).
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
 * Attach theme `defaultProps`, the consuming theme's own defaults winning —
 * for seams CSS cannot reach (values that feed component JS). **Mutates
 * `components` in place** — same contract as `addRootOverride`.
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
