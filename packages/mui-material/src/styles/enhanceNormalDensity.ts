import { addRootOverride, applyDensity, densityVars as d, DensityScale, EnhanceableTheme } from './densityScale';
import { private_buttonVars as buttonVars } from '../Button/buttonVars';
import { private_menuItemVars as menuItemVars } from '../MenuItem/menuItemVars';
import { private_listVars as listVars } from '../List/listVars';

// Explicit px (self-contained, not spacing-derived). Normal keeps today's Button
// typography — no reflow — so only the padding→step assignment below.
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
  const enhanced = applyDensity(theme, scale);
  addRootOverride(enhanced.components, 'MuiButton', {
    [buttonVars.smallPad]: `${d.xxs} ${d.sm}`,
    [buttonVars.mediumPad]: `${d.xs} ${d.lg}`,
    [buttonVars.largePad]: `${d.sm} ${d.xl}`,
  });
  addRootOverride(enhanced.components, 'MuiMenuItem', {
    // Height = raw px (density steps are spacing-only). Padding = density steps.
    [menuItemVars.minHeight]: '44px',
    [menuItemVars.denseMinHeight]: '32px',
    [menuItemVars.blockPad]: d.xs,
    [menuItemVars.denseBlockPad]: d.xxs,
    [menuItemVars.inlinePad]: d.lg,
    [menuItemVars.denseInlinePad]: d.md,
  });
  addRootOverride(enhanced.components, 'MuiList', {
    // Menu/list vertical breathing (spacing token).
    [listVars.blockPad]: d.sm,
  });
  return enhanced;
}
