import { applyDensity, DensityKey, EnhanceableTheme } from './densityScale';
import applySharedDensity from './sharedDensityComponents';

/**
 * Values that size a box rather than space one, so they are not spacing keys:
 * they emit as plain lengths, get no CSS variable, and `theme.spacing()` does
 * not resolve them. They ride the same override object because apps need to
 * move them with the rest of the scale.
 */
export type DensitySizingKey = 'touch-target' | 'icon-target';

/**
 * Per-value override in px — same shape as `defaultDensityScale`, so the two
 * merge by spread and every value stays resolvable in JS as well as CSS.
 */
export type DensityScaleOverrides = Partial<Record<DensityKey | DensitySizingKey, number>>;

/**
 * The ONE shipped ladder in px + the sizing keys. Internal —
 * barrel-exported as `private_defaultDensityScale` (the `private_*`
 * convention, like `private_createTypography`) so sibling enhancers (MUI X)
 * can merge user recipes over the canonical numbers for JS-gated derivations.
 */
export const defaultDensityScale: Record<DensityKey | DensitySizingKey, number> = {
  'xx-small': 4,
  'x-small': 8,
  small: 12,
  medium: 16,
  large: 24,
  'x-large': 32,
  'xx-large': 48,
  'touch-target': 32,
  'icon-target': 16,
};

// applyDensity consumes multipliers on the (fixed 8px) spacing unit.
const defaultMultipliers = {
  'xx-small': 0.5,
  'x-small': 1,
  small: 1.5,
  medium: 2,
  large: 3,
  'x-large': 4,
  'xx-large': 6,
  'touch-target': 4,
  'icon-target': 2,
};

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
  // Sizing constants rather than ladder steps: they emit as plain px, so
  // neither becomes a spacing key or a CSS variable.
  const sizing = (key: DensitySizingKey) => `${scale?.[key] ?? defaultDensityScale[key]}px`;
  applySharedDensity(enhanced, sizing('touch-target'), sizing('icon-target'));
  return enhanced;
}
