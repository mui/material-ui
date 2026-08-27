import { applyDensity, DensityKey, DensityMultipliers, EnhanceableTheme } from './densityScale';
import applySharedDensity from './sharedDensityComponents';

/** Per-step override — any CSS length; a number means px. */
export type DensityScaleOverrides = Partial<Record<DensityKey, string | number>>;

/**
 * The ONE shipped ladder in px + the touch-target sizing key. Internal —
 * barrel-exported as `private_defaultDensityScale` (the `private_*`
 * convention, like `private_createTypography`) so sibling enhancers (MUI X)
 * can merge user recipes over the canonical numbers for JS-gated derivations.
 */
export const defaultDensityScale: Record<DensityKey, number> = {
  'xx-small': 4,
  'x-small': 8,
  small: 12,
  medium: 16,
  large: 24,
  'x-large': 32,
  'xx-large': 48,
  'touch-target': 32,
};

// applyDensity consumes multipliers on the (fixed 8px) spacing unit.
const defaultMultipliers: DensityMultipliers = {
  'xx-small': defaultDensityScale['xx-small'] / 8,
  'x-small': defaultDensityScale['x-small'] / 8,
  small: defaultDensityScale.small / 8,
  medium: defaultDensityScale.medium / 8,
  large: defaultDensityScale.large / 8,
  'x-large': defaultDensityScale['x-large'] / 8,
  'xx-large': defaultDensityScale['xx-large'] / 8,
  'touch-target': defaultDensityScale['touch-target'] / 8,
};

/**
 * The proportional dial — CSS plumbing only, no JS lever: ships
 * `--<prefix>-scaling` at `1`; userland turns it via
 * `<GlobalStyles styles={{ ':root': { '--mui-scaling': 0.92 } }} />`.
 * CSS-vars themes only.
 */
function applyScaling<T extends EnhanceableTheme>(themeInput: T): T {
  if (!themeInput.vars) {
    return themeInput;
  }
  const theme = { ...themeInput };
  const prefix = themeInput.cssVarPrefix ?? 'mui';
  const cssVar = (name: string) => `--${prefix ? `${prefix}-` : ''}${name}`;

  const rootVars: Record<string, string> = { [cssVar('scaling')]: '1' };
  // `createSpacing` stores the raw `spacing` theme option on the function
  // (`.unit`) — read the INPUT, never our own emitted sheets, so re-enhancing
  // stays idempotent (no dial squaring); function/array spacing has no single
  // unit and skips the re-emit.
  const unit = themeInput.spacing.unit;
  const unitValue = typeof unit === 'number' ? `${unit}px` : unit;
  if (typeof unitValue === 'string') {
    rootVars[cssVar('spacing')] = `calc(${unitValue} * var(${cssVar('scaling')}))`;
  }
  const radius = themeInput.shape?.borderRadius;
  if (typeof radius === 'number') {
    rootVars[cssVar('shape-borderRadius')] = `calc(${radius}px * var(${cssVar('scaling')}))`;
  }
  const prevStyleSheets = themeInput.generateStyleSheets;
  const rootSelector = themeInput.rootSelector || ':root';
  theme.generateStyleSheets = () => [
    ...(prevStyleSheets ? prevStyleSheets() : []),
    { [rootSelector]: rootVars },
  ];

  // Only variant OBJECTS are wrapped; scalar typography leaves (base fontSize
  // number, pxToRem, weights) feed JS math and must stay raw. A number
  // lineHeight is a unitless ratio that already follows fontSize, and keyword
  // values (the `inherit` variant) can't ride a calc() — both are skipped.
  const scaled = (value: number | string) =>
    `calc(${typeof value === 'number' ? `${value}px` : value} * var(${cssVar('scaling')}))`;
  const isLength = (value: unknown): value is string =>
    typeof value === 'string' && /\d/.test(value);
  const typography: Record<string, any> = { ...themeInput.typography };
  for (const [variant, styles] of Object.entries(typography)) {
    if (!styles || typeof styles !== 'object') {
      continue;
    }
    const next = { ...styles };
    if (typeof next.fontSize === 'number' || isLength(next.fontSize)) {
      next.fontSize = scaled(next.fontSize);
    }
    if (isLength(next.lineHeight)) {
      next.lineHeight = scaled(next.lineHeight);
    }
    typography[variant] = next;
  }
  theme.typography = typography as EnhanceableTheme['typography'];

  return theme;
}

/**
 * Make every component density-aware on the one shipped scale (`scale`
 * overrides any step). Apply LAST, on the final composed theme — later
 * `createTheme()` wraps rebuild the vars machinery and drop the emitted scale.
 */
export default function enhanceDensity<T extends EnhanceableTheme>(
  theme: T,
  scale?: DensityScaleOverrides,
) {
  // Scaling wraps FIRST so the step block lands last — playground/export read
  // the steps off the final sheet.
  const enhanced = applyDensity(applyScaling(theme), defaultMultipliers, scale);
  applySharedDensity(enhanced);
  return enhanced;
}
