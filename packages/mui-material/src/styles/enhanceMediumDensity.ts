import { applyDensity, DensityMultipliers, DensityOptions, EnhanceableTheme } from './densityScale';
import applySharedDensity from './sharedDensityComponents';

// Explicit px (self-contained, not spacing-derived).
// Steps × the 8px spacing unit → 4/8/12/16/24/32/48 (the design-token ladder).
const scale: DensityMultipliers = {
  'xx-small': 0.5,
  'x-small': 1,
  small: 1.5,
  medium: 2,
  large: 3,
  'x-large': 4,
  'touch-target': 4,
  'xx-large': 6,
};

export default function enhanceMediumDensity<T extends EnhanceableTheme>(
  theme: T,
  options?: DensityOptions,
) {
  const enhanced = applyDensity(theme, scale, options);
  applySharedDensity(enhanced);
  return enhanced;
}
