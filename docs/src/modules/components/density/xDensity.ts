/**
 * MUI X density layer — playground/experiment scope, deliberately OUTSIDE
 * @mui/material (the core package must ship X-free). Composes on top of the
 * enhance*Density presets: shared preset-agnostic step refs + per-preset
 * sizing raw px (X's density levers). X utility classes appear as string
 * selectors — this module must not import the X packages either, so the same
 * source can move into each X package later.
 */
// eslint-disable-next-line no-restricted-imports -- private helpers, deliberately not on the styles barrel
import {
  addDefaultProps,
  addRootOverride,
  DensityScale,
  EnhanceableTheme,
} from '@mui/material/styles/densityScale';
import { formControlClasses } from '@mui/material/FormControl';
import { formControlLabelClasses } from '@mui/material/FormControlLabel';
import { inputLabelClasses } from '@mui/material/InputLabel';

export type XDensityLevel = 'high' | 'medium' | 'low';

type XEnhanced = EnhanceableTheme & {
  density: DensityScale;
  components: NonNullable<EnhanceableTheme['components']>;
};

/**
 * Day-cell size fan-out — called from each `enhance*Density` with that preset's
 * day size. No shared var: PickerDay/DateRangePickerDay each redeclare
 * `--PickerDay-size` on their own root (shadowing any ancestor), so every consumer
 * takes the concrete size. The playground groups these under one "PickerDay · size"
 * virtual knob (members) + linked writes (the !important skeleton, the calc heights).
 */
function applyPickerDaySize(
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
 * PRIVATE shared density mapping for the MUI X packages (Data Grid, Tree View,
 * Date/Time Pickers) — split from sharedDensityComponents so that file stays
 * @mui/material-only. Same contract: preset-agnostic step refs shared by the
 * three presets; per-preset sizing raw px stays inline in the enhance*Density
 * files. X utility classes appear as string selectors — @mui/material cannot
 * import the X packages.
 */
function applySharedXDensity<T extends EnhanceableTheme>(
  enhanced: T & {
    density: DensityScale;
    components: NonNullable<EnhanceableTheme['components']>;
  },
): void {
  const d: DensityScale = (enhanced.vars || enhanced).density;
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
      '--_outlinedInputPadBlock': `calc((${d['touch-target']} - 1lh) / 2)`,
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
      paddingBlock: `var(--_outlinedInputPadBlock, calc((${d['touch-target']} - 1lh) / 2))`,
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
      [`& .${formControlLabelClasses.root}`]: { gap: d['x-small'] },
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

function applyHighXSizing(enhanced: XEnhanced): void {
  // MUI X DataGrid — cross-package emission (plain untyped keys; the grid reads
  // theme.components.MuiDataGrid via getThemeProps/styleOverrides). Row/header
  // heights are JS-gated — the virtualizer computes row positions from the
  // rowHeight prop, CSS can't move them — so they ship as defaultProps raw px
  // (sizing); the grid's own density prop stays UNSET (factor ×1) since its
  // fixed ×0.7/×1.3 stops can't express arbitrary per-preset scales. A user
  // flip of the grid's toolbar density selector stays a relative multiplier
  // on top of these bases.
  addDefaultProps(enhanced.components, 'MuiDataGrid', {
    rowHeight: 28,
    columnHeaderHeight: 28,
  });
  // Toolbar: min-height = raw px (sizing); inner padding + item gap = steps.
  addRootOverride(enhanced.components, 'MuiDataGrid', { minHeight: '44px' }, 'toolbar');
  // Footer: min-height = raw px (sizing); row/selection count gutters = steps.
  addRootOverride(enhanced.components, 'MuiDataGrid', { minHeight: '44px' }, 'footerContainer');
  // Filter field widths (sizing → raw px; master 75/150/150/190).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minWidth: '65px' },
    'filterFormLogicOperatorInput',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { width: '130px' }, 'filterFormColumnInput');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { width: '130px' },
    'filterFormOperatorInput',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { width: '165px' }, 'filterFormValueInput');
  // Column menu list min-width (sizing; master 248). Nested under `menu` — the
  // list is slot:'internal' and the menu portals outside the root, so the
  // root's child-class keys can't reach it.
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { '& .MuiDataGrid-menuList': { minWidth: '220px' } },
    'menu',
  );
  // Toolbar quick filter expanded width (sizing; master 260). The expanded
  // state has no DOM hook — it's ownerState-only — so the width scopes via a
  // variants matcher; collapsed keeps upstream's var(--trigger-width).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { variants: [{ props: { expanded: true }, style: { width: '230px' } }] },
    'toolbarQuickFilterControl',
  );
  // [Pro/Premium] Grouping indent: depth × multiplier × spacing unit (master 2).
  // Premium grouping cells read the var; Pro tree-data computes the same indent
  // in JS and bypasses it — upstream inconsistency, flagged as fix candidate.
  addRootOverride(enhanced.components, 'MuiDataGrid', {
    '--DataGrid-cellOffsetMultiplier': '1.5',
  });
  // [Pro/Premium] Group-toggle gutter: flex-basis = sizing raw px (master 28);
  // marginRight (step) shared across presets — see sharedDensityComponents.
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { flexBasis: '24px' },
    'treeDataGroupingCellToggle',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { flexBasis: '24px' },
    'groupingCriteriaCellToggle',
  );
  // [Premium] Panel chrome sizing (raw px): sidebar/AI widths, the shared 52px
  // header rhythm (same trio as toolbar/footer), pivot/charts field rows and
  // drop zones (charts mirrors pivot — one decision, values never fork). Field
  // marginInlineStart (step) pulls the row off the sidebar edge so the hover
  // drag handle — absolutely pinned to the row's left edge — gets breathing room.
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { width: '270px', minWidth: '240px', maxWidth: '370px' },
    'sidebar',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { height: '44px' }, 'pivotPanelHeader');
  addRootOverride(enhanced.components, 'MuiDataGrid', { height: '26px' }, 'pivotPanelField');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '68px' },
    'pivotPanelAvailableFields',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { minHeight: '128px' }, 'pivotPanelSections');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '32px' },
    'pivotPanelPlaceholder',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { width: '340px' }, 'aiAssistantPanel');
  addRootOverride(enhanced.components, 'MuiDataGrid', { height: '44px' }, 'aiAssistantPanelHeader');
  addRootOverride(enhanced.components, 'MuiDataGrid', { height: '26px' }, 'chartsPanelDataField');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '68px' },
    'chartsPanelDataAvailableFields',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '128px' },
    'chartsPanelDataSections',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '32px' },
    'chartsPanelDataPlaceholder',
  );
  // Row height rides upstream's own hook (content height: var(--TreeView-itemHeight,
  // unset)); sizing raw px. Master is unset (content-sized, about 32) — normal keeps it.
  addRootOverride(enhanced.components, 'MuiTreeItem', { '--TreeView-itemHeight': '28px' });
  // MUI X Date/Time Pickers — day-cell size fan-out (see applyPickerDaySize).
  applyPickerDaySize(enhanced.components, '30px');
  // Weekday / week-number label heights (independent of day size; widths in the fan-out).
  addRootOverride(enhanced.components, 'MuiDayCalendar', { height: '36px' }, 'weekDayLabel');
  addRootOverride(enhanced.components, 'MuiDayCalendar', { height: '36px' }, 'weekNumberLabel');
  // Calendar root: master 336×320 = header block + weekday row + 6 weeks / 7 day
  // columns + 40 slack. Raw per-preset (matches this preset's day/header math) — the
  // day var can't reach here (it lives on the DayCalendar DESCENDANT; an ancestor
  // copy would shadow the knob), so day-size knob edits don't reflow the root box.
  addRootOverride(enhanced.components, 'MuiDateCalendar', {
    height: '286px',
    // The PickerViewRoot base pins maxHeight at 336 — without moving it the comfort
    // height is clamped and the last weeks clip (overflow hidden).
    maxHeight: '286px',
    width: '278px',
  });
  // [Pro] Range calendar: reach Pro's unnamed InnerDayCalendarForRange (hardcoded
  // minWidth 312 / minHeight) via a descendant selector under the themeable
  // MuiDateRangeCalendar root — (0,2,0) specificity wins. Mirrors the single
  // calendar (linked writes off DateCalendar width + PickerDay size keep it synced).
  addRootOverride(enhanced.components, 'MuiDateRangeCalendar', {
    '& .MuiDayCalendar-slideTransition': { minWidth: '278px', minHeight: 'calc((30px + 4px) * 6)' },
  });
  // Calendar header: min/max pinned together (upstream pins both against a Safari
  // jump); height raw — spacing steps shared across presets.
  addRootOverride(enhanced.components, 'MuiPickersCalendarHeader', {
    minHeight: '36px',
    maxHeight: '36px',
  });
  addRootOverride(enhanced.components, 'MuiMultiSectionDigitalClockSection', {
    width: '48px',
  });
  addRootOverride(
    enhanced.components,
    'MuiMultiSectionDigitalClockSection',
    { width: '40px' },
    'item',
  );
}

function applyMediumXSizing(enhanced: XEnhanced): void {
  // Per-size component styling (incl. the former Medium-only per-design blocks)
  // lives in sharedDensityComponents — identical under every preset; this file
  // contributes only scale values, typography, and X sizing.
  // MUI X DataGrid — rationale in enhanceHighDensity; mirrored structure.
  addDefaultProps(enhanced.components, 'MuiDataGrid', {
    rowHeight: 40,
    columnHeaderHeight: 40,
  });
  // Toolbar: min-height = raw px (sizing); inner padding + item gap = steps.
  addRootOverride(enhanced.components, 'MuiDataGrid', { minHeight: '52px' }, 'toolbar');
  // Footer: min-height = raw px (sizing); row/selection count gutters = steps.
  addRootOverride(enhanced.components, 'MuiDataGrid', { minHeight: '52px' }, 'footerContainer');
  // Filter field widths (sizing → raw px; master 75/150/150/190).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minWidth: '75px' },
    'filterFormLogicOperatorInput',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { width: '150px' }, 'filterFormColumnInput');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { width: '150px' },
    'filterFormOperatorInput',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { width: '190px' }, 'filterFormValueInput');
  // Column menu list min-width (sizing; master 248). Nested under `menu` — the
  // list is slot:'internal' and the menu portals outside the root, so the
  // root's child-class keys can't reach it.
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { '& .MuiDataGrid-menuList': { minWidth: '248px' } },
    'menu',
  );
  // Toolbar quick filter expanded width (sizing; master 260). The expanded
  // state has no DOM hook — it's ownerState-only — so the width scopes via a
  // variants matcher; collapsed keeps upstream's var(--trigger-width).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { variants: [{ props: { expanded: true }, style: { width: '260px' } }] },
    'toolbarQuickFilterControl',
  );
  // [Pro/Premium] Grouping indent: depth × multiplier × spacing unit (master 2).
  // Premium grouping cells read the var; Pro tree-data computes the same indent
  // in JS and bypasses it — upstream inconsistency, flagged as fix candidate.
  addRootOverride(enhanced.components, 'MuiDataGrid', {
    '--DataGrid-cellOffsetMultiplier': '2',
  });
  // [Pro/Premium] Group-toggle gutter: flex-basis = sizing raw px (master 28);
  // marginRight (step) shared across presets — see sharedDensityComponents.
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { flexBasis: '28px' },
    'treeDataGroupingCellToggle',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { flexBasis: '28px' },
    'groupingCriteriaCellToggle',
  );
  // [Premium] Panel chrome sizing (raw px): sidebar/AI widths, the shared 52px
  // header rhythm (same trio as toolbar/footer), pivot/charts field rows and
  // drop zones (charts mirrors pivot — one decision, values never fork). Field
  // marginInlineStart (step) pulls the row off the sidebar edge so the hover
  // drag handle — absolutely pinned to the row's left edge — gets breathing room.
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { width: '300px', minWidth: '260px', maxWidth: '400px' },
    'sidebar',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { height: '52px' }, 'pivotPanelHeader');
  addRootOverride(enhanced.components, 'MuiDataGrid', { height: '32px' }, 'pivotPanelField');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '84px' },
    'pivotPanelAvailableFields',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { minHeight: '158px' }, 'pivotPanelSections');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '38px' },
    'pivotPanelPlaceholder',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { width: '380px' }, 'aiAssistantPanel');
  addRootOverride(enhanced.components, 'MuiDataGrid', { height: '52px' }, 'aiAssistantPanelHeader');
  addRootOverride(enhanced.components, 'MuiDataGrid', { height: '32px' }, 'chartsPanelDataField');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '84px' },
    'chartsPanelDataAvailableFields',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '158px' },
    'chartsPanelDataSections',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '38px' },
    'chartsPanelDataPlaceholder',
  );
  // Row height rides upstream's own hook (content height: var(--TreeView-itemHeight,
  // unset)); sizing raw px. Master is unset (content-sized, about 32) — normal keeps it.
  addRootOverride(enhanced.components, 'MuiTreeItem', { '--TreeView-itemHeight': '32px' });
  // MUI X Date/Time Pickers — day-cell size fan-out (PickerDay/DateRangePickerDay
  // --PickerDay-size, weekday/week-number box widths, 6-week + loading heights,
  // skeleton) at this preset's day size.
  applyPickerDaySize(enhanced.components, '32px');
  // Weekday / week-number label heights (independent of day size; widths in the fan-out).
  addRootOverride(enhanced.components, 'MuiDayCalendar', { height: '18px' }, 'weekDayLabel');
  addRootOverride(enhanced.components, 'MuiDayCalendar', { height: '18px' }, 'weekNumberLabel');
  // Calendar root: master 336×320 = header block + weekday row + 6 weeks / 7 day
  // columns + 40 slack. Raw per-preset (matches this preset's day/header math) — the
  // day var can't reach here (it lives on the DayCalendar DESCENDANT; an ancestor
  // copy would shadow the knob), so day-size knob edits don't reflow the root box.
  addRootOverride(enhanced.components, 'MuiDateCalendar', {
    height: '298px',
    // The PickerViewRoot base pins maxHeight at 336 — without moving it the comfort
    // height is clamped and the last weeks clip (overflow hidden).
    maxHeight: '298px',
    width: '284px',
  });
  // 6-week grid floor width = the calendar content width (matches DateCalendar root).
  addRootOverride(enhanced.components, 'MuiDayCalendar', { minWidth: '284px' }, 'slideTransition');
  // [Pro] Range calendar: Pro's unnamed `InnerDayCalendarForRange` styled hardcodes
  // minWidth 312 / minHeight (DAY_RANGE_SIZE) and forwards its class onto the
  // slideTransition, beating the community DayCalendar slot override. Reach it via a
  // descendant selector under the themeable MuiDateRangeCalendar root — (0,2,0)
  // specificity wins over the inner styled's single class. Mirrors the single
  // calendar (linked writes off DateCalendar width + PickerDay size keep it in sync).
  addRootOverride(enhanced.components, 'MuiDateRangeCalendar', {
    '& .MuiDayCalendar-slideTransition': { minWidth: '284px', minHeight: 'calc((32px + 4px) * 6)' },
  });
  // Calendar header: min/max pinned together (upstream pins both against a Safari
  // jump); height raw — spacing steps shared across presets.
  addRootOverride(enhanced.components, 'MuiPickersCalendarHeader', {
    minHeight: '32px',
    maxHeight: '32px',
  });
  addRootOverride(enhanced.components, 'MuiMultiSectionDigitalClockSection', {
    width: '56px',
  });
  addRootOverride(
    enhanced.components,
    'MuiMultiSectionDigitalClockSection',
    { width: '48px' },
    'item',
  );
}

function applyLowXSizing(enhanced: XEnhanced): void {
  // MUI X DataGrid — rationale in enhanceHighDensity; mirrored structure.
  addDefaultProps(enhanced.components, 'MuiDataGrid', {
    rowHeight: 60,
    columnHeaderHeight: 60,
  });
  // Toolbar: min-height = raw px (sizing); inner padding + item gap = steps.
  addRootOverride(enhanced.components, 'MuiDataGrid', { minHeight: '60px' }, 'toolbar');
  // Footer: min-height = raw px (sizing); row/selection count gutters = steps.
  addRootOverride(enhanced.components, 'MuiDataGrid', { minHeight: '60px' }, 'footerContainer');
  // Filter field widths (sizing → raw px; master 75/150/150/190).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minWidth: '85px' },
    'filterFormLogicOperatorInput',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { width: '170px' }, 'filterFormColumnInput');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { width: '170px' },
    'filterFormOperatorInput',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { width: '215px' }, 'filterFormValueInput');
  // Column menu list min-width (sizing; master 248). Nested under `menu` — the
  // list is slot:'internal' and the menu portals outside the root, so the
  // root's child-class keys can't reach it.
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { '& .MuiDataGrid-menuList': { minWidth: '276px' } },
    'menu',
  );
  // Toolbar quick filter expanded width (sizing; master 260). The expanded
  // state has no DOM hook — it's ownerState-only — so the width scopes via a
  // variants matcher; collapsed keeps upstream's var(--trigger-width).
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { variants: [{ props: { expanded: true }, style: { width: '290px' } }] },
    'toolbarQuickFilterControl',
  );
  // [Pro/Premium] Grouping indent: depth × multiplier × spacing unit (master 2).
  // Premium grouping cells read the var; Pro tree-data computes the same indent
  // in JS and bypasses it — upstream inconsistency, flagged as fix candidate.
  addRootOverride(enhanced.components, 'MuiDataGrid', {
    '--DataGrid-cellOffsetMultiplier': '2.5',
  });
  // [Pro/Premium] Group-toggle gutter: flex-basis = sizing raw px (master 28);
  // marginRight (step) shared across presets — see sharedDensityComponents.
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { flexBasis: '32px' },
    'treeDataGroupingCellToggle',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { flexBasis: '32px' },
    'groupingCriteriaCellToggle',
  );
  // [Premium] Panel chrome sizing (raw px): sidebar/AI widths, the shared 52px
  // header rhythm (same trio as toolbar/footer), pivot/charts field rows and
  // drop zones (charts mirrors pivot — one decision, values never fork). Field
  // marginInlineStart (step) pulls the row off the sidebar edge so the hover
  // drag handle — absolutely pinned to the row's left edge — gets breathing room.
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { width: '330px', minWidth: '280px', maxWidth: '430px' },
    'sidebar',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { height: '60px' }, 'pivotPanelHeader');
  addRootOverride(enhanced.components, 'MuiDataGrid', { height: '38px' }, 'pivotPanelField');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '100px' },
    'pivotPanelAvailableFields',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { minHeight: '188px' }, 'pivotPanelSections');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '44px' },
    'pivotPanelPlaceholder',
  );
  addRootOverride(enhanced.components, 'MuiDataGrid', { width: '420px' }, 'aiAssistantPanel');
  addRootOverride(enhanced.components, 'MuiDataGrid', { height: '60px' }, 'aiAssistantPanelHeader');
  addRootOverride(enhanced.components, 'MuiDataGrid', { height: '38px' }, 'chartsPanelDataField');
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '100px' },
    'chartsPanelDataAvailableFields',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '188px' },
    'chartsPanelDataSections',
  );
  addRootOverride(
    enhanced.components,
    'MuiDataGrid',
    { minHeight: '44px' },
    'chartsPanelDataPlaceholder',
  );
  // Row height rides upstream's own hook (content height: var(--TreeView-itemHeight,
  // unset)); sizing raw px. Master is unset (content-sized, about 32) — normal keeps it.
  addRootOverride(enhanced.components, 'MuiTreeItem', { '--TreeView-itemHeight': '40px' });
  // MUI X Date/Time Pickers — day-cell size fan-out (see applyPickerDaySize).
  applyPickerDaySize(enhanced.components, '44px');
  // Weekday / week-number label heights (independent of day size; widths in the fan-out).
  addRootOverride(enhanced.components, 'MuiDayCalendar', { height: '48px' }, 'weekDayLabel');
  addRootOverride(enhanced.components, 'MuiDayCalendar', { height: '48px' }, 'weekNumberLabel');
  // Calendar root: master 336×320 = header block + weekday row + 6 weeks / 7 day
  // columns + 40 slack. Raw per-preset (matches this preset's day/header math) — the
  // day var can't reach here (it lives on the DayCalendar DESCENDANT; an ancestor
  // copy would shadow the knob), so day-size knob edits don't reflow the root box.
  addRootOverride(enhanced.components, 'MuiDateCalendar', {
    height: '406px',
    // The PickerViewRoot base pins maxHeight at 336 — without moving it the comfort
    // height is clamped and the last weeks clip (overflow hidden).
    maxHeight: '406px',
    width: '376px',
  });
  // [Pro] Range calendar: reach Pro's unnamed InnerDayCalendarForRange (hardcoded
  // minWidth 312 / minHeight) via a descendant selector under the themeable
  // MuiDateRangeCalendar root — (0,2,0) specificity wins. Mirrors the single
  // calendar (linked writes off DateCalendar width + PickerDay size keep it synced).
  addRootOverride(enhanced.components, 'MuiDateRangeCalendar', {
    '& .MuiDayCalendar-slideTransition': { minWidth: '376px', minHeight: 'calc((44px + 4px) * 6)' },
  });
  // Calendar header: min/max pinned together (upstream pins both against a Safari
  // jump); height raw — spacing steps shared across presets.
  addRootOverride(enhanced.components, 'MuiPickersCalendarHeader', {
    minHeight: '48px',
    maxHeight: '48px',
  });
  addRootOverride(enhanced.components, 'MuiMultiSectionDigitalClockSection', {
    width: '64px',
  });
  addRootOverride(
    enhanced.components,
    'MuiMultiSectionDigitalClockSection',
    { width: '56px' },
    'item',
  );
}

const X_SIZING: Record<XDensityLevel, (enhanced: XEnhanced) => void> = {
  high: applyHighXSizing,
  medium: applyMediumXSizing,
  low: applyLowXSizing,
};

export function applyXDensity(enhanced: XEnhanced, level: XDensityLevel): void {
  applySharedXDensity(enhanced);
  X_SIZING[level](enhanced);
}

export function withXDensity<A extends unknown[], T extends XEnhanced>(
  enhance: (...args: A) => T,
  level: XDensityLevel,
): (...args: A) => T {
  return (...args: A) => {
    const enhanced = enhance(...args);
    applyXDensity(enhanced, level);
    return enhanced;
  };
}
