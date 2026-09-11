import { applyDensity, DensityKey, EnhanceableTheme } from './densityScale';
import applySharedDensity from './sharedDensityComponents';

/**
 * Values that size a box rather than space one, so they are not spacing keys:
 * they emit as plain lengths, get no CSS variable, and `theme.spacing()` does
 * not resolve them. They ride the same override object because apps need to
 * move them with the rest of the scale.
 */
export type DensitySizingKey = 'touchTarget' | 'iconSize';

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
  xxSmall: 4,
  xSmall: 8,
  small: 12,
  medium: 16,
  large: 24,
  xLarge: 32,
  xxLarge: 48,
  touchTarget: 32,
  iconSize: 16,
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
  // Every step is a fractional multiple of the spacing unit, and an array
  // spacing defines no unit — only indices, which fractions cannot address
  // (`theme.spacing(0.5)` is already an empty string there). Enhancing would
  // emit holes, so the theme comes back untouched instead.
  if (Array.isArray((theme.spacing as { unit?: unknown }).unit)) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        [
          'MUI: `enhanceDensity` does not support an array `theme.spacing`, and returned the theme unchanged.',
          'The scale derives each step from the spacing unit, which an array does not define.',
          'Define `spacing` as a number and move the array values onto the scale instead:',
          '',
          'createTheme({ spacing: [0, 4, 8, 16] })',
          '  ->  enhanceDensity(createTheme(), { xxSmall: 4, xSmall: 8, small: 16 })',
        ].join('\n'),
      );
    }
    // Same reference in and out: nothing was emitted, so there is nothing to copy.
    return theme;
  }
  const enhanced = applyDensity(theme, scale);
  // Sizing constants rather than ladder steps: they emit as plain px, so
  // neither becomes a spacing key or a CSS variable.
  applySharedDensity(
    enhanced,
    `${scale?.touchTarget ?? defaultDensityScale.touchTarget}px`,
    `${scale?.iconSize ?? defaultDensityScale.iconSize}px`,
  );
  return enhanced;
}
