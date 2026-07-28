import {
  addDefaultProps,
  addRootOverride,
  applyDensity,
  applyTypographyPatch,
  DensityScale,
  EnhanceableTheme,
} from './densityScale';
import applySharedDensity from './sharedDensityComponents';

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
  // Medium-only: global icon size per fontSize variant (master: 20/24/35px).
  // High/low emit nothing — icons keep master sizes there. Raw px (sizing policy).
  addRootOverride(enhanced.components, 'MuiSvgIcon', {
    variants: [
      { props: { fontSize: 'small' }, style: { fontSize: '12px' } },
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
  // MUI X Date/Time Pickers. Day geometry is JS constants (DAY_SIZE 36 / DAY_MARGIN 2)
  // baked into PickerDay's own vars AND raw into the weekday/week-number boxes and the
  // 6-week container math — one private var (on the DayCalendar root, which owns
  // every consumer; a DateCalendar copy would shadow it for descendants and break
  // the knob) drives them all (Dialog-margin pattern). Day margin (2px) stays
  // frozen — sub-step, and the scroll/positioning math reuses it.
  addRootOverride(enhanced.components, 'MuiDayCalendar', { '--_daySize': '36px' });
  // Weekday/week-number boxes: widths follow the day var; label heights raw.
  addRootOverride(
    enhanced.components,
    'MuiDayCalendar',
    { width: 'var(--_daySize)', height: '40px' },
    'weekDayLabel',
  );
  addRootOverride(
    enhanced.components,
    'MuiDayCalendar',
    { width: 'var(--_daySize)', height: '40px' },
    'weekNumberLabel',
  );
  // Calendar root: master 336×320 = header block + weekday row + 6 weeks / 7 day
  // columns + 40 slack. Raw per-preset (matches this preset's day/header math) — the
  // day var can't reach here (it lives on the DayCalendar DESCENDANT; an ancestor
  // copy would shadow the knob), so day-size knob edits don't reflow the root box.
  addRootOverride(enhanced.components, 'MuiDateCalendar', {
    height: '336px',
    // The PickerViewRoot base pins maxHeight at 336 — without moving it the comfort
    // height is clamped and the last weeks clip (overflow hidden).
    maxHeight: '336px',
    width: '320px',
  });
  // Calendar header: min/max pinned together (upstream pins both against a Safari
  // jump); height raw — spacing steps shared across presets.
  addRootOverride(enhanced.components, 'MuiPickersCalendarHeader', {
    minHeight: '40px',
    maxHeight: '40px',
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
    { width: '72px', height: '36px' },
    'button',
  );
  addRootOverride(
    enhanced.components,
    'MuiYearCalendar',
    { width: '72px', height: '36px' },
    'buttonFiller',
  );
  addRootOverride(
    enhanced.components,
    'MuiMonthCalendar',
    { width: '72px', height: '36px' },
    'button',
  );
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
