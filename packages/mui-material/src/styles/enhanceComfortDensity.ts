import { applyDensity, DensityConfig, EnhanceableTheme } from './densityScale';

// Comfort preset data — scale (7 steps) + button typography. No logic beyond the
// wrapper; if logic creeps in here, the preset split has drifted.
const comfort: DensityConfig = {
  scale: { xxs: '6px', xs: '8px', sm: '12px', md: '16px', lg: '24px', xl: '32px', xxl: '40px' },
  typography: { fontSize: '0.9375rem', lineHeight: 2 },
};

export default function enhanceComfortDensity<T extends EnhanceableTheme>(theme: T) {
  return applyDensity(theme, comfort);
}
