import { applyDensity, DensityConfig, EnhanceableTheme } from './densityScale';

// Compact preset data — scale (7 steps) + button typography. No logic beyond
// the wrapper; if logic creeps in here, the preset split has drifted.
const compact: DensityConfig = {
  scale: { xxs: '2px', xs: '4px', sm: '6px', md: '8px', lg: '12px', xl: '18px', xxl: '24px' },
  typography: { fontSize: '0.8125rem', lineHeight: 1.5 },
};

export default function enhanceCompactDensity<T extends EnhanceableTheme>(theme: T) {
  return applyDensity(theme, compact);
}
