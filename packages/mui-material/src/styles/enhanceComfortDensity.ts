import { addRootOverride, applyDensity, densityVars as d, DensityScale, EnhanceableTheme } from './densityScale';
import { private_buttonVars as buttonVars } from '../Button/buttonVars';
import { private_menuItemVars as menuItemVars } from '../MenuItem/menuItemVars';

const scale: DensityScale = {
  xxs: '6px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '40px',
};

export default function enhanceComfortDensity<T extends EnhanceableTheme>(theme: T) {
  const enhanced = applyDensity(theme, scale);
  addRootOverride(enhanced.components, 'MuiButton', {
    [buttonVars.smallPad]: `${d.xxs} ${d.sm}`,
    [buttonVars.mediumPad]: `${d.xs} ${d.lg}`,
    [buttonVars.largePad]: `${d.sm} ${d.xl}`,
  });
  addRootOverride(enhanced.components, 'MuiMenuItem', {
    [menuItemVars.minHeight]: d.xl,
    [menuItemVars.denseMinHeight]: d.lg,
    [menuItemVars.blockPad]: d.xs,
    [menuItemVars.denseBlockPad]: d.xxs,
    [menuItemVars.inlinePad]: d.lg,
    [menuItemVars.denseInlinePad]: d.md,
  });
  enhanced.typography = {
    ...enhanced.typography,
    button: { ...enhanced.typography?.button, fontSize: '0.9375rem', lineHeight: 2 },
  };
  return enhanced;
}
