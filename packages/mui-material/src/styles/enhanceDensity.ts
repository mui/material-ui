import {
  applyDensity,
  DEFAULT_SIZING_PX,
  DEFAULT_STEP_PX,
  densitySizing,
  DensityKey,
  DensityScaleOverrides,
  DensitySizingKey,
  EnhanceableTheme,
} from './densityScale';
import applySharedDensity from './sharedDensityComponents';

/**
 * The two sizing constants are readable off the theme, so a component can size
 * a box the way the enhancer does: `(theme.vars || theme).touchTarget` gives the
 * variable reference on a CSS-variables theme and the length itself otherwise.
 *
 * Declared here rather than on the core theme types because density is opt-in —
 * both are `undefined` until `enhanceDensity` runs, which is what `?` says.
 * Neither is a spacing key: `theme.spacing()` does not resolve them.
 */
declare module '@mui/material/styles' {
  interface Theme extends Partial<Record<DensitySizingKey, string>> {}

  interface ThemeVars extends Partial<Record<DensitySizingKey, string>> {}
}

/**
 * The ONE shipped ladder in px + the sizing keys, flat — this is the resolved
 * table, not the override shape (`DensityScaleOverrides` nests the steps).
 * Internal —
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
