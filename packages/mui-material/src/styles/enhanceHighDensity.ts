import { applyDensity, DensityMultipliers, DensityOptions, EnhanceableTheme } from './densityScale';
import applySharedDensity from './sharedDensityComponents';

// Steps × the 8px spacing unit → 2/4/8/12/16/24/32 (the design-token ladder).
const scale: DensityMultipliers = {
  'xx-small': 0.25,
  'x-small': 0.5,
  small: 1,
  medium: 1.5,
  large: 2,
  'x-large': 3,
  'touch-target': 3.5,
  'xx-large': 4,
};

export default function enhanceHighDensity<T extends EnhanceableTheme>(
  theme: T,
  options?: DensityOptions,
) {
  const enhanced = applyDensity(theme, scale, options);
  applySharedDensity(enhanced);
  return enhanced;
}
