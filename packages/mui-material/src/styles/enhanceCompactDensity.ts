import { addRootOverride, applyDensity, densityVars as d, DensityScale, EnhanceableTheme } from './densityScale';
import { private_buttonVars as buttonVars } from '../Button/buttonVars';
import { private_menuItemVars as menuItemVars } from '../MenuItem/menuItemVars';
import { private_listVars as listVars } from '../List/listVars';
import { private_tooltipVars as tooltipVars } from '../Tooltip/tooltipVars';
import { private_outlinedInputVars as oiVars } from '../OutlinedInput/outlinedInputVars';
import { private_inputLabelVars as ilVars } from '../InputLabel/inputLabelVars';
import { private_inputAdornmentVars as iaVars } from '../InputAdornment/inputAdornmentVars';
import { private_filledInputVars as fiVars } from '../FilledInput/filledInputVars';
import { private_inputVars as inVars } from '../Input/inputVars';
import { private_tabVars as tabVars } from '../Tab/tabVars';
import { private_tabsVars as tabsVars } from '../Tabs/tabsVars';
import { private_checkboxVars as cbVars } from '../Checkbox/checkboxVars';
import { private_cardContentVars as ccVars } from '../CardContent/cardContentVars';
import { private_selectVars as selVars } from '../Select/selectVars';
import { private_alertVars as alertVars } from '../Alert/alertVars';
import { private_chipVars as chipVars } from '../Chip/chipVars';
import { private_accordionSummaryVars as asVars } from '../AccordionSummary/accordionSummaryVars';
import { private_accordionDetailsVars as adVars } from '../AccordionDetails/accordionDetailsVars';
import { private_radioVars as radioVars } from '../Radio/radioVars';
import { private_breadcrumbsVars as bcVars } from '../Breadcrumbs/breadcrumbsVars';
import { private_toggleButtonVars as tbVars } from '../ToggleButton/toggleButtonVars';
import { private_avatarVars as avVars } from '../Avatar/avatarVars';
import { private_badgeVars as badgeVars } from '../Badge/badgeVars';
import { private_buttonGroupVars as bgVars } from '../ButtonGroup/buttonGroupVars';
import { private_tableCellVars as tcVars } from '../TableCell/tableCellVars';
import { private_autocompleteVars as acVars } from '../Autocomplete/autocompleteVars';
import { private_stepVars as stepVars } from '../Step/stepVars';
import { private_stepLabelVars as slVars } from '../StepLabel/stepLabelVars';
import { private_toolbarVars as toolbarVars } from '../Toolbar/toolbarVars';
import { private_fabVars as fabVars } from '../Fab/fabVars';
import { private_paginationItemVars as piVars } from '../PaginationItem/paginationItemVars';
import { private_snackbarContentVars as scVars } from '../SnackbarContent/snackbarContentVars';
import { private_bottomNavigationVars as bnVars } from '../BottomNavigation/bottomNavigationVars';
import { private_bottomNavigationActionVars as bnaVars } from '../BottomNavigationAction/bottomNavigationActionVars';
import { private_dialogTitleVars as dtVars } from '../DialogTitle/dialogTitleVars';
import { private_dialogContentVars as dcVars } from '../DialogContent/dialogContentVars';
import { private_dialogActionsVars as daVars } from '../DialogActions/dialogActionsVars';
import inputLabelClasses from '../InputLabel/inputLabelClasses';

const scale: DensityScale = {
  xxs: '2px',
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '18px',
  xxl: '24px',
};

export default function enhanceCompactDensity<T extends EnhanceableTheme>(theme: T) {
  const enhanced = applyDensity(theme, scale);
  addRootOverride(enhanced.components, 'MuiButton', {
    [buttonVars.smallPad]: `${d.xxs} ${d.sm}`,
    [buttonVars.mediumPad]: `${d.xs} ${d.lg}`,
    [buttonVars.largePad]: `${d.sm} ${d.xl}`,
  });
  addRootOverride(enhanced.components, 'MuiMenuItem', {
    // Height = raw px (density steps are spacing-only). Padding = density steps.
    [menuItemVars.minHeight]: '36px',
    [menuItemVars.denseMinHeight]: '28px',
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
      [tooltipVars.arrowSize]: '10px',
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
      [ilVars.filledRestY]: '11px',
      [ilVars.filledShrinkY]: '5px',
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            [ilVars.filledRestY]: '8px',
            [ilVars.filledShrinkY]: '3px',
          },
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiInput', {
    // Standard input padding = density steps (tiny; block only, inline stays 0).
    [inVars.mediumTopPad]: d.xs,
    [inVars.smallTopPad]: d.xxs,
    [inVars.bottomPad]: d.xs,
  });
  addRootOverride(enhanced.components, 'MuiTab', {
    // Spacing = steps; min-heights = raw px (paired with MuiTabs below).
    [tabVars.minHeight]: '40px',
    [tabVars.iconLabelMinHeight]: '60px',
    [tabVars.blockPad]: d.sm,
    [tabVars.iconLabelBlockPad]: d.xs,
    [tabVars.inlinePad]: d.lg,
    [tabVars.iconStackGap]: d.xs,
    [tabVars.iconInlineGap]: d.sm,
  });
  addRootOverride(enhanced.components, 'MuiTabs', {
    [tabsVars.minHeight]: '40px', // == MuiTab minHeight (the pairing)
  });
  addRootOverride(enhanced.components, 'MuiCheckbox', {
    // Touch-target padding (9px both sizes today) = density steps.
    [cbVars.mediumPad]: d.sm,
    [cbVars.smallPad]: d.xs,
  });
  addRootOverride(enhanced.components, 'MuiRadio', {
    // Touch-target padding via SwitchBase (mirrors Checkbox).
    [radioVars.mediumPad]: d.sm,
    [radioVars.smallPad]: d.xs,
  });
  addRootOverride(enhanced.components, 'MuiBreadcrumbs', {
    [bcVars.separatorGap]: d.sm,
  });
  addRootOverride(enhanced.components, 'MuiToggleButton', {
    [tbVars.smallPad]: d.sm,
    [tbVars.mediumPad]: d.md,
    [tbVars.largePad]: d.lg,
  });
  addRootOverride(enhanced.components, 'MuiAvatar', {
    // Square size = raw px (sizing).
    [avVars.size]: '32px',
  });
  addRootOverride(enhanced.components, 'MuiBadge', {
    // Bubble size = raw px; standard padding = '0 <step>'.
    [badgeVars.standardSize]: '18px',
    [badgeVars.dotSize]: '4px',
    [badgeVars.standardPad]: `0 ${d.xs}`,
  });
  addRootOverride(enhanced.components, 'MuiButtonGroup', {
    [bgVars.minWidth]: '32px',
  });
  addRootOverride(enhanced.components, 'MuiTableCell', {
    // Block pad per size (steps); inline pad shared.
    [tcVars.mediumBlockPad]: d.lg,
    [tcVars.smallBlockPad]: d.xs,
    [tcVars.inlinePad]: d.lg,
  });
  addRootOverride(enhanced.components, 'MuiAutocomplete', {
    // Option list (mirrors MenuItem): minHeight raw px, block/inline pad steps.
    [acVars.optionMinHeight]: '36px',
    [acVars.optionBlockPad]: d.xs,
    [acVars.optionInlinePad]: d.lg,
  });
  addRootOverride(enhanced.components, 'MuiStep', {
    [stepVars.inlinePad]: d.sm,
  });
  addRootOverride(enhanced.components, 'MuiStepLabel', {
    [slVars.iconGap]: d.sm,
  });
  addRootOverride(enhanced.components, 'MuiToolbar', {
    // Gutter inline pad (steps); dense bar min-height (raw px).
    [toolbarVars.inlinePad]: d.lg,
    [toolbarVars.wideInlinePad]: d.xl,
    [toolbarVars.denseMinHeight]: '40px',
  });
  addRootOverride(enhanced.components, 'MuiFab', {
    // Circular size = raw px per size (button-like action).
    [fabVars.smallSize]: '36px',
    [fabVars.mediumSize]: '44px',
    [fabVars.largeSize]: '52px',
  });
  addRootOverride(enhanced.components, 'MuiPaginationItem', {
    // Item box size = raw px per size.
    [piVars.smallSize]: '22px',
    [piVars.mediumSize]: '28px',
    [piVars.largeSize]: '36px',
  });
  addRootOverride(enhanced.components, 'MuiSnackbarContent', {
    [scVars.blockPad]: d.xs,
    [scVars.inlinePad]: d.lg,
  });
  addRootOverride(enhanced.components, 'MuiBottomNavigation', {
    [bnVars.height]: '48px',
  });
  addRootOverride(enhanced.components, 'MuiBottomNavigationAction', {
    [bnaVars.inlinePad]: d.md,
  });
  addRootOverride(enhanced.components, 'MuiDialogTitle', {
    [dtVars.blockPad]: d.lg,
    [dtVars.inlinePad]: d.xl,
  });
  addRootOverride(enhanced.components, 'MuiDialogContent', {
    [dcVars.blockPad]: d.lg,
    [dcVars.inlinePad]: d.xl,
  });
  addRootOverride(enhanced.components, 'MuiDialogActions', {
    [daVars.pad]: d.sm,
  });
  addRootOverride(enhanced.components, 'MuiCardContent', {
    // No size axis: base pad + larger last-child bottom pad.
    [ccVars.pad]: d.lg,
    [ccVars.padBottom]: d.xl,
  });
  addRootOverride(enhanced.components, 'MuiSelect', {
    // Content-box floor (raw px); real padding comes from the input variant.
    [selVars.minHeight]: '20px',
  });
  addRootOverride(enhanced.components, 'MuiAlert', {
    // No size axis: root padding + icon gap (spacing steps).
    [alertVars.blockPad]: d.xs,
    [alertVars.inlinePad]: d.lg,
    [alertVars.iconGap]: d.md,
  });
  addRootOverride(enhanced.components, 'MuiChip', {
    // Height = raw px (drives avatar/icon/deleteIcon via calc); label padInline = steps.
    [chipVars.mediumHeight]: '28px',
    [chipVars.smallHeight]: '20px',
    [chipVars.mediumPadInline]: d.md,
    [chipVars.smallPadInline]: d.sm,
  });
  addRootOverride(enhanced.components, 'MuiAccordionSummary', {
    // min-heights raw px; inline pad + content block margin = steps.
    [asVars.minHeight]: '40px',
    [asVars.expandedMinHeight]: '52px',
    [asVars.inlinePad]: d.lg,
    [asVars.marginBlock]: d.md,
    [asVars.expandedMarginBlock]: d.lg,
  });
  addRootOverride(enhanced.components, 'MuiAccordionDetails', {
    [adVars.topPad]: d.sm,
    [adVars.inlinePad]: d.lg,
    [adVars.bottomPad]: d.lg,
  });
  enhanced.typography = {
    ...enhanced.typography,
    button: { ...enhanced.typography?.button, fontSize: '0.8125rem', lineHeight: 1.5 },
  };
  return enhanced;
}
