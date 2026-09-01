import addDefaultProps from '../utils/addDefaultProps';
import addRootOverride from '../utils/addRootOverride';
import { EnhanceableTheme } from './densityScale';
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
import { ListItemOwnerState } from '../ListItem';
import listItemButtonClasses from '../ListItemButton/listItemButtonClasses';

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
    components: NonNullable<EnhanceableTheme['components']>;
  },
  /** The interactive box height in px. A sizing constant rather than a spacing
   * key, so it is emitted literally and has no CSS variable. */
  touchTarget: string,
  /** The default icon glyph size in px, on the same terms as `touchTarget`.
   * Anchor cells only — the small and large icon sizes stay on the ladder. */
  iconTarget: string,
): void {
  // Keyed spacing: a scale key resolves to its step (var ref under cssVariables,
  // raw px otherwise); numbers stay plain spacing units.
  const { spacing } = enhanced;
  // Sized components step off the interactive box rather than the ladder, so a
  // `touch-target` override carries all three sizes instead of only the middle
  // one. Both land on today's px at the default 32.
  const smallBox = `calc(${touchTarget} - ${spacing('x-small')})`;
  const largeBox = `calc(${touchTarget} + ${spacing('small')})`;
  // Icons ride the glyph constant the same way boxes ride the interactive one.
  const iconSmall = `calc(${iconTarget} - ${spacing(0.25)})`;
  const iconLarge = `calc(${iconTarget} + ${spacing(0.5)})`;
  const sharedCheckboxRadio = {
    padding: 0,
    width: touchTarget,
    height: touchTarget,
    '& svg': { fontSize: iconTarget },
    [`.${formControlLabelClasses.root}:has(&)`]: {
      marginLeft: `calc((${touchTarget} - ${iconTarget}) / -2)`,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          width: smallBox,
          height: smallBox,
          '& svg': { fontSize: iconSmall },
          [`.${formControlLabelClasses.root}:has(&)`]: {
            marginLeft: `calc((${smallBox} - ${iconSmall}) / -2)`,
          },
        },
      },
      { props: { edge: 'start' }, style: { marginLeft: `calc(${touchTarget} / -8)` } },
      {
        props: { edge: 'start', size: 'small' },
        style: { marginLeft: `calc(${smallBox} / -8)` },
      },
      { props: { edge: 'end' }, style: { marginRight: `calc(${touchTarget} / -8)` } },
      {
        props: { edge: 'end', size: 'small' },
        style: { marginRight: `calc(${smallBox} / -8)` },
      },
    ],
  };
  addRootOverride(enhanced.components, 'MuiButton', {
    ...enhanced.typography?.button,
    paddingBlock: 0,
    gap: spacing('x-small'),
    variants: [
      {
        props: { size: 'small' },
        style: { height: smallBox, paddingInline: spacing('small') },
      },
      {
        props: { size: 'medium' },
        style: { height: touchTarget, paddingInline: spacing('medium') },
      },
      {
        props: { size: 'large' },
        style: { height: largeBox, paddingInline: spacing('large') },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiButton',
    { margin: 0, '& > *:nth-of-type(1)': { fontSize: '0.8lh' } }, // '& > *:nth-of-type(1)' is the same as Button's implementation
    'startIcon',
  );
  addRootOverride(
    enhanced.components,
    'MuiButton',
    { margin: 0, '& > *:nth-of-type(1)': { fontSize: '0.8lh' } }, // '& > *:nth-of-type(1)' is the same as Button's implementation
    'endIcon',
  );
  addRootOverride(enhanced.components, 'MuiIconButton', {
    padding: 0,
    fontSize: iconTarget,
    variants: [
      { props: { size: 'small' }, style: { width: smallBox, height: smallBox } },
      {
        props: { size: 'medium' },
        style: { width: touchTarget, height: touchTarget },
      },
      {
        props: { size: 'large' },
        style: { width: largeBox, height: largeBox },
      },
      { props: { edge: 'start' }, style: { marginLeft: `calc(${touchTarget} / -8)` } },
      { props: { edge: 'end' }, style: { marginRight: `calc(${touchTarget} / -8)` } },
    ],
  });

  addRootOverride(enhanced.components, 'MuiSvgIcon', {
    variants: [
      { props: { fontSize: 'small' }, style: { fontSize: iconSmall } },
      { props: { fontSize: 'medium' }, style: { fontSize: iconTarget } },
      { props: { fontSize: 'large' }, style: { fontSize: iconLarge } },
    ],
  });
  const smUp = enhanced.breakpoints.up('sm');
  addRootOverride(enhanced.components, 'MuiMenuItem', {
    paddingBlock: spacing('xx-small'),
    minHeight: 'auto',
    variants: [
      {
        props: { dense: false },
        style: {
          minHeight: touchTarget,
          gap: spacing('x-small'),
          [smUp]: { minHeight: touchTarget },
        },
      },
      { props: { disableGutters: false }, style: { paddingInline: spacing('x-small') } },
      {
        props: { dense: true },
        style: {
          gap: spacing('x-small'),
          [`& .${listItemIconClasses.root} svg`]: { fontSize: '0.8lh' },
        },
      },
    ],
    [`& .${listItemIconClasses.root}`]: { minWidth: 0 },
  });
  addRootOverride(enhanced.components, 'MuiList', {
    variants: [{ props: { disablePadding: false }, style: { paddingBlock: spacing(1) } }],
  });
  addRootOverride(
    enhanced.components,
    'MuiTooltip',
    {
      ...enhanced.typography?.caption,
      padding: `${spacing('x-small')} ${spacing('small')}`,
      [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: {
        marginInlineEnd: spacing(0.5),
      },
      [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: {
        marginInlineStart: spacing(0.5),
      },
      [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: { marginBottom: spacing(0.5) },
      [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: { marginTop: spacing(0.5) },
    },
    'tooltip',
  );
  addRootOverride(
    enhanced.components,
    'MuiTooltip',
    {
      // 0.71 = master's 1/sqrt(2) square-arrow projection ratio.
      '--_arrowSize': spacing(1.375),
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
      paddingBlock: spacing('x-small'),
      variants: [
        { props: { size: 'small' }, style: { paddingTop: spacing('xx-small') } },
        {
          props: { multiline: true },
          style: { paddingBlock: 0 },
        },
      ],
    },
    'input',
  );
  // --_outlinedInputPadBlock broadcasts to the FormControl via :has(); the
  // label consumes it as --_restY. Re-assert chain mirrors master.
  addRootOverride(enhanced.components, 'MuiOutlinedInput', {
    [`.${formControlClasses.root}:has(> &)`]: {
      '--_outlinedInputPadBlock': `calc((${touchTarget} - 1lh) / 2)`,
    },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--_restY': 'var(--_outlinedInputPadBlock)',
      '--_inlinePad': spacing('small'),
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${formControlClasses.root}:has(> &)`]: {
            '--_outlinedInputPadBlock': spacing('xx-small'),
          },
        },
      },
      {
        props: { multiline: true },
        style: {
          paddingBlock: `var(--_outlinedInputPadBlock, calc((${touchTarget} - 1lh) / 2))`,
          paddingInline: spacing('small'),
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingBlock: `var(--_outlinedInputPadBlock, ${spacing('xx-small')})`,
        },
      },
      {
        props: ({ ownerState }: { ownerState: { startAdornment?: unknown } }) =>
          Boolean(ownerState.startAdornment),
        style: { paddingLeft: spacing('small') },
      },
      {
        props: ({ ownerState }: { ownerState: { endAdornment?: unknown } }) =>
          Boolean(ownerState.endAdornment),
        style: { '--_trailingPad': spacing('small') },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiOutlinedInput',
    {
      paddingBlock: `var(--_outlinedInputPadBlock, calc((${touchTarget} - 1lh) / 2))`,
      paddingInline: spacing('small'),
      variants: [
        {
          props: { size: 'small' },
          style: { paddingBlock: `var(--_outlinedInputPadBlock, ${spacing('xx-small')})` },
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
      paddingTop: `var(--_filledInputPadTop, ${spacing('large')})`,
      paddingBottom: `var(--_filledInputPadBottom, ${spacing('small')})`,
      paddingInline: spacing('small'),
      variants: [
        {
          props: { hiddenLabel: true },
          style: { paddingBlock: `calc(${spacing('xx-small')} + 2px)` },
        },
        {
          props: { hiddenLabel: true, size: 'small' },
          style: { paddingBlock: spacing('xx-small') },
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
      '--_filledInputPadTop': spacing('large'),
      '--_filledInputPadBottom': spacing('x-small'),
    },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--_restY': `calc((var(--_filledInputPadTop) + var(--_filledInputPadBottom)) / 2)`,
      '--_shrinkY': '7px',
      '--_inlinePad': spacing('small'),
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${formControlClasses.root}:has(> &)`]: {
            '--_filledInputPadTop': `calc(${spacing('medium')} + 2px)`,
            '--_filledInputPadBottom': spacing('xx-small'),
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
          paddingTop: `var(--_filledInputPadTop, ${spacing('x-large')})`,
          paddingBottom: `var(--_filledInputPadBottom, ${spacing('small')})`,
          paddingInline: spacing('small'),
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingTop: `var(--_filledInputPadTop, ${spacing('large')})`,
          paddingBottom: `var(--_filledInputPadBottom, ${spacing('x-small')})`,
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
        style: { paddingLeft: spacing('small') },
      },
      {
        props: ({ ownerState }: { ownerState: { endAdornment?: unknown } }) =>
          Boolean(ownerState.endAdornment),
        style: { '--_trailingPad': spacing('small') },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiInput', {
    [`.${formControlClasses.root}:has(> &)`]: {
      '--_inputPadTop': spacing('x-small'),
      '--_inputPadBottom': `calc(${spacing('xx-small')} + 2px)`,
      '--_inputMarginTop': spacing('small'),
    },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--_restY': `calc(var(--_inputMarginTop, ${spacing('small')}) + (var(--_inputPadTop, ${spacing('x-small')}) + var(--_inputPadBottom, ${spacing('x-small')})) / 2)`,
    },
    [`label + &, .${inputLabelClasses.root} + &`]: {
      marginTop: `var(--_inputMarginTop, ${spacing('small')})`,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${formControlClasses.root}:has(> &)`]: {
            '--_inputPadTop': spacing('xx-small'),
            '--_inputPadBottom': spacing('xx-small'),
          },
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            '--_restY': `calc(var(--_inputMarginTop, ${spacing('small')}) + (var(--_inputPadTop, ${spacing('xx-small')}) + var(--_inputPadBottom, ${spacing('xx-small')})) / 2)`,
          },
        },
      },
      {
        props: { multiline: true },
        style: {
          paddingTop: `var(--_inputPadTop, ${spacing('x-small')})`,
          paddingBottom: `var(--_inputPadBottom, calc(${spacing('xx-small')} + 2px))`,
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingTop: `var(--_inputPadTop, ${spacing('xx-small')})`,
          paddingBottom: `var(--_inputPadBottom, ${spacing('xx-small')})`,
        },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiInput',
    {
      paddingTop: `var(--_inputPadTop, ${spacing('x-small')})`,
      paddingBottom: `var(--_inputPadBottom, ${spacing('x-small')})`,
      variants: [
        {
          props: { size: 'small' },
          style: {
            paddingTop: `var(--_inputPadTop, ${spacing('xx-small')})`,
            paddingBottom: `var(--_inputPadBottom, ${spacing('xx-small')})`,
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
  // Label Y rides --_restY/--_shrinkY consumed BARE (a missing writer must
  // break visibly); each shrink state must re-assert or the rest rules here,
  // landing after master's shrink, would leak the rest transform.
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
    display: 'inline-flex',
    alignItems: 'center',
    marginTop: spacing('x-small'),
    gap: spacing(0.5),
    variants: [
      {
        props: ({ ownerState }: { ownerState: { contained: boolean } }) => ownerState.contained,
        style: { marginInline: spacing('x-small') },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiInputAdornment', {
    variants: [
      { props: { position: 'start' }, style: { marginRight: spacing('x-small') } },
      { props: { position: 'end' }, style: { marginLeft: spacing('x-small') } },
      {
        props: { position: 'start', size: 'small' },
        style: { marginRight: spacing('xx-small') },
      },
      {
        props: { position: 'end', size: 'small' },
        style: { marginLeft: spacing('xx-small') },
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
  addRootOverride(enhanced.components, 'MuiCheckbox', sharedCheckboxRadio);
  addRootOverride(enhanced.components, 'MuiRadio', sharedCheckboxRadio);
  addRootOverride(
    enhanced.components,
    'MuiBreadcrumbs',
    { marginInline: spacing('x-small') },
    'separator',
  );
  // The floor sits on the `ol` (the centering flex row), not the nav root.
  addRootOverride(
    enhanced.components,
    'MuiBreadcrumbs',
    {
      minHeight: touchTarget,
      '& a': {
        display: 'inline-flex',
        lineHeight: touchTarget,
      },
      [`& li>.${buttonBaseClasses.root}`]: {
        // BreadcrumbCollapsed
        paddingInline: spacing('x-small'),
        height: touchTarget,
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
          '--_size': smallBox,
          paddingInline: `calc((var(--_size) - ${spacing(1.75)}) / 2 - 1px)`,
        },
      },
      {
        props: { size: 'medium' },
        style: {
          '--_size': touchTarget,
          paddingInline: `calc((var(--_size) - ${spacing(2)}) / 2 - 1px)`,
        },
      },
      {
        props: { size: 'large' },
        style: {
          '--_size': largeBox,
          paddingInline: `calc((var(--_size) - ${spacing(2.5)}) / 2 - 1px)`,
        },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiSwitch',
    {
      top: 'calc((var(--_height) - var(--_touchSize)) / 2)',
      padding: 'calc((var(--_touchSize) - var(--_thumbHeight)) / 2)',
      // Touch target taller than the root: re-anchor on the track's end caps
      // (0 when touch <= height).
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
      borderRadius: 'calc((var(--_height) - 2 * var(--_pad)) / 2)',
    },
    'track',
  );
  addRootOverride(enhanced.components, 'MuiAutocomplete', {
    // Root block pad 0: the INPUT carries the whole per-side pad, so chips
    // stack in an unpadded root while the input still sets the row rhythm.
    '--_autocompleteInputRootPadBlock': '3px',
    '--_autocompleteInputPadBlock': `max(0px, (${touchTarget} - 1lh) / 2 - var(--_autocompleteInputRootPadBlock))`,
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
    [`&:has(.${inputBaseClasses.sizeSmall})`]: {
      '--_autocompleteInputRootPadBlock': '0px',
      '--_autocompleteInputPadBlock': spacing('xx-small'),
    },
    [`& .${outlinedInputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
      paddingBlock: `var(--_autocompleteInputRootPadBlock)`,
    },
    [`& .${outlinedInputClasses.root}.${inputBaseClasses.sizeSmall} .${autocompleteClasses.input}`]:
      {
        paddingBlock: `var(--_autocompleteInputPadBlock)`,
      },
  });
  addRootOverride(
    enhanced.components,
    'MuiAutocomplete',
    {
      // The option list renders in a Popper — emit on the listbox slot.
      [`& .${autocompleteClasses.option}`]: {
        minHeight: touchTarget,
        paddingBlock: spacing('xx-small'),
        paddingInline: spacing('x-small'),
      },
    },
    'listbox',
  );
  addRootOverride(
    enhanced.components,
    'MuiAutocomplete',
    {
      margin: '1px',
      '--_height': `calc(${touchTarget} - ${spacing('x-small')})`,
    },
    'tag',
  );
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
      minWidth: touchTarget,
      minHeight: touchTarget,
      alignItems: 'center',
    },
    'iconContainer',
  );
  // Circle must land on MuiStepIcon root: an SvgIcon sizes off its OWN
  // fontSize (w/h = 1em) — a parent iconContainer fontSize can't reach it.
  addRootOverride(enhanced.components, 'MuiStepIcon', {
    fontSize: `calc(${touchTarget} - ${spacing('small')} + 2px)`,
  });
  addRootOverride(enhanced.components, 'MuiStepIcon', { fontSize: spacing(1.75) }, 'text');
  // Vertical-alt keeps master's marginLeft:auto — only marginRight moves.
  addRootOverride(enhanced.components, 'MuiStepConnector', {
    variants: [
      {
        props: { orientation: 'horizontal', alternativeLabel: true },
        style: { top: `calc(${touchTarget} / 2)` },
      },
      {
        props: { orientation: 'vertical', alternativeLabel: false },
        style: { marginLeft: `calc(${touchTarget} / 2)` },
      },
      {
        props: { orientation: 'vertical', alternativeLabel: true },
        style: { marginRight: `calc(${touchTarget} / 2)` },
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
          marginLeft: `calc(${touchTarget} / 2)`,
          paddingLeft: `calc(${touchTarget} / 2 - 1px)`, // 1px account for the border
        },
      },
      {
        props: { alternativeLabel: true },
        style: {
          marginRight: `calc(${touchTarget} / 2)`,
          paddingRight: `calc(${touchTarget} / 2 - 1px)`, // 1px account for the border
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiSnackbarContent', {
    padding: `${spacing(1)} ${spacing('medium')}`,
    gap: spacing('small'),
  });
  addRootOverride(
    enhanced.components,
    'MuiSnackbarContent',
    { paddingBlock: spacing('x-small') },
    'message',
  );
  addRootOverride(
    enhanced.components,
    'MuiSnackbarContent',
    { paddingLeft: 0, marginRight: spacing('-x-small') },
    'action',
  );
  addRootOverride(enhanced.components, 'MuiDialogTitle', {
    padding: `${spacing('small')} ${spacing('small')} ${spacing('small')} ${spacing('medium')}`,
  });
  // Two variants = one knob per dividers state (true overrides master's 16 24).
  addRootOverride(enhanced.components, 'MuiDialogContent', {
    variants: [
      { props: { dividers: false }, style: { padding: `0 ${spacing('medium')}` } },
      { props: { dividers: true }, style: { padding: `0 ${spacing('medium')}` } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiDialogActions', {
    padding: spacing('medium'),
    variants: [
      {
        props: ({ ownerState }: { ownerState: { disableSpacing?: boolean | undefined } }) =>
          !ownerState.disableSpacing,
        style: { gap: spacing('small'), '& > :not(style) ~ :not(style)': { marginLeft: 0 } },
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
      // Media-query GUARDS stay at master's 32*2 boundaries (media can't read
      // vars); everything scopes fullScreen:false — master's fullScreen zeroes
      // these and an unscoped rule would clobber it.
      '--_dialogMargin': spacing('large'),
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
  // No sm-up re-assert: ListItemButton has no master minHeight media reset.
  addRootOverride(enhanced.components, 'MuiListItemButton', {
    gap: spacing('x-small'),
    paddingBlock: spacing('xx-small'),
    variants: [
      {
        props: { dense: false },
        style: { minHeight: touchTarget },
      },
      { props: { dense: true }, style: { minHeight: spacing('large') } },
      {
        props: { dense: false, disableGutters: false },
        style: { paddingInline: spacing('x-small') },
      },
      {
        props: { dense: true, disableGutters: false },
        style: { paddingInline: spacing('xx-small') },
      },
    ],
  });
  // minWidth 0 kills master's 56px column floors — the row gap owns spacing.
  addRootOverride(enhanced.components, 'MuiListItemIcon', { minWidth: 0 });
  addRootOverride(enhanced.components, 'MuiListItemAvatar', { minWidth: 0 });
  addRootOverride(enhanced.components, 'MuiListItemText', { margin: 0 });
  // disablePadding:false scoping keeps rows owned by a ListItemButton unpadded.
  addRootOverride(enhanced.components, 'MuiListItem', {
    gap: spacing('x-small'),
    variants: [
      {
        props: { disablePadding: false },
        style: { paddingBlock: spacing('xx-small') },
      },
      {
        props: { dense: false, disableGutters: false, disablePadding: false },
        style: { paddingInline: spacing('x-small') },
      },
      {
        props: { dense: true, disableGutters: false, disablePadding: false },
        style: { paddingInline: spacing('xx-small') },
      },
      {
        props: ({ ownerState }: { ownerState: ListItemOwnerState }) =>
          !ownerState.disablePadding && !!ownerState.secondaryAction,
        style: {
          paddingRight: `calc(${touchTarget} + ${spacing('x-small')})`,
        },
      },
      {
        props: ({ ownerState }: { ownerState: ListItemOwnerState }) => !!ownerState.secondaryAction,
        style: {
          [`& > .${listItemButtonClasses.root}`]: {
            paddingRight: `calc(${touchTarget} + ${spacing('x-small')})`,
          },
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiListItemSecondaryAction', {
    right: spacing('x-small'),
  });
  addRootOverride(enhanced.components, 'MuiCardContent', {
    padding: spacing('medium'),
    '&:last-child': { paddingBottom: spacing('medium') },
  });
  addRootOverride(enhanced.components, 'MuiCardActions', {
    padding: spacing('medium'),
    paddingTop: 0,
    variants: [
      {
        props: { disableSpacing: false },
        style: { gap: spacing('x-small'), '& > :not(style) ~ :not(style)': { marginLeft: 0 } },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiCardHeader', {
    padding: spacing('medium'),
    gap: spacing('small'),
  });
  // Avatar→content spacing stays a one-sided margin: a root gap would also
  // open space between the flex-1 content and the action (master has none).
  addRootOverride(enhanced.components, 'MuiCardHeader', { marginRight: 0 }, 'avatar');
  addRootOverride(
    enhanced.components,
    'MuiCardHeader',
    {
      marginBlock: spacing('-xx-small'),
      marginRight: spacing('-x-small'),
    },
    'action',
  );
  addRootOverride(
    enhanced.components,
    'MuiSelect',
    {
      minHeight: 'auto',
      // master writes per-variant --_caret/--_endAdornment on these same :has hooks
      [`.${inputBaseClasses.root}:has(> &)`]: { '--_caret': iconTarget },
      [`.${inputBaseClasses.root}:has(> & ~ .${inputAdornmentClasses.root})`]: {
        '--_endAdornment': iconTarget,
      },
    },
    'select',
  );
  addRootOverride(enhanced.components, 'MuiAlert', {
    paddingBlock: spacing('x-small'),
    paddingInline: spacing('small'),
    gap: spacing('x-small'),
    [`& .${alertClasses.icon}`]: {
      marginRight: 0,
      paddingBlock: spacing(0.75),
      fontSize: '1.1lh',
    },
    [`& .${alertClasses.action}`]: {
      padding: 0,
      marginRight: 0,
      alignSelf: 'center',
    },
  });
  addDefaultProps(enhanced.components, 'MuiAlert', {
    slotProps: { closeButton: { size: 'medium' } },
  });
  addRootOverride(enhanced.components, 'MuiAlert', { paddingBlock: spacing(0.875) }, 'message');
  addRootOverride(
    enhanced.components,
    'MuiAccordionSummary',
    {
      marginBlock: '0px',
      alignItems: 'center',
      gap: spacing('x-small'),
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
    minHeight: touchTarget,
    lineHeight: enhanced.typography?.button?.lineHeight,
    paddingBlock: 0,
    paddingInline: spacing('small'),
    gap: spacing('xx-small'),
    [`& > .${tabClasses.icon}`]: { margin: 0 },
    variants: [
      {
        props: ({ ownerState }: { ownerState: TabProps }) =>
          ownerState.icon &&
          ownerState.label &&
          (ownerState.iconPosition === 'top' || ownerState.iconPosition === 'bottom'),
        style: {
          minHeight: spacing('xx-large'),
          paddingBlock: spacing('xx-small'),
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiTabs', { minHeight: touchTarget });
  addRootOverride(enhanced.components, 'MuiTabScrollButton', {
    variants: [
      { props: { orientation: 'horizontal' }, style: { width: touchTarget } },
      { props: { orientation: 'vertical' }, style: { height: touchTarget } },
    ],
  });
  // AvatarGroup overlap is untouchable: an inline --AvatarGroup-spacing style
  // from the spacing prop (px numbers only) outranks any styleOverride.
  addRootOverride(enhanced.components, 'MuiAvatar', {
    '--_size': touchTarget,
    width: 'var(--_size)',
    height: 'var(--_size)',
    fontSize: 'calc(var(--_size) / 2)',
  });
  addRootOverride(enhanced.components, 'MuiLinearProgress', { height: spacing(0.5) });
  addDefaultProps(enhanced.components, 'MuiCircularProgress', { size: touchTarget });
  // Root box = the touch target (padding 0 also kills master's coarse-pointer
  // padding; the thumb keeps its frozen 42px ::after hit target). Master sizes
  // rail/track via height:inherit off the root, so their thickness is
  // re-emitted explicitly from --_trackSize. markLabel offsets stay master.
  addRootOverride(enhanced.components, 'MuiSlider', {
    padding: 0,
    '--_trackSize': `calc(${spacing('small')} / 4)`,
    variants: [
      { props: { orientation: 'horizontal' }, style: { height: touchTarget } },
      { props: { orientation: 'vertical' }, style: { width: touchTarget } },
      { props: { size: 'small' }, style: { '--_trackSize': `calc(${spacing('x-small')} / 4)` } },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiSlider',
    {
      padding: `${spacing('xx-small')} ${spacing('x-small')}`,
    },
    'valueLabel',
  );
  addRootOverride(
    enhanced.components,
    'MuiSlider',
    {
      top: touchTarget,
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
      width: spacing('medium'),
      height: spacing('medium'),
      variants: [
        { props: { size: 'small' }, style: { width: spacing('small'), height: spacing('small') } },
      ],
      '&::after': {
        width: touchTarget,
        height: touchTarget,
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
            minWidth: spacing(2.5),
            height: spacing(2.5),
            paddingInline: spacing(0.75),
            ...enhanced.typography?.caption,
          },
        },
        { props: { variant: 'dot' }, style: { minWidth: spacing(1), height: spacing(1) } },
      ],
    },
    'badge',
  );
  addRootOverride(enhanced.components, 'MuiSwitch', {
    // Var declarations sit on size variants so a knob edit rebuilds
    // size-scoped; consumers are base.
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
          '--_height': touchTarget,
          '--_touchSize': touchTarget,
          '--_thumbHeight': spacing('medium'),
          '--_thumbWidth': spacing('medium'),
        },
      },
      {
        props: { size: 'small' },
        style: {
          '--_height': smallBox,
          // Invariant: --_touchSize >= --_thumbHeight (see medium — padding clips).
          '--_touchSize': smallBox,
          '--_thumbHeight': `calc(${spacing('medium')} - 4px)`,
          '--_thumbWidth': `calc(${spacing('medium')} - 4px)`,
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
    [`&.${tableCellClasses.paddingCheckbox}`]: { padding: `0 0 0 ${spacing(0.5)}` },
    variants: [
      {
        props: { size: 'medium' },
        style: {
          height: `calc(${spacing('x-large')} + ${spacing('x-small')})`,
          paddingInline: spacing('small'),
        },
      },
      {
        props: { size: 'small' },
        style: {
          height: `calc(${spacing('large')} + ${spacing('xx-small')})`,
          paddingInline: spacing('x-small'),
        },
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
      fontSize: `calc(${iconTarget} + ${spacing(0.25)})`,
      marginInline: spacing('xx-small'),
    },
    'icon',
  );
  addRootOverride(enhanced.components, 'MuiTablePagination', {
    // Everything rides the ROOT slot: the toolbar/select overridesResolvers
    // SPREAD the theme styleOverride, so an array-form slot silently drops;
    // root-class nesting outranks the slot rules.
    [`& .${tablePaginationClasses.toolbar}`]: {
      minHeight: spacing('xx-large'),
    },
    [`& .${tablePaginationClasses.select}`]: enhanced.typography?.body2 ?? {},
  });
  addRootOverride(enhanced.components, 'MuiToolbar', {
    // Regular mirrors theme.mixins.toolbar's responsive shape as
    // styleOverrides — the mixin stays untouched (offset math keeps master).
    minHeight: 'initial',
    variants: [
      {
        props: { disableGutters: false },
        style: {
          paddingInline: spacing('medium'),
          [(enhanced as unknown as { breakpoints: { up: (key: string) => string } }).breakpoints.up(
            'sm',
          )]: {
            paddingInline: spacing('medium'),
          },
        },
      },
      { props: { variant: 'dense' }, style: { paddingBlock: spacing('xx-small') } },
      {
        props: { variant: 'regular' },
        style: {
          paddingBlock: spacing('x-small'),
          // Master nests this under breakpoints.up('xs') — a no-op (min-width:0)
          // wrapper; emitted flat so the emit-table readback can resolve it.
          '@media (orientation: landscape)': { minHeight: spacing('xx-large') },
          [(enhanced as unknown as { breakpoints: { up: (key: string) => string } }).breakpoints.up(
            'sm',
          )]: {
            minHeight: 'initial',
          },
        },
      },
    ],
  });
  // Circular-scoped: the extended variant stays frozen at master.
  addRootOverride(enhanced.components, 'MuiFab', {
    minHeight: 0,
    variants: [
      {
        props: { variant: 'circular', size: 'small' },
        style: {
          width: `calc(${spacing('large')} + ${spacing('small')})`,
          height: `calc(${spacing('large')} + ${spacing('small')})`,
        },
      },
      {
        props: { variant: 'circular', size: 'medium' },
        style: {
          width: `calc(${touchTarget} + ${spacing('x-small')})`,
          height: `calc(${touchTarget} + ${spacing('x-small')})`,
        },
      },
      {
        props: { variant: 'circular', size: 'large' },
        style: {
          width: `calc(${spacing('xx-large')} + ${spacing('xx-small')})`,
          height: `calc(${spacing('xx-large')} + ${spacing('xx-small')})`,
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiPagination', { gap: spacing('x-small') }, 'ul');
  addRootOverride(enhanced.components, 'MuiPaginationItem', {
    margin: 0,
    padding: 0,
    borderRadius: '50%',
    variants: [
      {
        props: { size: 'small' },
        style: { height: smallBox, minWidth: smallBox },
      },
      {
        props: { size: 'medium' },
        style: { height: touchTarget, minWidth: touchTarget },
      },
      {
        props: { size: 'large' },
        style: { height: largeBox, minWidth: largeBox },
      },
      {
        props: ({ ownerState }: { ownerState: PaginationItemOwnerState }) =>
          ownerState.type === 'start-ellipsis' || ownerState.type === 'end-ellipsis',
        style: { height: 'auto' },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiBottomNavigation', {
    height: spacing('xx-large'),
  });
  addRootOverride(enhanced.components, 'MuiBottomNavigationAction', {
    // Selected label 12→14 stays master (state axis, not size).
    gap: spacing('xx-small'),
    paddingInline: spacing('small'),
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
        style: { paddingTop: spacing('medium') },
      },
    ],
  });
  // Child-margin clears sit at slot level: slot rules render after master's
  // size re-asserts and win by order at equal specificity.
  addRootOverride(enhanced.components, 'MuiChip', {
    '--_childSize': `calc(var(--_height) - ${spacing('x-small')})`,
    '--_offset': `calc(var(--_height)/2 - var(--_childSize)/2 - var(--_paddingInline))`,
    height: 'var(--_height)', // use private variable to be controlled by Autocomplete
    paddingInline: 'var(--_paddingInline)',
    borderRadius: 'var(--_height)', // pill shape
    variants: [
      {
        props: { size: 'medium' },
        style: {
          '--_height': touchTarget,
          '--_paddingInline': spacing('small'),
          gap: spacing('x-small'),
        },
      },
      {
        props: { size: 'small' },
        style: {
          '--_height': `calc(${touchTarget} - ${spacing('xx-small')})`,
          '--_paddingInline': spacing('x-small'),
          gap: spacing('xx-small'),
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
        { props: { size: 'medium' }, style: { fontSize: iconTarget } },
        { props: { size: 'small' }, style: { fontSize: iconSmall } },
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
    minHeight: touchTarget,
    padding: `0 ${spacing('x-small')}`,
    variants: [
      {
        props: ({
          ownerState,
        }: {
          ownerState: AccordionSummaryOwnerState & { disableGutters?: boolean | undefined };
        }) => !ownerState.disableGutters,
        // scoped to expanded: wins master's 64px literal on specificity
        style: {
          [`&.${accordionSummaryClasses.expanded}`]: { minHeight: touchTarget },
        },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiAccordionDetails', {
    paddingBlock: spacing('x-small'),
    paddingInline: spacing('small'),
  });
}
