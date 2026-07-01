import { applyDensity, DensityConfig, EnhanceableTheme } from './densityScale';

// Normal preset data — explicit px (self-contained, not spacing-derived) + button
// typography. No logic beyond the wrapper; if logic creeps in here, the preset
// split has drifted.
const normal: DensityConfig = {
  scale: { xxs: '4px', xs: '6px', sm: '8px', md: '12px', lg: '16px', xl: '24px', xxl: '32px' },
  typography: { button: { fontSize: '0.875rem', lineHeight: 1.75 } },
};

export default function enhanceNormalDensity<T extends EnhanceableTheme>(theme: T) {
  return applyDensity(theme, normal);
}
