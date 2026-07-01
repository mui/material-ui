import { addRootOverride, applyDensity, densityVars as d, DensityScale, EnhanceableTheme } from './densityScale';
import { private_buttonVars as buttonVars } from '../Button/buttonVars';
import { private_menuItemVars as menuItemVars } from '../MenuItem/menuItemVars';
import { private_listVars as listVars } from '../List/listVars';
import { private_tooltipVars as tooltipVars } from '../Tooltip/tooltipVars';
import { private_outlinedInputVars as oiVars } from '../OutlinedInput/outlinedInputVars';
import { private_inputLabelVars as ilVars } from '../InputLabel/inputLabelVars';
import { private_inputAdornmentVars as iaVars } from '../InputAdornment/inputAdornmentVars';
import { private_filledInputVars as fiVars } from '../FilledInput/filledInputVars';
import inputLabelClasses from '../InputLabel/inputLabelClasses';

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
  addRootOverride(
    enhanced.components,
    'MuiTooltip',
    {
      // Regular (pointer) tooltip only — `touch` stays at its literals.
      // Padding + anchor offset = density steps (spacing). Arrow = raw px (sizing).
      [tooltipVars.blockPad]: d.xxs,
      [tooltipVars.inlinePad]: d.sm,
      [tooltipVars.offset]: d.lg,
      [tooltipVars.arrowSize]: '11px',
    },
    'tooltip',
  );
  addRootOverride(enhanced.components, 'MuiOutlinedInput', {
    // Padding = density steps (block < inline, keeping the 16.5/14 feel).
    [oiVars.mediumBlockPad]: d.md,
    [oiVars.smallBlockPad]: d.sm,
    [oiVars.mediumInlinePad]: d.lg,
    [oiVars.smallInlinePad]: d.md,
    // The label is a preceding sibling — it can't read the input root's token,
    // so derive `--InputLabel-y` from the density step (inherited from :root),
    // matching the component's -0.5/+0.5 per-size rounding.
    [`.${inputLabelClasses.root}:has(~ &)`]: { [ilVars.y]: `calc(${d.md} - 0.5px)` },
    variants: [
      {
        props: { size: 'small' },
        style: { [`.${inputLabelClasses.root}:has(~ &)`]: { [ilVars.y]: `calc(${d.sm} + 0.5px)` } },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiInputAdornment', {
    [iaVars.smallGap]: d.xxs,
    [iaVars.mediumGap]: d.sm,
    [iaVars.smallMarginTop]: d.md,
    [iaVars.mediumMarginTop]: d.lg,
  });
  addRootOverride(enhanced.components, 'MuiFilledInput', {
    // Box padding = density steps; the label rest/shrink Y are tuned raw px
    // (no clean formula from topPad), set on the sibling label via `:has(~ &)`.
    [fiVars.mediumTopPad]: d.xl,
    [fiVars.smallTopPad]: d.lg,
    [fiVars.mediumBottomPad]: d.sm,
    [fiVars.smallBottomPad]: d.xxs,
    [fiVars.mediumInlinePad]: d.md,
    [fiVars.smallInlinePad]: d.md,
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      [ilVars.filledRestY]: '15px',
      [ilVars.filledShrinkY]: '7px',
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            [ilVars.filledRestY]: '10px',
            [ilVars.filledShrinkY]: '4px',
          },
        },
      },
    ],
  });
  return enhanced;
}
