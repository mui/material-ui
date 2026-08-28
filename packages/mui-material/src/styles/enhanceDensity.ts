import { applyDensity, DENSITY_KEYS, DensityKey, EnhanceableTheme } from './densityScale';
import applySharedDensity from './sharedDensityComponents';

/**
 * Per-value override in px — same shape as `defaultDensityScale`, so the two
 * merge by spread and every value stays resolvable in JS as well as CSS.
 * `touch-target` is included even though it is not a spacing key: it sizes the
 * interactive box, so apps need to move it with the rest of the scale.
 */
export type DensityScaleOverrides = Partial<Record<DensityKey | 'touch-target', number>>;

/**
 * The ONE shipped ladder in px + the touch-target sizing key. Internal —
 * barrel-exported as `private_defaultDensityScale` (the `private_*`
 * convention, like `private_createTypography`) so sibling enhancers (MUI X)
 * can merge user recipes over the canonical numbers for JS-gated derivations.
 */
export const defaultDensityScale: Record<DensityKey | 'touch-target', number> = {
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
  // The interactive box is a sizing constant, not a ladder step: it emits as
  // plain px, so it never becomes a spacing key or a CSS variable.
  applySharedDensity(
    enhanced,
    `${scale?.['touch-target'] ?? defaultDensityScale['touch-target']}px`,
  );
  return enhanced;
}
