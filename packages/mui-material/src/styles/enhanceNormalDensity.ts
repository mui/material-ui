import { applyDensity, DensityScale, EnhanceableTheme } from './densityScale';

// Explicit px (self-contained, not spacing-derived). Normal keeps today's Button
// typography — no reflow, so nothing beyond the scale.
const scale: DensityScale = {
  xxs: '4px',
  xs: '6px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
};

export default function enhanceNormalDensity<T extends EnhanceableTheme>(theme: T) {
  return applyDensity(theme, scale);
}
