import {
  addDefaultProps,
  addRootOverride,
  applyDensity,
  applyTypographyPatch,
  DensityScale,
  EnhanceableTheme,
} from './densityScale';
import applySharedDensity, {
  applyPickerDaySize,
  applySizeDefaults,
} from './sharedDensityComponents';

const scale: DensityScale = {
  'xx-small': '8px',
  'x-small': '12px',
  small: '16px',
  medium: '24px',
  large: '32px',
  'x-large': '48px',
  'xx-large': '64px',
};

export default function enhanceLowDensity<T extends EnhanceableTheme>(theme: T) {
  const enhanced = applyDensity(theme, scale);
  applySharedDensity(enhanced);
  // Size-led density: Low's diagonal size becomes the default for every
  // size-prop component (explicit per-instance size wins).
  applySizeDefaults(enhanced.components, 'large');
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
  applyTypographyPatch(enhanced, {
    // lineHeight must equal the shared size=large pin (1.4 → 21px at 15px) — the
    // size↔density diagonal ties Low's button type to the large size variant.
    button: { fontSize: '0.9375rem', lineHeight: 1.4 },
  });
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
  return enhanced;
}
