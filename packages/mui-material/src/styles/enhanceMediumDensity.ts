import {
  addDefaultProps,
  addRootOverride,
  applyDensity,
  DensityMultipliers,
  DensityOptions,
  EnhanceableTheme,
} from './densityScale';
import applySharedDensity, { applyPickerDaySize } from './sharedDensityComponents';

// Explicit px (self-contained, not spacing-derived).
// Steps × the 8px spacing unit → 4/8/12/16/24/32/48 (the design-token ladder).
const scale: DensityMultipliers = {
  'xx-small': 0.5,
  'x-small': 1,
  small: 1.5,
  medium: 2,
  large: 3,
  'x-large': 4,
  'xx-large': 6,
};

export default function enhanceMediumDensity<T extends EnhanceableTheme>(
  theme: T,
  options?: DensityOptions,
) {
  const enhanced = applyDensity(theme, scale, options);
  applySharedDensity(enhanced);
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
  return enhanced;
}
