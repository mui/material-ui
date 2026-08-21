import { addDefaultProps, addRootOverride, DensityScale, EnhanceableTheme } from './densityScale';
import switchClasses from '../Switch/switchClasses';
import buttonBaseClasses from '../ButtonBase/buttonBaseClasses';
import tooltipClasses from '../Tooltip/tooltipClasses';
import tabClasses from '../Tab/tabClasses';
import stepLabelClasses from '../StepLabel/stepLabelClasses';
import tablePaginationClasses from '../TablePagination/tablePaginationClasses';
import tableCellClasses from '../TableCell/tableCellClasses';
import type { PaginationItemOwnerState } from '../PaginationItem';
import type { TabProps } from '../Tab';
import accordionSummaryClasses from '../AccordionSummary/accordionSummaryClasses';
import alertClasses from '../Alert/alertClasses';
import inputLabelClasses from '../InputLabel/inputLabelClasses';
import autocompleteClasses from '../Autocomplete/autocompleteClasses';
import outlinedInputClasses from '../OutlinedInput/outlinedInputClasses';
import inputBaseClasses from '../InputBase/inputBaseClasses';
import type { AccordionSummaryOwnerState } from '../AccordionSummary';
import formControlClasses from '../FormControl/formControlClasses';
import formControlLabelClasses from '../FormControlLabel/formControlLabelClasses';
import inputAdornmentClasses from '../InputAdornment/inputAdornmentClasses';
import listItemIconClasses from '../ListItemIcon/listItemIconClasses';

/**
 * PRIVATE shared component mapping used by the three `enhance*Density` presets
 * (not re-exported from the styles barrel — presets are the public surface).
 *
 * Every block here is preset-agnostic: the same component token -> density-step
 * assignment in all three presets. Density variation comes purely from each
 * preset's scale values (`applyDensity`), never from remapping. Blocks whose
 * emissions still diverge across presets remain inline in the preset files.
 */
export default function applySharedDensity<T extends EnhanceableTheme>(
  enhanced: T & {
    density: DensityScale;
    components: NonNullable<EnhanceableTheme['components']>;
  },
): void {
  // Density steps from the enhanced theme: `var(--mui-density-*)` refs in
  // cssVariables mode, raw px otherwise (dual-mode via `theme.vars || theme`).
  const d: DensityScale = (enhanced.vars || enhanced).density;
  const sp = enhanced.spacing ?? ((v: number | string) => `${Number(v) * 8}px`);
  addRootOverride(enhanced.components, 'MuiButton', {
    ...enhanced.typography?.button,
    paddingBlock: 0,
    variants: [
      { props: { size: 'small' }, style: { height: d.large, paddingInline: d.small } },
      { props: { size: 'medium' }, style: { height: d['touch-target'], paddingInline: d.medium } },
      { props: { size: 'large' }, style: { height: d['xx-large'], paddingInline: d.large } },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiButton',
    { '& > *:nth-of-type(1)': { fontSize: '0.8lh' } },
    'startIcon',
  );
  addRootOverride(
    enhanced.components,
    'MuiButton',
    { '& > *:nth-of-type(1)': { fontSize: '0.8lh' } },
    'endIcon',
  );
  addRootOverride(enhanced.components, 'MuiIconButton', {
    padding: 0,
    fontSize: d.medium,
    variants: [
      { props: { size: 'small' }, style: { width: d.large, height: d.large } },
      { props: { size: 'medium' }, style: { width: d['touch-target'], height: d['touch-target'] } },
      { props: { size: 'large' }, style: { width: d['xx-large'], height: d['xx-large'] } },
      { props: { edge: 'start' }, style: { marginLeft: `calc(${d['touch-target']} / -8)` } },
      { props: { edge: 'end' }, style: { marginRight: `calc(${d['touch-target']} / -8)` } },
    ],
  });

  addRootOverride(enhanced.components, 'MuiSvgIcon', {
    variants: [
      { props: { fontSize: 'small' }, style: { fontSize: sp(1.75) } },
      { props: { fontSize: 'medium' }, style: { fontSize: sp(2) } },
      { props: { fontSize: 'large' }, style: { fontSize: sp(2.5) } },
    ],
  });
  // List-row floor (promoted from density-Medium-only):
  // semantic/size/navigation/list-item/min-height (32px); dense keeps master.
  addRootOverride(enhanced.components, 'MuiListItem', {
    variants: [{ props: { dense: false }, style: { minHeight: '32px' } }],
  });
  // Master resets MenuItem min-height to `auto` at sm-up (non-dense only);
  // stylis hoists that media block AFTER the class rule, so a plain later
  // declaration can never win on desktop — the floor must re-assert inside the
  // same media. Dense has no master media reset, so no re-assert. The knob
  // mirrors this via a linked write (densityFields `densityLinkedWrites`).
  const smUp = enhanced.breakpoints ? enhanced.breakpoints.up('sm') : '@media (min-width:600px)';
  addRootOverride(enhanced.components, 'MuiMenuItem', {
    paddingBlock: d['xx-small'],
    minHeight: 'auto',
    variants: [
      {
        props: { dense: false },
        style: { minHeight: d['touch-target'], [smUp]: { minHeight: d['touch-target'] } },
      },
      { props: { disableGutters: false }, style: { paddingInline: d['x-small'] } },
      {
        props: { dense: true },
        style: { [`& .${listItemIconClasses.root} svg`]: { fontSize: '0.8lh' } },
      },
    ],
    [`& .${listItemIconClasses.root}`]: { minWidth: d.large },
  });
  addRootOverride(enhanced.components, 'MuiList', {
    variants: [{ props: { disablePadding: false }, style: { paddingBlock: sp(1) } }],
  });
  addRootOverride(
    enhanced.components,
    'MuiTooltip',
    {
      ...enhanced.typography?.caption,
      padding: `${d['x-small']} ${d.small}`,
      [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: {
        marginInlineEnd: sp(0.5),
      },
      [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: {
        marginInlineStart: sp(0.5),
      },
      [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: { marginBottom: sp(0.5) },
      [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: { marginTop: sp(0.5) },
    },
    'tooltip',
  );
  addRootOverride(
    enhanced.components,
    'MuiTooltip',
    {
      // 0.71 = master's 1/sqrt(2) square-arrow projection ratio.
      '--_arrowSize': sp(1.375),
      [`&[data-popper-placement*="bottom"] .${tooltipClasses.arrow}`]: {
        marginTop: 'calc(var(--_arrowSize) * -0.71)',
      },
      [`&[data-popper-placement*="top"] .${tooltipClasses.arrow}`]: {
        marginBottom: 'calc(var(--_arrowSize) * -0.71)',
      },
      [`&[data-popper-placement*="right"] .${tooltipClasses.arrow}`]: {
        // re-assert: master's placement rules hit these selectors at equal specificity
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
      width: 'var(--_arrowSize)',
      height: 'calc(var(--_arrowSize) * 0.71)',
    },
    'arrow',
  );
  addRootOverride(enhanced.components, 'MuiInputBase', {
    lineHeight: enhanced.typography?.body1?.lineHeight,
  });
  addRootOverride(enhanced.components, 'MuiInputBase', { height: 'auto' }, 'input');
  addRootOverride(
    enhanced.components,
    'MuiInputBase',
    {
      paddingBlock: d['x-small'],
      variants: [
        { props: { size: 'small' }, style: { paddingTop: d['xx-small'] } },
        {
          props: { multiline: true },
          style: { paddingBlock: 0 },
        },
      ],
    },
    'input',
  );
  // Outlined label bridge: --_outlinedInputPadBlock broadcast to the FormControl
  // via :has(); the label consumes it as --_restY, --_inlinePad = the inline knob.
  // Input-slot re-assert chain mirrors master (multiline/adorned zero their side).
  addRootOverride(enhanced.components, 'MuiOutlinedInput', {
    [`.${formControlClasses.root}:has(> &)`]: {
      '--_outlinedInputPadBlock': `calc((${d['touch-target']} - 1lh) / 2)`,
    },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--_restY': 'var(--_outlinedInputPadBlock)',
      '--_inlinePad': d.small,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${formControlClasses.root}:has(> &)`]: { '--_outlinedInputPadBlock': d['xx-small'] },
        },
      },
      {
        props: { multiline: true },
        style: {
          paddingBlock: `var(--_outlinedInputPadBlock, calc((${d['touch-target']} - 1lh) / 2))`,
          paddingInline: d.small,
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingBlock: `var(--_outlinedInputPadBlock, ${d['xx-small']})`,
        },
      },
      {
        props: ({ ownerState }: { ownerState: { startAdornment?: unknown } }) =>
          Boolean(ownerState.startAdornment),
        style: { paddingLeft: d.small },
      },
      {
        props: ({ ownerState }: { ownerState: { endAdornment?: unknown } }) =>
          Boolean(ownerState.endAdornment),
        style: { '--_trailingPad': d.small },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiOutlinedInput',
    {
      paddingBlock: `var(--_outlinedInputPadBlock, calc((${d['touch-target']} - 1lh) / 2))`,
      paddingInline: d.small,
      variants: [
        {
          props: { size: 'small' },
          style: { paddingBlock: `var(--_outlinedInputPadBlock, ${d['xx-small']})` },
        },
        {
          props: { multiline: true },
          style: { paddingBlock: 0, paddingInline: 0 },
        },
        {
          props: ({ ownerState }: { ownerState: { startAdornment?: unknown } }) =>
            Boolean(ownerState.startAdornment),
          style: { paddingLeft: 0 },
        },
        {
          props: ({ ownerState }: { ownerState: { endAdornment?: unknown } }) =>
            Boolean(ownerState.endAdornment),
          style: { paddingRight: 0 },
        },
      ],
    },
    'input',
  );
  addRootOverride(
    enhanced.components,
    'MuiFilledInput',
    {
      paddingTop: `var(--_filledInputPadTop, ${d.large})`,
      paddingBottom: `var(--_filledInputPadBottom, ${d.small})`,
      paddingInline: d.small,
      variants: [
        {
          props: { hiddenLabel: true },
          style: { paddingBlock: `calc(${d['xx-small']} + 2px)` },
        },
        {
          props: { hiddenLabel: true, size: 'small' },
          style: { paddingBlock: d['xx-small'] },
        },
        {
          props: { multiline: true },
          style: { paddingBlock: 0, paddingInline: 0 },
        },
        {
          props: ({ ownerState }: { ownerState: { startAdornment?: unknown } }) =>
            Boolean(ownerState.startAdornment),
          style: { paddingLeft: 0 },
        },
        {
          props: ({ ownerState }: { ownerState: { endAdornment?: unknown } }) =>
            Boolean(ownerState.endAdornment),
          style: { paddingRight: 0 },
        },
      ],
    },
    'input',
  );
  addRootOverride(enhanced.components, 'MuiFilledInput', {
    [`.${formControlClasses.root}:has(> &)`]: {
      '--_filledInputPadTop': d.large,
      '--_filledInputPadBottom': d['x-small'],
    },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--_restY': `calc((var(--_filledInputPadTop) + var(--_filledInputPadBottom)) / 2)`,
      '--_shrinkY': '7px',
      '--_inlinePad': d.small,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${formControlClasses.root}:has(> &)`]: {
            '--_filledInputPadTop': `calc(${d.medium} + 2px)`,
            '--_filledInputPadBottom': d['xx-small'],
          },
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            '--_restY': `calc((var(--_filledInputPadTop) + var(--_filledInputPadBottom)) / 2)`,
            '--_shrinkY': '4px',
          },
        },
      },
      {
        props: { multiline: true },
        style: {
          paddingTop: `var(--_filledInputPadTop, ${d['x-large']})`,
          paddingBottom: `var(--_filledInputPadBottom, ${d.small})`,
          paddingInline: d.small,
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingTop: `var(--_filledInputPadTop, ${d.large})`,
          paddingBottom: `var(--_filledInputPadBottom, ${d['x-small']})`,
        },
      },
      {
        props: { multiline: true, hiddenLabel: true },
        style: { paddingTop: 16, paddingBottom: 17 },
      },
      {
        props: { multiline: true, hiddenLabel: true, size: 'small' },
        style: { paddingTop: 8, paddingBottom: 9 },
      },
      {
        props: ({ ownerState }: { ownerState: { startAdornment?: unknown } }) =>
          Boolean(ownerState.startAdornment),
        style: { paddingLeft: d.small },
      },
      {
        props: ({ ownerState }: { ownerState: { endAdornment?: unknown } }) =>
          Boolean(ownerState.endAdornment),
        style: { '--_trailingPad': d.small },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiInput', {
    [`.${formControlClasses.root}:has(> &)`]: {
      '--_inputPadTop': d['x-small'],
      '--_inputPadBottom': `calc(${d['xx-small']} + 2px)`,
      '--_inputMarginTop': d.small,
    },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--_restY': `calc(var(--_inputMarginTop, ${d.small}) + (var(--_inputPadTop, ${d['x-small']}) + var(--_inputPadBottom, ${d['x-small']})) / 2)`,
    },
    [`label + &, .${inputLabelClasses.root} + &`]: {
      marginTop: `var(--_inputMarginTop, ${d.small})`,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${formControlClasses.root}:has(> &)`]: {
            '--_inputPadTop': d['xx-small'],
            '--_inputPadBottom': d['xx-small'],
          },
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            '--_restY': `calc(var(--_inputMarginTop, ${d.small}) + (var(--_inputPadTop, ${d['xx-small']}) + var(--_inputPadBottom, ${d['xx-small']})) / 2)`,
          },
        },
      },
      {
        props: { multiline: true },
        style: {
          paddingTop: `var(--_inputPadTop, ${d['x-small']})`,
          paddingBottom: `var(--_inputPadBottom, calc(${d['xx-small']} + 2px))`,
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingTop: `var(--_inputPadTop, ${d['xx-small']})`,
          paddingBottom: `var(--_inputPadBottom, ${d['xx-small']})`,
        },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiInput',
    {
      paddingTop: `var(--_inputPadTop, ${d['x-small']})`,
      paddingBottom: `var(--_inputPadBottom, ${d['x-small']})`,
      variants: [
        {
          props: { size: 'small' },
          style: {
            paddingTop: `var(--_inputPadTop, ${d['xx-small']})`,
            paddingBottom: `var(--_inputPadBottom, ${d['xx-small']})`,
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
  // Floating-label transforms re-emitted so Y comes from preset-closed vars:
  // --_restY (every rest state; input-side :has broadcasts) and --_shrinkY
  // (filled only), consumed BARE — a missing writer must break visibly. Variant
  // order mirrors master; each shrink state must re-assert or the rest rules
  // here (landing after master's shrink) would leak the rest transform.
  addRootOverride(enhanced.components, 'MuiInputLabel', {
    variants: [
      {
        props: ({ ownerState }: { ownerState: { formControl?: object | undefined } }) =>
          Boolean(ownerState.formControl),
        style: { transform: 'translate(0, var(--_restY)) scale(1)' },
      },
      {
        props: { shrink: true },
        style: { transform: 'translate(0, -1.5px) scale(0.75)' },
      },
      {
        props: { variant: 'filled' },
        style: { transform: 'translate(var(--_inlinePad), var(--_restY)) scale(1)' },
      },
      {
        props: { variant: 'filled', shrink: true },
        style: { transform: 'translate(var(--_inlinePad), var(--_shrinkY)) scale(0.75)' },
      },
      {
        props: { variant: 'outlined' },
        style: { transform: 'translate(var(--_inlinePad), var(--_restY)) scale(1)' },
      },
      {
        props: { variant: 'outlined', shrink: true },
        style: { transform: 'translate(14px, -9px) scale(0.75)' },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiFormLabel', {
    lineHeight: enhanced.typography?.body1?.lineHeight,
  });
  addRootOverride(enhanced.components, 'MuiFormHelperText', {
    marginTop: d['xx-small'],
    variants: [{ props: { contained: true }, style: { marginInline: d.small } }],
  });
  addRootOverride(enhanced.components, 'MuiInputAdornment', {
    variants: [
      { props: { position: 'start' }, style: { marginRight: d['x-small'] } },
      { props: { position: 'end' }, style: { marginLeft: d['x-small'] } },
      {
        props: { position: 'start', size: 'small' },
        style: { marginRight: d['xx-small'] },
      },
      {
        props: { position: 'end', size: 'small' },
        style: { marginLeft: d['xx-small'] },
      },
      {
        props: { variant: 'filled' },
        style: {
          [`&.${inputAdornmentClasses.positionStart}&:not(.${inputAdornmentClasses.hiddenLabel})`]:
            {
              marginTop:
                'calc(var(--_filledInputPadTop, 18px) - var(--_filledInputPadBottom, 2px))',
            },
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiFormControlLabel', {
    margin: 0,
  });
  addRootOverride(enhanced.components, 'MuiCheckbox', {
    '--_touchSize': d['touch-target'],
    '--_iconSize': d.medium,
    padding: 0,
    width: 'var(--_touchSize)',
    height: 'var(--_touchSize)',
    '& svg': { fontSize: 'var(--_iconSize)' },
    [`.${formControlLabelClasses.root} &`]: {
      marginLeft: `calc((var(--_touchSize) - var(--_iconSize)) / -2)`,
    },
    variants: [
      {
        props: { size: 'small' },
        style: { '--_touchSize': d.large, '--_iconSize': d.small },
      },
      { props: { edge: 'start' }, style: { marginLeft: `calc(var(--_touchSize) / -8)` } },
      { props: { edge: 'end' }, style: { marginRight: `calc(var(--_touchSize) / -8)` } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiRadio', {
    '--_touchSize': d['touch-target'],
    '--_iconSize': d.medium,
    padding: 0,
    width: 'var(--_touchSize)',
    height: 'var(--_touchSize)',
    '& svg': { fontSize: 'var(--_iconSize)' },
    [`.${formControlLabelClasses.root} &`]: {
      marginLeft: `calc((var(--_touchSize) - var(--_iconSize)) / -2)`,
    },
    variants: [
      {
        props: { size: 'small' },
        style: { '--_touchSize': d.large, '--_iconSize': d.small },
      },
      { props: { edge: 'start' }, style: { marginLeft: `calc(var(--_touchSize) / -8)` } },
      { props: { edge: 'end' }, style: { marginRight: `calc(var(--_touchSize) / -8)` } },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiBreadcrumbs',
    { marginInline: d['x-small'] },
    'separator',
  );
  // Row floor on the `ol` slot — the flex row with align-items: center — so
  // crumbs stay vertically centered.
  addRootOverride(
    enhanced.components,
    'MuiBreadcrumbs',
    {
      minHeight: d['touch-target'],
      '& a': {
        display: 'inline-flex',
        lineHeight: d['touch-target'],
      },
      [`& li>.${buttonBaseClasses.root}`]: {
        // BreadcrumbCollapsed
        paddingInline: d['x-small'],
        height: d['touch-target'],
        margin: 0,
      },
    },
    'ol',
  );
  addRootOverride(enhanced.components, 'MuiToggleButton', {
    ...enhanced.typography?.button,
    paddingBlock: 0,
    height: 'var(--_size)',
    minWidth: 'var(--_size)',
    variants: [
      {
        props: { size: 'small' },
        style: {
          '--_size': d.large,
          paddingInline: `calc((var(--_size) - ${sp(1.75)}) / 2 - 1px)`,
        },
      },
      {
        props: { size: 'medium' },
        style: {
          '--_size': d['touch-target'],
          paddingInline: `calc((var(--_size) - ${sp(2)}) / 2 - 1px)`,
        },
      },
      {
        props: { size: 'large' },
        style: {
          '--_size': d['xx-large'],
          paddingInline: `calc((var(--_size) - ${sp(2.5)}) / 2 - 1px)`,
        },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiSwitch',
    {
      // Center the touch target in the root; travel keeps the thumb symmetric.
      top: 'calc((var(--_height) - var(--_touchSize)) / 2)',
      padding: 'calc((var(--_touchSize) - var(--_thumbHeight)) / 2)',
      // When the touch target outgrows the root height, re-anchor the thumb on
      // the track's end caps: nudge left by the overflow half at rest, right by
      // the same amount when checked (0 when touch <= height).
      left: 'calc((var(--_height) - var(--_touchSize)) / 2)',
      [`&.${switchClasses.checked}`]: {
        transform:
          'translateX(calc(var(--_width) - var(--_height) - (var(--_thumbWidth) - var(--_thumbHeight))))',
      },
    },
    'switchBase',
  );
  addRootOverride(
    enhanced.components,
    'MuiSwitch',
    {
      width: 'var(--_thumbWidth)',
      height: 'var(--_thumbHeight)',
      borderRadius: 'var(--_touchSize)',
    },
    'thumb',
  );
  addRootOverride(
    enhanced.components,
    'MuiSwitch',
    {
      // Full pill: half the track thickness (height minus the two gutters).
      borderRadius: 'calc((var(--_height) - 2 * var(--_pad)) / 2)',
    },
    'track',
  );
  // Input wrapper block padding (around the value/tags) + tag (chip) margin = steps.
  addRootOverride(enhanced.components, 'MuiAutocomplete', {
    // Root block pad is 0 — the input carries the WHOLE per-side pad, equal to
    // the plain OutlinedInput pad (32px total; small 4px -> 28px). Keeps
    // multi-select simple: chips stack in an unpadded root while the input's
    // own pad still sets the row rhythm; the label restY broadcast below
    // (root + input) lands on the same value as plain inputs either way.
    '--_autocompleteInputRootPadBlock': '3px',
    '--_autocompleteInputPadBlock': `calc((${d['touch-target']} - 1lh) / 2 - var(--_autocompleteInputRootPadBlock))`,
    [`& .${outlinedInputClasses.root}`]: {
      paddingBlock: `var(--_autocompleteInputRootPadBlock)`,
      paddingLeft: '8px',
    },
    [`& .${outlinedInputClasses.root} .${autocompleteClasses.input}`]: {
      paddingBlock: `var(--_autocompleteInputPadBlock)`,
      paddingLeft: '4px',
    },
    [`& .${formControlClasses.root}:has(> .${outlinedInputClasses.root})`]: {
      '--_outlinedInputPadBlock':
        'calc(var(--_autocompleteInputRootPadBlock) + var(--_autocompleteInputPadBlock))',
    },
    // small size
    [`&:has(.${inputBaseClasses.sizeSmall})`]: {
      '--_autocompleteInputRootPadBlock': '0px',
      '--_autocompleteInputPadBlock': d['xx-small'],
    },
    [`& .${outlinedInputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
      paddingBlock: `var(--_autocompleteInputRootPadBlock)`,
    },
    [`& .${outlinedInputClasses.root}.${inputBaseClasses.sizeSmall} .${autocompleteClasses.input}`]:
      {
        paddingBlock: `var(--_autocompleteInputPadBlock)`,
      },
  });
  addRootOverride(enhanced.components, 'MuiAutocomplete', { margin: '1px' }, 'tag');
  // hasConnector:false = the first step; end nodes sit flush with the edge.
  addRootOverride(enhanced.components, 'MuiStep', {
    variants: [
      {
        props: { orientation: 'horizontal', alternativeLabel: false, hasConnector: false },
        style: { paddingLeft: '0px' },
      },
      {
        props: { orientation: 'horizontal', alternativeLabel: false, last: true },
        style: { paddingRight: '0px' },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiStepLabel', {
    variants: [{ props: { orientation: 'vertical' }, style: { paddingBlock: '0px' } }],
  });
  // Master sets the alternativeLabel gap at 2-class specificity — the nested
  // selector must be re-emitted to win. Horizontal-only: master already zeroes
  // vertical, an unscoped emission would stomp that reset.
  addRootOverride(
    enhanced.components,
    'MuiStepLabel',
    {
      variants: [
        {
          props: { orientation: 'horizontal', alternativeLabel: true },
          style: { [`&.${stepLabelClasses.alternativeLabel}`]: { marginTop: '0px' } },
        },
      ],
    },
    'label',
  );
  // Icon→label spacing falls out of centering the circle in the touch box.
  addRootOverride(
    enhanced.components,
    'MuiStepLabel',
    {
      padding: '0px',
      justifyContent: 'center',
      minWidth: d['touch-target'],
      minHeight: d['touch-target'],
      alignItems: 'center',
    },
    'iconContainer',
  );
  // Circle must land on MuiStepIcon root: an SvgIcon sizes off its OWN
  // fontSize (w/h = 1em) — a parent iconContainer fontSize can't reach it.
  addRootOverride(enhanced.components, 'MuiStepIcon', {
    fontSize: `calc(${d['touch-target']} - ${sp(1.25)})`,
  });
  addRootOverride(enhanced.components, 'MuiStepIcon', { fontSize: sp(1.75) }, 'text');
  // Vertical-alt keeps master's marginLeft:auto — only marginRight moves.
  addRootOverride(enhanced.components, 'MuiStepConnector', {
    variants: [
      {
        props: { orientation: 'horizontal', alternativeLabel: true },
        style: { top: `calc(${d['touch-target']} / 2)` },
      },
      {
        props: { orientation: 'vertical', alternativeLabel: false },
        style: { marginLeft: `calc(${d['touch-target']} / 2)` },
      },
      {
        props: { orientation: 'vertical', alternativeLabel: true },
        style: { marginRight: `calc(${d['touch-target']} / 2)` },
      },
    ],
  });
  // margin = half box lands the border on the icon center; margin + padding
  // = the full box aligns content text with the label.
  addRootOverride(enhanced.components, 'MuiStepContent', {
    variants: [
      {
        props: { alternativeLabel: false },
        style: {
          marginLeft: `calc(${d['touch-target']} / 2)`,
          paddingLeft: `calc(${d['touch-target']} / 2 - 1px)`, // 1px account for the border
        },
      },
      {
        props: { alternativeLabel: true },
        style: {
          marginRight: `calc(${d['touch-target']} / 2)`,
          paddingRight: `calc(${d['touch-target']} / 2 - 1px)`, // 1px account for the border
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiSnackbarContent', {
    // Block: semantic/spacing/fixed/s (8px, px unverified — assumed from fixed
    // ladder 2/4/8/12); inline: no Figma capture, stays a step.
    padding: `8px ${d.large}`,
  });
  addRootOverride(enhanced.components, 'MuiSnackbarContent', { paddingBlock: d.small }, 'message');
  // Inline-start inset only; the -8px flush end pull is an edge offset (frozen).
  addRootOverride(enhanced.components, 'MuiSnackbarContent', { paddingLeft: d.large }, 'action');
  addRootOverride(enhanced.components, 'MuiDialogTitle', {
    // headerWrapper: top/right/bottom semantic/spacing/variable/s, left semantic/spacing/variable/m
    padding: `${d.small} ${d.small} ${d.small} ${d.medium}`,
  });
  addRootOverride(enhanced.components, 'MuiDialogContent', {
    // Both dividers states pad 0px 16px (raw). Separate variants keep one knob
    // per state; dividers:true now overrides master's distinct 16 24.
    variants: [
      { props: { dividers: false }, style: { padding: '0px 16px' } },
      { props: { dividers: true }, style: { padding: '0px 16px' } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiDialogActions', {
    // Root inset: footer bottomContentWrapper semantic/spacing/variable/m;
    // inter-button gap keeps its step (no Figma capture).
    padding: d.medium,
    variants: [
      {
        props: ({ ownerState }: { ownerState: { disableSpacing?: boolean | undefined } }) =>
          !ownerState.disableSpacing,
        style: { '& > :not(style) ~ :not(style)': { marginLeft: d.small } },
      },
    ],
  });
  const bp = (
    enhanced as unknown as {
      breakpoints: {
        values: Record<string, number>;
        unit: string;
        down: (width: number) => string;
      };
    }
  ).breakpoints;
  addRootOverride(
    enhanced.components,
    'MuiDialog',
    {
      // Paper margin + every "100% minus margin" viewport calc derive from ONE
      // private var so the knob and the offset math can't desync. Media-query
      // GUARDS (down(width + 32*2)) stay at master's boundaries — media queries
      // can't read vars; only the applied maxWidth co-varies. Every emission is
      // scoped fullScreen:false — master's fullScreen state zeroes all of these
      // and must stay untouched (an unscoped rule lands later in the cascade
      // and would clobber it).
      '--_dialogMargin': d['xx-large'],
      variants: [
        { props: { fullScreen: false }, style: { margin: 'var(--_dialogMargin)' } },
        {
          props: { scroll: 'paper', fullScreen: false },
          style: { maxHeight: 'calc(100% - var(--_dialogMargin) * 2)' },
        },
        {
          props: ({
            ownerState,
          }: {
            ownerState: { maxWidth?: string | false | undefined; fullScreen?: boolean | undefined };
          }) => !ownerState.maxWidth && !ownerState.fullScreen,
          style: { maxWidth: 'calc(100% - var(--_dialogMargin) * 2)' },
        },
        {
          props: { maxWidth: 'xs', scroll: 'body', fullScreen: false },
          style: {
            [bp.down(Math.max(bp.values.xs, 444) + 32 * 2)]: {
              maxWidth: 'calc(100% - var(--_dialogMargin) * 2)',
            },
          },
        },
        ...Object.keys(bp.values)
          .filter((maxWidth) => maxWidth !== 'xs')
          .map((maxWidth) => ({
            props: { maxWidth, scroll: 'body', fullScreen: false },
            style: {
              [bp.down(bp.values[maxWidth] + 32 * 2)]: {
                maxWidth: 'calc(100% - var(--_dialogMargin) * 2)',
              },
            },
          })),
        {
          props: { fullWidth: true, fullScreen: false },
          style: { width: 'calc(100% - var(--_dialogMargin) * 2)' },
        },
      ],
    },
    'paper',
  );
  // Mirror MenuItem (design): same touch-target floors + spacing steps. No sm-up
  // re-assert (ListItemButton has no master minHeight media reset, unlike MenuItem).
  addRootOverride(enhanced.components, 'MuiListItemButton', {
    variants: [
      { props: { dense: false }, style: { minHeight: '32px', paddingBlock: d['xx-small'] } },
      { props: { dense: true }, style: { minHeight: '28px', paddingBlock: d['xx-small'] } },
      { props: { dense: false, disableGutters: false }, style: { paddingInline: d['x-small'] } },
      { props: { dense: true, disableGutters: false }, style: { paddingInline: d.medium } },
    ],
  });
  // Match MenuItem's icon column (24px). MuiListItemIcon global — hidden in Menu
  // (MenuItem's nested seam owns it there); surfaces as its own knob in List.
  addRootOverride(enhanced.components, 'MuiListItemIcon', { minWidth: 24 });
  // ListItemAvatar column floor (32px, raw px sizing).
  addRootOverride(enhanced.components, 'MuiListItemAvatar', { minWidth: 32 });
  // Plain ListItem (no ListItemButton) mirrors MenuItem spacing; disablePadding
  // zeroes it when a ListItemButton owns the row. minHeight stays medium-only.
  addRootOverride(enhanced.components, 'MuiListItem', {
    variants: [
      { props: { dense: false }, style: { paddingBlock: d['xx-small'] } },
      { props: { dense: true }, style: { paddingBlock: d['xx-small'] } },
      { props: { dense: false, disableGutters: false }, style: { paddingInline: d['x-small'] } },
      { props: { dense: true, disableGutters: false }, style: { paddingInline: d.medium } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiCardContent', {
    padding: d.medium,
    '&:last-child': { paddingBottom: d.medium },
  });
  addRootOverride(enhanced.components, 'MuiCardActions', {
    padding: d.medium,
    paddingTop: 0,
    variants: [
      {
        props: { disableSpacing: false },
        style: { gap: d['x-small'], '& > :not(style) ~ :not(style)': { marginLeft: 0 } },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiCardHeader', { padding: d.medium, gap: d.small });
  // Avatar→content spacing stays a one-sided margin: a root gap would also
  // open space between the flex-1 content and the action (master has none).
  addRootOverride(enhanced.components, 'MuiCardHeader', { marginRight: 0 }, 'avatar');
  addRootOverride(
    enhanced.components,
    'MuiCardHeader',
    {
      marginBlock: `calc(${d['xx-small']} * -1)`,
      marginRight: `calc(${d['x-small']} * -1)`,
    },
    'action',
  );
  addRootOverride(
    enhanced.components,
    'MuiSelect',
    {
      minHeight: 'auto',
      // master writes per-variant --_caret/--_endAdornment on these same :has hooks
      [`.${inputBaseClasses.root}:has(> &)`]: { '--_caret': d.medium },
      [`.${inputBaseClasses.root}:has(> & ~ .${inputAdornmentClasses.root})`]: {
        '--_endAdornment': d.medium,
      },
    },
    'select',
  );
  addRootOverride(enhanced.components, 'MuiAlert', {
    paddingBlock: d['x-small'],
    paddingInline: d.large,
    gap: d.medium,
    [`& .${alertClasses.icon}`]: { marginRight: 0 },
    [`& .${alertClasses.action}`]: { paddingLeft: 0 },
  });
  addRootOverride(
    enhanced.components,
    'MuiAccordionSummary',
    {
      marginBlock: '0px',
      alignItems: 'center',
      gap: d['x-small'],
      variants: [
        {
          props: ({
            ownerState,
          }: {
            ownerState: AccordionSummaryOwnerState & { disableGutters?: boolean | undefined };
          }) => !ownerState.disableGutters,
          style: { [`&.${accordionSummaryClasses.expanded}`]: { marginBlock: '0px' } },
        },
      ],
    },
    'content',
  );
  addRootOverride(enhanced.components, 'MuiTab', {
    minHeight: d['touch-target'],
    lineHeight: enhanced.typography?.button?.lineHeight,
    paddingBlock: 0,
    paddingInline: d.small,
    gap: d['xx-small'],
    [`& > .${tabClasses.icon}`]: { margin: 0 },
    variants: [
      {
        props: ({ ownerState }: { ownerState: TabProps }) =>
          ownerState.icon &&
          ownerState.label &&
          (ownerState.iconPosition === 'top' || ownerState.iconPosition === 'bottom'),
        style: {
          minHeight: d['xx-large'],
          paddingBlock: d['xx-small'],
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiTabs', { minHeight: d['touch-target'] });
  addRootOverride(enhanced.components, 'MuiTabScrollButton', {
    variants: [
      { props: { orientation: 'horizontal' }, style: { width: d['touch-target'] } },
      { props: { orientation: 'vertical' }, style: { height: d['touch-target'] } },
    ],
  });
  // AvatarGroup overlap is untouchable: an inline --AvatarGroup-spacing style
  // from the spacing prop (px numbers only) outranks any styleOverride.
  addRootOverride(enhanced.components, 'MuiAvatar', {
    '--_size': d['touch-target'],
    width: 'var(--_size)',
    height: 'var(--_size)',
    fontSize: 'calc(var(--_size) / 2)',
  });
  addRootOverride(enhanced.components, 'MuiLinearProgress', { height: sp(0.5) });
  addDefaultProps(enhanced.components, 'MuiCircularProgress', { size: d['touch-target'] });
  // Root box = the touch target (padding 0 also kills master's coarse-pointer
  // padding; the thumb keeps its frozen 42px ::after hit target). Master sizes
  // rail/track via height:inherit off the root, so their thickness is
  // re-emitted explicitly from --_trackSize. markLabel offsets stay master.
  addRootOverride(enhanced.components, 'MuiSlider', {
    padding: 0,
    '--_trackSize': `calc(${d.small} / 4)`,
    variants: [
      { props: { orientation: 'horizontal' }, style: { height: d['touch-target'] } },
      { props: { orientation: 'vertical' }, style: { width: d['touch-target'] } },
      { props: { size: 'small' }, style: { '--_trackSize': `calc(${d['x-small']} / 4)` } },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiSlider',
    {
      padding: `${d['xx-small']} ${d['x-small']}`,
    },
    'valueLabel',
  );
  addRootOverride(
    enhanced.components,
    'MuiSlider',
    {
      top: d['touch-target'],
    },
    'markLabel',
  );
  for (const slot of ['rail', 'track'] as const) {
    addRootOverride(
      enhanced.components,
      'MuiSlider',
      {
        variants: [
          { props: { orientation: 'horizontal' }, style: { height: 'var(--_trackSize)' } },
          { props: { orientation: 'vertical' }, style: { width: 'var(--_trackSize)' } },
        ],
      },
      slot,
    );
  }
  addRootOverride(
    enhanced.components,
    'MuiSlider',
    {
      // The 42px ::after hit target stays frozen.
      width: d.medium,
      height: d.medium,
      variants: [{ props: { size: 'small' }, style: { width: d.small, height: d.small } }],
      '&::after': {
        width: d['touch-target'],
        height: d['touch-target'],
      },
    },
    'thumb',
  );
  addRootOverride(
    enhanced.components,
    'MuiBadge',
    {
      variants: [
        {
          props: { variant: 'standard' },
          style: {
            minWidth: sp(2.5),
            height: sp(2.5),
            paddingInline: sp(0.75),
            ...enhanced.typography?.caption,
          },
        },
        { props: { variant: 'dot' }, style: { minWidth: sp(1), height: sp(1) } },
      ],
    },
    'badge',
  );
  // Switch: interlocked geometry off five preset-local vars (seam from PR
  // #48624 moved here; component stays master). SwitchBase pad, touch-target
  // centering, checked travel, and track radius all DERIVE from the vars, so the
  // thumb stays centered whatever the knobs say. All raw px — the gutter drives
  // track thickness (height - 2*pad), so it rides the dims, not a step.
  addRootOverride(enhanced.components, 'MuiSwitch', {
    // Consumers are base (they read whatever var is in scope); the var
    // DECLARATIONS live on explicit size variants so a knob edit rebuilds
    // size-scoped and never bleeds into the other size.
    '--_pad': `calc((var(--_height) - var(--_thumbHeight)/1.4285714286) / 2)`, // to maintain the original ratio
    '--_width': `calc(var(--_thumbHeight)*1.7 + var(--_pad)*2)`, // to maintain the original ratio
    width: 'var(--_width)',
    height: 'var(--_height)',
    padding: 'var(--_pad)',
    [`.${formControlLabelClasses.labelPlacementEnd} &`]: {
      marginLeft: 'calc(-1 * var(--_pad))',
    },
    [`.${formControlLabelClasses.labelPlacementStart} &`]: {
      marginRight: 'calc(-1 * var(--_pad))',
    },
    variants: [
      {
        props: { size: 'medium' },
        style: {
          '--_height': d['touch-target'],
          '--_touchSize': d['touch-target'],
          '--_thumbHeight': d.medium,
          '--_thumbWidth': d.medium,
        },
      },
      {
        props: { size: 'small' },
        style: {
          '--_height': d.large,
          // Invariant: --_touchSize >= --_thumbHeight (see medium — padding clips).
          '--_touchSize': d.large,
          '--_thumbHeight': `calc(${d.medium} - 4px)`,
          '--_thumbWidth': `calc(${d.medium} - 4px)`,
          // Master's small rules sit nested under the root variant at higher
          // specificity — re-assert the derivations there or they lose for small.
          [`& .${switchClasses.thumb}`]: {
            width: 'var(--_thumbWidth)',
            height: 'var(--_thumbHeight)',
          },
          [`& .${switchClasses.switchBase}`]: {
            padding: 'calc((var(--_touchSize) - var(--_thumbHeight)) / 2)',
            [`&.${switchClasses.checked}`]: {
              transform:
                'translateX(calc(var(--_width) - var(--_height) - (var(--_thumbWidth) - var(--_thumbHeight))))',
            },
          },
        },
      },
      { props: { edge: 'start' }, style: { marginLeft: 'calc(-1 * var(--_pad))' } },
      { props: { edge: 'end' }, style: { marginRight: 'calc(-1 * var(--_pad))' } },
    ],
  });
  // td height acts as a min-height (cells grow with wrapped content). The
  // checkbox re-assert nests &.paddingCheckbox: master's small-size rule pads
  // it at 2-class specificity, so a plain variant (1 class) loses there.
  addRootOverride(enhanced.components, 'MuiTableCell', {
    paddingBlock: 0,
    [`&.${tableCellClasses.paddingCheckbox}`]: { padding: `0 0 0 ${sp(0.5)}` },
    variants: [
      {
        props: { size: 'medium' },
        style: { height: `calc(${d['x-large']} + ${d['x-small']})`, paddingInline: d.small },
      },
      {
        props: { size: 'small' },
        style: { height: `calc(${d.large} + ${d['xx-small']})`, paddingInline: d['x-small'] },
      },
      { props: { variant: 'footer' }, style: { ...enhanced.typography?.subtitle2 } },
      { props: { padding: 'none' }, style: { padding: 0 } },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiTableSortLabel',
    {
      // One marginInline leaf: the arrow flips sides in right-aligned columns.
      fontSize: sp(2.25),
      marginInline: d['xx-small'],
    },
    'icon',
  );
  addRootOverride(enhanced.components, 'MuiTablePagination', {
    // ALL pagination geometry rides the ROOT slot as descendant selectors: the
    // toolbar/select slots have custom overridesResolvers that SPREAD the theme
    // styleOverride ({...styles.toolbar}) — an array-form slot (addRootOverride,
    // playground layering) spreads to numeric keys and silently drops. Root's
    // default resolver is array-safe, and root-class nesting outranks the slot
    // rules (incl. master's duplicated minHeight media re-asserts).
    [`& .${tablePaginationClasses.toolbar}`]: {
      minHeight: d['xx-large'],
      paddingRight: d['x-small'],
    },
    [`& .${tablePaginationClasses.toolbar} .${tablePaginationClasses.actions}`]: {
      marginLeft: d['x-large'],
    },
    // Rows-per-page select: outer left gap + inner pad (right side = the dropdown
    // icon lane). Inner pad nests past the toolbar so it outranks master's own
    // 2-class `& .select` rule.
    [`& .${tablePaginationClasses.selectRoot}`]: {
      marginLeft: d.small,
    },
    [`& .${tablePaginationClasses.toolbar} .${tablePaginationClasses.select}`]: {
      paddingLeft: d.small,
      paddingRight: sp(2.75),
    },
  });
  addRootOverride(
    enhanced.components,
    'MuiAutocomplete',
    {
      // Option list (mirrors MenuItem) renders in a Popper → emit on the listbox
      // slot: minHeight raw px, block/inline pad steps.
      [`& .${autocompleteClasses.option}`]: {
        minHeight: d['touch-target'],
        paddingBlock: d['xx-small'],
        paddingInline: d['x-small'],
      },
    },
    'listbox',
  );
  addRootOverride(enhanced.components, 'MuiToolbar', {
    // Gutter inline pad: semantic/spacing/variable/m at every width (sm-up bump collapsed); dense + regular bar
    // min-heights (raw px). Regular mirrors theme.mixins.toolbar's responsive
    // shape (portrait / landscape / sm-up) as styleOverrides — the mixin itself
    // stays untouched, so mixins.toolbar offset math keeps master.
    variants: [
      {
        props: { disableGutters: false },
        style: {
          paddingInline: d.medium,
          [(enhanced as unknown as { breakpoints: { up: (key: string) => string } }).breakpoints.up(
            'sm',
          )]: {
            paddingInline: d.medium,
          },
        },
      },
      { props: { variant: 'dense' }, style: { minHeight: '48px' } },
      {
        props: { variant: 'regular' },
        style: {
          minHeight: '56px',
          // Master nests this under breakpoints.up('xs') — a no-op (min-width:0)
          // wrapper; emitted flat so the emit-table readback can resolve it.
          '@media (orientation: landscape)': { minHeight: '48px' },
          [(enhanced as unknown as { breakpoints: { up: (key: string) => string } }).breakpoints.up(
            'sm',
          )]: {
            minHeight: '64px',
          },
        },
      },
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
    // Item box: min-width raw px + inline pad/inter-item gap steps per size on
    // every item (ellipsis shares master's values; small's 1px margin is
    // sub-step — frozen). Button items get height through one --_height var so
    // the pill radius derives as height/2 (master pins per-size radius literals
    // that would go stale as the heights move); ellipsis keeps auto height.
    variants: [
      { props: { size: 'small' }, style: { minWidth: '26px', paddingInline: d['xx-small'] } },
      {
        props: { size: 'medium' },
        style: { minWidth: '32px', paddingInline: d['x-small'], marginInline: d['xx-small'] },
      },
      {
        props: { size: 'large' },
        style: { minWidth: '40px', paddingInline: d.small, marginInline: d['xx-small'] },
      },
      {
        props: ({ ownerState }: { ownerState: PaginationItemOwnerState }) =>
          ownerState.type !== 'start-ellipsis' &&
          ownerState.type !== 'end-ellipsis' &&
          ownerState.size === 'small',
        style: {
          '--_height': '26px',
          height: 'var(--_height)',
          borderRadius: 'calc(var(--_height) / 2)',
        },
      },
      {
        props: ({ ownerState }: { ownerState: PaginationItemOwnerState }) =>
          ownerState.type !== 'start-ellipsis' &&
          ownerState.type !== 'end-ellipsis' &&
          ownerState.size === 'medium',
        style: {
          '--_height': '32px',
          height: 'var(--_height)',
          borderRadius: 'calc(var(--_height) / 2)',
        },
      },
      {
        props: ({ ownerState }: { ownerState: PaginationItemOwnerState }) =>
          ownerState.type !== 'start-ellipsis' &&
          ownerState.type !== 'end-ellipsis' &&
          ownerState.size === 'large',
        style: {
          '--_height': '40px',
          height: 'var(--_height)',
          borderRadius: 'calc(var(--_height) / 2)',
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiBottomNavigation', {
    height: '56px',
  });
  addRootOverride(enhanced.components, 'MuiBottomNavigationAction', {
    // Inline pad = step; per-item width clamps = raw px (sizing). Icon-only
    // centering paddingTop = step, with master's no-label zero re-asserted
    // (this emission lands after it in the cascade and would clobber it).
    // Selected label type shift (12→14) stays frozen — state, not a size axis.
    paddingInline: d.medium,
    minWidth: '80px',
    maxWidth: '168px',
    variants: [
      {
        // Net master condition (pT14 unless the no-label rule zeroes it) — one
        // matcher, so master's paddingTop:0 no-label state stays untouched.
        props: ({
          ownerState,
        }: {
          ownerState: {
            showLabel?: boolean | undefined;
            selected?: boolean | undefined;
            label?: unknown;
          };
        }) => !ownerState.showLabel && !ownerState.selected && Boolean(ownerState.label),
        style: { paddingTop: d.medium },
      },
    ],
  });
  // Chip spacing model: the root owns the edges (paddingInline) and the
  // sibling spacing (gap = x-small at both sizes); the label is spacing-inert
  // and every child margin resets to 0 at slot level (slot rules render after
  // master's size re-asserts and win by order at equal specificity).
  addRootOverride(enhanced.components, 'MuiChip', {
    variants: [
      {
        props: { size: 'medium' },
        style: {
          height: d['touch-target'],
          paddingInline: d.small,
          gap: d['x-small'],
          '--_childSize': `calc(${d['touch-target']} - ${d['x-small']})`,
          '--_offset': `calc(-1 * (${d.small} - ${d['x-small']}/2))`,
        },
      },
      {
        props: { size: 'small' },
        style: {
          height: `calc(${d.large} + ${sp(0.5)})`,
          paddingInline: d['x-small'],
          gap: d['xx-small'],
          '--_childSize': `calc(${d.large} + ${sp(0.5)} - ${d['x-small']})`,
          '--_offset': `calc(-1 * (${d['x-small']} - ${d['x-small']}/2))`,
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiChip', { paddingInline: 0 }, 'label');
  addRootOverride(
    enhanced.components,
    'MuiChip',
    {
      margin: 0,
      width: 'var(--_childSize)',
      height: 'var(--_childSize)',
      marginLeft: 'var(--_offset)',
    },
    'avatar',
  );
  addRootOverride(
    enhanced.components,
    'MuiChip',
    {
      margin: 0,
      variants: [
        { props: { size: 'medium' }, style: { fontSize: sp(2) } },
        { props: { size: 'small' }, style: { fontSize: sp(1.75) } },
      ],
    },
    'icon',
  );
  addRootOverride(
    enhanced.components,
    'MuiChip',
    {
      margin: 0,
      width: 'var(--_childSize)',
      height: 'var(--_childSize)',
      marginRight: 'var(--_offset)',
    },
    'deleteIcon',
  );
  addRootOverride(enhanced.components, 'MuiAccordionSummary', {
    minHeight: d['touch-target'],
    padding: `0 ${d['x-small']}`,
    variants: [
      {
        props: ({
          ownerState,
        }: {
          ownerState: AccordionSummaryOwnerState & { disableGutters?: boolean | undefined };
        }) => !ownerState.disableGutters,
        // scoped to expanded: wins master's 64px literal on specificity
        style: { [`&.${accordionSummaryClasses.expanded}`]: { minHeight: d['touch-target'] } },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiAccordionDetails', {
    paddingBlock: d['x-small'],
    paddingInline: d.small,
  });
}
