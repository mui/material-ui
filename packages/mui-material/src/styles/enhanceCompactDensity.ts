import { addRootOverride, applyDensity, DensityScale, EnhanceableTheme } from './densityScale';
import tooltipClasses from '../Tooltip/tooltipClasses';
import tabClasses from '../Tab/tabClasses';
import accordionSummaryClasses from '../AccordionSummary/accordionSummaryClasses';
import buttonGroupClasses from '../ButtonGroup/buttonGroupClasses';
import autocompleteClasses from '../Autocomplete/autocompleteClasses';
import outlinedInputClasses from '../OutlinedInput/outlinedInputClasses';
import inputLabelClasses from '../InputLabel/inputLabelClasses';
import inputAdornmentClasses from '../InputAdornment/inputAdornmentClasses';
import { private_chipVars } from '../Chip/chipVars';
import { private_inputLabelVars } from '../InputLabel/inputLabelVars';
import { inputBaseClasses } from '../InputBase';
import type { TabProps } from '../Tab';
import type { ListProps } from '../List';
import type { AccordionSummaryOwnerState } from '../AccordionSummary';
import type { PaginationItemOwnerState } from '../PaginationItem';
import { formControlClasses } from '../FormControl';
import { formControlLabelClasses } from '../FormControlLabel';
import { listItemIconClasses } from '../ListItemIcon';

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
  // Density steps from the enhanced theme: `var(--mui-density-*)` refs in
  // cssVariables mode, raw px otherwise (dual-mode via `theme.vars || theme`).
  const d: DensityScale = (enhanced.vars || enhanced).density;
  addRootOverride(enhanced.components, 'MuiButton', {
    variants: [
      { props: { size: 'small' }, style: { padding: `${d.xxs} ${d.sm}` } },
      { props: { size: 'medium' }, style: { padding: `${d.xs} ${d.lg}` } },
      { props: { size: 'large' }, style: { padding: `${d.sm} ${d.xl}` } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiMenuItem', {
    // Height = raw px (density steps are spacing-only). Padding = density steps.
    // Density axis is the `dense` boolean; inline pad only when gutters are on.
    // Compact-only type at base (body1 16px -> 14px).
    fontSize: '0.875rem',
    lineHeight: 1.4,
    variants: [
      { props: { dense: false }, style: { minHeight: '36px', paddingBlock: d.sm } },
      {
        props: { dense: true },
        style: {
          minHeight: '28px',
          paddingBlock: d.xs,
          [`& .${listItemIconClasses.root} svg`]: {
            fontSize: '1.125rem',
          },
        },
      },
      { props: { dense: false, disableGutters: false }, style: { paddingInline: d.lg } },
      { props: { dense: true, disableGutters: false }, style: { paddingInline: d.md } },
    ],
    [`& .${listItemIconClasses.root}`]: {
      minWidth: 28,
    },
  });
  addRootOverride(enhanced.components, 'MuiList', {
    // Menu/list vertical breathing (spacing token); subheader keeps paddingTop 0.
    variants: [
      { props: { disablePadding: false }, style: { paddingBlock: d.md } },
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
      // Padding + per-placement offset = density steps on the base (mirrors
      // Tooltip.js base margins), so they apply to every tooltip; arrow doesn't
      // change them. Arrow size lives on the popper slot (see the block below).
      // Compact-only type (11px -> 10px); lineHeight kept at master.
      fontSize: '0.625rem',
      padding: `${d.xxs} ${d.sm}`,
      [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: { marginInlineEnd: d.lg },
      [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: { marginInlineStart: d.lg },
      [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: { marginBottom: d.lg },
      [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: { marginTop: d.lg },
    },
    'tooltip',
  );
  addRootOverride(
    enhanced.components,
    'MuiTooltip',
    {
      // Arrow size — ONE preset-local var; the geometry below derives from it via
      // calc. Master ships literal em values on these SAME selectors (component
      // untouched); these popper-slot overrides win by cascade order. 0.71 = the
      // master ratio (1/sqrt(2), the hypotenuse projection of the square arrow).
      '--_arrowSize': '10px',
      [`&[data-popper-placement*="bottom"] .${tooltipClasses.arrow}`]: {
        marginTop: 'calc(var(--_arrowSize) * -0.71)',
      },
      [`&[data-popper-placement*="top"] .${tooltipClasses.arrow}`]: {
        marginBottom: 'calc(var(--_arrowSize) * -0.71)',
      },
      [`&[data-popper-placement*="right"] .${tooltipClasses.arrow}`]: {
        // width/height re-asserted here: master's placement rules set them at the
        // same specificity, so the base arrow rule below would lose for left/right.
        height: 'var(--_arrowSize)',
        width: 'calc(var(--_arrowSize) * 0.71)',
        marginInlineStart: 'calc(var(--_arrowSize) * -0.71)',
      },
      [`&[data-popper-placement*="left"] .${tooltipClasses.arrow}`]: {
        height: 'var(--_arrowSize)',
        width: 'calc(var(--_arrowSize) * 0.71)',
        marginInlineEnd: 'calc(var(--_arrowSize) * -0.71)',
      },
    },
    'popper',
  );
  addRootOverride(
    enhanced.components,
    'MuiTooltip',
    {
      // Base arrow box on its own slot (inherits --_arrowSize from the popper
      // root); left/right placements above re-assert because master sets them
      // at popper level.
      width: 'var(--_arrowSize)',
      height: 'calc(var(--_arrowSize) * 0.71)',
    },
    'arrow',
  );
  addRootOverride(enhanced.components, 'MuiOutlinedInput', {
    // broadcast the variable to the formControl so the label can reach it via `:has(> &)` (the input is a child).
    [`.${formControlClasses.root}:has(> &)`]: { '--_outlinedInputPadBlock': d.md },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      [private_inputLabelVars.restY]: `calc(var(--_outlinedInputPadBlock) - 0.5px)`,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            [private_inputLabelVars.restY]: `calc(var(--_outlinedInputPadBlock) + 0.5px)`,
          },
          [`.${formControlClasses.root}:has(> &)`]: { '--_outlinedInputPadBlock': d.sm },
        },
      },
      {
        props: { multiline: true },
        style: {
          paddingBlock: `var(--_outlinedInputPadBlock, ${d.md})`,
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingBlock: `var(--_outlinedInputPadBlock, ${d.sm})`,
        },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiOutlinedInput',
    {
      // Only block padding reflows; inline stays master (fieldset-constrained).
      // Master already ships the adornment/multiline inline resets on this slot.
      paddingBlock: `var(--_outlinedInputPadBlock, ${d.md})`,
      variants: [
        {
          props: { size: 'small' },
          style: { paddingBlock: `var(--_outlinedInputPadBlock, ${d.sm})` },
        },
        {
          props: { multiline: true },
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
        props: { variant: 'filled' },
        style: {
          [`&.${inputAdornmentClasses.positionStart}&:not(.${inputAdornmentClasses.hiddenLabel})`]:
            {
              marginTop: 'calc(var(--_filledInputPadTop, 20px) - 4px)',
            },
        },
      },
      {
        props: { position: 'start', size: 'small' },
        style: { marginRight: d.xxs },
      },
      {
        props: { position: 'end', size: 'small' },
        style: { marginLeft: d.xxs },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiFilledInput', {
    // Root padding (adornment/multiline) = density steps, broadcast as vars so the
    // floating label (a preceding sibling, reached via `:has(~ &)`) can derive its
    // rest Y from the same source; shrink Y stays tuned raw px. hiddenLabel block
    // padding stays at master literals (out of scope).
    [`.${formControlClasses.root}:has(> &)`]: {
      '--_filledInputPadTop': '20px',
      '--_filledInputPadBottom': d.xs,
    },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      [private_inputLabelVars.restY]: `calc((var(--_filledInputPadTop) + var(--_filledInputPadBottom)) / 2)`,
      [private_inputLabelVars.shrinkY]: '5px',
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${formControlClasses.root}:has(> &)`]: {
            '--_filledInputPadTop': '16px',
            '--_filledInputPadBottom': d.xxs,
          },
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            [private_inputLabelVars.restY]: `calc((var(--_filledInputPadTop) + var(--_filledInputPadBottom)) / 2)`,
            [private_inputLabelVars.shrinkY]: '3px',
          },
        },
      },
      {
        props: { multiline: true },
        style: {
          paddingTop: `var(--_filledInputPadTop, 20px)`,
          paddingBottom: `var(--_filledInputPadBottom, ${d.xs})`,
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingTop: `var(--_filledInputPadTop, 16px)`,
          paddingBottom: `var(--_filledInputPadBottom, ${d.xs})`,
        },
      },
      // hidden label does not need to sync with label, so no need CSS variables.
      {
        props: { multiline: true, hiddenLabel: true },
        style: { paddingTop: 16, paddingBottom: 17 },
      },
      {
        props: { multiline: true, hiddenLabel: true, size: 'small' },
        style: { paddingTop: 8, paddingBottom: 9 },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiFilledInput',
    {
      // Only block padding reflows; inline stays master (keeps label alignment).
      // Small padding flows through the FormControl var. hiddenLabel block padding
      // stays at master literals (out of scope).
      paddingTop: `var(--_filledInputPadTop, ${d.xl})`,
      paddingBottom: `var(--_filledInputPadBottom, ${d.sm})`,
      variants: [
        {
          props: { hiddenLabel: true },
          style: {
            paddingTop: `var(--_filledInputPadTop, 16px)`,
            paddingBottom: `var(--_filledInputPadBottom, 17px)`,
          },
        },
        {
          props: { hiddenLabel: true, size: 'small' },
          style: {
            paddingTop: `var(--_filledInputPadTop, 8px)`,
            paddingBottom: `var(--_filledInputPadBottom, 9px)`,
          },
        },
        {
          props: { multiline: true },
          style: { paddingBlock: 0 },
        },
      ],
    },
    'input',
  );
  addRootOverride(enhanced.components, 'MuiInput', {
    [`.${formControlClasses.root}:has(> &)`]: {
      '--_inputPadTop': d.xs,
      '--_inputPadBottom': `calc(${d.xs} - 1px)`,
      '--_inputMarginTop': '16px',
    },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      [private_inputLabelVars.restY]: `calc(var(--_inputMarginTop, 16px) + (var(--_inputPadTop, ${d.xs}) + var(--_inputPadBottom, ${d.xs})) / 2)`,
    },
    [`label + &, .${inputLabelClasses.root} + &`]: {
      marginTop: `var(--_inputMarginTop, 16px)`,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${formControlClasses.root}:has(> &)`]: {
            '--_inputPadTop': d.xxs,
            '--_inputPadBottom': `calc(${d.xxs} - 1px)`,
          },
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            [private_inputLabelVars.restY]: `calc(var(--_inputMarginTop, 16px) + (var(--_inputPadTop, ${d.xxs}) + var(--_inputPadBottom, ${d.xxs})) / 2)`,
          },
        },
      },
      {
        props: { multiline: true },
        style: {
          paddingTop: `var(--_inputPadTop, ${d.xs})`,
          paddingBottom: `var(--_inputPadBottom, calc(${d.xs} - 1px))`,
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingTop: `var(--_inputPadTop, ${d.xxs})`,
          paddingBottom: `var(--_inputPadBottom, calc(${d.xxs} - 1px))`,
        },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiInput',
    {
      paddingTop: `var(--_inputPadTop, ${d.xs})`,
      paddingBottom: `var(--_inputPadBottom, ${d.xs})`,
      variants: [
        {
          props: { size: 'small' },
          style: {
            paddingTop: `var(--_inputPadTop, ${d.xxs})`,
            paddingBottom: `var(--_inputPadBottom, ${d.xxs})`,
          },
        },
        {
          props: { multiline: true },
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
          props: { multiline: true },
          style: { paddingBlock: 0 },
        },
      ],
    },
    'input',
  );
  addRootOverride(enhanced.components, 'MuiInputBase', {
    // Compact-only type on the input box (root slot); cascades to the native input.
    fontSize: '0.875rem',
    lineHeight: '1.375em',
  });
  addRootOverride(enhanced.components, 'MuiTab', {
    // Min-heights = raw px (paired with MuiTabs base below); padding = steps.
    // Compact-only type at base (button 14px -> 13px).
    minHeight: '40px',
    paddingBlock: d.sm,
    paddingInline: d.lg,
    fontSize: '0.8125rem',
    lineHeight: 1.2,
    variants: [
      {
        props: ({ ownerState }: { ownerState: TabProps }) => ownerState.icon && ownerState.label,
        style: { minHeight: '60px', paddingBlock: d.xs },
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
    minHeight: '40px', // == MuiTab base minHeight (the pairing)
  });
  addRootOverride(enhanced.components, 'MuiTabScrollButton', {
    // Square scroll-affordance button (source: 40px both axes) = raw px per the
    // sizing policy. Horizontal tabs size via width; the vertical variant sets
    // width:100% in source, so only height needs the density value there.
    width: '32px',
    variants: [{ props: { orientation: 'vertical' }, style: { height: '32px' } }],
  });
  addRootOverride(enhanced.components, 'MuiCheckbox', {
    // Touch-target padding per size (9px both sizes today) = density steps. Pull the
    // sibling label back by the same amount so the control↔label gap stays constant.
    variants: [
      {
        props: { size: 'medium' },
        style: {
          padding: d.sm,
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: {
            marginLeft: `calc(-2px - ${d.sm})`,
          },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: {
            marginRight: `calc(-2px - ${d.sm})`,
          },
        },
      },
      {
        props: { size: 'small' },
        style: {
          padding: d.xs,
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: {
            marginLeft: `calc(-2px - ${d.xs})`,
          },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: {
            marginRight: `calc(-2px - ${d.xs})`,
          },
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiRadio', {
    // Touch-target padding per size (9px both sizes today) = density steps. Pull the
    // sibling label back by the same amount so the control↔label gap stays constant.
    variants: [
      {
        props: { size: 'medium' },
        style: {
          padding: d.sm,
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: {
            marginLeft: `calc(-2px - ${d.sm})`,
          },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: {
            marginRight: `calc(-2px - ${d.sm})`,
          },
        },
      },
      {
        props: { size: 'small' },
        style: {
          padding: d.xs,
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: {
            marginLeft: `calc(-2px - ${d.xs})`,
          },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: {
            marginRight: `calc(-2px - ${d.xs})`,
          },
        },
      },
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
    width: '32px',
    height: '32px',
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
          style: { minWidth: '18px', height: '18px', padding: `0 ${d.xs}` },
        },
        { props: { variant: 'dot' }, style: { minWidth: '4px', height: '4px' } },
      ],
    },
    'badge',
  );
  addRootOverride(enhanced.components, 'MuiButtonGroup', {
    // Grouped-button min-width floor = raw px (sizing).
    [`& .${buttonGroupClasses.grouped}`]: { minWidth: '32px' },
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
      // slot: minHeight raw px, block/inline pad steps, compact-only type.
      [`& .${autocompleteClasses.option}`]: {
        minHeight: '32px',
        paddingBlock: d.xs,
        paddingInline: d.lg,
        fontSize: '0.875rem',
        lineHeight: 1.4,
      },
    },
    'listbox',
  );
  // Input wrapper block padding (around the value/tags) + tag (chip) margin = steps.
  addRootOverride(enhanced.components, 'MuiAutocomplete', {
    '--_autocompleteInputRootPadBlock': d.sm,
    '--_autocompleteInputPadBlock': d.xs,
    [`& .${outlinedInputClasses.root}`]: { paddingBlock: `var(--_autocompleteInputRootPadBlock)` },
    [`& .${outlinedInputClasses.root} .${autocompleteClasses.input}`]: {
      paddingBlock: `var(--_autocompleteInputPadBlock)`,
    },
    [`& .${formControlClasses.root}:has(> .${outlinedInputClasses.root})`]: {
      '--_outlinedInputPadBlock':
        'calc(var(--_autocompleteInputRootPadBlock) + var(--_autocompleteInputPadBlock))',
    },
    // small size
    [`&:has(.${inputBaseClasses.sizeSmall})`]: {
      '--_autocompleteInputRootPadBlock': d.sm,
      '--_autocompleteInputPadBlock': d.xxs,
    },
    [`& .${outlinedInputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
      paddingBlock: `var(--_autocompleteInputRootPadBlock)`,
    },
    [`& .${outlinedInputClasses.root}.${inputBaseClasses.sizeSmall} .${autocompleteClasses.input}`]:
      {
        paddingBlock: `var(--_autocompleteInputPadBlock)`,
      },
  });
  addRootOverride(enhanced.components, 'MuiAutocomplete', { margin: d.xxs }, 'tag');
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
      { props: { variant: 'dense' }, style: { minHeight: '40px' } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiFab', {
    // Circular size = raw px per size (button-like action). Scoped to circular so
    // the extended variant (auto width + literal height) stays frozen at master.
    variants: [
      { props: { variant: 'circular', size: 'small' }, style: { width: '36px', height: '36px' } },
      { props: { variant: 'circular', size: 'medium' }, style: { width: '44px', height: '44px' } },
      { props: { variant: 'circular', size: 'large' }, style: { width: '52px', height: '52px' } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiPaginationItem', {
    // Item box size = raw px per size: min-width on every item, height only on the
    // button items (ellipsis keeps master's auto height).
    variants: [
      { props: { size: 'small' }, style: { minWidth: '22px' } },
      { props: { size: 'medium' }, style: { minWidth: '28px' } },
      { props: { size: 'large' }, style: { minWidth: '36px' } },
      {
        props: ({ ownerState }: { ownerState: PaginationItemOwnerState }) =>
          ownerState.type !== 'start-ellipsis' &&
          ownerState.type !== 'end-ellipsis' &&
          ownerState.size === 'small',
        style: { height: '22px' },
      },
      {
        props: ({ ownerState }: { ownerState: PaginationItemOwnerState }) =>
          ownerState.type !== 'start-ellipsis' &&
          ownerState.type !== 'end-ellipsis' &&
          ownerState.size === 'medium',
        style: { height: '28px' },
      },
      {
        props: ({ ownerState }: { ownerState: PaginationItemOwnerState }) =>
          ownerState.type !== 'start-ellipsis' &&
          ownerState.type !== 'end-ellipsis' &&
          ownerState.size === 'large',
        style: { height: '36px' },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiSnackbarContent', {
    // No size axis: root padding (block/inline steps).
    padding: `${d.xs} ${d.lg}`,
  });
  addRootOverride(enhanced.components, 'MuiBottomNavigation', {
    height: '48px',
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
      minHeight: '20px',
    },
    'select',
  );
  addRootOverride(enhanced.components, 'MuiAlert', {
    // No size axis: root padding (block/inline steps).
    padding: `${d.xs} ${d.lg}`,
  });
  // Icon→message gap on the icon slot (child element).
  addRootOverride(enhanced.components, 'MuiAlert', { marginRight: d.md }, 'icon');
  // Height (raw px) drives avatar/icon/deleteIcon via calc off `--_height`.
  addRootOverride(enhanced.components, 'MuiChip', {
    variants: [
      { props: { size: 'medium' }, style: { [private_chipVars.height]: '28px' } },
      { props: { size: 'small' }, style: { [private_chipVars.height]: '20px' } },
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
    minHeight: '40px',
    padding: `0 ${d.lg}`,
    variants: [
      {
        props: ({
          ownerState,
        }: {
          ownerState: AccordionSummaryOwnerState & { disableGutters?: boolean | undefined };
        }) => !ownerState.disableGutters,
        // Re-assert expanded min-height (master literal wins by specificity else).
        style: { [`&.${accordionSummaryClasses.expanded}`]: { minHeight: '52px' } },
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
    fontSize: '0.875rem',
    lineHeight: 20 / 14,
  });
  addRootOverride(enhanced.components, 'MuiSvgIcon', {
    // Compact-only: global icon shrink per fontSize variant (source: 20/24/35px).
    // Normal/comfort emit nothing — icons keep master sizes there.
    variants: [
      { props: { fontSize: 'small' }, style: { fontSize: '18px' } },
      { props: { fontSize: 'medium' }, style: { fontSize: '20px' } },
      { props: { fontSize: 'large' }, style: { fontSize: '30px' } },
    ],
  });
  // Compact-only type per variant (fontSize + lineHeight); normal/comfort keep
  // master. Theme-level tokens, not component overrides — same layer as button.
  enhanced.typography = {
    ...enhanced.typography,
    h1: { ...enhanced.typography?.h1, fontSize: '4.5rem', lineHeight: 1.1 },
    h2: { ...enhanced.typography?.h2, fontSize: '3rem', lineHeight: 1.15 },
    h3: { ...enhanced.typography?.h3, fontSize: '2.5rem', lineHeight: 1.15 },
    h4: { ...enhanced.typography?.h4, fontSize: '1.75rem', lineHeight: 1.2 },
    h5: { ...enhanced.typography?.h5, fontSize: '1.25rem', lineHeight: 1.25 },
    h6: { ...enhanced.typography?.h6, fontSize: '1.125rem', lineHeight: 1.4 },
    subtitle1: { ...enhanced.typography?.subtitle1, fontSize: '0.875rem', lineHeight: 1.5 },
    subtitle2: { ...enhanced.typography?.subtitle2, fontSize: '0.8125rem', lineHeight: 1.4 },
    body1: { ...enhanced.typography?.body1, fontSize: '0.875rem', lineHeight: 1.4 },
    body2: { ...enhanced.typography?.body2, fontSize: '0.8125rem', lineHeight: 1.35 },
    button: { ...enhanced.typography?.button, fontSize: '0.8125rem', lineHeight: 1.5 },
  };
  return enhanced;
}
