import {
  addDefaultProps,
  addRootOverride,
  applyDensity,
  applyTypographyPatch,
  DensityScale,
  EnhanceableTheme,
} from './densityScale';
import applySharedDensity, { applyPickerDaySize } from './sharedDensityComponents';

// Explicit px (self-contained, not spacing-derived).
const scale: DensityScale = {
  'xx-small': '4px',
  'x-small': '8px',
  small: '12px',
  medium: '16px',
  large: '24px',
  'x-large': '32px',
  'xx-large': '48px',
};

export default function enhanceMediumDensity<T extends EnhanceableTheme>(theme: T) {
  const enhanced = applyDensity(theme, scale);
  // Type scale from the design-system capture (5 variants; h4–h6/subtitle/body2
  // have no counterpart and keep master). lineHeight px are MEASURED
  // (semantic/line-height/variable/*: xxl 36, xl 30, l 26, m 20, s 18);
  // fontSize px are token-named but only m (14) is resolved — s/l/xl/xxl
  // assume 12/20/24/28 (ladder anchored on m=14), ratios derive from those.
  applyTypographyPatch(enhanced, {
    // semantic/font-size/variable/xxl (28px assumed) / line-height 36px
    h1: { fontSize: '1.75rem', lineHeight: 1.285714286 },
    // semantic/font-size/variable/xl (24px assumed) / line-height 30px
    h2: { fontSize: '1.5rem', lineHeight: 1.25 },
    // semantic/font-size/variable/l (20px assumed) / line-height 26px
    h3: { fontSize: '1.25rem', lineHeight: 1.3 },
    // "body" = body1: semantic/font-size/variable/m (14px) / line-height 20px
    body1: { fontSize: '0.875rem', lineHeight: 1.428571429 },
    // 'body2' guessing, need to ask Weave to provide
    body2: { fontSize: '0.8125rem', lineHeight: 1.38462 },
    // semantic/font-size/variable/s (12px assumed) / line-height 18px
    caption: { fontSize: '0.75rem', lineHeight: 1.5 },
    button: { fontSize: '0.875rem', lineHeight: 1.428571429 },
  });
  applySharedDensity(enhanced);
  // Button touch target: semantic/size/touch-target/default (32px) — the
  // capture's contentWrapper height on every variant. Raw px (sizing policy);
  // medium-only — high/low have no captured counterpart.
  addRootOverride(enhanced.components, 'MuiButton', {
    variants: [{ props: { size: 'medium' }, style: { minHeight: '32px' } }],
  });
  // Icon size inside Button: capture's icon wrappers are 16px boxes; glyph
  // font-size 16px. Same `& > *:nth-of-type(1)` seam as master's per-size
  // 18/20/22 ladder; medium-only (small/large keep master). Both slots are
  // driven by ONE virtual knob (`virtual:MuiButton:iconFontSize`).
  addRootOverride(
    enhanced.components,
    'MuiButton',
    {
      variants: [
        { props: { size: 'medium' }, style: { '& > *:nth-of-type(1)': { fontSize: '16px' } } },
      ],
    },
    'startIcon',
  );
  addRootOverride(
    enhanced.components,
    'MuiButton',
    {
      variants: [
        { props: { size: 'medium' }, style: { '& > *:nth-of-type(1)': { fontSize: '16px' } } },
      ],
    },
    'endIcon',
  );
  // IconButton minimum size: semantic/size/touch-target/default (32px) — the
  // capture's 32×32 buttonContainer. Raw px (sizing policy); medium-only. Both
  // axes driven by ONE virtual knob (`virtual:MuiIconButton:minSize`).
  addRootOverride(enhanced.components, 'MuiIconButton', {
    variants: [{ props: { size: 'medium' }, style: { minWidth: '32px', minHeight: '32px' } }],
  });
  // Icon glyph size inside a medium IconButton (sizing raw px; medium-only).
  addRootOverride(enhanced.components, 'MuiIconButton', {
    variants: [{ props: { size: 'medium' }, style: { fontSize: '16px' } }],
  });
  // List-row floor: semantic/size/navigation/list-item/min-height (32px) — the
  // capture's MenuItem 3.0 Min height — plain ListItem gets the floor here only
  // (medium-only, dense keeps master). ListItemButton now carries it in shared
  // (mirrors MenuItem across presets, both dense states).
  addRootOverride(enhanced.components, 'MuiListItem', {
    variants: [{ props: { dense: false }, style: { minHeight: '32px' } }],
  });
  // Medium-only: global icon size per fontSize variant (master: 20/24/35px).
  // High/low emit nothing — icons keep master sizes there. Raw px (sizing policy).
  addRootOverride(enhanced.components, 'MuiSvgIcon', {
    variants: [
      { props: { fontSize: 'small' }, style: { fontSize: '16px' } },
      { props: { fontSize: 'medium' }, style: { fontSize: '16px' } },
      { props: { fontSize: 'large' }, style: { fontSize: '20px' } },
    ],
  });
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
  return enhanced;
}
