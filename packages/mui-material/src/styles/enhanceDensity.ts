import { applyDensity, DENSITY_KEYS, DensityKey, EnhanceableTheme } from './densityScale';
import applySharedDensity from './sharedDensityComponents';

/** Per-step override in px — same shape as `defaultDensityScale`, so the two
 * merge by spread and every step stays resolvable in JS as well as CSS. */
export type DensityScaleOverrides = Partial<Record<DensityKey, number>>;

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
const defaultMultipliers = Object.fromEntries(
  DENSITY_KEYS.map((key) => [key, defaultDensityScale[key] / 8]),
) as Record<DensityKey, number>;

/**
 * Make every component density-aware on the one shipped scale (`scale`
 * overrides any step). Apply LAST, on the final composed theme — later
 * `createTheme()` wraps rebuild the vars machinery and drop the emitted scale.
 */
export default function enhanceDensity<T extends EnhanceableTheme>(
  theme: T,
  scale?: DensityScaleOverrides,
) {
  const enhanced = applyDensity(theme, defaultMultipliers, scale);
  applySharedDensity(enhanced);
  return enhanced;
}
