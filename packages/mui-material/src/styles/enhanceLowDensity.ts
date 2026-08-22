import { applyDensity, DensityMultipliers, DensityOptions, EnhanceableTheme } from './densityScale';
import applySharedDensity from './sharedDensityComponents';

// Steps × the 8px spacing unit → 8/12/16/24/32/48/64 (the design-token ladder).
const scale: DensityMultipliers = {
  'xx-small': 1,
  'x-small': 1.5,
  small: 2,
  medium: 3,
  large: 4,
  'x-large': 6,
  'touch-target': 5.5,
  'xx-large': 8,
};

export default function enhanceLowDensity<T extends EnhanceableTheme>(
  theme: T,
  options?: DensityOptions,
) {
  const enhanced = applyDensity(theme, scale, options);
  applySharedDensity(enhanced);
  return enhanced;
}
