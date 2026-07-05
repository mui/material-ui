import { addRootOverride, applyDensity, densityVars as d, DensityScale, EnhanceableTheme } from './densityScale';
import tooltipClasses from '../Tooltip/tooltipClasses';
import tabClasses from '../Tab/tabClasses';
import accordionSummaryClasses from '../AccordionSummary/accordionSummaryClasses';
import { private_breadcrumbsVars as bcVars } from '../Breadcrumbs/breadcrumbsVars';
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
import { private_bottomNavigationVars as bnVars } from '../BottomNavigation/bottomNavigationVars';
import { private_bottomNavigationActionVars as bnaVars } from '../BottomNavigationAction/bottomNavigationActionVars';
import { private_dialogTitleVars as dtVars } from '../DialogTitle/dialogTitleVars';
import { private_dialogContentVars as dcVars } from '../DialogContent/dialogContentVars';
import { private_dialogActionsVars as daVars } from '../DialogActions/dialogActionsVars';
import { private_listItemButtonVars as libVars } from '../ListItemButton/listItemButtonVars';
import inputLabelClasses from '../InputLabel/inputLabelClasses';
import inputAdornmentClasses from '../InputAdornment/inputAdornmentClasses';

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
    // Emit padding directly on the size variants Button already ships (no seam).
    variants: [
      { props: { size: 'small' }, style: { padding: `${d.xxs} ${d.sm}` } },
      { props: { size: 'medium' }, style: { padding: `${d.xs} ${d.lg}` } },
      { props: { size: 'large' }, style: { padding: `${d.sm} ${d.xl}` } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiMenuItem', {
    // Height = raw px (density steps are spacing-only). Padding = density steps.
    // Density axis is the `dense` boolean; inline pad only when gutters are on.
    variants: [
      { props: { dense: false }, style: { minHeight: '56px', paddingTop: d.xs, paddingBottom: d.xs } },
      { props: { dense: true }, style: { minHeight: '40px', paddingTop: d.xxs, paddingBottom: d.xxs } },
      { props: { dense: false, disableGutters: false }, style: { paddingLeft: d.lg, paddingRight: d.lg } },
      { props: { dense: true, disableGutters: false }, style: { paddingLeft: d.md, paddingRight: d.md } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiList', {
    // Menu/list vertical breathing (spacing token); subheader keeps paddingTop 0.
    variants: [
      { props: { disablePadding: false }, style: { paddingTop: d.sm, paddingBottom: d.sm } },
      { props: ({ ownerState }: { ownerState: { subheader?: unknown } }) => ownerState.subheader, style: { paddingTop: 0 } },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiTooltip',
    {
      // Regular (pointer) tooltip only — `touch` keeps its master literals.
      // Padding + per-placement anchor offset = density steps (non-touch); the
      // arrow child derives its size from the single `--Tooltip-arrowSize` (raw
      // px), left unset for `touch` so both variants keep scaling.
      '--Tooltip-arrowSize': '14px',
      variants: [
        {
          props: ({ ownerState }: { ownerState: { touch?: boolean | undefined } }) => !ownerState.touch,
          style: {
            padding: `${d.xxs} ${d.sm}`,
            [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: { marginInlineEnd: d.lg },
            [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: { marginInlineStart: d.lg },
          },
        },
        {
          props: ({ ownerState }: { ownerState: { touch?: boolean | undefined; arrow?: boolean | undefined } }) =>
            !ownerState.touch && !ownerState.arrow,
          style: {
            [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: { marginBottom: d.lg },
            [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: { marginTop: d.lg },
          },
        },
      ],
    },
    'tooltip',
  );
  addRootOverride(enhanced.components, 'MuiOutlinedInput', {
    // Label bridge (calc-coupled): the floating label is a preceding sibling, so
    // it can't read the input root's token — reach it via `:has(~ &)` and derive
    // `--InputLabel-y` from the density step, keeping the component's -0.5/+0.5
    // per-size rounding. Root adornment/multiline padding = density steps.
    [`.${inputLabelClasses.root}:has(~ &)`]: { '--InputLabel-y': `calc(${d.md} - 0.5px)` },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${inputLabelClasses.root}:has(~ &)`]: { '--InputLabel-y': `calc(${d.sm} + 0.5px)` },
        },
      },
      {
        props: ({ ownerState }: { ownerState: { startAdornment?: unknown | undefined } }) =>
          ownerState.startAdornment,
        style: { paddingLeft: d.lg },
      },
      {
        props: ({ ownerState }: { ownerState: { startAdornment?: unknown | undefined; size?: string | undefined } }) =>
          ownerState.startAdornment && ownerState.size === 'small',
        style: { paddingLeft: d.md },
      },
      {
        props: ({ ownerState }: { ownerState: { endAdornment?: unknown | undefined } }) => ownerState.endAdornment,
        style: { paddingRight: d.lg },
      },
      {
        props: ({ ownerState }: { ownerState: { endAdornment?: unknown | undefined; size?: string | undefined } }) =>
          ownerState.endAdornment && ownerState.size === 'small',
        style: { paddingRight: d.md },
      },
      {
        props: ({ ownerState }: { ownerState: { multiline?: boolean | undefined } }) => ownerState.multiline,
        style: { padding: `${d.md} ${d.lg}` },
      },
      {
        props: ({ ownerState }: { ownerState: { multiline?: boolean | undefined; size?: string | undefined } }) =>
          ownerState.multiline && ownerState.size === 'small',
        style: { padding: `${d.sm} ${d.md}` },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiOutlinedInput',
    {
      // Box padding lives on the input slot for the plain (no adornment/multiline)
      // case; the zero-resets mirror master so adornment/multiline defer to root.
      padding: `${d.md} ${d.lg}`,
      variants: [
        { props: { size: 'small' }, style: { padding: `${d.sm} ${d.md}` } },
        {
          props: ({ ownerState }: { ownerState: { multiline?: boolean | undefined } }) => ownerState.multiline,
          style: { padding: 0 },
        },
        {
          props: ({ ownerState }: { ownerState: { startAdornment?: unknown | undefined } }) =>
            ownerState.startAdornment,
          style: { paddingLeft: 0 },
        },
        {
          props: ({ ownerState }: { ownerState: { endAdornment?: unknown | undefined } }) =>
            ownerState.endAdornment,
          style: { paddingRight: 0 },
        },
      ],
    },
    'input',
  );
  addRootOverride(enhanced.components, 'MuiInputAdornment', {
    // Adornment gap (start marginRight / end marginLeft) + filled positionStart
    // marginTop = density steps, per size (medium default / small).
    variants: [
      { props: { position: 'start' }, style: { marginRight: d.sm } },
      { props: { position: 'end' }, style: { marginLeft: d.sm } },
      {
        props: ({ ownerState }: { ownerState: { position?: string | undefined; size?: string | undefined } }) =>
          ownerState.position === 'start' && ownerState.size === 'small',
        style: { marginRight: d.xxs },
      },
      {
        props: ({ ownerState }: { ownerState: { position?: string | undefined; size?: string | undefined } }) =>
          ownerState.position === 'end' && ownerState.size === 'small',
        style: { marginLeft: d.xxs },
      },
      {
        props: { variant: 'filled' },
        style: {
          [`&.${inputAdornmentClasses.positionStart}&:not(.${inputAdornmentClasses.hiddenLabel})`]: {
            marginTop: d.lg,
          },
        },
      },
      {
        props: ({ ownerState }: { ownerState: { variant?: string | undefined; size?: string | undefined } }) =>
          ownerState.variant === 'filled' && ownerState.size === 'small',
        style: {
          [`&.${inputAdornmentClasses.positionStart}&:not(.${inputAdornmentClasses.hiddenLabel})`]: {
            marginTop: d.md,
          },
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiFilledInput', {
    // Root padding (adornment/multiline) = density steps. The floating label is a
    // preceding sibling — reach it via `:has(~ &)` and set its rest/shrink Y as
    // tuned raw px (no clean formula from topPad). hiddenLabel block padding stays
    // at master literals (out of scope).
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--FilledInputLabel-restY': '20px',
      '--FilledInputLabel-shrinkY': '9px',
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            '--FilledInputLabel-restY': '15px',
            '--FilledInputLabel-shrinkY': '5px',
          },
        },
      },
      {
        props: ({ ownerState }: { ownerState: { startAdornment?: unknown | undefined } }) =>
          ownerState.startAdornment,
        style: { paddingLeft: d.md },
      },
      {
        props: ({ ownerState }: { ownerState: { endAdornment?: unknown | undefined } }) => ownerState.endAdornment,
        style: { paddingRight: d.md },
      },
      {
        props: ({ ownerState }: { ownerState: { multiline?: boolean | undefined } }) => ownerState.multiline,
        style: { padding: `${d.xl} ${d.md} ${d.sm}` },
      },
      {
        props: ({ ownerState }: { ownerState: { multiline?: boolean | undefined; size?: string | undefined } }) =>
          ownerState.multiline && ownerState.size === 'small',
        style: { paddingTop: d.lg, paddingBottom: d.xxs },
      },
      {
        props: ({ ownerState }: { ownerState: { multiline?: boolean | undefined; hiddenLabel?: boolean | undefined } }) =>
          ownerState.multiline && ownerState.hiddenLabel,
        style: { paddingTop: 16, paddingBottom: 17 },
      },
      {
        props: ({
          ownerState,
        }: {
          ownerState: { multiline?: boolean | undefined; hiddenLabel?: boolean | undefined; size?: string | undefined };
        }) => ownerState.multiline && ownerState.hiddenLabel && ownerState.size === 'small',
        style: { paddingTop: 8, paddingBottom: 9 },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiFilledInput',
    {
      // Box height = input top/bottom padding (density steps); inline = step. The
      // adornment/multiline zero-resets mirror master; hiddenLabel block padding
      // stays at master literals (out of scope).
      paddingTop: d.xl,
      paddingRight: d.md,
      paddingBottom: d.sm,
      paddingLeft: d.md,
      variants: [
        { props: { size: 'small' }, style: { paddingTop: d.lg, paddingBottom: d.xxs } },
        {
          props: ({ ownerState }: { ownerState: { hiddenLabel?: boolean | undefined } }) => ownerState.hiddenLabel,
          style: { paddingTop: 16, paddingBottom: 17 },
        },
        {
          props: ({ ownerState }: { ownerState: { startAdornment?: unknown | undefined } }) =>
            ownerState.startAdornment,
          style: { paddingLeft: 0 },
        },
        {
          props: ({ ownerState }: { ownerState: { endAdornment?: unknown | undefined } }) =>
            ownerState.endAdornment,
          style: { paddingRight: 0 },
        },
        {
          props: ({ ownerState }: { ownerState: { hiddenLabel?: boolean | undefined; size?: string | undefined } }) =>
            ownerState.hiddenLabel && ownerState.size === 'small',
          style: { paddingTop: 8, paddingBottom: 9 },
        },
        {
          props: ({ ownerState }: { ownerState: { multiline?: boolean | undefined } }) => ownerState.multiline,
          style: { paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 },
        },
      ],
    },
    'input',
  );
  addRootOverride(
    enhanced.components,
    'MuiInputBase',
    {
      // Standard input box padding (block only; inline stays 0). Emitted on the
      // base key so standard Input inherits it via the cascade; Outlined/Filled
      // override on their own keys (win by injection order). Multiline box padding
      // lives on the InputBase root (left at master) — reset the input to 0 as
      // master does.
      paddingTop: d.xs,
      paddingBottom: d.xs,
      variants: [
        { props: { size: 'small' }, style: { paddingTop: d.xxs } },
        {
          props: ({ ownerState }: { ownerState: { multiline?: boolean | undefined } }) => ownerState.multiline,
          style: { paddingTop: 0, paddingBottom: 0 },
        },
      ],
    },
    'input',
  );
  addRootOverride(enhanced.components, 'MuiTab', {
    // Min-heights = raw px (paired with MuiTabs base below); padding = steps.
    minHeight: '56px',
    paddingTop: d.sm,
    paddingBottom: d.sm,
    paddingLeft: d.lg,
    paddingRight: d.lg,
    variants: [
      {
        props: ({ ownerState }: { ownerState: { icon?: unknown; label?: unknown } }) =>
          ownerState.icon && ownerState.label,
        style: { minHeight: '84px', paddingTop: d.xs, paddingBottom: d.xs },
      },
      {
        props: ({
          ownerState,
        }: {
          ownerState: { icon?: unknown; label?: unknown; iconPosition?: string | undefined };
        }) => ownerState.icon && ownerState.label && ownerState.iconPosition === 'top',
        style: { [`& > .${tabClasses.icon}`]: { marginBottom: d.xs } },
      },
      {
        props: ({
          ownerState,
        }: {
          ownerState: { icon?: unknown; label?: unknown; iconPosition?: string | undefined };
        }) => ownerState.icon && ownerState.label && ownerState.iconPosition === 'bottom',
        style: { [`& > .${tabClasses.icon}`]: { marginTop: d.xs } },
      },
      {
        props: ({
          ownerState,
        }: {
          ownerState: { icon?: unknown; label?: unknown; iconPosition?: string | undefined };
        }) => ownerState.icon && ownerState.label && ownerState.iconPosition === 'start',
        style: { [`& > .${tabClasses.icon}`]: { marginRight: d.sm } },
      },
      {
        props: ({
          ownerState,
        }: {
          ownerState: { icon?: unknown; label?: unknown; iconPosition?: string | undefined };
        }) => ownerState.icon && ownerState.label && ownerState.iconPosition === 'end',
        style: { [`& > .${tabClasses.icon}`]: { marginLeft: d.sm } },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiTabs', {
    minHeight: '56px', // == MuiTab base minHeight (the pairing)
  });
  addRootOverride(enhanced.components, 'MuiCheckbox', {
    // Touch-target padding per size (9px both sizes today) = density steps.
    variants: [
      { props: { size: 'medium' }, style: { padding: d.sm } },
      { props: { size: 'small' }, style: { padding: d.xs } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiRadio', {
    // Touch-target padding per size (9px both sizes today) = density steps.
    variants: [
      { props: { size: 'medium' }, style: { padding: d.sm } },
      { props: { size: 'small' }, style: { padding: d.xs } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiBreadcrumbs', {
    [bcVars.separatorGap]: d.sm,
  });
  addRootOverride(enhanced.components, 'MuiToggleButton', {
    // Emit uniform padding directly on the size variants ToggleButton ships (no seam).
    variants: [
      { props: { size: 'small' }, style: { padding: d.sm } },
      { props: { size: 'medium' }, style: { padding: d.md } },
      { props: { size: 'large' }, style: { padding: d.lg } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiAvatar', {
    // Square size = raw px (sizing).
    [avVars.size]: '48px',
  });
  addRootOverride(enhanced.components, 'MuiBadge', {
    // Bubble size = raw px; standard padding = '0 <step>'.
    [badgeVars.standardSize]: '24px',
    [badgeVars.dotSize]: '8px',
    [badgeVars.standardPad]: `0 ${d.xs}`,
  });
  addRootOverride(enhanced.components, 'MuiButtonGroup', {
    [bgVars.minWidth]: '48px',
  });
  addRootOverride(enhanced.components, 'MuiTableCell', {
    // Block pad per size (steps); inline pad shared.
    [tcVars.mediumBlockPad]: d.lg,
    [tcVars.smallBlockPad]: d.xs,
    [tcVars.inlinePad]: d.lg,
  });
  addRootOverride(enhanced.components, 'MuiAutocomplete', {
    // Option list (mirrors MenuItem): minHeight raw px, block/inline pad steps.
    [acVars.optionMinHeight]: '56px',
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
    [toolbarVars.denseMinHeight]: '56px',
  });
  addRootOverride(enhanced.components, 'MuiFab', {
    // Circular size = raw px per size (button-like action).
    [fabVars.smallSize]: '44px',
    [fabVars.mediumSize]: '52px',
    [fabVars.largeSize]: '64px',
  });
  addRootOverride(enhanced.components, 'MuiPaginationItem', {
    // Item box size = raw px per size.
    [piVars.smallSize]: '30px',
    [piVars.mediumSize]: '36px',
    [piVars.largeSize]: '44px',
  });
  addRootOverride(enhanced.components, 'MuiSnackbarContent', {
    // No size axis: root padding (block/inline steps).
    padding: `${d.xs} ${d.lg}`,
  });
  addRootOverride(enhanced.components, 'MuiBottomNavigation', {
    [bnVars.height]: '64px',
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
  addRootOverride(enhanced.components, 'MuiListItemButton', {
    [libVars.blockPad]: d.sm,
    [libVars.denseBlockPad]: d.xxs,
    [libVars.inlinePad]: d.lg,
  });
  addRootOverride(enhanced.components, 'MuiCardContent', {
    // No size axis: base padding + larger last-child bottom padding.
    padding: d.lg,
    '&:last-child': { paddingBottom: d.xl },
  });
  addRootOverride(enhanced.components, 'MuiCardActions', {
    // No size axis: root padding + inter-child gap (spacing variant) = steps.
    padding: d.sm,
    variants: [
      {
        props: { disableSpacing: false },
        style: { '& > :not(style) ~ :not(style)': { marginLeft: d.sm } },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiCardHeader', {
    // Root padding = step (no size axis).
    padding: d.lg,
  });
  // Avatar→content gap on the avatar slot.
  addRootOverride(enhanced.components, 'MuiCardHeader', { marginRight: d.lg }, 'avatar');
  // Action negative pulls counteract the control's own box; scale with density.
  addRootOverride(
    enhanced.components,
    'MuiCardHeader',
    {
      marginTop: `calc(${d.xxs} * -1)`,
      marginRight: `calc(${d.sm} * -1)`,
      marginBottom: `calc(${d.xxs} * -1)`,
    },
    'action',
  );
  addRootOverride(
    enhanced.components,
    'MuiSelect',
    {
      // Content-box floor (raw px); real padding comes from the input variant.
      minHeight: '28px',
    },
    'select',
  );
  addRootOverride(enhanced.components, 'MuiAlert', {
    // No size axis: root padding (block/inline steps).
    padding: `${d.xs} ${d.lg}`,
  });
  // Icon→message gap on the icon slot (child element).
  addRootOverride(enhanced.components, 'MuiAlert', { marginRight: d.md }, 'icon');
  // Height (raw px) drives avatar/icon/deleteIcon via calc off `--Chip-height`.
  addRootOverride(enhanced.components, 'MuiChip', {
    variants: [
      { props: { size: 'medium' }, style: { '--Chip-height': '36px' } },
      { props: { size: 'small' }, style: { '--Chip-height': '28px' } },
    ],
  });
  // Label inline padding = density steps, unified per size on the label slot.
  addRootOverride(
    enhanced.components,
    'MuiChip',
    {
      variants: [
        { props: { size: 'medium' }, style: { paddingInline: d.md } },
        { props: { size: 'small' }, style: { paddingInline: d.sm } },
      ],
    },
    'label',
  );
  addRootOverride(enhanced.components, 'MuiAccordionSummary', {
    // Collapsed min-height raw px; inline padding = step.
    minHeight: '56px',
    padding: `0 ${d.lg}`,
    variants: [
      {
        props: ({ ownerState }: { ownerState: { disableGutters?: boolean | undefined } }) =>
          !ownerState.disableGutters,
        // Re-assert expanded min-height (master literal wins by specificity else).
        style: { [`&.${accordionSummaryClasses.expanded}`]: { minHeight: '76px' } },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiAccordionSummary',
    {
      // Content block margin reduces with min-height (else it binds header height).
      margin: `${d.md} 0`,
      variants: [
        {
          props: ({ ownerState }: { ownerState: { disableGutters?: boolean | undefined } }) =>
            !ownerState.disableGutters,
          style: { [`&.${accordionSummaryClasses.expanded}`]: { margin: `${d.lg} 0` } },
        },
      ],
    },
    'content',
  );
  addRootOverride(enhanced.components, 'MuiAccordionDetails', {
    padding: `${d.sm} ${d.lg} ${d.lg}`,
  });
  enhanced.typography = {
    ...enhanced.typography,
    button: { ...enhanced.typography?.button, fontSize: '0.9375rem', lineHeight: 2 },
  };
  return enhanced;
}
