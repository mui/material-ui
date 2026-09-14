import {
  applyDensity,
  DEFAULT_SIZING_PX,
  DEFAULT_STEP_PX,
  densitySizing,
  DensityKey,
  DensitySizingKey,
  EnhanceableTheme,
} from './densityScale';
import applySharedDensity from './sharedDensityComponents';

export type { DensitySizingKey };

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
  ...DEFAULT_STEP_PX,
  ...DEFAULT_SIZING_PX,
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
  const enhanced = applyDensity(theme, scale);
  // Sizing constants rather than ladder steps: their own variables, outside the
  // spacing namespace, and never spacing keys.
  applySharedDensity(
    enhanced,
    densitySizing(enhanced, 'touchTarget', scale),
    densitySizing(enhanced, 'iconSize', scale),
  );
  return enhanced;
}
