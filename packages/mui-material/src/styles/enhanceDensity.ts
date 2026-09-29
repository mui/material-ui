import {
  applyDensity,
  DEFAULT_SIZING_PX,
  DEFAULT_STEP_PX,
  DensityKey,
  DensityScaleOverrides,
  DensitySizingKey,
  EnhanceableTheme,
  ResolvedDensityScale,
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
  interface Theme extends Partial<Record<DensitySizingKey, string>> {
    unstable_densityScale?: ResolvedDensityScale | undefined;
  }

  interface ThemeVars extends Partial<Record<DensitySizingKey, string>> {}
}

/**
 * The ONE shipped ladder in px + the sizing keys, flat. Barrel-exported as
 * `private_defaultDensityScale` as the fallback for a theme that was never
 * enhanced; an enhanced theme carries its resolved numbers, overrides
 * included, on `theme.unstable_densityScale`.
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
  applySharedDensity(
    enhanced,
    enhanced.vars?.touchTarget ?? enhanced.touchTarget,
    enhanced.vars?.iconSize ?? enhanced.iconSize,
  );
  return enhanced;
}
