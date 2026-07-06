import { addRootOverride, applyDensity, DensityScale, EnhanceableTheme } from './densityScale';
import tooltipClasses from '../Tooltip/tooltipClasses';
import tabClasses from '../Tab/tabClasses';
import accordionSummaryClasses from '../AccordionSummary/accordionSummaryClasses';
import buttonGroupClasses from '../ButtonGroup/buttonGroupClasses';
import autocompleteClasses from '../Autocomplete/autocompleteClasses';
import inputLabelClasses from '../InputLabel/inputLabelClasses';
import inputAdornmentClasses from '../InputAdornment/inputAdornmentClasses';
import { private_tooltipVars } from '../Tooltip/tooltipVars';
import { private_chipVars } from '../Chip/chipVars';
import { private_inputLabelVars } from '../InputLabel/inputLabelVars';
import type { TooltipOwnerState } from '../Tooltip';
import type { OutlinedInputOwnerState } from '../OutlinedInput';
import type { FilledInputProps } from '../FilledInput';
import type { InputBaseProps } from '../InputBase';
import type { InputAdornmentProps } from '../InputAdornment';
import type { TabProps } from '../Tab';
import type { ListProps } from '../List';
import type { AccordionSummaryOwnerState } from '../AccordionSummary';
import type { PaginationItemOwnerState } from '../PaginationItem';

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
  // Density steps from the enhanced theme: `var(--mui-density-*)` refs in
  // cssVariables mode, raw px otherwise (dual-mode via `theme.vars || theme`).
  const d: DensityScale = (enhanced.vars || enhanced).density;
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
      { props: { dense: false }, style: { minHeight: '56px', paddingBlock: d.xs } },
      { props: { dense: true }, style: { minHeight: '40px', paddingBlock: d.xxs } },
      { props: { dense: false, disableGutters: false }, style: { paddingInline: d.lg } },
      { props: { dense: true, disableGutters: false }, style: { paddingInline: d.md } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiList', {
    // Menu/list vertical breathing (spacing token); subheader keeps paddingTop 0.
    variants: [
      { props: { disablePadding: false }, style: { paddingBlock: d.sm } },
      {
        props: ({ ownerState }: { ownerState: ListProps }) => ownerState.subheader,
        style: { paddingTop: 0 },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiTooltip',
    {
      // Regular (pointer) tooltip only — `touch` keeps its master literals.
      // Padding + per-placement anchor offset = density steps (non-touch); the
      // arrow child derives its size from the single `--_arrowSize` (raw
      // px), left unset for `touch` so both variants keep scaling.
      [private_tooltipVars.arrowSize]: '14px',
      variants: [
        {
          props: ({
            ownerState,
          }: {
            ownerState: TooltipOwnerState & { touch?: boolean | undefined };
          }) => !ownerState.touch,
          style: {
            padding: `${d.xxs} ${d.sm}`,
            [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: {
              marginInlineEnd: d.lg,
            },
            [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: {
              marginInlineStart: d.lg,
            },
          },
        },
        {
          props: ({
            ownerState,
          }: {
            ownerState: TooltipOwnerState & { touch?: boolean | undefined };
          }) => !ownerState.touch && !ownerState.arrow,
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
    // `--_y` from the density step, keeping the component's -0.5/+0.5
    // per-size rounding. Only block padding reflows — inline stays master
    // (fieldset-constrained, keeps the floating label aligned).
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      [private_inputLabelVars.y]: `calc(${d.md} - 0.5px)`,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            [private_inputLabelVars.y]: `calc(${d.sm} + 0.5px)`,
          },
        },
      },
      {
        props: ({ ownerState }: { ownerState: OutlinedInputOwnerState }) => ownerState.multiline,
        style: { paddingBlock: d.md },
      },
      {
        props: ({ ownerState }: { ownerState: OutlinedInputOwnerState }) =>
          ownerState.multiline && ownerState.size === 'small',
        style: { paddingBlock: d.sm },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiOutlinedInput',
    {
      // Only block padding reflows; inline stays master (fieldset-constrained).
      // Master already ships the adornment/multiline inline resets on this slot.
      paddingBlock: d.md,
      variants: [
        { props: { size: 'small' }, style: { paddingBlock: d.sm } },
        {
          props: ({ ownerState }: { ownerState: OutlinedInputOwnerState }) => ownerState.multiline,
          style: { paddingBlock: 0 },
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
        props: ({
          ownerState,
        }: {
          ownerState: InputAdornmentProps & { size?: string | undefined };
        }) => ownerState.position === 'start' && ownerState.size === 'small',
        style: { marginRight: d.xxs },
      },
      {
        props: ({
          ownerState,
        }: {
          ownerState: InputAdornmentProps & { size?: string | undefined };
        }) => ownerState.position === 'end' && ownerState.size === 'small',
        style: { marginLeft: d.xxs },
      },
      {
        props: { variant: 'filled' },
        style: {
          [`&.${inputAdornmentClasses.positionStart}&:not(.${inputAdornmentClasses.hiddenLabel})`]:
            {
              marginTop: d.lg,
            },
        },
      },
      {
        props: ({
          ownerState,
        }: {
          ownerState: InputAdornmentProps & { size?: string | undefined };
        }) => ownerState.variant === 'filled' && ownerState.size === 'small',
        style: {
          [`&.${inputAdornmentClasses.positionStart}&:not(.${inputAdornmentClasses.hiddenLabel})`]:
            {
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
      [private_inputLabelVars.restY]: '20px',
      [private_inputLabelVars.shrinkY]: '9px',
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            [private_inputLabelVars.restY]: '15px',
            [private_inputLabelVars.shrinkY]: '5px',
          },
        },
      },
      {
        props: ({ ownerState }: { ownerState: FilledInputProps }) => ownerState.multiline,
        style: { paddingTop: d.xl, paddingBottom: d.sm },
      },
      {
        props: ({ ownerState }: { ownerState: FilledInputProps }) =>
          ownerState.multiline && ownerState.size === 'small',
        style: { paddingTop: d.lg, paddingBottom: d.xxs },
      },
      {
        props: ({ ownerState }: { ownerState: FilledInputProps }) =>
          ownerState.multiline && ownerState.hiddenLabel,
        style: { paddingTop: 16, paddingBottom: 17 },
      },
      {
        props: ({ ownerState }: { ownerState: FilledInputProps }) =>
          ownerState.multiline && ownerState.hiddenLabel && ownerState.size === 'small',
        style: { paddingTop: 8, paddingBottom: 9 },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiFilledInput',
    {
      // Only block padding reflows; inline stays master (keeps label alignment).
      // hiddenLabel block padding stays at master literals (out of scope).
      paddingTop: d.xl,
      paddingBottom: d.sm,
      variants: [
        { props: { size: 'small' }, style: { paddingTop: d.lg, paddingBottom: d.xxs } },
        {
          props: ({ ownerState }: { ownerState: FilledInputProps }) => ownerState.hiddenLabel,
          style: { paddingTop: 16, paddingBottom: 17 },
        },
        {
          props: ({ ownerState }: { ownerState: FilledInputProps }) =>
            ownerState.hiddenLabel && ownerState.size === 'small',
          style: { paddingTop: 8, paddingBottom: 9 },
        },
        {
          props: ({ ownerState }: { ownerState: FilledInputProps }) => ownerState.multiline,
          style: { paddingBlock: 0 },
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
      paddingBlock: d.xs,
      variants: [
        { props: { size: 'small' }, style: { paddingTop: d.xxs } },
        {
          props: ({ ownerState }: { ownerState: InputBaseProps }) => ownerState.multiline,
          style: { paddingBlock: 0 },
        },
      ],
    },
    'input',
  );
  addRootOverride(enhanced.components, 'MuiTab', {
    // Min-heights = raw px (paired with MuiTabs base below); padding = steps.
    minHeight: '56px',
    paddingBlock: d.sm,
    paddingInline: d.lg,
    variants: [
      {
        props: ({ ownerState }: { ownerState: TabProps }) => ownerState.icon && ownerState.label,
        style: { minHeight: '84px', paddingBlock: d.xs },
      },
      {
        props: ({ ownerState }: { ownerState: TabProps }) =>
          ownerState.icon && ownerState.label && ownerState.iconPosition === 'top',
        style: { [`& > .${tabClasses.icon}`]: { marginBottom: d.xs } },
      },
      {
        props: ({ ownerState }: { ownerState: TabProps }) =>
          ownerState.icon && ownerState.label && ownerState.iconPosition === 'bottom',
        style: { [`& > .${tabClasses.icon}`]: { marginTop: d.xs } },
      },
      {
        props: ({ ownerState }: { ownerState: TabProps }) =>
          ownerState.icon && ownerState.label && ownerState.iconPosition === 'start',
        style: { [`& > .${tabClasses.icon}`]: { marginRight: d.sm } },
      },
      {
        props: ({ ownerState }: { ownerState: TabProps }) =>
          ownerState.icon && ownerState.label && ownerState.iconPosition === 'end',
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
  // Separator inline margins (spacing step) on the separator slot.
  addRootOverride(enhanced.components, 'MuiBreadcrumbs', { marginInline: d.sm }, 'separator');
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
    width: '48px',
    height: '48px',
  });
  addRootOverride(
    enhanced.components,
    'MuiBadge',
    {
      // Bubble = raw px (sizing); standard inline pad = step. Dot resizes; dot pad
      // + borderRadius stay frozen at master.
      variants: [
        {
          props: { variant: 'standard' },
          style: { minWidth: '24px', height: '24px', padding: `0 ${d.xs}` },
        },
        { props: { variant: 'dot' }, style: { minWidth: '8px', height: '8px' } },
      ],
    },
    'badge',
  );
  addRootOverride(enhanced.components, 'MuiButtonGroup', {
    // Grouped-button min-width floor = raw px (sizing).
    [`& .${buttonGroupClasses.grouped}`]: { minWidth: '48px' },
  });
  addRootOverride(enhanced.components, 'MuiTableCell', {
    // Block pad per size (steps); inline pad shared. Re-assert the frozen
    // checkbox/none affordances the size padding would otherwise clobber.
    variants: [
      { props: { size: 'medium' }, style: { padding: `${d.lg} ${d.lg}` } },
      { props: { size: 'small' }, style: { padding: `${d.xs} ${d.lg}` } },
      { props: { padding: 'checkbox' }, style: { padding: '0 0 0 4px' } },
      { props: { padding: 'none' }, style: { padding: 0 } },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiAutocomplete',
    {
      // Option list (mirrors MenuItem) renders in a Popper → emit on the listbox
      // slot: minHeight raw px, block/inline pad steps.
      [`& .${autocompleteClasses.option}`]: {
        minHeight: '56px',
        paddingBlock: d.xs,
        paddingInline: d.lg,
      },
    },
    'listbox',
  );
  // Horizontal step gutter: paddingLeft (first) / paddingRight (last) = step.
  addRootOverride(enhanced.components, 'MuiStep', {
    variants: [
      {
        props: { orientation: 'horizontal', alternativeLabel: false, hasConnector: false },
        style: { paddingLeft: d.sm },
      },
      {
        props: { orientation: 'horizontal', alternativeLabel: false, last: true },
        style: { paddingRight: d.sm },
      },
    ],
  });
  // Icon→label gap on the iconContainer slot (step); alternativeLabel/vertical
  // paddingRight:0 stay frozen (higher-specificity class + own variant literals).
  addRootOverride(enhanced.components, 'MuiStepLabel', { paddingRight: d.sm }, 'iconContainer');
  addRootOverride(enhanced.components, 'MuiToolbar', {
    // Gutter inline pad (steps, incl the sm-breakpoint bump); dense bar min-height
    // (raw px). Regular min-height (theme.mixins.toolbar) stays frozen.
    variants: [
      {
        props: { disableGutters: false },
        style: {
          paddingInline: d.lg,
          [(theme as unknown as { breakpoints: { up: (key: string) => string } }).breakpoints.up(
            'sm',
          )]: {
            paddingInline: d.xl,
          },
        },
      },
      { props: { variant: 'dense' }, style: { minHeight: '56px' } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiFab', {
    // Circular size = raw px per size (button-like action). Scoped to circular so
    // the extended variant (auto width + literal height) stays frozen at master.
    variants: [
      { props: { variant: 'circular', size: 'small' }, style: { width: '44px', height: '44px' } },
      { props: { variant: 'circular', size: 'medium' }, style: { width: '52px', height: '52px' } },
      { props: { variant: 'circular', size: 'large' }, style: { width: '64px', height: '64px' } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiPaginationItem', {
    // Item box size = raw px per size: min-width on every item, height only on the
    // button items (ellipsis keeps master's auto height).
    variants: [
      { props: { size: 'small' }, style: { minWidth: '30px' } },
      { props: { size: 'medium' }, style: { minWidth: '36px' } },
      { props: { size: 'large' }, style: { minWidth: '44px' } },
      {
        props: ({ ownerState }: { ownerState: PaginationItemOwnerState }) =>
          ownerState.type !== 'start-ellipsis' &&
          ownerState.type !== 'end-ellipsis' &&
          ownerState.size === 'small',
        style: { height: '30px' },
      },
      {
        props: ({ ownerState }: { ownerState: PaginationItemOwnerState }) =>
          ownerState.type !== 'start-ellipsis' &&
          ownerState.type !== 'end-ellipsis' &&
          ownerState.size === 'medium',
        style: { height: '36px' },
      },
      {
        props: ({ ownerState }: { ownerState: PaginationItemOwnerState }) =>
          ownerState.type !== 'start-ellipsis' &&
          ownerState.type !== 'end-ellipsis' &&
          ownerState.size === 'large',
        style: { height: '44px' },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiSnackbarContent', {
    // No size axis: root padding (block/inline steps).
    padding: `${d.xs} ${d.lg}`,
  });
  addRootOverride(enhanced.components, 'MuiBottomNavigation', {
    height: '64px',
  });
  addRootOverride(enhanced.components, 'MuiBottomNavigationAction', {
    // Inline padding only; block padding stays master's 0.
    paddingInline: d.md,
  });
  addRootOverride(enhanced.components, 'MuiDialogTitle', {
    padding: `${d.lg} ${d.xl}`,
  });
  addRootOverride(enhanced.components, 'MuiDialogContent', {
    // Base block/inline padding; re-assert the frozen dividers literal the base
    // padding would otherwise clobber.
    padding: `${d.lg} ${d.xl}`,
    variants: [{ props: { dividers: true }, style: { padding: '16px 24px' } }],
  });
  addRootOverride(enhanced.components, 'MuiDialogActions', {
    padding: d.sm,
  });
  addRootOverride(enhanced.components, 'MuiListItemButton', {
    // Density axis is the `dense` boolean; inline pad only when gutters are on.
    variants: [
      { props: { dense: false }, style: { paddingBlock: d.sm } },
      { props: { dense: true }, style: { paddingBlock: d.xxs } },
      { props: { disableGutters: false }, style: { paddingInline: d.lg } },
    ],
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
      marginBlock: `calc(${d.xxs} * -1)`,
      marginRight: `calc(${d.sm} * -1)`,
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
    paddingBlock: d.xs,
    paddingInline: d.lg,
  });
  // Icon→message gap on the icon slot (child element).
  addRootOverride(enhanced.components, 'MuiAlert', { marginRight: d.md }, 'icon');
  // Height (raw px) drives avatar/icon/deleteIcon via calc off `--_height`.
  addRootOverride(enhanced.components, 'MuiChip', {
    variants: [
      { props: { size: 'medium' }, style: { [private_chipVars.height]: '36px' } },
      { props: { size: 'small' }, style: { [private_chipVars.height]: '28px' } },
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
        props: ({
          ownerState,
        }: {
          ownerState: AccordionSummaryOwnerState & { disableGutters?: boolean | undefined };
        }) => !ownerState.disableGutters,
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
      marginBlock: d.md,
      variants: [
        {
          props: ({
            ownerState,
          }: {
            ownerState: AccordionSummaryOwnerState & { disableGutters?: boolean | undefined };
          }) => !ownerState.disableGutters,
          style: { [`&.${accordionSummaryClasses.expanded}`]: { marginBlock: d.lg } },
        },
      ],
    },
    'content',
  );
  addRootOverride(enhanced.components, 'MuiAccordionDetails', {
    // Split from shorthand so each edge is its own knob (top differs from bottom).
    paddingBlockStart: d.sm,
    paddingBlockEnd: d.lg,
    paddingInline: d.lg,
  });
  enhanced.typography = {
    ...enhanced.typography,
    button: { ...enhanced.typography?.button, fontSize: '0.9375rem', lineHeight: 2 },
  };
  return enhanced;
}
