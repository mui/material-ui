import { addDefaultProps, addRootOverride, DensityScale, EnhanceableTheme } from './densityScale';
import switchClasses from '../Switch/switchClasses';
import tooltipClasses from '../Tooltip/tooltipClasses';
import tabClasses from '../Tab/tabClasses';
import stepLabelClasses from '../StepLabel/stepLabelClasses';
import buttonGroupClasses from '../ButtonGroup/buttonGroupClasses';
import tablePaginationClasses from '../TablePagination/tablePaginationClasses';
import type { PaginationItemOwnerState } from '../PaginationItem';
import type { TabProps } from '../Tab';
import accordionSummaryClasses from '../AccordionSummary/accordionSummaryClasses';
import inputLabelClasses from '../InputLabel/inputLabelClasses';
import autocompleteClasses from '../Autocomplete/autocompleteClasses';
import outlinedInputClasses from '../OutlinedInput/outlinedInputClasses';
import { inputBaseClasses } from '../InputBase';
import type { AccordionSummaryOwnerState } from '../AccordionSummary';
import { formControlClasses } from '../FormControl';
import { formControlLabelClasses } from '../FormControlLabel';
import { inputAdornmentClasses } from '../InputAdornment';
import { listItemIconClasses } from '../ListItemIcon';

/**
 * Day-cell size fan-out — called from each `enhance*Density` with that preset's
 * day size. No shared var: PickerDay/DateRangePickerDay each redeclare
 * `--PickerDay-size` on their own root (shadowing any ancestor), so every consumer
 * takes the concrete size. The playground groups these under one "PickerDay · size"
 * virtual knob (members) + linked writes (the !important skeleton, the calc heights).
 */
export function applyPickerDaySize(
  components: NonNullable<EnhanceableTheme['components']>,
  size: string,
): void {
  const sixWeeks = `calc((${size} + 4px) * 6)`;
  // Day cells — override each component's own --PickerDay-size.
  addRootOverride(components, 'MuiPickerDay', { '--PickerDay-size': size });
  addRootOverride(components, 'MuiDateRangePickerDay', { '--PickerDay-size': size });
  // Weekday / week-number box widths follow the day column (heights are separate,
  // emitted per preset).
  addRootOverride(components, 'MuiDayCalendar', { width: size }, 'weekDayLabel');
  addRootOverride(components, 'MuiDayCalendar', { width: size }, 'weekNumberLabel');
  addRootOverride(components, 'MuiDayCalendar', { width: size, height: size }, 'weekNumber');
  // 6-week grid + loading container heights (master (DAY_SIZE + 2·DAY_MARGIN) * 6).
  addRootOverride(components, 'MuiDayCalendar', { minHeight: sixWeeks }, 'slideTransition');
  addRootOverride(components, 'MuiDayCalendar', { minHeight: sixWeeks }, 'loadingContainer');
  // Loading skeleton day — !important beats Skeleton's inline width/height props.
  addRootOverride(
    components,
    'MuiDayCalendarSkeleton',
    { width: `${size} !important`, height: `${size} !important` },
    'daySkeleton',
  );
}

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
  addRootOverride(enhanced.components, 'MuiButton', {
    variants: [
      // Longhand split: block is the height lever, inline the width. One knob
      // per axis moves every variant; outlined re-emits BLOCK only at −1px so
      // its border keeps all variants at equal height (master's own
      // compensation, e.g. 3px/9px vs contained 4px/10px). Outlined inline is
      // NOT compensated — width parity across variants is not a goal.
      { props: { size: 'small' }, style: { paddingBlock: d['xx-small'], paddingInline: d.small } },
      {
        props: { size: 'small', variant: 'outlined' },
        style: { paddingBlock: `calc(${d['xx-small']} - 1px)` },
      },
      {
        props: { size: 'medium' },
        // paddingBlock: semantic/spacing/fixed/xs (4px); paddingInline: semantic/spacing/variable/m
        style: { paddingBlock: 4, paddingInline: d.medium },
      },
      {
        props: { size: 'medium', variant: 'outlined' },
        // semantic/spacing/fixed/xs (4px) - 1px border compensation
        style: { paddingBlock: 3 },
      },
      { props: { size: 'large' }, style: { paddingBlock: d.small, paddingInline: d['x-large'] } },
      {
        props: { size: 'large', variant: 'outlined' },
        style: { paddingBlock: `calc(${d.small} - 1px)` },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiIconButton', {
    // Uniform padding per size = density steps (master: 5/8/12 for
    // small/medium/large — same shape as Button's own per-size padding).
    // fontSize (the 1em-child sizing seam, 18/24/28) stays frozen — icon visual
    // size is owned by SvgIcon's own fontSize prop knob elsewhere.
    // edge start/end: -4px flush-margins (override master's -12/-3; one knob per
    // side, wins all sizes as the last-applied variant).
    variants: [
      { props: { size: 'small' }, style: { padding: d['xx-small'] } },
      // semantic/spacing/fixed/xs (4px) — contentWrapper uniform padding
      { props: { size: 'medium' }, style: { padding: 4 } },
      { props: { size: 'large' }, style: { padding: d.large } },
      { props: { edge: 'start' }, style: { marginLeft: '-4px' } },
      { props: { edge: 'end' }, style: { marginRight: '-4px' } },
    ],
  });
  // Master resets MenuItem min-height to `auto` at sm-up (non-dense only);
  // stylis hoists that media block AFTER the class rule, so a plain later
  // declaration can never win on desktop — the floor must re-assert inside the
  // same media. Dense has no master media reset, so no re-assert. The knob
  // mirrors this via a linked write (densityFields `densityLinkedWrites`).
  const smUp = enhanced.breakpoints ? enhanced.breakpoints.up('sm') : '@media (min-width:600px)';
  addRootOverride(enhanced.components, 'MuiMenuItem', {
    variants: [
      // minHeight: semantic/size/touch-target/default (32px);
      // paddingBlock: semantic/spacing/variable/xxs
      {
        props: { dense: false },
        style: { minHeight: '32px', paddingBlock: d['xx-small'], [smUp]: { minHeight: '32px' } },
      },
      // dense has no captured counterpart — one 4px step tighter than the default row
      { props: { dense: true }, style: { minHeight: '28px', paddingBlock: d['xx-small'] } },
      // gutter inline: semantic/spacing/variable/xs
      { props: { dense: false, disableGutters: false }, style: { paddingInline: d['x-small'] } },
      { props: { dense: true, disableGutters: false }, style: { paddingInline: d.medium } },
    ],
    [`& .${listItemIconClasses.root}`]: {
      minWidth: 24,
    },
  });
  addRootOverride(enhanced.components, 'MuiList', {
    // Menu/list vertical breathing; subheader keeps paddingTop 0.
    // semantic/spacing/fixed/s (8px, derived from menu-container bbox: (204-188)/2)
    variants: [{ props: { disablePadding: false }, style: { paddingBlock: 8 } }],
  });
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
  addRootOverride(enhanced.components, 'MuiInputLabel', {
    // Floating-label Y — master ships literal translate Ys (component untouched).
    // Re-emit the transform per state so the Y can come from a preset-closed var:
    //   --_restY   — written for EVERY rest state by the input-side broadcasts
    //                below (OutlinedInput/FilledInput/Input `:has` selectors,
    //                per size) → consumed BARE, no fallback: a missing writer is
    //                a bug and must break visibly.
    //   --_shrinkY — written ONLY by the FilledInput broadcasts → consumed bare
    //                in the filled-shrink state; outlined/standard shrink have NO
    //                density writer, so they re-state master's literal directly.
    // Size-small variants collapse: size differentiation lives in the writers.
    // Variant ORDER mirrors master's (later wins at equal specificity). The
    // literal shrink rules are NOT redundant with master's: the rest rules here
    // (which must exist to consume the var) also match shrunk labels and land
    // AFTER master's shrink rules in the cascade — each shrink state must be
    // re-asserted in this layer or shrunk labels would show the rest transform.
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
  addRootOverride(enhanced.components, 'MuiOutlinedInput', {
    // broadcast the variable to the formControl so the label can reach it via `:has(> &)` (the input is a child).
    // Default-size block pad: semantic/spacing/variable/xxs (dropdown inputContainer)
    // — yields the 32px input box (20px line + 2×pad + border).
    [`.${formControlClasses.root}:has(> &)`]: {
      '--_outlinedInputPadBlock': `calc(${d['xx-small']} + 2px)`,
    },
    // Label line-height = input line-height (the FormLabel body1 normalization),
    // so rest Y is exactly the block pad — the per-size ±0.5px optical fudge is
    // gone, and small needs no restY re-declare of its own.
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--_restY': 'var(--_outlinedInputPadBlock)',
      // Label X = the box's inline pad (master 14px) — linked write of the
      // input-slot inline knob; the InputLabel transforms consume it bare.
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
          paddingBlock: `var(--_outlinedInputPadBlock, calc(${d['xx-small']} + 2px))`,
          // multiline root carries the box's inline pad (master 14px) — linked
          // write of the input-slot inline knob.
          paddingInline: d.small,
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingBlock: `var(--_outlinedInputPadBlock, ${d['xx-small']})`,
        },
      },
      // Adorned root pads (master 14px / --_trailingPad 14px; the Select nested
      // --_trailingPad: 0 reset survives on specificity) — linked writes of the
      // input-slot inline knob.
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
      // Block padding rides the label-communication var. Inline: ONE knob for
      // both sizes (master 14px) — unconditional base emission + the SAME
      // re-assert chain master ships on this slot (multiline/adorned zero their
      // side; constant re-asserts, hidden knobs). The root-side 14s (adorned
      // pads, --_trailingPad, multiline root inline) follow this knob via
      // linked writes (densityLinkedWrites).
      paddingBlock: `var(--_outlinedInputPadBlock, calc(${d['xx-small']} + 2px))`,
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
  // MUI X picker line box — every PickersInputBase slot that hardcodes 1.4375em
  // (sectionsContainer, section, sectionContent→`content` key) follows body1 instead,
  // matching InputBase. On the base, so standard/outlined/filled all inherit it.
  addRootOverride(
    enhanced.components,
    'MuiPickersInputBase',
    { lineHeight: enhanced.typography?.body1?.lineHeight },
    'sectionsContainer',
  );
  addRootOverride(
    enhanced.components,
    'MuiPickersInputBase',
    { lineHeight: enhanced.typography?.body1?.lineHeight },
    'section',
  );
  addRootOverride(
    enhanced.components,
    'MuiPickersInputBase',
    { lineHeight: enhanced.typography?.body1?.lineHeight },
    'content',
  );
  // MUI X picker outlined field — mirror OutlinedInput's density box (X uses
  // PickersOutlinedInput, not OutlinedInput, and ships no private vars of its own).
  // Root: inline pad (master 14px) + broadcasts — --_outlinedInputPadBlock to the
  // FormControl and --_inlinePad/--_restY to the shared Material InputLabel (label
  // sibling, input direct child of the styled(FormControl) root). SectionsContainer:
  // line box + block pad. Box = body1 line + 2·padBlock + outline = OutlinedInput's.
  addRootOverride(enhanced.components, 'MuiPickersOutlinedInput', {
    paddingInline: d.small,
    [`.${formControlClasses.root}:has(> &)`]: {
      '--_outlinedInputPadBlock': `calc(${d['xx-small']} + 2px)`,
    },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--_restY': 'var(--_outlinedInputPadBlock)',
      '--_inlinePad': d.small,
    },
    variants: [
      {
        props: { inputSize: 'small' },
        style: {
          [`.${formControlClasses.root}:has(> &)`]: { '--_outlinedInputPadBlock': d['xx-small'] },
        },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiPickersOutlinedInput',
    {
      // Line box comes from the base MuiPickersInputBase override (body1); block pad
      // then lands the box on OutlinedInput's height 1:1.
      paddingBlock: `var(--_outlinedInputPadBlock, calc(${d['xx-small']} + 2px))`,
      paddingInline: 0,
      variants: [
        {
          props: { inputSize: 'small' },
          style: { paddingBlock: `var(--_outlinedInputPadBlock, ${d['xx-small']})` },
        },
      ],
    },
    'sectionsContainer',
  );
  // MUI X picker filled field — mirror FilledInput's asymmetric density box (both
  // pads on the sectionsContainer for filled). Root broadcasts --_filledInputPadTop/
  // Bottom to the FormControl and --_inlinePad/--_restY/--_shrinkY to the InputLabel.
  addRootOverride(enhanced.components, 'MuiPickersFilledInput', {
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
        props: { inputSize: 'small' },
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
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiPickersFilledInput',
    {
      // Line box from the base MuiPickersInputBase override (body1); block pad rides the
      // top/bottom vars, inline pad (master 12px) direct. hiddenLabel: symmetric block pad.
      paddingTop: `var(--_filledInputPadTop, ${d.large})`,
      paddingBottom: `var(--_filledInputPadBottom, ${d.small})`,
      paddingInline: d.small,
      variants: [
        {
          props: { hiddenLabel: true },
          style: { paddingBlock: `calc(${d['xx-small']} + 2px)` },
        },
        {
          props: { hiddenLabel: true, inputSize: 'small' },
          style: { paddingBlock: d['xx-small'] },
        },
      ],
    },
    'sectionsContainer',
  );
  addRootOverride(
    enhanced.components,
    'MuiFilledInput',
    {
      // Block padding rides the label-communication vars. Inline: ONE knob for
      // both sizes (master 12px) — same architecture as OutlinedInput above
      // (base emission + master's re-assert chain; root-side 12s are linked
      // writes of this knob).
      paddingTop: `var(--_filledInputPadTop, ${d.large})`,
      paddingBottom: `var(--_filledInputPadBottom, ${d.small})`,
      paddingInline: d.small,
      variants: [
        // hiddenLabel: no floating label, so the `--_filledInputPad*` vars (the
        // label-communication channel) don't apply — symmetric block padding set
        // DIRECTLY, one step per size.
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
  addRootOverride(enhanced.components, 'MuiCheckbox', {
    // Touch-target padding per size (9px both sizes today) = density steps. Pull the
    // sibling label back by the same amount so the control↔label gap stays constant.
    variants: [
      {
        props: { size: 'medium' },
        style: {
          padding: d['x-small'],
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: {
            marginLeft: `calc(-2px - ${d['x-small']})`,
          },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: {
            marginRight: `calc(-2px - ${d['x-small']})`,
          },
        },
      },
      {
        props: { size: 'small' },
        style: {
          padding: d['x-small'],
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: {
            marginLeft: `calc(-2px - ${d['x-small']})`,
          },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: {
            marginRight: `calc(-2px - ${d['x-small']})`,
          },
        },
      },
      // edge start/end: -4px flush-margins (override master's -12/-3; all sizes).
      { props: { edge: 'start' }, style: { marginLeft: '-4px' } },
      { props: { edge: 'end' }, style: { marginRight: '-4px' } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiRadio', {
    // Touch-target padding per size (9px both sizes today) = density steps. Pull the
    // sibling label back by the same amount so the control↔label gap stays constant.
    variants: [
      {
        props: { size: 'medium' },
        style: {
          padding: d['x-small'],
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: {
            marginLeft: `calc(-2px - ${d['x-small']})`,
          },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: {
            marginRight: `calc(-2px - ${d['x-small']})`,
          },
        },
      },
      {
        props: { size: 'small' },
        style: {
          padding: d['x-small'],
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: {
            marginLeft: `calc(-2px - ${d['x-small']})`,
          },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: {
            marginRight: `calc(-2px - ${d['x-small']})`,
          },
        },
      },
      // edge start/end: -4px flush-margins (override master's -12/-3; all sizes).
      { props: { edge: 'start' }, style: { marginLeft: '-4px' } },
      { props: { edge: 'end' }, style: { marginRight: '-4px' } },
    ],
  });
  // Separator inline margins (spacing step) on the separator slot.
  addRootOverride(enhanced.components, 'MuiBreadcrumbs', { marginInline: d.small }, 'separator');
  // Row floor = capture footprint (32px, raw px sizing). On the `ol` slot — the
  // flex row with align-items: center — so crumbs stay vertically centered.
  addRootOverride(enhanced.components, 'MuiBreadcrumbs', { minHeight: '32px' }, 'ol');
  addRootOverride(enhanced.components, 'MuiToggleButton', {
    // Emit uniform padding directly on the size variants ToggleButton ships (no
    // seam). -1px = border compensation (master's own shape).
    variants: [
      { props: { size: 'small' }, style: { padding: `calc(${d['xx-small']} - 1px)` } },
      { props: { size: 'medium' }, style: { padding: `calc(${d['x-small']} - 1px)` } },
      { props: { size: 'large' }, style: { padding: `calc(${d.small} - 1px)` } },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiSlider',
    {
      // Bubble padding = steps (normal maps master's 0.25rem 0.75rem / 0.5rem
      // exactly); arrow box + placement offsets stay frozen.
      padding: `${d['xx-small']} ${d['x-small']}`,
      variants: [
        { props: { size: 'small' }, style: { padding: `${d['xx-small']} ${d['x-small']}` } },
      ],
    },
    'valueLabel',
  );
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
    '--_autocompleteInputPadBlock': '3px',
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
  // Horizontal step gutter: first paddingLeft / last paddingRight zeroed so the
  // end nodes sit flush with the stepper edge (raw px).
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
  // Vertical StepLabel row: drop master's 8px block padding so vertical steps
  // pack tighter (raw px). Horizontal has no root block padding — leave it.
  addRootOverride(enhanced.components, 'MuiStepLabel', {
    variants: [{ props: { orientation: 'vertical' }, style: { paddingBlock: '0px' } }],
  });
  // alternativeLabel icon→label gap zeroed. Master sets it on the label slot at
  // 2-class specificity (&.alternativeLabel, 16px), so re-emit the same nested
  // selector to win; a plain props variant (1 class) would lose. Scoped to
  // horizontal: master already zeroes vertical alternativeLabel, and an unscoped
  // emission would stomp that reset.
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
  // Node touch box: semantic/size/touch-target/default (32px, raw px) —
  // step-indicator.yml's node wrapper. padding:0 kills master's paddingRight
  // gap; the icon→label spacing now falls out of centering the 22px icon in the
  // wider box (justify/align center both axes; both ride the touch-target knob).
  addRootOverride(
    enhanced.components,
    'MuiStepLabel',
    {
      padding: '0px',
      justifyContent: 'center',
      minWidth: '32px',
      minHeight: '32px',
      alignItems: 'center',
    },
    'iconContainer',
  );
  // Step node circle = design node size (22px, raw px). Must land on MuiStepIcon
  // root, not iconContainer: StepIcon is an SvgIcon sized from its own fontSize
  // (w/h = 1em), so a parent iconContainer fontSize can't reach it. The number
  // glyph rides the text slot (0.875rem, raw rem).
  addRootOverride(enhanced.components, 'MuiStepIcon', { fontSize: '22px' });
  addRootOverride(enhanced.components, 'MuiStepIcon', { fontSize: '0.875rem' }, 'text');
  // Connector aligns to the node touch box: touchTarget/2 (icon center, since the
  // icon is centered in the box). Master's `half icon` (12) is off now the icon
  // lives in a 32px box. Scoped per case; the node-touch-target knob re-derives
  // via a linked write. (Vertical alt keeps master's marginLeft:auto; only the
  // marginRight side moves.)
  addRootOverride(enhanced.components, 'MuiStepConnector', {
    variants: [
      {
        props: { orientation: 'horizontal', alternativeLabel: true },
        style: { top: 'calc(32px / 2)' },
      },
      {
        props: { orientation: 'vertical', alternativeLabel: false },
        style: { marginLeft: 'calc(32px / 2)' },
      },
      {
        props: { orientation: 'vertical', alternativeLabel: true },
        style: { marginRight: 'calc(32px / 2)' },
      },
    ],
  });
  // StepContent border + text track the node touch box (vertical only). margin =
  // touchTarget/2 puts the left border on the icon center (== connector); margin +
  // padding = touchTarget so the content text lines up with the label. Mirrored on
  // the right for vertical alt. Both derive from the node-touch-target knob.
  addRootOverride(enhanced.components, 'MuiStepContent', {
    variants: [
      {
        props: { alternativeLabel: false },
        style: { marginLeft: 'calc(32px / 2)', paddingLeft: 'calc(32px / 2)' },
      },
      {
        props: { alternativeLabel: true },
        style: { marginRight: 'calc(32px / 2)', paddingRight: 'calc(32px / 2)' },
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
    // Tile root padding: semantic/spacing/variable/m; last-child keeps its step.
    padding: d.medium,
    '&:last-child': { paddingBottom: d['x-large'] },
  });
  addRootOverride(enhanced.components, 'MuiCardActions', {
    // No size axis: root padding + inter-child gap (spacing variant) = steps.
    padding: d.small,
    variants: [
      {
        props: { disableSpacing: false },
        style: { '& > :not(style) ~ :not(style)': { marginLeft: d.small } },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiCardHeader', {
    // Root padding = step (no size axis).
    padding: d.large,
  });
  // Avatar→content gap on the avatar slot.
  addRootOverride(enhanced.components, 'MuiCardHeader', { marginRight: d.large }, 'avatar');
  // Action negative pulls counteract the control's own box; scale with density.
  addRootOverride(
    enhanced.components,
    'MuiCardHeader',
    {
      marginBlock: `calc(${d['xx-small']} * -1)`,
      marginRight: `calc(${d.small} * -1)`,
    },
    'action',
  );
  addRootOverride(
    enhanced.components,
    'MuiSelect',
    {
      minHeight: 'auto',
      // Caret machinery: master writes per-variant --_caret (24/32) and
      // --_endAdornment (28) on these same :has hooks (NativeSelectInput);
      // ONE step overrides every variant — surfaced as the `caret size`
      // virtual knob.
      [`.${inputBaseClasses.root}:has(> &)`]: { '--_caret': d.medium },
      [`.${inputBaseClasses.root}:has(> & ~ .${inputAdornmentClasses.root})`]: {
        '--_endAdornment': d.medium,
      },
    },
    'select',
  );
  addRootOverride(enhanced.components, 'MuiAlert', {
    // No size axis: root padding (block/inline steps).
    paddingBlock: d['x-small'],
    paddingInline: d.large,
  });
  // Icon→message gap on the icon slot (child element).
  addRootOverride(enhanced.components, 'MuiAlert', { marginRight: d.medium }, 'icon');
  // Label inline padding = density steps, unified per size on the label slot.
  addRootOverride(
    enhanced.components,
    'MuiChip',
    {
      variants: [
        // semantic/spacing/variable/s — contentWrapper inline padding
        { props: { size: 'medium' }, style: { paddingInline: d.small } },
        { props: { size: 'small' }, style: { paddingInline: d['x-small'] } },
      ],
    },
    'label',
  );
  addRootOverride(
    enhanced.components,
    'MuiAccordionSummary',
    {
      // Content block margin reduces with min-height (else it binds header height).
      marginBlock: d.medium,
      variants: [
        {
          props: ({
            ownerState,
          }: {
            ownerState: AccordionSummaryOwnerState & { disableGutters?: boolean | undefined };
          }) => !ownerState.disableGutters,
          style: { [`&.${accordionSummaryClasses.expanded}`]: { marginBlock: d.large } },
        },
      ],
    },
    'content',
  );
  // Cell/header inline inset (master 0 10px) + edit input aligned to the same
  // step (master 0 16px — upstream mismatch makes the value jump on edit entry).
  addRootOverride(enhanced.components, 'MuiDataGrid', { paddingInline: d['x-small'] }, 'cell');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { paddingInline: d['x-small'] },
    'columnHeader',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { '& input': { paddingInline: d.medium } },
    'editInputCell',
  );
  // Header title↔sort/filter icon gap (master 2px = 0.25 spacing unit).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { gap: d['xx-small'] },
    'columnHeaderTitleContainer',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { marginInline: d['x-small'] },
    'toolbarDivider',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { marginInline: d['x-small'] },
    'toolbarLabel',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { marginInline: d.large }, 'rowCount');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { marginInline: d.large },
    'selectedRowCount',
  );
  // Gap between row action icon buttons (master 8px).
  addRootOverride(enhanced.components, 'MuiDataGrid', { gridGap: d.small }, 'actionsCell');
  // Filter panel (portal). Content padding/gap nest under the `panel` slot —
  // upstream resolves the `panelContent` styleOverrides key on BOTH the filter
  // content wrapper and the panel popup shell (GridPanel's inner slot), so a
  // direct key emission would pad the shell too.
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    {
      '& .MuiDataGrid-panelContent': {
        padding: `${d.medium} ${d.small} ${d.large} ${d.large}`,
        gap: d.medium,
      },
    },
    'panel',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { padding: d.medium }, 'panelFooter');
  // Gap between the filter form's column/operator/value inputs (master su(1.5)).
  addRootOverride(enhanced.components, 'MuiDataGrid', { gap: d.medium }, 'filterForm');
  // Columns management panel paddings (master su(0.5,1.5) / su(1.5,2) /
  // su(1,1,1,1.5) / su(1,0)). The per-row checkbox↔label gap targets the
  // Material class — the grid's FormControlLabel wrapper is slot:'internal'
  // (no styleOverrides key of its own).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    {
      padding: `${d['x-small']} ${d.medium}`,
      '& .MuiFormControlLabel-root': { gap: d['x-small'] },
    },
    'columnsManagement',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { padding: `${d.medium} ${d.large}` },
    'columnsManagementHeader',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { padding: `${d.small} ${d.small} ${d.small} ${d.medium}` },
    'columnsManagementFooter',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { paddingBlock: d.small },
    'columnsManagementEmptyText',
  );
  // Label↔action gap in the no-rows/no-columns overlays (master su(1)).
  addRootOverride(enhanced.components, 'MuiDataGrid', { gap: d.small }, 'overlay');
  // Drag-ghost insets (master 0 12px; placeholder 0 6px — nested to outrank
  // upstream's `.row--dragging .rowReorderCellPlaceholder` rule).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { paddingInline: d.medium },
    'columnHeader--dragging',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    {
      paddingInline: d.medium,
      '& .MuiDataGrid-rowReorderCellPlaceholder': { paddingInline: d['x-small'] },
    },
    'row--dragging',
  );
  // Rowspan multi-select chip stack inset (master paddingTop 8; selector
  // mirrors upstream's aria-rowspan scoping to match its specificity).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    {
      '&[aria-rowspan]:not([aria-rowspan="1"]) .MuiDataGrid-multiSelectCell': {
        paddingTop: d.small,
      },
    },
    'cell',
  );
  // [Pro] Header-filter row insets (master 8/8/5; physical paddingRight matches
  // upstream so RTL flipping stays identical). The upstream densityCompact
  // conditional stays dormant — the grid's density prop is unset.
  addRootOverride(enhanced.components, 'MuiDataGrid', {
    '& .MuiDataGrid-columnHeader--filter': { paddingBlock: d.small, paddingRight: d['x-small'] },
  });
  // [Pro] Header-filter input margins (master su(0.5) / su(-0.25)).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { marginRight: d['x-small'], marginBottom: `calc(${d['xx-small']} * -1)` },
    'columnHeaderFilterInput',
  );
  // MUI X Tree View — indentation is an inline-style var on the tree root
  // (useTreeViewRootProps), unreachable from styleOverrides; the defaultProp is the
  // lever, and a string/number value passes through verbatim. `d.medium` keeps it
  // dual-mode: a var ref under cssVariables (any prefix), raw px on static themes.
  addDefaultProps(enhanced.components, 'MuiRichTreeView', {
    itemChildrenIndentation: d['x-large'],
  });
  addDefaultProps(enhanced.components, 'MuiSimpleTreeView', {
    itemChildrenIndentation: d['x-large'],
  });
  // Longhands only — a padding shorthand would clobber upstream's paddingLeft depth
  // calc, so the calc is re-emitted with the step base instead.
  addRootOverride(
    enhanced.components,
    'MuiTreeItem',
    {
      paddingBlock: `calc(${d['xx-small']} + 2px)`,
      paddingRight: d.small,
      paddingLeft: `calc(${d['x-small']} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`,
      gap: d['x-small'],
    },
    'content',
  );
  // Selection checkbox breathing room (leading side).
  addRootOverride(enhanced.components, 'MuiTreeItem', { marginLeft: '8px' }, 'checkbox');
  // Expand/collapse icon glyph (master 18px). Nested `& svg` under iconContainer
  // matches upstream's `.MuiTreeItem-iconContainer svg` rule; sizing raw px.
  addRootOverride(
    enhanced.components,
    'MuiTreeItem',
    { '& svg': { fontSize: '16px' } },
    'iconContainer',
  );
  addRootOverride(
    enhanced.components,
    'MuiPickersCalendarHeader',
    { marginRight: d['x-small'] },
    'label',
  );
  addRootOverride(enhanced.components, 'MuiYearCalendar', { rowGap: '4px', width: '284px' });
  addRootOverride(enhanced.components, 'MuiYearCalendar', { width: '56.5px' }, 'button');
  addRootOverride(enhanced.components, 'MuiMonthCalendar', {
    rowGap: d['xx-small'],
    width: '284px',
  });
  // Day-cell sizing (PickerDay/DateRangePickerDay --PickerDay-size, weekday/
  // week-number box widths, 6-week + loading heights, skeleton) is a per-preset
  // concrete fan-out — see applyPickerDaySize, called from each enhance*Density.
  // Digital clocks: item padding steps (master 8 16 / 8); the 2px 4px item margin is
  // frozen — the scroll positioning math subtracts the first item's 4px in JS.
  addRootOverride(
    enhanced.components,
    'MuiDigitalClock',
    { padding: `${d['xx-small']} ${d.medium}` },
    'item',
  );
  // Pickers toolbar (master su(2,3)); scoped to portrait — landscape has its own
  // master padding (16) an unconditional emission would clobber.
  addRootOverride(enhanced.components, 'MuiPickersToolbar', {
    variants: [
      {
        props: { pickerOrientation: 'portrait' },
        style: { padding: `${d.large} ${d['x-large']}` },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiTooltip',
    {
      // Padding = density steps on the base (mirrors Tooltip.js base margins),
      // so it applies to every tooltip; arrow doesn't change it. Type: capture's
      // semantic/font-size/variable/s (12px) / line-height 16px, raw px. Offset
      // = FIXED 4px raw (anchor gap is not a density lever). Arrow size lives on
      // the popper slot (see the block below).
      padding: `${d['x-small']} ${d.small}`,
      fontSize: '12px',
      lineHeight: '16px',
      [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: { marginInlineEnd: '4px' },
      [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: {
        marginInlineStart: '4px',
      },
      [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: { marginBottom: '4px' },
      [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: { marginTop: '4px' },
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
      // Fixed sizing (no Figma arrow token) — master ratio geometry below.
      '--_arrowSize': '11px',
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
  addRootOverride(enhanced.components, 'MuiInputAdornment', {
    // Adornment gap (start marginRight / end marginLeft) + filled positionStart
    // marginTop = density steps, per size (medium default / small).
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
  addRootOverride(enhanced.components, 'MuiFilledInput', {
    // Root padding (adornment/multiline) = density steps. The floating label is a
    // preceding sibling — reach it via `:has(~ &)` and set its rest/shrink Y as
    // tuned raw px (no clean formula from topPad). hiddenLabel block padding stays
    // at master literals (out of scope).
    [`.${formControlClasses.root}:has(> &)`]: {
      '--_filledInputPadTop': d.large,
      '--_filledInputPadBottom': d['x-small'],
    },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--_restY': `calc((var(--_filledInputPadTop) + var(--_filledInputPadBottom)) / 2)`,
      '--_shrinkY': '7px',
      // Label X = the box's inline pad (master 12px) — linked write of the
      // input-slot inline knob; the InputLabel transforms consume it bare.
      '--_inlinePad': d.small,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${formControlClasses.root}:has(> &)`]: {
            // 18px, tracking the scale (medium + 2px) instead of a frozen literal
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
          // multiline root carries the box's inline pad (master 12px) — linked
          // write of the input-slot inline knob.
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
      // hidden label does not need to sync with label, so no need CSS variables.
      {
        props: { multiline: true, hiddenLabel: true },
        style: { paddingTop: 16, paddingBottom: 17 },
      },
      {
        props: { multiline: true, hiddenLabel: true, size: 'small' },
        style: { paddingTop: 8, paddingBottom: 9 },
      },
      // Adorned root pads (master 12px / --_trailingPad 12px; Select's nested
      // --_trailingPad: 0 reset survives on specificity) — linked writes of the
      // input-slot inline knob.
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
  // Normalization trio (hidden knobs): InputBase root + FormLabel line-height
  // ride the theme's body1 (master hardcodes 1.4375em on both), and the input
  // box height goes auto so the row height derives from line-height + padding
  // instead of master's em height. With label metrics = input metrics the
  // outlined `--_restY` writers need no ±0.5px optical fudge.
  addRootOverride(enhanced.components, 'MuiInputBase', {
    lineHeight: enhanced.typography?.body1?.lineHeight,
  });
  addRootOverride(enhanced.components, 'MuiInputBase', { height: 'auto' }, 'input');
  addRootOverride(enhanced.components, 'MuiFormLabel', {
    lineHeight: enhanced.typography?.body1?.lineHeight,
  });
  // Helper message offsets: block gap unconditional (master 3px). Inline scoped
  // to contained (outlined/filled — master 14px); standard keeps master's flush
  // 0 (negated-variant rule).
  addRootOverride(enhanced.components, 'MuiFormHelperText', {
    marginTop: d['xx-small'],
    variants: [{ props: { contained: true }, style: { marginInline: d.small } }],
  });
  addRootOverride(
    enhanced.components,
    'MuiInputBase',
    {
      // Standard input box padding (block only; inline stays 0). Emitted on the
      // base key so standard Input inherits it via the cascade; Outlined/Filled
      // override on their own keys (win by injection order). Multiline box padding
      // lives on the InputBase root (left at master) — reset the input to 0 as
      // master does.
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
  addRootOverride(enhanced.components, 'MuiTab', {
    // Min-heights = raw px (paired with MuiTabs base below); padding = steps.
    // 32px = semantic/size/touch-target/default (tab.yml).
    minHeight: '32px',
    // Rides the theme's button type (master hardcodes 1.25) — hidden knob,
    // live-derived from the Typography tab like the InputBase/FormLabel body1 pair.
    lineHeight: enhanced.typography?.button?.lineHeight,
    paddingBlock: `calc(${d['xx-small']} + 2px)`,
    // semantic/spacing/variable/s — contentWrapper inline pad (right-side token unresolved, symmetric)
    paddingInline: d.small,
    variants: [
      {
        props: ({ ownerState }: { ownerState: TabProps }) => ownerState.icon && ownerState.label,
        style: { minHeight: '72px', paddingBlock: d['x-small'] },
      },
      {
        props: ({ ownerState }: { ownerState: TabProps }) =>
          ownerState.icon && ownerState.label && ownerState.iconPosition === 'top',
        style: { [`& > .${tabClasses.icon}`]: { marginBottom: d['x-small'] } },
      },
      {
        props: ({ ownerState }: { ownerState: TabProps }) =>
          ownerState.icon && ownerState.label && ownerState.iconPosition === 'bottom',
        style: { [`& > .${tabClasses.icon}`]: { marginTop: d['x-small'] } },
      },
      {
        props: ({ ownerState }: { ownerState: TabProps }) =>
          ownerState.icon && ownerState.label && ownerState.iconPosition === 'start',
        style: { [`& > .${tabClasses.icon}`]: { marginRight: d['x-small'] } },
      },
      {
        props: ({ ownerState }: { ownerState: TabProps }) =>
          ownerState.icon && ownerState.label && ownerState.iconPosition === 'end',
        style: { [`& > .${tabClasses.icon}`]: { marginLeft: d['x-small'] } },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiTabs', {
    minHeight: '32px', // == MuiTab base minHeight (the pairing)
  });
  addRootOverride(enhanced.components, 'MuiTabScrollButton', {
    variants: [
      { props: { orientation: 'horizontal' }, style: { width: '32px' } },
      { props: { orientation: 'vertical' }, style: { height: '32px' } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiAvatar', {
    // Square size = raw px (sizing).
    width: '40px',
    height: '40px',
  });
  // Bar thickness = raw px (sizing); bars are absolute top/bottom-0, so the
  // root height drives every variant (determinate/indeterminate/buffer/query).
  // semantic/size/feedback/progress/bar/height (4px, measured bbox)
  addRootOverride(enhanced.components, 'MuiLinearProgress', { height: '4px' });
  addRootOverride(enhanced.components, 'MuiSlider', {
    // Track thickness = raw px (sizing; rail/track inherit the root box). Touch
    // padding = step on the logical axis (block for horizontal, inline for
    // vertical) so one knob drives both; the coarse-pointer 20px floor is
    // re-asserted frozen (42px a11y hit target, never densified). Marks and
    // markLabel geometry stay frozen (master-literal offsets the margins align to).
    variants: [
      {
        props: { orientation: 'horizontal' },
        style: {
          height: '3px',
          paddingBlock: d.medium,
          '@media (pointer: coarse)': { paddingBlock: '20px' },
        },
      },
      { props: { orientation: 'horizontal', size: 'small' }, style: { height: '2px' } },
      {
        props: { orientation: 'vertical' },
        style: {
          width: '3px',
          paddingInline: d.medium,
          '@media (pointer: coarse)': { paddingInline: '20px' },
        },
      },
      { props: { orientation: 'vertical', size: 'small' }, style: { width: '2px' } },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiSlider',
    {
      // Thumb square = raw px (sizing); the 42px ::after hit target stays frozen.
      width: '18px',
      height: '18px',
      variants: [{ props: { size: 'small' }, style: { width: '12px', height: '12px' } }],
    },
    'thumb',
  );
  addRootOverride(
    enhanced.components,
    'MuiBadge',
    {
      // Bubble = raw px (sizing); standard inline pad = step. Dot resizes; dot pad
      // + borderRadius stay frozen at master.
      variants: [
        {
          props: { variant: 'standard' },
          style: { minWidth: '20px', height: '20px', paddingInline: 12 },
        },
        { props: { variant: 'dot' }, style: { minWidth: '6px', height: '6px' } },
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
    width: 'var(--_width)',
    height: 'var(--_height)',
    padding: 'var(--_pad)',
    variants: [
      {
        props: { size: 'medium' },
        style: {
          '--_width': '58px',
          '--_height': '38px',
          '--_thumbHeight': '20px',
          '--_thumbWidth': '20px',
          // Invariant: --_touchSize >= --_thumbHeight — the switchBase padding is
          // calc((--_touchSize - --_thumbHeight) / 2), which clips (goes negative)
          // if the touch target is smaller than the thumb height.
          '--_touchSize': '38px',
          '--_pad': '12px',
          // Label pull mirrors the gutter (Checkbox pattern); the gutter knob
          // re-writes these via the playground's linked-write registry.
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: { marginLeft: '-12px' },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: { marginRight: '-12px' },
        },
      },
      {
        props: { size: 'small' },
        style: {
          '--_width': '40px',
          '--_height': '24px',
          '--_thumbHeight': '16px',
          '--_thumbWidth': '16px',
          // Invariant: --_touchSize >= --_thumbHeight (see medium — padding clips).
          '--_touchSize': '24px',
          '--_pad': '7px',
          // Label pull mirrors the gutter (Checkbox pattern); the gutter knob
          // re-writes these via the playground's linked-write registry.
          [`.${formControlLabelClasses.labelPlacementEnd}:has(> &)`]: { marginLeft: '-7px' },
          [`.${formControlLabelClasses.labelPlacementStart}:has(> &)`]: { marginRight: '-7px' },
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
      // edge start/end: -4px flush-margins (override master's -8; on the Switch root).
      { props: { edge: 'start' }, style: { marginLeft: '-4px' } },
      { props: { edge: 'end' }, style: { marginRight: '-4px' } },
    ],
  });
  addRootOverride(enhanced.components, 'MuiButtonGroup', {
    // Grouped-button min-width floor = raw px (sizing; == the 32px touch target).
    [`& .${buttonGroupClasses.grouped}`]: { minWidth: '32px' },
  });
  addRootOverride(enhanced.components, 'MuiTableCell', {
    // Block pad per size (steps); inline pad shared. Re-assert the frozen
    // checkbox/none affordances the size padding would otherwise clobber.
    variants: [
      // Block pads land the 40px (medium) / 32px (small) row rhythm of the
      // grid capture: body2 cell line is 18px, +1px collapsed border, so pads
      // carry the extra half px (18 + 2x10.5 + 1 = 40). Inline FIXED 8px raw.
      { props: { size: 'medium' }, style: { padding: `calc(${d['x-small']} + 2.5px) 8px` } },
      { props: { size: 'small' }, style: { padding: `calc(${d['xx-small']} + 2.5px) 8px` } },
      { props: { padding: 'checkbox' }, style: { padding: '0 0 0 4px' } },
      { props: { padding: 'none' }, style: { padding: 0 } },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiTableSortLabel',
    {
      // Sort arrow = raw px (sizing); icon<->label gap = one marginInline leaf
      // (master sets both sides at 4px — the arrow flips sides in right-aligned
      // columns; medium xx-small maps it exactly).
      fontSize: '18px',
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
    // Bar min-height = raw px (sizing); trailing pad + actions gap = steps.
    [`& .${tablePaginationClasses.toolbar}`]: {
      minHeight: '48px',
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
      paddingRight: '22px',
    },
  });
  addRootOverride(
    enhanced.components,
    'MuiAutocomplete',
    {
      // Option list (mirrors MenuItem) renders in a Popper → emit on the listbox
      // slot: minHeight raw px, block/inline pad steps.
      [`& .${autocompleteClasses.option}`]: {
        // mirrors MenuItem: semantic/size/touch-target/default (32px),
        // paddingBlock variable/xxs, paddingInline variable/xs
        minHeight: '32px',
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
  // Chip: height + avatar/deleteIcon sizes are preset-local vars (raw px per
  // sizing policy) so the derived centering margins on the child slots track
  // knob edits live; icon/label stay plain. Rules land on the slot master
  // defines them on, winning by cascade order at equal specificity (master:
  // height 32/24, avatar 24/18, deleteIcon 22/16, icon 18 small-only).
  // --_height sits on the root so the child slots inherit it.
  addRootOverride(enhanced.components, 'MuiChip', {
    variants: [
      { props: { size: 'medium' }, style: { '--_height': '32px', height: 'var(--_height)' } },
      { props: { size: 'small' }, style: { '--_height': '28px', height: 'var(--_height)' } },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiChip',
    {
      variants: [
        {
          props: { size: 'medium' },
          style: {
            '--_avatarSize': '24px',
            width: 'var(--_avatarSize)',
            height: 'var(--_avatarSize)',
            // center within the chip: (height - avatar) / 2
            marginLeft: 'calc(var(--_height) / 2 - var(--_avatarSize) / 2)',
          },
        },
        {
          props: { size: 'small' },
          style: {
            '--_avatarSize': '16px',
            width: 'var(--_avatarSize)',
            height: 'var(--_avatarSize)',
            marginLeft: 'calc(var(--_height) / 2 - var(--_avatarSize) / 2)',
          },
        },
      ],
    },
    'avatar',
  );
  addRootOverride(
    enhanced.components,
    'MuiChip',
    {
      variants: [
        { props: { size: 'medium' }, style: { fontSize: '16px' } },
        { props: { size: 'small' }, style: { fontSize: '16px' } },
      ],
    },
    'icon',
  );
  // Icon side margins — master styles these as root-descendant `& .MuiChip-icon`
  // (base 5/-6, small 4/-4) at (0,2,0), so a plain icon-slot rule can't win. Emit
  // the same root-descendant selector per size — applied after master's own
  // variants, it overrides each size. Surfaced under the icon slot via the
  // `virtual:MuiChip:iconMargin*` knobs (display-slot remap).
  addRootOverride(enhanced.components, 'MuiChip', {
    variants: [
      {
        props: { size: 'medium' },
        style: { '& .MuiChip-icon': { marginLeft: '12px', marginRight: '-4px' } },
      },
      {
        props: { size: 'small' },
        style: { '& .MuiChip-icon': { marginLeft: '8px', marginRight: '0px' } },
      },
    ],
  });
  addRootOverride(
    enhanced.components,
    'MuiChip',
    {
      variants: [
        {
          props: { size: 'medium' },
          style: {
            '--_deleteIconSize': '22px',
            fontSize: 'var(--_deleteIconSize)',
            // center within the chip: (height - delete icon) / 2
            marginRight: 'calc(var(--_height) / 2 - var(--_deleteIconSize) / 2)',
          },
        },
        {
          props: { size: 'small' },
          style: {
            '--_deleteIconSize': '16px',
            fontSize: 'var(--_deleteIconSize)',
            marginRight: 'calc(var(--_height) / 2 - var(--_deleteIconSize) / 2)',
          },
        },
      ],
    },
    'deleteIcon',
  );
  addRootOverride(enhanced.components, 'MuiAccordionSummary', {
    // Collapsed min-height raw px; inline padding = step.
    minHeight: '48px',
    // inline: semantic/spacing/variable/xs (headerWrapper)
    padding: `0 ${d['x-small']}`,
    variants: [
      {
        props: ({
          ownerState,
        }: {
          ownerState: AccordionSummaryOwnerState & { disableGutters?: boolean | undefined };
        }) => !ownerState.disableGutters,
        // Re-assert expanded min-height (master literal wins by specificity else).
        style: { [`&.${accordionSummaryClasses.expanded}`]: { minHeight: '64px' } },
      },
    ],
  });
  addRootOverride(enhanced.components, 'MuiAccordionDetails', {
    // Split from shorthand so each edge is its own knob (top differs from bottom).
    paddingBlockStart: d.small,
    paddingBlockEnd: d.large,
    paddingInline: d.large,
  });
  // MUI X — spacing-step rows shared across presets; the sizing raw px
  // (defaultProps heights, widths, min-heights — X's density levers) stay
  // per-preset inline in the enhance*Density files.
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { padding: d.small, gap: d['xx-small'] },
    'toolbar',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { marginRight: d.large },
    'treeDataGroupingCellToggle',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { marginRight: d.large },
    'groupingCriteriaCellToggle',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { marginInlineStart: d['x-small'] },
    'pivotPanelField',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { marginInlineStart: d['x-small'] },
    'chartsPanelDataField',
  );
  // Pickers calendar-header spacing (min/max heights stay per-preset inline).
  addRootOverride(enhanced.components, 'MuiPickersCalendarHeader', {
    marginTop: d.medium,
    marginBottom: d.medium,
    paddingLeft: d.medium,
    paddingRight: d.medium,
  });
  addRootOverride(
    enhanced.components,
    'MuiMultiSectionDigitalClockSection',
    { padding: `${d['xx-small']} ${d.medium}` },
    'item',
  );
}
