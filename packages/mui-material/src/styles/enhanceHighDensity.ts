import {
  addDefaultProps,
  addRootOverride,
  applyDensity,
  applyTypographyPatch,
  DensityScale,
  EnhanceableTheme,
} from './densityScale';
import applySharedDensity from './sharedDensityComponents';

const scale: DensityScale = {
  'xx-small': '2px',
  'x-small': '4px',
  small: '8px',
  medium: '12px',
  large: '16px',
  'x-large': '24px',
  'xx-large': '32px',
};

export default function enhanceHighDensity<T extends EnhanceableTheme>(theme: T) {
  const enhanced = applyDensity(theme, scale);
  applySharedDensity(enhanced);
  // Compact-only type per variant (fontSize + lineHeight); normal/comfort keep
  // master. Theme-level tokens, not component overrides — same layer as button.
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
  applyTypographyPatch(enhanced, {
    h1: { fontSize: '4.5rem', lineHeight: 1.1 },
    h2: { fontSize: '3rem', lineHeight: 1.15 },
    h3: { fontSize: '2.5rem', lineHeight: 1.15 },
    h4: { fontSize: '1.75rem', lineHeight: 1.2 },
    h5: { fontSize: '1.25rem', lineHeight: 1.25 },
    h6: { fontSize: '1.125rem', lineHeight: 1.4 },
    subtitle1: { fontSize: '0.875rem', lineHeight: 1.5 },
    subtitle2: { fontSize: '0.8125rem', lineHeight: 1.4 },
    body1: { fontSize: '0.875rem', lineHeight: 1.42857143 },
    body2: { fontSize: '0.8125rem', lineHeight: 1.38462 },
    button: { fontSize: '0.8125rem', lineHeight: 1.38462 },
  });
  // Row height rides upstream's own hook (content height: var(--TreeView-itemHeight,
  // unset)); sizing raw px. Master is unset (content-sized, about 32) — normal keeps it.
  addRootOverride(enhanced.components, 'MuiTreeItem', { '--TreeView-itemHeight': '28px' });
  // MUI X Date/Time Pickers. Day geometry is JS constants (DAY_SIZE 36 / DAY_MARGIN 2)
  // baked into PickerDay's own vars AND raw into the weekday/week-number boxes and the
  // 6-week container math — one private var (on the DayCalendar root, which owns
  // every consumer; a DateCalendar copy would shadow it for descendants and break
  // the knob) drives them all (Dialog-margin pattern). Day margin (2px) stays
  // frozen — sub-step, and the scroll/positioning math reuses it.
  addRootOverride(enhanced.components, 'MuiDayCalendar', { '--_daySize': '30px' });
  // Weekday/week-number boxes: widths follow the day var; label heights raw.
  addRootOverride(
    enhanced.components,
    'MuiDayCalendar',
    { width: 'var(--_daySize)', height: '36px' },
    'weekDayLabel',
  );
  addRootOverride(
    enhanced.components,
    'MuiDayCalendar',
    { width: 'var(--_daySize)', height: '36px' },
    'weekNumberLabel',
  );
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
  // Calendar header: min/max pinned together (upstream pins both against a Safari
  // jump); height raw — spacing steps shared across presets.
  addRootOverride(enhanced.components, 'MuiPickersCalendarHeader', {
    minHeight: '36px',
    maxHeight: '36px',
  });
  // Year/month grid buttons (master 72×36) — sizing raw; the Year filler (last-row
  // spacer) mirrors the button box. Grid spacing: row gaps + block padding + the
  // 3-per-row columnGap ride steps (master 12/6/24 year, 16/8/24 month). Year's
  // paddingBlock and both columnGaps scope to the default 3-per-row variant — the
  // 4-per-row variant redefines those properties (padding '0 2px', columnGap 0) and
  // an unconditional emission would clobber it.
  addRootOverride(
    enhanced.components,
    'MuiYearCalendar',
    { width: '64px', height: '32px' },
    'button',
  );
  addRootOverride(
    enhanced.components,
    'MuiYearCalendar',
    { width: '64px', height: '32px' },
    'buttonFiller',
  );
  addRootOverride(
    enhanced.components,
    'MuiMonthCalendar',
    { width: '64px', height: '32px' },
    'button',
  );
  addRootOverride(enhanced.components, 'MuiMultiSectionDigitalClockSection', {
    width: '48px',
  });
  addRootOverride(
    enhanced.components,
    'MuiMultiSectionDigitalClockSection',
    { width: '40px' },
    'item',
  );
  return enhanced;
}
