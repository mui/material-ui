import { addRootOverride, applyDensity, densityVars as d, DensityScale, EnhanceableTheme } from './densityScale';
import tooltipClasses from '../Tooltip/tooltipClasses';
import tabClasses from '../Tab/tabClasses';
import accordionSummaryClasses from '../AccordionSummary/accordionSummaryClasses';
import buttonGroupClasses from '../ButtonGroup/buttonGroupClasses';
import autocompleteClasses from '../Autocomplete/autocompleteClasses';
import inputLabelClasses from '../InputLabel/inputLabelClasses';
import inputAdornmentClasses from '../InputAdornment/inputAdornmentClasses';

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
      { props: { dense: false }, style: { minHeight: '44px', paddingTop: d.xs, paddingBottom: d.xs } },
      { props: { dense: true }, style: { minHeight: '32px', paddingTop: d.xxs, paddingBottom: d.xxs } },
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
      '--Tooltip-arrowSize': '11px',
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
      '--FilledInputLabel-restY': '15px',
      '--FilledInputLabel-shrinkY': '7px',
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            '--FilledInputLabel-restY': '10px',
            '--FilledInputLabel-shrinkY': '4px',
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
    minHeight: '48px',
    paddingTop: d.sm,
    paddingBottom: d.sm,
    paddingLeft: d.lg,
    paddingRight: d.lg,
    variants: [
      {
        props: ({ ownerState }: { ownerState: { icon?: unknown; label?: unknown } }) =>
          ownerState.icon && ownerState.label,
        style: { minHeight: '72px', paddingTop: d.xs, paddingBottom: d.xs },
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
    minHeight: '48px', // == MuiTab base minHeight (the pairing)
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
  addRootOverride(enhanced.components, 'MuiBreadcrumbs', { marginLeft: d.sm, marginRight: d.sm }, 'separator');
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
    width: '40px',
    height: '40px',
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
          style: { minWidth: '20px', height: '20px', padding: `0 ${d.xs}` },
        },
        { props: { variant: 'dot' }, style: { minWidth: '6px', height: '6px' } },
      ],
    },
    'badge',
  );
  addRootOverride(enhanced.components, 'MuiButtonGroup', {
    // Grouped-button min-width floor = raw px (sizing).
    [`& .${buttonGroupClasses.grouped}`]: { minWidth: '40px' },
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
        minHeight: '44px',
        paddingTop: d.xs,
        paddingBottom: d.xs,
        paddingLeft: d.lg,
        paddingRight: d.lg,
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
          paddingLeft: d.lg,
          paddingRight: d.lg,
          [(theme as unknown as { breakpoints: { up: (key: string) => string } }).breakpoints.up('sm')]: {
            paddingLeft: d.xl,
            paddingRight: d.xl,
          },
        },
      },
      { props: { variant: 'dense' }, style: { minHeight: '48px' } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiFab', {
    // Circular size = raw px per size (button-like action). Scoped to circular so
    // the extended variant (auto width + literal height) stays frozen at master.
    variants: [
      { props: { variant: 'circular', size: 'small' }, style: { width: '40px', height: '40px' } },
      { props: { variant: 'circular', size: 'medium' }, style: { width: '48px', height: '48px' } },
      { props: { variant: 'circular', size: 'large' }, style: { width: '56px', height: '56px' } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiPaginationItem', {
    // Item box size = raw px per size: min-width on every item, height only on the
    // button items (ellipsis keeps master's auto height).
    variants: [
      { props: { size: 'small' }, style: { minWidth: '26px' } },
      { props: { size: 'medium' }, style: { minWidth: '32px' } },
      { props: { size: 'large' }, style: { minWidth: '40px' } },
      {
        props: ({ ownerState }: { ownerState: { type?: string | undefined; size?: string | undefined } }) =>
          ownerState.type !== 'start-ellipsis' &&
          ownerState.type !== 'end-ellipsis' &&
          ownerState.size === 'small',
        style: { height: '26px' },
      },
      {
        props: ({ ownerState }: { ownerState: { type?: string | undefined; size?: string | undefined } }) =>
          ownerState.type !== 'start-ellipsis' &&
          ownerState.type !== 'end-ellipsis' &&
          ownerState.size === 'medium',
        style: { height: '32px' },
      },
      {
        props: ({ ownerState }: { ownerState: { type?: string | undefined; size?: string | undefined } }) =>
          ownerState.type !== 'start-ellipsis' &&
          ownerState.type !== 'end-ellipsis' &&
          ownerState.size === 'large',
        style: { height: '40px' },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiSnackbarContent', {
    // No size axis: root padding (block/inline steps).
    padding: `${d.xs} ${d.lg}`,
  });
  addRootOverride(enhanced.components, 'MuiBottomNavigation', {
    height: '56px',
  });
  addRootOverride(enhanced.components, 'MuiBottomNavigationAction', {
    // Inline padding only; block padding stays master's 0.
    paddingLeft: d.md,
    paddingRight: d.md,
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
      { props: { dense: false }, style: { paddingTop: d.sm, paddingBottom: d.sm } },
      { props: { dense: true }, style: { paddingTop: d.xxs, paddingBottom: d.xxs } },
      { props: { disableGutters: false }, style: { paddingLeft: d.lg, paddingRight: d.lg } },
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
      minHeight: '23px',
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
      { props: { size: 'medium' }, style: { '--Chip-height': '32px' } },
      { props: { size: 'small' }, style: { '--Chip-height': '24px' } },
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
    minHeight: '48px',
    padding: `0 ${d.lg}`,
    variants: [
      {
        props: ({ ownerState }: { ownerState: { disableGutters?: boolean | undefined } }) =>
          !ownerState.disableGutters,
        // Re-assert expanded min-height (master literal wins by specificity else).
        style: { [`&.${accordionSummaryClasses.expanded}`]: { minHeight: '64px' } },
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
  return enhanced;
}
