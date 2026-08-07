// Keys are managed by `pnpm density:codegen` — one per emitTable row, in table order.
// EDIT THE VALUES ONLY. A value is the knob label (string), or a meta object:
//   hidden:   the row never applies independently — dropped from densityGroups before
//             the collect path (the old hiddenFieldIds). NOT for virtual-knob members /
//             linked-write targets — those hide at render level in the playground.
//   hiddenIn: hidden only in the listed canvas families (the old hiddenFieldIdsByFamily).
//   note:     why it's hidden / anything the label can't say. Survives regen + remap.
// Regen preserves values, syncs keys to the presets, and auto-remaps an entry whose row
// id changed unambiguously (matcher/selector edits); ambiguous renames fail the codegen.
// CI diffs this file.

export interface DensityKnobMeta {
  label: string;
  /** never applies independently — dropped from densityGroups before collectDensityEdits. */
  hidden?: true;
  /** hidden only in these canvas families. */
  hiddenIn?: string[];
  /** why hidden (kept across regens and id remaps). */
  note?: string;
  /** presets this knob is reviewed/confirmed for — renders the sidebar done dot. */
  done?: Array<'high' | 'medium' | 'low'>;
}

export const densityKnobs: Record<string, string | DensityKnobMeta> = {
  'MuiAccordionDetails|root|base||paddingBlockStart': 'AccordionDetails · paddingBlockStart',
  'MuiAccordionDetails|root|base||paddingBlockEnd': 'AccordionDetails · paddingBlockEnd',
  'MuiAccordionDetails|root|base||paddingInline': 'AccordionDetails · paddingInline',
  'MuiAccordionSummary|content|base||marginBlock': 'AccordionSummary · content · marginBlock',
  'MuiAccordionSummary|content|fn:ya70cs|&.Mui-expanded|marginBlock':
    'AccordionSummary · content · marginBlock (expanded)',
  'MuiAccordionSummary|root|base||minHeight': {
    label: 'AccordionSummary · minHeight',
    hidden: true,
    note: 'Preset-driven sizing, not independently tunable via sidebar.',
  },
  'MuiAccordionSummary|root|base||padding': 'AccordionSummary · padding',
  'MuiAccordionSummary|root|fn:ya70cs|&.Mui-expanded|minHeight': {
    label: 'AccordionSummary · minHeight (expanded)',
    hidden: true,
    note: 'Preset-driven sizing, not independently tunable via sidebar.',
  },
  'MuiAlert|icon|base||marginRight': 'Alert · icon · marginRight',
  'MuiAlert|root|base||paddingBlock': 'Alert · paddingBlock',
  'MuiAlert|root|base||paddingInline': 'Alert · paddingInline',
  'MuiAutocomplete|listbox|base|& .MuiAutocomplete-option|minHeight': {
    label: 'Option min height',
    hidden: true,
    note: 'Preset-driven sizing, not independently tunable via sidebar.',
  },
  'MuiAutocomplete|listbox|base|& .MuiAutocomplete-option|paddingBlock': {
    label: 'Option block padding',
    done: ['medium'],
  },
  'MuiAutocomplete|listbox|base|& .MuiAutocomplete-option|paddingInline': {
    label: 'Option inline padding',
    done: ['medium'],
  },
  'MuiAutocomplete|root|base||--_autocompleteInputRootPadBlock': {
    label: 'Autocomplete · Input root paddingBlock',
    done: ['medium'],
  },
  'MuiAutocomplete|root|base||--_autocompleteInputPadBlock': {
    label: 'Autocomplete · Input inner paddingBlock',
    done: ['medium'],
  },
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root|paddingBlock': {
    label: 'Autocomplete · inputRoot paddingBlock',
    hidden: true,
    note: 'Consumes --_autocompleteInputRootPadBlock — the var row is the knob.',
  },
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root|paddingLeft': {
    label: 'Autocomplete · paddingLeft',
    done: ['medium'],
  },
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root .MuiAutocomplete-input|paddingBlock': {
    label: 'Autocomplete · input paddingBlock',
    hidden: true,
    note: 'Consumes --_autocompleteInputPadBlock — the var row is the knob.',
  },
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root .MuiAutocomplete-input|paddingLeft': {
    label: 'Autocomplete · paddingLeft',
    done: ['medium'],
  },
  'MuiAutocomplete|root|base|& .MuiFormControl-root:has(> .MuiOutlinedInput-root)|--_outlinedInputPadBlock':
    {
      label: 'Autocomplete · --_outlinedInputPadBlock',
      hidden: true,
      note: "Re-writes --_outlinedInputPadBlock = calc(root pad + inner pad) so the OutlinedInput floating-label rest-Y follows Autocomplete's own pads.",
    },
  'MuiAutocomplete|root|base|&:has(.MuiInputBase-sizeSmall)|--_autocompleteInputRootPadBlock':
    'Autocomplete · Input root paddingBlock [size=small]',
  'MuiAutocomplete|root|base|&:has(.MuiInputBase-sizeSmall)|--_autocompleteInputPadBlock':
    'Autocomplete · Input inner paddingBlock [size=small]',
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root.MuiInputBase-sizeSmall|paddingBlock': {
    label: 'Autocomplete · paddingBlock',
    hidden: true,
    note: 'Consumes --_autocompleteInputRootPadBlock — the var row is the knob.',
  },
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root.MuiInputBase-sizeSmall .MuiAutocomplete-input|paddingBlock':
    {
      label: 'Autocomplete · paddingBlock',
      hidden: true,
      note: 'Consumes --_autocompleteInputPadBlock — the var row is the knob.',
    },
  'MuiAutocomplete|tag|base||margin': { label: 'Autocomplete · tag · margin', done: ['medium'] },
  'MuiAvatar|root|base||width': 'Avatar · width',
  'MuiAvatar|root|base||height': 'Avatar · height',
  'MuiBadge|badge|variant=standard||minWidth': 'Badge · badge · minWidth [variant=standard]',
  'MuiBadge|badge|variant=standard||height': 'Badge · badge · height [variant=standard]',
  'MuiBadge|badge|variant=standard||paddingInline':
    'Badge · badge · paddingInline [variant=standard]',
  'MuiBadge|badge|variant=dot||minWidth': 'Badge · badge · minWidth [variant=dot]',
  'MuiBadge|badge|variant=dot||height': 'Badge · badge · height [variant=dot]',
  'MuiBottomNavigation|root|base||height': 'BottomNavigation · height',
  'MuiBottomNavigationAction|root|base||paddingInline': 'BottomNavigationAction · paddingInline',
  'MuiBottomNavigationAction|root|base||minWidth': 'BottomNavigationAction · minWidth',
  'MuiBottomNavigationAction|root|base||maxWidth': 'BottomNavigationAction · maxWidth',
  'MuiBottomNavigationAction|root|fn:x2hhfk||paddingTop': {
    label: 'BottomNavigationAction · paddingTop [icon-only]',
    note: 'Centers the icon when unselected with a hidden label (net master condition — the no-label zero state stays untouched).',
  },
  'MuiBreadcrumbs|ol|base||minHeight': { label: 'Breadcrumbs · ol · minHeight', done: ['medium'] },
  'MuiBreadcrumbs|separator|base||marginInline': 'Breadcrumbs · separator · marginInline',
  'MuiButton|endIcon|size=medium|& > *:nth-of-type(1)|fontSize': {
    label: 'Button · endIcon · fontSize [size=medium]',
    done: ['medium'],
  },
  'MuiButton|root|size=small||paddingBlock': 'Button · paddingBlock [size=small]',
  'MuiButton|root|size=small||paddingInline': 'Button · paddingInline [size=small]',
  'MuiButton|root|size=small,variant=outlined||paddingBlock': {
    label: 'Button · paddingBlock [size=small, outlined]',
    note: 'Linked write: follows the size=small paddingBlock knob at calc(v − 1px) — the outlined border compensation keeps all variants at equal height.',
  },
  'MuiButton|root|size=medium||paddingBlock': {
    label: 'Button · paddingBlock [size=medium]',
    done: ['medium'],
  },
  'MuiButton|root|size=medium||paddingInline': {
    label: 'Button · paddingInline [size=medium]',
    done: ['medium'],
  },
  'MuiButton|root|size=medium,variant=outlined||paddingBlock': {
    label: 'Button · paddingBlock [size=medium, outlined]',
    note: 'Linked write: follows the size=medium paddingBlock knob at calc(v − 1px) — the outlined border compensation keeps all variants at equal height.',
  },
  'MuiButton|root|size=large||paddingBlock': 'Button · paddingBlock [size=large]',
  'MuiButton|root|size=large||paddingInline': 'Button · paddingInline [size=large]',
  'MuiButton|root|size=large,variant=outlined||paddingBlock': {
    label: 'Button · paddingBlock [size=large, outlined]',
    note: 'Linked write: follows the size=large paddingBlock knob at calc(v − 1px) — the outlined border compensation keeps all variants at equal height.',
  },
  'MuiButton|root|size=medium||minHeight': {
    label: 'Button · minHeight [size=medium]',
    done: ['medium'],
  },
  'MuiButton|startIcon|size=medium|& > *:nth-of-type(1)|fontSize': {
    label: 'Button · startIcon · fontSize [size=medium]',
    done: ['medium'],
  },
  'MuiButtonGroup|root|base|& .MuiButtonGroup-grouped|minWidth': {
    label: 'ButtonGroup · button minWidth',
    done: ['medium'],
  },
  'MuiCardActions|root|base||padding': 'CardActions · padding',
  'MuiCardActions|root|disableSpacing=false|& > :not(style) ~ :not(style)|marginLeft':
    'CardActions · child gap',
  'MuiCardContent|root|base||padding': 'CardContent · padding',
  'MuiCardContent|root|base|&:last-child|paddingBottom': 'CardContent · paddingBottom [last-child]',
  'MuiCardHeader|action|base||marginBlock': 'CardHeader · action · marginBlock',
  'MuiCardHeader|action|base||marginRight': 'CardHeader · action · marginRight',
  'MuiCardHeader|avatar|base||marginRight': 'CardHeader · avatar · marginRight',
  'MuiCardHeader|root|base||padding': 'CardHeader · padding',
  'MuiCheckbox|root|size=medium||padding': {
    label: 'Checkbox · padding [size=medium]',
    done: ['medium'],
  },
  'MuiCheckbox|root|size=medium|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft': {
    label: 'Checkbox · marginLeft [size=medium]',
    hidden: true,
    note: 'Sibling-label margin = calc(-2px - padding), re-emitted by the padding knob (selectionControlPadding).',
  },
  'MuiCheckbox|root|size=medium|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight': {
    label: 'Checkbox · marginRight [size=medium]',
    hidden: true,
    note: 'Sibling-label margin = calc(-2px - padding), re-emitted by the padding knob (selectionControlPadding).',
  },
  'MuiCheckbox|root|size=small||padding': 'Checkbox · padding [size=small]',
  'MuiCheckbox|root|size=small|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft': {
    label: 'Checkbox · marginLeft [size=small]',
    hidden: true,
    note: 'Sibling-label margin = calc(-2px - padding), re-emitted by the padding knob (selectionControlPadding).',
  },
  'MuiCheckbox|root|size=small|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight': {
    label: 'Checkbox · marginRight [size=small]',
    hidden: true,
    note: 'Sibling-label margin = calc(-2px - padding), re-emitted by the padding knob (selectionControlPadding).',
  },
  'MuiCheckbox|root|edge=start||marginLeft': {
    label: 'Checkbox · marginLeft [edge=start]',
    done: ['medium'],
  },
  'MuiCheckbox|root|edge=end||marginRight': {
    label: 'Checkbox · marginRight [edge=end]',
    done: ['medium'],
  },
  'MuiChip|avatar|size=medium||--_avatarSize': {
    label: 'Chip · avatar · size [size=medium]',
    done: ['medium'],
  },
  'MuiChip|avatar|size=medium||width': {
    label: 'Chip · avatar · width [size=medium]',
    hidden: true,
    note: 'Derived from the per-size --_height/--_avatarSize/--_deleteIconSize vars — the var rows are the knobs.',
  },
  'MuiChip|avatar|size=medium||height': {
    label: 'Chip · avatar · height [size=medium]',
    hidden: true,
    note: 'Derived from the per-size --_height/--_avatarSize/--_deleteIconSize vars — the var rows are the knobs.',
  },
  'MuiChip|avatar|size=medium||marginLeft': {
    label: 'Chip · avatar · marginLeft [size=medium]',
    hidden: true,
    note: 'Derived from the per-size --_height/--_avatarSize/--_deleteIconSize vars — the var rows are the knobs.',
  },
  'MuiChip|avatar|size=small||--_avatarSize': {
    label: 'Chip · avatar · size [size=small]',
    done: ['medium'],
  },
  'MuiChip|avatar|size=small||width': {
    label: 'Chip · avatar · width [size=small]',
    hidden: true,
    note: 'Derived from the per-size --_height/--_avatarSize/--_deleteIconSize vars — the var rows are the knobs.',
  },
  'MuiChip|avatar|size=small||height': {
    label: 'Chip · avatar · height [size=small]',
    hidden: true,
    note: 'Derived from the per-size --_height/--_avatarSize/--_deleteIconSize vars — the var rows are the knobs.',
  },
  'MuiChip|avatar|size=small||marginLeft': {
    label: 'Chip · avatar · marginLeft [size=small]',
    hidden: true,
    note: 'Derived from the per-size --_height/--_avatarSize/--_deleteIconSize vars — the var rows are the knobs.',
  },
  'MuiChip|deleteIcon|size=medium||--_deleteIconSize': 'Chip · delete icon · size [size=medium]',
  'MuiChip|deleteIcon|size=medium||fontSize': {
    label: 'Chip · deleteIcon · fontSize [size=medium]',
    hidden: true,
    note: 'Derived from the per-size --_height/--_avatarSize/--_deleteIconSize vars — the var rows are the knobs.',
  },
  'MuiChip|deleteIcon|size=medium||marginRight': {
    label: 'Chip · deleteIcon · marginRight [size=medium]',
    hidden: true,
    note: 'Derived from the per-size --_height/--_avatarSize/--_deleteIconSize vars — the var rows are the knobs.',
  },
  'MuiChip|deleteIcon|size=small||--_deleteIconSize': 'Chip · delete icon · size [size=small]',
  'MuiChip|deleteIcon|size=small||fontSize': {
    label: 'Chip · deleteIcon · fontSize [size=small]',
    hidden: true,
    note: 'Derived from the per-size --_height/--_avatarSize/--_deleteIconSize vars — the var rows are the knobs.',
  },
  'MuiChip|deleteIcon|size=small||marginRight': {
    label: 'Chip · deleteIcon · marginRight [size=small]',
    hidden: true,
    note: 'Derived from the per-size --_height/--_avatarSize/--_deleteIconSize vars — the var rows are the knobs.',
  },
  'MuiChip|icon|size=medium||fontSize': {
    label: 'Chip · icon · fontSize [size=medium]',
    done: ['medium'],
  },
  'MuiChip|icon|size=small||fontSize': {
    label: 'Chip · icon · fontSize [size=small]',
    done: ['medium'],
  },
  'MuiChip|label|size=medium||paddingInline': {
    label: 'Chip · label · paddingInline [size=medium]',
    done: ['medium'],
  },
  'MuiChip|label|size=small||paddingInline': {
    label: 'Chip · label · paddingInline [size=small]',
    done: ['medium'],
  },
  'MuiChip|root|size=medium||--_height': { label: 'Chip · height [size=medium]', done: ['medium'] },
  'MuiChip|root|size=medium||height': {
    label: 'Chip · height [size=medium]',
    hidden: true,
    note: 'Derived from the per-size --_height/--_avatarSize/--_deleteIconSize vars — the var rows are the knobs.',
  },
  'MuiChip|root|size=small||--_height': { label: 'Chip · height [size=small]', done: ['medium'] },
  'MuiChip|root|size=small||height': {
    label: 'Chip · height [size=small]',
    hidden: true,
    note: 'Derived from the per-size --_height/--_avatarSize/--_deleteIconSize vars — the var rows are the knobs.',
  },
  'MuiChip|root|size=medium|& .MuiChip-icon|marginLeft': {
    label: 'Chip · marginLeft [size=medium]',
    done: ['medium'],
  },
  'MuiChip|root|size=medium|& .MuiChip-icon|marginRight': {
    label: 'Chip · marginRight [size=medium]',
    done: ['medium'],
  },
  'MuiChip|root|size=small|& .MuiChip-icon|marginLeft': {
    label: 'Chip · marginLeft [size=small]',
    done: ['medium'],
  },
  'MuiChip|root|size=small|& .MuiChip-icon|marginRight': {
    label: 'Chip · marginRight [size=small]',
    done: ['medium'],
  },
  'MuiDataGrid|actionsCell|base||gridGap': 'DataGrid · actionsCell · gridGap',
  'MuiDataGrid|aiAssistantPanel|base||width': {
    label: 'DataGrid · aiAssistantPanel · width',
    note: '[Premium] master 380. Demo: AI panel opens via initialState.preferencePanel (empty state, no service needed).',
  },
  'MuiDataGrid|aiAssistantPanelHeader|base||height': {
    label: 'DataGrid · aiAssistantPanelHeader · height',
    note: '[Premium] same 44/52/60 rhythm as toolbar/footer (master 52). Demo: AI panel opens via initialState.preferencePanel (empty state, no service needed).',
  },
  'MuiDataGrid|cell|base||paddingInline': {
    label: 'DataGrid · cell · paddingInline',
    done: ['medium'],
  },
  'MuiDataGrid|cell|base|&[aria-rowspan]:not([aria-rowspan="1"]) .MuiDataGrid-multiSelectCell|paddingTop':
    {
      label: 'DataGrid · cell · rowspan multiSelect paddingTop',
      note: '⚑ [Premium] rowspan multi-select chip stack (master 8). Demo: row-spanning multiSelect column, aria-rowspan=2.',
    },
  'MuiDataGrid|chartsPanelDataAvailableFields|base||minHeight': {
    label: 'DataGrid · chartsPanelDataAvailableFields · minHeight',
    note: '[Premium] mirrors pivotPanelAvailableFields — values never fork.',
  },
  'MuiDataGrid|chartsPanelDataField|base||marginInlineStart': {
    label: 'DataGrid · chartsPanelDataField · marginInlineStart',
    note: '[Premium] mirrors pivotPanelField — values never fork.',
  },
  'MuiDataGrid|chartsPanelDataField|base||height': {
    label: 'DataGrid · chartsPanelDataField · height',
    note: '[Premium] mirrors pivotPanelField — values never fork.',
  },
  'MuiDataGrid|chartsPanelDataPlaceholder|base||minHeight': {
    label: 'DataGrid · chartsPanelDataPlaceholder · minHeight',
    note: '[Premium] mirrors pivotPanelPlaceholder — values never fork.',
  },
  'MuiDataGrid|chartsPanelDataSections|base||minHeight': {
    label: 'DataGrid · chartsPanelDataSections · minHeight',
    note: '[Premium] mirrors pivotPanelSections — values never fork.',
  },
  'MuiDataGrid|columnHeader|base||paddingInline': {
    label: 'DataGrid · columnHeader · paddingInline',
    done: ['medium'],
  },
  'MuiDataGrid|columnHeader--dragging|base||paddingInline': {
    label: 'DataGrid · columnHeader--dragging · paddingInline',
    note: '⚑ transient drag-ghost inset (master 0 12px) — not visible in static demos.',
  },
  'MuiDataGrid|columnHeaderFilterInput|base||marginRight': {
    label: 'DataGrid · columnHeaderFilterInput · marginRight',
    note: '[Pro] header-filter input (master su(0.5)).',
  },
  'MuiDataGrid|columnHeaderFilterInput|base||marginBottom': {
    label: 'DataGrid · columnHeaderFilterInput · marginBottom',
    note: '[Pro] negative pull (master su(-0.25)) — a negated key (-xx-small) maps it.',
  },
  'MuiDataGrid|columnHeaderTitleContainer|base||gap': 'DataGrid · columnHeaderTitleContainer · gap',
  'MuiDataGrid|columnsManagement|base||padding': 'DataGrid · columnsManagement · padding',
  'MuiDataGrid|columnsManagement|base|& .MuiFormControlLabel-root|gap': {
    label: 'DataGrid · columnsManagement · row label gap',
    note: 'Targets the Material FormControlLabel class — the grid wrapper is slot:internal (no styleOverrides key).',
  },
  'MuiDataGrid|columnsManagementEmptyText|base||paddingBlock':
    'DataGrid · columnsManagementEmptyText · paddingBlock',
  'MuiDataGrid|columnsManagementFooter|base||padding':
    'DataGrid · columnsManagementFooter · padding',
  'MuiDataGrid|columnsManagementHeader|base||padding':
    'DataGrid · columnsManagementHeader · padding',
  'MuiDataGrid|defaultProps|base||rowHeight': {
    label: 'DataGrid · row height (defaultProps, px)',
    done: ['medium'],
    note: 'JS-gated: applies through the rowHeight prop, not CSS — the virtualizer computes row positions from it.',
  },
  'MuiDataGrid|defaultProps|base||columnHeaderHeight': {
    label: 'DataGrid · header height (defaultProps, px)',
    done: ['medium'],
    note: 'JS-gated: applies through the columnHeaderHeight prop, not CSS.',
  },
  'MuiDataGrid|editInputCell|base|& input|paddingInline':
    'DataGrid · editInputCell · paddingInline',
  'MuiDataGrid|filterForm|base||gap': 'DataGrid · filterForm · gap',
  'MuiDataGrid|filterFormColumnInput|base||width': 'DataGrid · filterFormColumnInput · width',
  'MuiDataGrid|filterFormLogicOperatorInput|base||minWidth':
    'DataGrid · filterFormLogicOperatorInput · minWidth',
  'MuiDataGrid|filterFormOperatorInput|base||width': 'DataGrid · filterFormOperatorInput · width',
  'MuiDataGrid|filterFormValueInput|base||width': 'DataGrid · filterFormValueInput · width',
  'MuiDataGrid|footerContainer|base||minHeight': 'DataGrid · footerContainer · minHeight',
  'MuiDataGrid|groupingCriteriaCellToggle|base||marginRight':
    'DataGrid · groupingCriteriaCellToggle · marginRight',
  'MuiDataGrid|groupingCriteriaCellToggle|base||flexBasis': {
    label: 'DataGrid · groupingCriteriaCellToggle · flexBasis',
    note: '[Premium] group-toggle gutter width (master 28px).',
  },
  'MuiDataGrid|menu|base|& .MuiDataGrid-menuList|minWidth': {
    label: 'DataGrid · menuList · minWidth',
    note: 'Nested under the menu popup slot — the list is slot:internal and the menu portals outside the root. Opens on interaction only; verify via computed styles.',
  },
  'MuiDataGrid|overlay|base||gap': 'DataGrid · overlay · gap',
  'MuiDataGrid|panel|base|& .MuiDataGrid-panelContent|padding': {
    label: 'DataGrid · panelContent · padding',
    done: ['medium'],
    note: 'Nested under panel — upstream resolves the panelContent key on the popup shell too.',
  },
  'MuiDataGrid|panel|base|& .MuiDataGrid-panelContent|gap': {
    label: 'DataGrid · panelContent · gap',
    done: ['medium'],
    note: 'Gap between stacked filter forms (master su(2.5)).',
  },
  'MuiDataGrid|panelFooter|base||padding': {
    label: 'DataGrid · panelFooter · padding',
    done: ['medium'],
  },
  'MuiDataGrid|pivotPanelAvailableFields|base||minHeight': {
    label: 'DataGrid · pivotPanelAvailableFields · minHeight',
    note: '⚑ [Premium] drop zone — straw-man, coupled to the field-row height (master 84).',
  },
  'MuiDataGrid|pivotPanelField|base||marginInlineStart': {
    label: 'DataGrid · pivotPanelField · marginInlineStart',
    note: '[Premium] pulls the row off the sidebar edge so the hover drag handle (absolutely pinned to the row edge) gets space. No upstream margin.',
  },
  'MuiDataGrid|pivotPanelField|base||height': 'DataGrid · pivotPanelField · height',
  'MuiDataGrid|pivotPanelHeader|base||height': {
    label: 'DataGrid · pivotPanelHeader · height',
    note: '[Premium] same 44/52/60 rhythm as toolbar/footer (master 52).',
  },
  'MuiDataGrid|pivotPanelPlaceholder|base||minHeight': {
    label: 'DataGrid · pivotPanelPlaceholder · minHeight',
    note: '⚑ [Premium] drop zone — straw-man, coupled to the field-row height (master 38).',
  },
  'MuiDataGrid|pivotPanelSections|base||minHeight': {
    label: 'DataGrid · pivotPanelSections · minHeight',
    note: '⚑ [Premium] drop zone — straw-man, coupled to the field-row height (master 158).',
  },
  'MuiDataGrid|root|base|& .MuiDataGrid-columnHeader--filter|paddingBlock': {
    label: 'DataGrid · columnHeader--filter · paddingBlock',
    note: '[Pro] header-filter row (master 8/8; the densityCompact conditional stays dormant — grid density unset).',
  },
  'MuiDataGrid|root|base|& .MuiDataGrid-columnHeader--filter|paddingRight': {
    label: 'DataGrid · columnHeader--filter · paddingRight',
    note: '[Pro] physical right inset (master 5) — matches upstream so RTL flips identically.',
  },
  'MuiDataGrid|root|base||--DataGrid-cellOffsetMultiplier': {
    label: 'DataGrid · grouping indent multiplier',
    note: 'Unitless: indent = multiplier × spacing unit × depth (master 2). Premium grouping cells read the var; Pro tree-data computes the indent in JS and bypasses it (upstream inconsistency).',
  },
  'MuiDataGrid|row--dragging|base||paddingInline': {
    label: 'DataGrid · row--dragging · paddingInline',
    note: '⚑ transient drag-ghost inset (master 0 12px) — not visible in static demos.',
  },
  'MuiDataGrid|row--dragging|base|& .MuiDataGrid-rowReorderCellPlaceholder|paddingInline': {
    label: 'DataGrid · row--dragging · placeholder paddingInline',
    note: '⚑ reorder placeholder inset (master 0 6px); nested to outrank the upstream nested rule.',
  },
  'MuiDataGrid|rowCount|base||marginInline': 'DataGrid · rowCount · marginInline',
  'MuiDataGrid|selectedRowCount|base||marginInline': 'DataGrid · selectedRowCount · marginInline',
  'MuiDataGrid|sidebar|base||width': 'DataGrid · sidebar · width',
  'MuiDataGrid|sidebar|base||minWidth': 'DataGrid · sidebar · minWidth',
  'MuiDataGrid|sidebar|base||maxWidth': 'DataGrid · sidebar · maxWidth',
  'MuiDataGrid|toolbar|base||padding': 'DataGrid · toolbar · padding',
  'MuiDataGrid|toolbar|base||gap': 'DataGrid · toolbar · gap',
  'MuiDataGrid|toolbar|base||minHeight': 'DataGrid · toolbar · minHeight',
  'MuiDataGrid|toolbarDivider|base||marginInline': 'DataGrid · toolbarDivider · marginInline',
  'MuiDataGrid|toolbarLabel|base||marginInline': 'DataGrid · toolbarLabel · marginInline',
  'MuiDataGrid|toolbarQuickFilterControl|expanded=true||width': {
    label: 'DataGrid · quick filter · width [expanded]',
    note: 'Variants matcher — the expanded state has no DOM hook; collapsed keeps var(--trigger-width). Master 260.',
  },
  'MuiDataGrid|treeDataGroupingCellToggle|base||marginRight':
    'DataGrid · treeDataGroupingCellToggle · marginRight',
  'MuiDataGrid|treeDataGroupingCellToggle|base||flexBasis': {
    label: 'DataGrid · treeDataGroupingCellToggle · flexBasis',
    note: '[Pro] tree-data toggle gutter width (master 28px).',
  },
  'MuiDateCalendar|root|base||height': {
    label: 'DateCalendar · height',
    done: ['medium'],
    note: "Raw per-preset (folds header + weekday + 6-week math at this preset's values); day-size knob edits do not reflow it — adjust to match.",
  },
  'MuiDateCalendar|root|base||maxHeight': {
    label: 'DateCalendar · maxHeight',
    done: ['medium'],
    note: 'Pinned pair with height — the PickerViewRoot base clamps maxHeight at 336, which would clip taller presets. Edit both.',
  },
  'MuiDateCalendar|root|base||width': {
    label: 'DateCalendar · width',
    done: ['medium'],
    note: "Raw per-preset (7 day columns + 40 slack at this preset's values); see height note.",
  },
  'MuiDateRangeCalendar|root|base|& .MuiDayCalendar-slideTransition|minWidth':
    'DateRangeCalendar · minWidth',
  'MuiDateRangeCalendar|root|base|& .MuiDayCalendar-slideTransition|minHeight':
    'DateRangeCalendar · minHeight',
  'MuiDateRangePickerDay|root|base||--PickerDay-size': {
    label: 'DateRangePickerDay · --PickerDay-size',
    done: ['medium'],
  },
  'MuiDayCalendar|loadingContainer|base||minHeight': {
    label: 'DayCalendar · loadingContainer · minHeight',
    note: 'Linked target of the PickerDay size knob — 6-week calc off --PickerDay-size.',
  },
  'MuiDayCalendar|slideTransition|base||minHeight': {
    label: 'DayCalendar · slideTransition · minHeight',
    note: 'Linked target of the PickerDay size knob — 6-week calc off --PickerDay-size.',
  },
  'MuiDayCalendar|slideTransition|base||minWidth': {
    label: 'DayCalendar · slideTransition · minWidth',
    note: 'Linked target of the DateCalendar width knob — follows the root width.',
  },
  'MuiDayCalendar|weekDayLabel|base||width': {
    label: 'DayCalendar · weekDayLabel · width',
    done: ['medium'],
    note: 'Member of the PickerDay size knob — day column width.',
  },
  'MuiDayCalendar|weekDayLabel|base||height': {
    label: 'DayCalendar · weekDayLabel · height',
    done: ['medium'],
  },
  'MuiDayCalendar|weekNumber|base||width': {
    label: 'DayCalendar · weekNumber · width',
    done: ['medium'],
    note: '[Pro] member of the PickerDay size knob; renders only with displayWeekNumber.',
  },
  'MuiDayCalendar|weekNumber|base||height': {
    label: 'DayCalendar · weekNumber · height',
    done: ['medium'],
    note: '[Pro] member of the PickerDay size knob; renders only with displayWeekNumber.',
  },
  'MuiDayCalendar|weekNumberLabel|base||width': {
    label: 'DayCalendar · weekNumberLabel · width',
    done: ['medium'],
    note: '[Pro] member of the PickerDay size knob; renders only with displayWeekNumber.',
  },
  'MuiDayCalendar|weekNumberLabel|base||height': {
    label: 'DayCalendar · weekNumberLabel · height',
    done: ['medium'],
    note: '[Pro] renders only with displayWeekNumber (raw trio, pairs with weekDayLabel height).',
  },
  'MuiDayCalendarSkeleton|daySkeleton|base||width': {
    label: 'DayCalendarSkeleton · daySkeleton · width',
    note: 'Linked target of the PickerDay size knob — !important beats Skeleton inline width.',
  },
  'MuiDayCalendarSkeleton|daySkeleton|base||height': {
    label: 'DayCalendarSkeleton · daySkeleton · height',
    note: 'Linked target of the PickerDay size knob — !important beats Skeleton inline height.',
  },
  'MuiDialog|paper|base||--_dialogMargin': {
    label: 'Dialog · paper margin',
    note: 'One private var: paper margin + every 100%-minus-margin viewport calc derive from it. All consumers scoped fullScreen:false (master zeroes them there); media guards stay at master boundaries (vars cannot reach @media).',
  },
  'MuiDialog|paper|fullScreen=false||margin': {
    label: 'Dialog · paper · margin',
    hidden: true,
    note: 'Derived from --_dialogMargin — the var row is the knob.',
  },
  'MuiDialog|paper|fullScreen=false,scroll=paper||maxHeight': {
    label: 'Dialog · paper · maxHeight [scroll=paper]',
    hidden: true,
    note: 'Derived from --_dialogMargin — the var row is the knob.',
  },
  'MuiDialog|paper|fn:1qbzzu||maxWidth': {
    label: 'Dialog · paper · maxWidth [no maxWidth]',
    hidden: true,
    note: 'Derived from --_dialogMargin — the var row is the knob.',
  },
  'MuiDialog|paper|fullScreen=false,maxWidth=xs,scroll=body|@media (max-width:507.95px)|maxWidth': {
    label: 'Dialog · paper · maxWidth [xs, scroll=body]',
    hidden: true,
    note: 'Derived from --_dialogMargin — the var row is the knob.',
  },
  'MuiDialog|paper|fullScreen=false,maxWidth=sm,scroll=body|@media (max-width:663.95px)|maxWidth': {
    label: 'Dialog · paper · maxWidth [sm, scroll=body]',
    hidden: true,
    note: 'Derived from --_dialogMargin — the var row is the knob.',
  },
  'MuiDialog|paper|fullScreen=false,maxWidth=md,scroll=body|@media (max-width:963.95px)|maxWidth': {
    label: 'Dialog · paper · maxWidth [md, scroll=body]',
    hidden: true,
    note: 'Derived from --_dialogMargin — the var row is the knob.',
  },
  'MuiDialog|paper|fullScreen=false,maxWidth=lg,scroll=body|@media (max-width:1263.95px)|maxWidth':
    {
      label: 'Dialog · paper · maxWidth [lg, scroll=body]',
      hidden: true,
      note: 'Derived from --_dialogMargin — the var row is the knob.',
    },
  'MuiDialog|paper|fullScreen=false,maxWidth=xl,scroll=body|@media (max-width:1599.95px)|maxWidth':
    {
      label: 'Dialog · paper · maxWidth [xl, scroll=body]',
      hidden: true,
      note: 'Derived from --_dialogMargin — the var row is the knob.',
    },
  'MuiDialog|paper|fullScreen=false,fullWidth=true||width': {
    label: 'Dialog · paper · width [fullWidth]',
    hidden: true,
    note: 'Derived from --_dialogMargin — the var row is the knob.',
  },
  'MuiDialogActions|root|base||padding': { label: 'DialogActions · padding', done: ['medium'] },
  'MuiDialogActions|root|fn:1jmonb|& > :not(style) ~ :not(style)|marginLeft': {
    label: 'DialogActions · button gap',
    note: 'Inter-button gap under !disableSpacing (master 8 — CardActions twin).',
    done: ['medium'],
  },
  'MuiDialogContent|root|dividers=false||padding': {
    label: 'DialogContent · padding [dividers=false]',
    done: ['medium'],
  },
  'MuiDialogContent|root|dividers=true||padding': 'DialogContent · padding [dividers=true]',
  'MuiDialogTitle|root|base||padding': { label: 'DialogTitle · padding', done: ['medium'] },
  'MuiDigitalClock|item|base||padding': {
    label: 'DigitalClock · item · padding',
    note: "Item = styled(MenuItem) — Material Menu emissions cascade under this. The 2px 4px item margin is frozen: the scroll positioning math subtracts the first item's 4px in JS.",
  },
  'MuiFab|root|size=small,variant=circular||width': 'Fab · width [variant=circular,size=small]',
  'MuiFab|root|size=small,variant=circular||height': 'Fab · height [variant=circular,size=small]',
  'MuiFab|root|size=medium,variant=circular||width': 'Fab · width [variant=circular,size=medium]',
  'MuiFab|root|size=medium,variant=circular||height': 'Fab · height [variant=circular,size=medium]',
  'MuiFab|root|size=large,variant=circular||width': 'Fab · width [variant=circular,size=large]',
  'MuiFab|root|size=large,variant=circular||height': 'Fab · height [variant=circular,size=large]',
  'MuiFilledInput|input|base||paddingTop': {
    label: 'FilledInput · input · paddingTop',
    hidden: true,
    note: 'Consumes --_filledInputPadTop/--_filledInputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiFilledInput|input|base||paddingBottom': {
    label: 'FilledInput · input · paddingBottom',
    hidden: true,
    note: 'Consumes --_filledInputPadTop/--_filledInputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiFilledInput|input|base||paddingInline': { label: 'FilledInput · input · inline padding' },
  'MuiFilledInput|input|hiddenLabel=true||paddingBlock': {
    label: 'FilledInput · input · paddingBlock [hiddenLabel=true]',
  },
  'MuiFilledInput|input|hiddenLabel=true,size=small||paddingBlock': {
    label: 'FilledInput · input · paddingBlock [hiddenLabel=true,size=small]',
  },
  'MuiFilledInput|input|multiline=true||paddingBlock': {
    label: 'FilledInput · input · paddingBlock [multiline=true]',
    hidden: true,
    note: 'Multiline reset to 0 — the box padding moves to the root (master convention).',
  },
  'MuiFilledInput|input|multiline=true||paddingInline':
    'FilledInput · input · paddingInline [multiline=true]',
  'MuiFilledInput|input|fn:4q8gcu||paddingLeft': 'FilledInput · input · paddingLeft [fn]',
  'MuiFilledInput|input|fn:ho424h||paddingRight': 'FilledInput · input · paddingRight [fn]',
  'MuiFilledInput|root|base|.MuiFormControl-root:has(> &)|--_filledInputPadTop': {
    label: 'FilledInput · padding top',
  },
  'MuiFilledInput|root|base|.MuiFormControl-root:has(> &)|--_filledInputPadBottom': {
    label: 'FilledInput · padding bottom',
  },
  'MuiFilledInput|root|base|.MuiInputLabel-root:has(~ &)|--_restY': {
    label: 'FilledInput · --_restY',
    hidden: true,
    note: 'Floating-label rest-Y = calc((padTop + padBottom) / 2) — follows the pad var knobs; consumed by the InputLabel transform.',
  },
  'MuiFilledInput|root|base|.MuiInputLabel-root:has(~ &)|--_shrinkY': {
    label: 'FilledInput · shrink Y',
    hidden: true,
    note: 'Filled shrink-Y — tuned literal (no clean formula from the pads); consumed by the InputLabel filled-shrink transform.',
  },
  'MuiFilledInput|root|base|.MuiInputLabel-root:has(~ &)|--_inlinePad':
    'FilledInput · --_inlinePad',
  'MuiFilledInput|root|size=small|.MuiFormControl-root:has(> &)|--_filledInputPadTop': {
    label: 'FilledInput · padding top [size=small]',
  },
  'MuiFilledInput|root|size=small|.MuiFormControl-root:has(> &)|--_filledInputPadBottom': {
    label: 'FilledInput · padding bottom [size=small]',
  },
  'MuiFilledInput|root|size=small|.MuiInputLabel-root:has(~ &)|--_restY': {
    label: 'FilledInput · --_restY [size=small]',
    hidden: true,
    note: 'Floating-label rest-Y = calc((padTop + padBottom) / 2) — follows the pad var knobs; consumed by the InputLabel transform.',
  },
  'MuiFilledInput|root|size=small|.MuiInputLabel-root:has(~ &)|--_shrinkY': {
    label: 'FilledInput · shrink Y [size=small]',
    hidden: true,
    note: 'Filled shrink-Y — tuned literal (no clean formula from the pads); consumed by the InputLabel filled-shrink transform.',
  },
  'MuiFilledInput|root|multiline=true||paddingTop': {
    label: 'FilledInput · paddingTop [multiline=true]',
    hidden: true,
    note: 'Consumes --_filledInputPadTop/--_filledInputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiFilledInput|root|multiline=true||paddingBottom': {
    label: 'FilledInput · paddingBottom [multiline=true]',
    hidden: true,
    note: 'Consumes --_filledInputPadTop/--_filledInputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiFilledInput|root|multiline=true||paddingInline':
    'FilledInput · paddingInline [multiline=true]',
  'MuiFilledInput|root|multiline=true,size=small||paddingTop': {
    label: 'FilledInput · paddingTop [multiline=true,size=small]',
    hidden: true,
    note: 'Consumes --_filledInputPadTop/--_filledInputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiFilledInput|root|multiline=true,size=small||paddingBottom': {
    label: 'FilledInput · paddingBottom [multiline=true,size=small]',
    hidden: true,
    note: 'Consumes --_filledInputPadTop/--_filledInputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiFilledInput|root|hiddenLabel=true,multiline=true||paddingTop': {
    label: 'FilledInput · paddingTop [multiline=true,hiddenLabel=true]',
    hidden: true,
    note: 'hiddenLabel multiline re-states master literals — no label to sync, kept out of the var plumbing.',
  },
  'MuiFilledInput|root|hiddenLabel=true,multiline=true||paddingBottom': {
    label: 'FilledInput · paddingBottom [multiline=true,hiddenLabel=true]',
    hidden: true,
    note: 'hiddenLabel multiline re-states master literals — no label to sync, kept out of the var plumbing.',
  },
  'MuiFilledInput|root|hiddenLabel=true,multiline=true,size=small||paddingTop': {
    label: 'FilledInput · paddingTop [multiline=true,hiddenLabel=true,size=small]',
    hidden: true,
    note: 'hiddenLabel multiline re-states master literals — no label to sync, kept out of the var plumbing.',
  },
  'MuiFilledInput|root|hiddenLabel=true,multiline=true,size=small||paddingBottom': {
    label: 'FilledInput · paddingBottom [multiline=true,hiddenLabel=true,size=small]',
    hidden: true,
    note: 'hiddenLabel multiline re-states master literals — no label to sync, kept out of the var plumbing.',
  },
  'MuiFilledInput|root|fn:4q8gcu||paddingLeft': 'FilledInput · paddingLeft [fn]',
  'MuiFilledInput|root|fn:ho424h||--_trailingPad': 'FilledInput · --_trailingPad [fn]',
  'MuiFormHelperText|root|base||marginTop': {
    label: 'FormHelperText · marginTop',
    done: ['medium'],
  },
  'MuiFormHelperText|root|contained=true||marginInline': {
    label: 'FormHelperText · marginInline [contained=true]',
    done: ['medium'],
  },
  'MuiFormLabel|root|base||lineHeight': {
    label: 'FormLabel · lineHeight',
    hidden: true,
    note: 'Rides theme.typography.body1.lineHeight — label metrics match input metrics (no ±0.5px restY fudge).',
  },
  'MuiIconButton|root|size=small||padding': 'IconButton · padding [size=small]',
  'MuiIconButton|root|size=medium||padding': {
    label: 'IconButton · padding [size=medium]',
    done: ['medium'],
  },
  'MuiIconButton|root|size=large||padding': 'IconButton · padding [size=large]',
  'MuiIconButton|root|edge=start||marginLeft': {
    label: 'IconButton · marginLeft [edge=start]',
    done: ['medium'],
  },
  'MuiIconButton|root|edge=end||marginRight': {
    label: 'IconButton · marginRight [edge=end]',
    done: ['medium'],
  },
  'MuiIconButton|root|size=medium||minWidth': {
    label: 'IconButton · minWidth [size=medium]',
    done: ['medium'],
  },
  'MuiIconButton|root|size=medium||minHeight': {
    label: 'IconButton · minHeight [size=medium]',
    done: ['medium'],
  },
  'MuiIconButton|root|size=medium||fontSize': {
    label: 'IconButton · fontSize [size=medium]',
    done: ['medium'],
  },
  'MuiInput|input|base||paddingTop': {
    label: 'Input · input · paddingTop',
    hidden: true,
    note: 'Consumes --_inputPadTop/--_inputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiInput|input|base||paddingBottom': {
    label: 'Input · input · paddingBottom',
    hidden: true,
    note: 'Consumes --_inputPadTop/--_inputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiInput|input|size=small||paddingTop': {
    label: 'Input · input · paddingTop [size=small]',
    hidden: true,
    note: 'Consumes --_inputPadTop/--_inputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiInput|input|size=small||paddingBottom': {
    label: 'Input · input · paddingBottom [size=small]',
    hidden: true,
    note: 'Consumes --_inputPadTop/--_inputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiInput|input|multiline=true||paddingBlock': {
    label: 'Input · input · paddingBlock [multiline=true]',
    hidden: true,
    note: 'Multiline reset to 0 — the box padding moves to the root (master convention).',
  },
  'MuiInput|root|base|.MuiFormControl-root:has(> &)|--_inputPadTop': {
    label: 'Input · padding top',
  },
  'MuiInput|root|base|.MuiFormControl-root:has(> &)|--_inputPadBottom': {
    label: 'Input · padding bottom',
  },
  'MuiInput|root|base|.MuiFormControl-root:has(> &)|--_inputMarginTop': {
    label: 'Input · margin top',
  },
  'MuiInput|root|base|.MuiInputLabel-root:has(~ &)|--_restY': {
    label: 'Input · --_restY',
    hidden: true,
    note: 'Floating-label rest-Y = calc(--_inputMarginTop + (padTop + padBottom) / 2) — follows the writer var knobs; consumed by the InputLabel transform.',
  },
  'MuiInput|root|base|label + &, .MuiInputLabel-root + &|marginTop': {
    label: 'Input · marginTop',
    hidden: true,
    note: 'Consumes --_inputMarginTop (label clearance) — the FormControl writer var row is the knob.',
  },
  'MuiInput|root|size=small|.MuiFormControl-root:has(> &)|--_inputPadTop': {
    label: 'Input · padding top [size=small]',
  },
  'MuiInput|root|size=small|.MuiFormControl-root:has(> &)|--_inputPadBottom': {
    label: 'Input · padding bottom [size=small]',
  },
  'MuiInput|root|size=small|.MuiInputLabel-root:has(~ &)|--_restY': {
    label: 'Input · --_restY [size=small]',
    hidden: true,
    note: 'Floating-label rest-Y = calc(--_inputMarginTop + (padTop + padBottom) / 2) — follows the writer var knobs; consumed by the InputLabel transform.',
  },
  'MuiInput|root|multiline=true||paddingTop': {
    label: 'Input · paddingTop [multiline=true]',
    hidden: true,
    note: 'Consumes --_inputPadTop/--_inputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiInput|root|multiline=true||paddingBottom': {
    label: 'Input · paddingBottom [multiline=true]',
    hidden: true,
    note: 'Consumes --_inputPadTop/--_inputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiInput|root|multiline=true,size=small||paddingTop': {
    label: 'Input · paddingTop [multiline=true,size=small]',
    hidden: true,
    note: 'Consumes --_inputPadTop/--_inputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiInput|root|multiline=true,size=small||paddingBottom': {
    label: 'Input · paddingBottom [multiline=true,size=small]',
    hidden: true,
    note: 'Consumes --_inputPadTop/--_inputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiInputAdornment|root|position=start||marginRight': {
    label: 'InputAdornment · marginRight [position=start]',
    done: ['medium'],
  },
  'MuiInputAdornment|root|position=end||marginLeft': {
    label: 'InputAdornment · marginLeft [position=end]',
    done: ['medium'],
  },
  'MuiInputAdornment|root|position=start,size=small||marginRight': {
    label: 'InputAdornment · marginRight [position=start,size=small]',
  },
  'MuiInputAdornment|root|position=end,size=small||marginLeft': {
    label: 'InputAdornment · marginLeft [position=end,size=small]',
  },
  'MuiInputAdornment|root|variant=filled|&.MuiInputAdornment-positionStart&:not(.MuiInputAdornment-hiddenLabel)|marginTop':
    {
      label: 'InputAdornment · marginTop [variant=filled]',
      hidden: true,
      note: 'Adornment top offset = calc(padTop - padBottom) — follows the FilledInput pad var knobs.',
    },
  'MuiInputBase|input|base||height': {
    label: 'InputBase · input · height',
    hidden: true,
    note: 'Normalization (master 1.4375em) — row height derives from line-height + padding.',
  },
  'MuiInputBase|input|base||paddingBlock': {
    label: 'InputBase · input · paddingBlock',
    hidden: true,
    note: 'Cascade base for the standard variant — the per-variant pad var knobs (Input/OutlinedInput/FilledInput) own the value.',
  },
  'MuiInputBase|input|size=small||paddingTop': {
    label: 'InputBase · input · paddingTop [size=small]',
    hidden: true,
    note: 'Cascade base for the standard variant — the per-variant pad var knobs (Input/OutlinedInput/FilledInput) own the value.',
  },
  'MuiInputBase|input|multiline=true||paddingBlock': {
    label: 'InputBase · input · paddingBlock [multiline=true]',
    hidden: true,
    note: 'Multiline reset to 0 — the box padding moves to the root (master convention).',
  },
  'MuiInputBase|root|base||lineHeight': {
    label: 'InputBase · lineHeight',
    hidden: true,
    note: 'Rides theme.typography.body1.lineHeight — edit via the Typography tab.',
  },
  'MuiInputLabel|root|fn:1u4zrm||transform': {
    label: 'InputLabel · transform [fn]',
    hidden: true,
    note: 'Floating-Y transform re-emitted off the preset-closed --_restY/--_shrinkY vars — driven by the input padding knobs, not independently tunable.',
  },
  'MuiInputLabel|root|shrink=true||transform': {
    label: 'InputLabel · transform [shrink=true]',
    hidden: true,
    note: 'Floating-Y transform re-emitted off the preset-closed --_restY/--_shrinkY vars — driven by the input padding knobs, not independently tunable.',
  },
  'MuiInputLabel|root|variant=filled||transform': {
    label: 'InputLabel · transform [variant=filled]',
    hidden: true,
    note: 'Floating-Y transform re-emitted off the preset-closed --_restY/--_shrinkY vars — driven by the input padding knobs, not independently tunable.',
  },
  'MuiInputLabel|root|shrink=true,variant=filled||transform': {
    label: 'InputLabel · transform [variant=filled,shrink=true]',
    hidden: true,
    note: 'Floating-Y transform re-emitted off the preset-closed --_restY/--_shrinkY vars — driven by the input padding knobs, not independently tunable.',
  },
  'MuiInputLabel|root|variant=outlined||transform': {
    label: 'InputLabel · transform [variant=outlined]',
    hidden: true,
    note: 'Floating-Y transform re-emitted off the preset-closed --_restY/--_shrinkY vars — driven by the input padding knobs, not independently tunable.',
  },
  'MuiInputLabel|root|shrink=true,variant=outlined||transform': {
    label: 'InputLabel · transform [variant=outlined,shrink=true]',
    hidden: true,
    note: 'Floating-Y transform re-emitted off the preset-closed --_restY/--_shrinkY vars — driven by the input padding knobs, not independently tunable.',
  },
  'MuiLinearProgress|root|base||height': 'LinearProgress · height',
  'MuiList|root|disablePadding=false||paddingBlock': {
    label: 'List block padding',
    done: ['medium'],
  },
  'MuiListItem|root|dense=false||paddingBlock': {
    label: 'ListItem · paddingBlock [dense=false]',
    done: ['medium'],
  },
  'MuiListItem|root|dense=true||paddingBlock': 'ListItem · paddingBlock [dense=true]',
  'MuiListItem|root|dense=false,disableGutters=false||paddingInline': {
    label: 'ListItem · paddingInline [dense=false]',
    done: ['medium'],
  },
  'MuiListItem|root|dense=true,disableGutters=false||paddingInline':
    'ListItem · paddingInline [dense=true]',
  'MuiListItem|root|dense=false||minHeight': {
    label: 'ListItem · minHeight [dense=false]',
    done: ['medium'],
  },
  'MuiListItemAvatar|root|base||minWidth': { label: 'ListItemAvatar · minWidth', done: ['medium'] },
  'MuiListItemButton|root|dense=false||minHeight': {
    label: 'ListItemButton · minHeight [dense=false]',
    done: ['medium'],
  },
  'MuiListItemButton|root|dense=false||paddingBlock': {
    label: 'ListItemButton · paddingBlock [dense=false]',
    done: ['medium'],
  },
  'MuiListItemButton|root|dense=true||minHeight': 'ListItemButton · minHeight [dense=true]',
  'MuiListItemButton|root|dense=true||paddingBlock': 'ListItemButton · paddingBlock [dense=true]',
  'MuiListItemButton|root|dense=false,disableGutters=false||paddingInline': {
    label: 'ListItemButton · paddingInline [dense=false]',
    done: ['medium'],
  },
  'MuiListItemButton|root|dense=true,disableGutters=false||paddingInline':
    'ListItemButton · paddingInline [dense=true]',
  'MuiListItemIcon|root|base||minWidth': {
    label: 'ListItemIcon · minWidth',
    done: ['medium'],
    hiddenIn: ['Menu'],
    note: "Menu owns the icon column via MenuItem's nested seam — this standalone knob is the List family surface.",
  },
  'MuiMenuItem|root|base|& .MuiListItemIcon-root|minWidth': {
    label: 'MenuItem · icon min width',
    done: ['medium'],
  },
  'MuiMenuItem|root|dense=false||minHeight': { label: 'min height', done: ['medium'] },
  'MuiMenuItem|root|dense=false||paddingBlock': { label: 'block padding', done: ['medium'] },
  'MuiMenuItem|root|dense=false|@media (min-width:600px)|minHeight':
    'MenuItem · minHeight [dense=false]',
  'MuiMenuItem|root|dense=true||minHeight': { label: 'min height [dense]', done: ['medium'] },
  'MuiMenuItem|root|dense=true||paddingBlock': 'block padding [dense]',
  'MuiMenuItem|root|dense=false,disableGutters=false||paddingInline':
    'inline padding [disableGutters]',
  'MuiMenuItem|root|dense=true,disableGutters=false||paddingInline':
    'inline padding [dense][disableGutters]',
  'MuiMonthCalendar|root|base||rowGap': { label: 'MonthCalendar · rowGap', done: ['medium'] },
  'MuiMonthCalendar|root|base||width': 'MonthCalendar · width',
  'MuiMultiSectionDigitalClockSection|item|base||padding': {
    label: 'MultiSectionDigitalClockSection · item · padding',
    note: 'Item = styled(MenuItem); margin frozen (same JS scroll math as DigitalClock).',
  },
  'MuiMultiSectionDigitalClockSection|item|base||width':
    'MultiSectionDigitalClockSection · item · width',
  'MuiMultiSectionDigitalClockSection|root|base||width': 'MultiSectionDigitalClockSection · width',
  'MuiOutlinedInput|input|base||paddingBlock': {
    label: 'OutlinedInput · input · paddingBlock',
    hidden: true,
    note: 'Consumes --_outlinedInputPadBlock — the FormControl writer var row is the knob.',
  },
  'MuiOutlinedInput|input|base||paddingInline': {
    label: 'OutlinedInput · input · inline padding',
    done: ['medium'],
  },
  'MuiOutlinedInput|input|size=small||paddingBlock': {
    label: 'OutlinedInput · input · paddingBlock [size=small]',
    hidden: true,
    note: 'Consumes --_outlinedInputPadBlock — the FormControl writer var row is the knob.',
  },
  'MuiOutlinedInput|input|multiline=true||paddingBlock': {
    label: 'OutlinedInput · input · paddingBlock [multiline=true]',
    hidden: true,
    note: 'Multiline reset to 0 — the box padding moves to the root (master convention).',
  },
  'MuiOutlinedInput|input|multiline=true||paddingInline':
    'OutlinedInput · input · paddingInline [multiline=true]',
  'MuiOutlinedInput|input|fn:4q8gcu||paddingLeft': 'OutlinedInput · input · paddingLeft [fn]',
  'MuiOutlinedInput|input|fn:ho424h||paddingRight': 'OutlinedInput · input · paddingRight [fn]',
  'MuiOutlinedInput|root|base|.MuiFormControl-root:has(> &)|--_outlinedInputPadBlock': {
    label: 'OutlinedInput · padding block',
    done: ['medium'],
  },
  'MuiOutlinedInput|root|base|.MuiInputLabel-root:has(~ &)|--_restY': {
    label: 'OutlinedInput · --_restY',
    hidden: true,
    note: 'Floating-label rest-Y = calc(--_outlinedInputPadBlock - 0.5px) — follows the pad var knob; consumed by the InputLabel transform.',
  },
  'MuiOutlinedInput|root|base|.MuiInputLabel-root:has(~ &)|--_inlinePad':
    'OutlinedInput · --_inlinePad',
  'MuiOutlinedInput|root|size=small|.MuiFormControl-root:has(> &)|--_outlinedInputPadBlock': {
    label: 'OutlinedInput · padding block [size=small]',
  },
  'MuiOutlinedInput|root|multiline=true||paddingBlock': {
    label: 'OutlinedInput · paddingBlock [multiline=true]',
    hidden: true,
    note: 'Multiline box padding on the root — consumes --_outlinedInputPadBlock; the FormControl writer var row is the knob.',
  },
  'MuiOutlinedInput|root|multiline=true||paddingInline':
    'OutlinedInput · paddingInline [multiline=true]',
  'MuiOutlinedInput|root|multiline=true,size=small||paddingBlock': {
    label: 'OutlinedInput · paddingBlock [multiline=true,size=small]',
    hidden: true,
    note: 'Multiline box padding on the root — consumes --_outlinedInputPadBlock; the FormControl writer var row is the knob.',
  },
  'MuiOutlinedInput|root|fn:4q8gcu||paddingLeft': 'OutlinedInput · paddingLeft [fn]',
  'MuiOutlinedInput|root|fn:ho424h||--_trailingPad': 'OutlinedInput · --_trailingPad [fn]',
  'MuiPaginationItem|root|size=small||minWidth': 'PaginationItem · minWidth [size=small]',
  'MuiPaginationItem|root|size=small||paddingInline': {
    label: 'PaginationItem · paddingInline [size=small]',
    note: 'Small inter-item margin stays master 1px (sub-step, frozen).',
  },
  'MuiPaginationItem|root|size=medium||minWidth': 'PaginationItem · minWidth [size=medium]',
  'MuiPaginationItem|root|size=medium||paddingInline':
    'PaginationItem · paddingInline [size=medium]',
  'MuiPaginationItem|root|size=medium||marginInline': 'PaginationItem · marginInline [size=medium]',
  'MuiPaginationItem|root|size=large||minWidth': 'PaginationItem · minWidth [size=large]',
  'MuiPaginationItem|root|size=large||paddingInline': 'PaginationItem · paddingInline [size=large]',
  'MuiPaginationItem|root|size=large||marginInline': 'PaginationItem · marginInline [size=large]',
  'MuiPaginationItem|root|fn:1nddmo||--_height': {
    label: 'PaginationItem · height [size=small] (px)',
    note: 'One private var: item height + pill radius (height/2) derive from it; ellipsis keeps auto height.',
  },
  'MuiPaginationItem|root|fn:1nddmo||height': {
    label: 'PaginationItem · height [fn small]',
    hidden: true,
    note: 'Derived from --_height — the var row is the knob.',
  },
  'MuiPaginationItem|root|fn:1nddmo||borderRadius': {
    label: 'PaginationItem · borderRadius [fn small]',
    hidden: true,
    note: 'Derived from --_height (height/2) — the var row is the knob.',
  },
  'MuiPaginationItem|root|fn:1dnyyw||--_height': {
    label: 'PaginationItem · height [size=medium] (px)',
    note: 'One private var: item height + pill radius (height/2) derive from it; ellipsis keeps auto height.',
  },
  'MuiPaginationItem|root|fn:1dnyyw||height': {
    label: 'PaginationItem · height [fn medium]',
    hidden: true,
    note: 'Derived from --_height — the var row is the knob.',
  },
  'MuiPaginationItem|root|fn:1dnyyw||borderRadius': {
    label: 'PaginationItem · borderRadius [fn medium]',
    hidden: true,
    note: 'Derived from --_height (height/2) — the var row is the knob.',
  },
  'MuiPaginationItem|root|fn:1tf0li||--_height': {
    label: 'PaginationItem · height [size=large] (px)',
    note: 'One private var: item height + pill radius (height/2) derive from it; ellipsis keeps auto height.',
  },
  'MuiPaginationItem|root|fn:1tf0li||height': {
    label: 'PaginationItem · height [fn large]',
    hidden: true,
    note: 'Derived from --_height — the var row is the knob.',
  },
  'MuiPaginationItem|root|fn:1tf0li||borderRadius': {
    label: 'PaginationItem · borderRadius [fn large]',
    hidden: true,
    note: 'Derived from --_height (height/2) — the var row is the knob.',
  },
  'MuiPickerDay|root|base||--PickerDay-size': {
    label: 'PickerDay · --PickerDay-size',
    done: ['medium'],
    note: 'Key member of the PickerDay size knob — overrides upstream --PickerDay-size; drives the skeleton + 6-week heights via linked writes.',
  },
  'MuiPickersCalendarHeader|label|base||marginRight': 'PickersCalendarHeader · label · marginRight',
  'MuiPickersCalendarHeader|root|base||marginTop': {
    label: 'PickersCalendarHeader · marginTop',
    done: ['medium'],
  },
  'MuiPickersCalendarHeader|root|base||marginBottom': {
    label: 'PickersCalendarHeader · marginBottom',
    done: ['medium'],
  },
  'MuiPickersCalendarHeader|root|base||paddingLeft': {
    label: 'PickersCalendarHeader · paddingLeft',
    done: ['medium'],
  },
  'MuiPickersCalendarHeader|root|base||paddingRight': {
    label: 'PickersCalendarHeader · paddingRight',
    done: ['medium'],
  },
  'MuiPickersCalendarHeader|root|base||minHeight': {
    label: 'PickersCalendarHeader · minHeight',
    done: ['medium'],
    note: 'Pinned pair with maxHeight (upstream pins both against a Safari jump) — edit both.',
  },
  'MuiPickersCalendarHeader|root|base||maxHeight': {
    label: 'PickersCalendarHeader · maxHeight',
    done: ['medium'],
    note: 'Pinned pair with minHeight — edit both.',
  },
  'MuiPickersFilledInput|root|base|.MuiFormControl-root:has(> &)|--_filledInputPadTop': {
    label: 'PickersFilledInput · padding top',
    done: ['medium'],
  },
  'MuiPickersFilledInput|root|base|.MuiFormControl-root:has(> &)|--_filledInputPadBottom': {
    label: 'PickersFilledInput · padding bottom',
    done: ['medium'],
  },
  'MuiPickersFilledInput|root|base|.MuiInputLabel-root:has(~ &)|--_restY': {
    label: 'PickersFilledInput · --_restY',
    hidden: true,
    note: 'Floating-label rest-Y = (padTop + padBottom) / 2 — follows the pad knobs; consumed by the InputLabel transform.',
  },
  'MuiPickersFilledInput|root|base|.MuiInputLabel-root:has(~ &)|--_shrinkY': {
    label: 'PickersFilledInput · --_shrinkY',
    hidden: true,
    note: 'Floating-label shrink-Y (tuned raw px) — consumed by the InputLabel transform.',
  },
  'MuiPickersFilledInput|root|base|.MuiInputLabel-root:has(~ &)|--_inlinePad':
    'PickersFilledInput · --_inlinePad',
  'MuiPickersFilledInput|root|inputSize=small|.MuiFormControl-root:has(> &)|--_filledInputPadTop': {
    label: 'PickersFilledInput · padding top [inputSize=small]',
    done: ['medium'],
  },
  'MuiPickersFilledInput|root|inputSize=small|.MuiFormControl-root:has(> &)|--_filledInputPadBottom':
    { label: 'PickersFilledInput · padding bottom [inputSize=small]', done: ['medium'] },
  'MuiPickersFilledInput|root|inputSize=small|.MuiInputLabel-root:has(~ &)|--_restY': {
    label: 'PickersFilledInput · --_restY [inputSize=small]',
    hidden: true,
    note: 'Follows the [small] pad knobs; consumed by the InputLabel transform.',
  },
  'MuiPickersFilledInput|root|inputSize=small|.MuiInputLabel-root:has(~ &)|--_shrinkY': {
    label: 'PickersFilledInput · --_shrinkY [inputSize=small]',
    hidden: true,
    note: 'Floating-label shrink-Y [small] (tuned raw px).',
  },
  'MuiPickersFilledInput|sectionsContainer|base||paddingTop': {
    label: 'PickersFilledInput · sectionsContainer · paddingTop',
    hidden: true,
    note: 'Consumes --_filledInputPadTop — the padding-top knob is the writer var.',
  },
  'MuiPickersFilledInput|sectionsContainer|base||paddingBottom': {
    label: 'PickersFilledInput · sectionsContainer · paddingBottom',
    hidden: true,
    note: 'Consumes --_filledInputPadBottom — the padding-bottom knob is the writer var.',
  },
  'MuiPickersFilledInput|sectionsContainer|base||paddingInline': {
    label: 'PickersFilledInput · inline padding',
    done: ['medium'],
  },
  'MuiPickersFilledInput|sectionsContainer|hiddenLabel=true||paddingBlock': {
    label: 'PickersFilledInput · sectionsContainer · paddingBlock [hiddenLabel]',
    done: ['medium'],
  },
  'MuiPickersFilledInput|sectionsContainer|hiddenLabel=true,inputSize=small||paddingBlock': {
    label: 'PickersFilledInput · sectionsContainer · paddingBlock [hiddenLabel, small]',
    done: ['medium'],
  },
  'MuiPickersInputBase|content|base||lineHeight': {
    label: 'PickersInputBase · content · lineHeight',
    hidden: true,
    note: 'Rides theme.typography.body1.lineHeight (was 1.4375em) — edit via the Typography tab.',
  },
  'MuiPickersInputBase|section|base||lineHeight': {
    label: 'PickersInputBase · section · lineHeight',
    hidden: true,
    note: 'Rides theme.typography.body1.lineHeight (was 1.4375em) — edit via the Typography tab.',
  },
  'MuiPickersInputBase|sectionsContainer|base||lineHeight': {
    label: 'PickersInputBase · sectionsContainer · lineHeight',
    hidden: true,
    note: 'Rides theme.typography.body1.lineHeight (was 1.4375em) — edit via the Typography tab.',
  },
  'MuiPickersOutlinedInput|root|base||paddingInline': {
    label: 'PickersOutlinedInput · inline padding',
    done: ['medium'],
  },
  'MuiPickersOutlinedInput|root|base|.MuiFormControl-root:has(> &)|--_outlinedInputPadBlock': {
    label: 'PickersOutlinedInput · padding block',
    done: ['medium'],
  },
  'MuiPickersOutlinedInput|root|base|.MuiInputLabel-root:has(~ &)|--_restY': {
    label: 'PickersOutlinedInput · --_restY',
    hidden: true,
    note: 'Floating-label rest-Y = --_outlinedInputPadBlock — follows the pad-block knob; consumed by the InputLabel transform.',
  },
  'MuiPickersOutlinedInput|root|base|.MuiInputLabel-root:has(~ &)|--_inlinePad':
    'PickersOutlinedInput · --_inlinePad',
  'MuiPickersOutlinedInput|root|inputSize=small|.MuiFormControl-root:has(> &)|--_outlinedInputPadBlock':
    { label: 'PickersOutlinedInput · padding block [inputSize=small]', done: ['medium'] },
  'MuiPickersOutlinedInput|sectionsContainer|base||paddingBlock': {
    label: 'PickersOutlinedInput · sectionsContainer · paddingBlock',
    hidden: true,
    note: 'Consumes --_outlinedInputPadBlock — the padding-block knob (FormControl writer var) is the control.',
  },
  'MuiPickersOutlinedInput|sectionsContainer|base||paddingInline': {
    label: 'PickersOutlinedInput · sectionsContainer · paddingInline',
    hidden: true,
    note: 'Inline pad lives on the root; 0 re-assert here (matches master).',
  },
  'MuiPickersOutlinedInput|sectionsContainer|inputSize=small||paddingBlock': {
    label: 'PickersOutlinedInput · sectionsContainer · paddingBlock [inputSize=small]',
    hidden: true,
    note: 'Consumes --_outlinedInputPadBlock — the padding-block [small] knob is the writer var.',
  },
  'MuiPickersToolbar|root|pickerOrientation=portrait||padding': {
    label: 'PickersToolbar · padding (portrait)',
    note: 'Portrait-scoped — landscape keeps its own master padding (16).',
  },
  'MuiRadio|root|size=medium||padding': {
    label: 'Radio · padding [size=medium]',
    done: ['medium'],
  },
  'MuiRadio|root|size=medium|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft': {
    label: 'Radio · marginLeft [size=medium]',
    hidden: true,
    note: 'Sibling-label margin = calc(-2px - padding), re-emitted by the padding knob (selectionControlPadding).',
  },
  'MuiRadio|root|size=medium|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight': {
    label: 'Radio · marginRight [size=medium]',
    hidden: true,
    note: 'Sibling-label margin = calc(-2px - padding), re-emitted by the padding knob (selectionControlPadding).',
  },
  'MuiRadio|root|size=small||padding': 'Radio · padding [size=small]',
  'MuiRadio|root|size=small|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft': {
    label: 'Radio · marginLeft [size=small]',
    hidden: true,
    note: 'Sibling-label margin = calc(-2px - padding), re-emitted by the padding knob (selectionControlPadding).',
  },
  'MuiRadio|root|size=small|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight': {
    label: 'Radio · marginRight [size=small]',
    hidden: true,
    note: 'Sibling-label margin = calc(-2px - padding), re-emitted by the padding knob (selectionControlPadding).',
  },
  'MuiRadio|root|edge=start||marginLeft': {
    label: 'Radio · marginLeft [edge=start]',
    done: ['medium'],
  },
  'MuiRadio|root|edge=end||marginRight': {
    label: 'Radio · marginRight [edge=end]',
    done: ['medium'],
  },
  'MuiRichTreeView|defaultProps|base||itemChildrenIndentation': {
    label: 'RichTreeView · itemChildrenIndentation (defaultProps)',
    done: ['medium'],
    note: 'The indentation var is INLINE STYLE on the tree root — styleOverrides cannot reach it; the defaultProp is the lever. A string passes verbatim, so var(--mui-density-md) keeps step semantics (type a key like md, or raw px).',
  },
  'MuiSelect|select|base||minHeight': {
    label: 'Select · select · minHeight',
    hidden: true,
    note: 'Preset-driven sizing, not independently tunable via sidebar.',
  },
  'MuiSelect|select|base|.MuiInputBase-root:has(> &)|--_caret': {
    label: 'Select · select · --_caret',
    done: ['medium'],
  },
  'MuiSelect|select|base|.MuiInputBase-root:has(> & ~ .MuiInputAdornment-root)|--_endAdornment': {
    label: 'Select · select · --_endAdornment',
    done: ['medium'],
  },
  'MuiSimpleTreeView|defaultProps|base||itemChildrenIndentation': {
    label: 'SimpleTreeView · itemChildrenIndentation (defaultProps)',
    done: ['medium'],
    note: 'Same lever as RichTreeView — inline-style var, defaultProp only.',
  },
  'MuiSlider|root|orientation=horizontal||height': {
    label: 'Slider · height [orientation=horizontal]',
    done: ['medium'],
  },
  'MuiSlider|root|orientation=horizontal||paddingBlock': {
    label: 'Slider · paddingBlock [orientation=horizontal]',
    done: ['medium'],
  },
  'MuiSlider|root|orientation=horizontal|@media (pointer: coarse)|paddingBlock': {
    label: 'Slider · paddingBlock [horizontal, coarse pointer]',
    hidden: true,
    note: 'Frozen 20px re-assert of the 42px coarse-pointer touch floor — never densified.',
  },
  'MuiSlider|root|orientation=horizontal,size=small||height': {
    label: 'Slider · height [orientation=horizontal,size=small]',
    done: ['medium'],
  },
  'MuiSlider|root|orientation=vertical||width': {
    label: 'Slider · width [orientation=vertical]',
    done: ['medium'],
  },
  'MuiSlider|root|orientation=vertical||paddingInline': {
    label: 'Slider · paddingInline [orientation=vertical]',
    done: ['medium'],
  },
  'MuiSlider|root|orientation=vertical|@media (pointer: coarse)|paddingInline': {
    label: 'Slider · paddingInline [vertical, coarse pointer]',
    hidden: true,
    note: 'Frozen 20px re-assert of the 42px coarse-pointer touch floor — never densified.',
  },
  'MuiSlider|root|orientation=vertical,size=small||width': {
    label: 'Slider · width [orientation=vertical,size=small]',
    done: ['medium'],
  },
  'MuiSlider|thumb|base||width': { label: 'Slider · thumb · width', done: ['medium'] },
  'MuiSlider|thumb|base||height': { label: 'Slider · thumb · height', done: ['medium'] },
  'MuiSlider|thumb|size=small||width': 'Slider · thumb · width [size=small]',
  'MuiSlider|thumb|size=small||height': 'Slider · thumb · height [size=small]',
  'MuiSlider|valueLabel|base||padding': 'Slider · valueLabel · padding',
  'MuiSlider|valueLabel|size=small||padding': 'Slider · valueLabel · padding [size=small]',
  'MuiSnackbarContent|action|base||paddingLeft': 'SnackbarContent · action · paddingLeft',
  'MuiSnackbarContent|message|base||paddingBlock': 'SnackbarContent · message · paddingBlock',
  'MuiSnackbarContent|root|base||padding': 'SnackbarContent · padding',
  'MuiStep|root|alternativeLabel=false,hasConnector=false,orientation=horizontal||paddingLeft': {
    label: 'Step · paddingLeft [first, horizontal]',
    done: ['medium'],
  },
  'MuiStep|root|alternativeLabel=false,last=true,orientation=horizontal||paddingRight': {
    label: 'Step · paddingRight [last, horizontal]',
    done: ['medium'],
  },
  'MuiStepConnector|root|alternativeLabel=true,orientation=horizontal||top': {
    label: 'StepConnector · top [horizontal alt]',
    done: ['medium'],
  },
  'MuiStepConnector|root|alternativeLabel=false,orientation=vertical||marginLeft': {
    label: 'StepConnector · marginLeft [vertical]',
    done: ['medium'],
  },
  'MuiStepConnector|root|alternativeLabel=true,orientation=vertical||marginRight': {
    label: 'StepConnector · marginRight [vertical alt]',
    done: ['medium'],
  },
  'MuiStepContent|root|alternativeLabel=false||marginLeft': {
    label: 'StepContent · marginLeft [vertical]',
    done: ['medium'],
  },
  'MuiStepContent|root|alternativeLabel=false||paddingLeft': {
    label: 'StepContent · paddingLeft [vertical]',
    done: ['medium'],
  },
  'MuiStepContent|root|alternativeLabel=true||marginRight': {
    label: 'StepContent · marginRight [vertical alt]',
    done: ['medium'],
  },
  'MuiStepContent|root|alternativeLabel=true||paddingRight': {
    label: 'StepContent · paddingRight [vertical alt]',
    done: ['medium'],
  },
  'MuiStepIcon|root|base||fontSize': { label: 'StepIcon · size', done: ['medium'] },
  'MuiStepIcon|text|base||fontSize': { label: 'StepIcon · text · fontSize', done: ['medium'] },
  'MuiStepLabel|iconContainer|base||padding': {
    label: 'StepLabel · iconContainer · padding',
    done: ['medium'],
  },
  'MuiStepLabel|iconContainer|base||justifyContent': {
    label: 'StepLabel · iconContainer · justifyContent',
    hidden: true,
    note: 'Centers the icon horizontally in the touch box — rides the node touch target knob, not a length.',
  },
  'MuiStepLabel|iconContainer|base||minWidth': {
    label: 'StepLabel · iconContainer · minWidth',
    done: ['medium'],
  },
  'MuiStepLabel|iconContainer|base||minHeight': {
    label: 'StepLabel · iconContainer · minHeight',
    done: ['medium'],
  },
  'MuiStepLabel|iconContainer|base||alignItems': {
    label: 'StepLabel · iconContainer · alignItems',
    hidden: true,
    note: 'Centers the icon in the touch box — rides the node touch target knob, not a length.',
  },
  'MuiStepLabel|label|alternativeLabel=true,orientation=horizontal|&.MuiStepLabel-alternativeLabel|marginTop':
    { label: 'StepLabel · label · marginTop [horizontal alternativeLabel]', done: ['medium'] },
  'MuiStepLabel|root|orientation=vertical||paddingBlock': {
    label: 'StepLabel · paddingBlock [vertical]',
    done: ['medium'],
  },
  'MuiSvgIcon|root|fontSize=small||fontSize': {
    label: 'Svg icon · size [small]',
    done: ['medium'],
  },
  'MuiSvgIcon|root|fontSize=medium||fontSize': 'Svg icon · size [medium]',
  'MuiSvgIcon|root|fontSize=large||fontSize': 'Svg icon · size [large]',
  'MuiSwitch|root|base||width': {
    label: 'Switch · width',
    hidden: true,
    note: 'Geometry derives from the five per-size Switch vars — the var rows are the knobs.',
  },
  'MuiSwitch|root|base||height': {
    label: 'Switch · height',
    hidden: true,
    note: 'Geometry derives from the five per-size Switch vars — the var rows are the knobs.',
  },
  'MuiSwitch|root|base||padding': {
    label: 'Switch · padding',
    hidden: true,
    note: 'Geometry derives from the five per-size Switch vars — the var rows are the knobs.',
  },
  'MuiSwitch|root|size=medium||--_width': 'Switch · width [size=medium]',
  'MuiSwitch|root|size=medium||--_height': 'Switch · height [size=medium]',
  'MuiSwitch|root|size=medium||--_thumbSize': 'Switch · thumb size [size=medium]',
  'MuiSwitch|root|size=medium||--_touchSize': 'Switch · touch size [size=medium]',
  'MuiSwitch|root|size=medium||--_pad': 'Switch · gutter [size=medium]',
  'MuiSwitch|root|size=medium|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft':
    'Switch · marginLeft [size=medium]',
  'MuiSwitch|root|size=medium|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight':
    'Switch · marginRight [size=medium]',
  'MuiSwitch|root|size=small||--_width': 'Switch · width [size=small]',
  'MuiSwitch|root|size=small||--_height': 'Switch · height [size=small]',
  'MuiSwitch|root|size=small||--_thumbSize': 'Switch · thumb size [size=small]',
  'MuiSwitch|root|size=small||--_touchSize': 'Switch · touch size [size=small]',
  'MuiSwitch|root|size=small||--_pad': 'Switch · gutter [size=small]',
  'MuiSwitch|root|size=small|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft':
    'Switch · marginLeft [size=small]',
  'MuiSwitch|root|size=small|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight':
    'Switch · marginRight [size=small]',
  'MuiSwitch|root|size=small|& .MuiSwitch-thumb|width': {
    label: 'Switch · width [size=small]',
    hidden: true,
    note: 'Geometry derives from the five per-size Switch vars — the var rows are the knobs.',
  },
  'MuiSwitch|root|size=small|& .MuiSwitch-thumb|height': {
    label: 'Switch · height [size=small]',
    hidden: true,
    note: 'Geometry derives from the five per-size Switch vars — the var rows are the knobs.',
  },
  'MuiSwitch|root|size=small|& .MuiSwitch-switchBase|padding': {
    label: 'Switch · padding [size=small]',
    hidden: true,
    note: 'Geometry derives from the five per-size Switch vars — the var rows are the knobs.',
  },
  'MuiSwitch|root|size=small|& .MuiSwitch-switchBase &.Mui-checked|transform': {
    label: 'Switch · transform [size=small]',
    hidden: true,
    note: 'Geometry derives from the five per-size Switch vars — the var rows are the knobs.',
  },
  'MuiSwitch|root|edge=start||marginLeft': 'Switch · marginLeft [edge=start]',
  'MuiSwitch|root|edge=end||marginRight': 'Switch · marginRight [edge=end]',
  'MuiSwitch|switchBase|base||top': {
    label: 'Switch · switchBase · top',
    hidden: true,
    note: 'Geometry derives from the five per-size Switch vars — the var rows are the knobs.',
  },
  'MuiSwitch|switchBase|base||padding': {
    label: 'Switch · switchBase · padding',
    hidden: true,
    note: 'Geometry derives from the five per-size Switch vars — the var rows are the knobs.',
  },
  'MuiSwitch|switchBase|base||left': {
    label: 'Switch · switchBase · left',
    hidden: true,
    note: 'Geometry derives from the five per-size Switch vars — the var rows are the knobs.',
  },
  'MuiSwitch|switchBase|base|&.Mui-checked|transform': {
    label: 'Switch · switchBase · transform',
    hidden: true,
    note: 'Geometry derives from the five per-size Switch vars — the var rows are the knobs.',
  },
  'MuiSwitch|switchBase|base|&.Mui-checked|left': {
    label: 'Switch · switchBase · left',
    hidden: true,
    note: 'Geometry derives from the five per-size Switch vars — the var rows are the knobs.',
  },
  'MuiSwitch|thumb|base||width': {
    label: 'Switch · thumb · width',
    hidden: true,
    note: 'Geometry derives from the five per-size Switch vars — the var rows are the knobs.',
  },
  'MuiSwitch|thumb|base||height': {
    label: 'Switch · thumb · height',
    hidden: true,
    note: 'Geometry derives from the five per-size Switch vars — the var rows are the knobs.',
  },
  'MuiSwitch|track|base||borderRadius': {
    label: 'Switch · track · borderRadius',
    hidden: true,
    note: 'Geometry derives from the five per-size Switch vars — the var rows are the knobs.',
  },
  'MuiTab|root|base||minHeight': { label: 'Tab min height', done: ['medium'] },
  'MuiTab|root|base||lineHeight': {
    label: 'Tab · lineHeight',
    hidden: true,
    note: 'Rides theme.typography.button.lineHeight — edit via the Typography tab.',
  },
  'MuiTab|root|base||paddingBlock': { label: 'Tab block padding', done: ['medium'] },
  'MuiTab|root|base||paddingInline': { label: 'Tab inline padding', done: ['medium'] },
  'MuiTab|root|fn:1bbekq||minHeight': {
    label: 'Icon+label min height',
    hidden: true,
    note: 'Preset-driven sizing, not independently tunable via sidebar.',
  },
  'MuiTab|root|fn:1bbekq||paddingBlock': 'Icon+label block padding',
  'MuiTab|root|fn:8b76di|& > .MuiTab-icon|marginBottom': 'Icon gap (top layout)',
  'MuiTab|root|fn:ekzzmq|& > .MuiTab-icon|marginTop': 'Icon gap (bottom layout)',
  'MuiTab|root|fn:s0l8zx|& > .MuiTab-icon|marginRight': 'Icon gap (start layout)',
  'MuiTab|root|fn:8au602|& > .MuiTab-icon|marginLeft': 'Icon gap (end layout)',
  'MuiTableCell|root|size=medium||padding': {
    label: 'TableCell · padding [size=medium]',
    done: ['medium'],
  },
  'MuiTableCell|root|size=small||padding': {
    label: 'TableCell · padding [size=small]',
    done: ['medium'],
  },
  'MuiTableCell|root|padding=checkbox||padding': 'TableCell · padding [padding=checkbox]',
  'MuiTableCell|root|padding=none||padding': {
    label: 'TableCell · padding [padding=none]',
    hidden: true,
    note: 'Frozen 0 re-assert so the size padding never leaks into padding="none" cells — not tunable.',
  },
  'MuiTablePagination|root|base|& .MuiTablePagination-toolbar|minHeight': {
    label: 'TablePagination · toolbar minHeight',
    done: ['medium'],
  },
  'MuiTablePagination|root|base|& .MuiTablePagination-toolbar|paddingRight': {
    label: 'TablePagination · toolbar paddingRight',
    done: ['medium'],
  },
  'MuiTablePagination|root|base|& .MuiTablePagination-toolbar .MuiTablePagination-actions|marginLeft':
    { label: 'TablePagination · actions marginLeft', done: ['medium'] },
  'MuiTablePagination|root|base|& .MuiTablePagination-selectRoot|marginLeft': {
    label: 'TablePagination · select marginLeft',
    done: ['medium'],
  },
  'MuiTablePagination|root|base|& .MuiTablePagination-toolbar .MuiTablePagination-select|paddingLeft':
    { label: 'TablePagination · select paddingLeft', done: ['medium'] },
  'MuiTablePagination|root|base|& .MuiTablePagination-toolbar .MuiTablePagination-select|paddingRight':
    { label: 'TablePagination · select paddingRight', done: ['medium'] },
  'MuiTableSortLabel|icon|base||fontSize': 'TableSortLabel · icon · fontSize',
  'MuiTableSortLabel|icon|base||marginInline': 'TableSortLabel · icon · marginInline',
  'MuiTabs|root|base||minHeight': { label: 'Tabs min height', done: ['medium'] },
  'MuiTabScrollButton|root|orientation=horizontal||width': {
    label: 'TabScrollButton · width [horizontal]',
    done: ['medium'],
  },
  'MuiTabScrollButton|root|orientation=vertical||height': {
    label: 'TabScrollButton · height [vertical]',
    done: ['medium'],
  },
  'MuiToggleButton|root|size=small||padding': {
    label: 'ToggleButton · padding [size=small]',
    done: ['medium'],
  },
  'MuiToggleButton|root|size=medium||padding': {
    label: 'ToggleButton · padding [size=medium]',
    done: ['medium'],
  },
  'MuiToggleButton|root|size=large||padding': {
    label: 'ToggleButton · padding [size=large]',
    done: ['medium'],
  },
  'MuiToolbar|root|disableGutters=false||paddingInline':
    'Toolbar · paddingInline [disableGutters=false]',
  'MuiToolbar|root|disableGutters=false|@media (min-width:600px)|paddingInline':
    'Toolbar · paddingInline [disableGutters=false]',
  'MuiToolbar|root|variant=dense||minHeight': {
    label: 'Toolbar · minHeight [variant=dense]',
    hidden: true,
    note: 'Preset-driven sizing, not independently tunable via sidebar.',
  },
  'MuiToolbar|root|variant=regular||minHeight': 'Toolbar · minHeight [variant=regular]',
  'MuiToolbar|root|variant=regular|@media (orientation: landscape)|minHeight':
    'Toolbar · minHeight [variant=regular]',
  'MuiToolbar|root|variant=regular|@media (min-width:600px)|minHeight':
    'Toolbar · minHeight [variant=regular]',
  'MuiTooltip|arrow|base||width': {
    label: 'Tooltip · arrow · width',
    hidden: true,
    note: 'Arrow geometry derives from the popper-slot --_arrowSize var — the var row is the knob.',
  },
  'MuiTooltip|arrow|base||height': {
    label: 'Tooltip · arrow · height',
    hidden: true,
    note: 'Arrow geometry derives from the popper-slot --_arrowSize var — the var row is the knob.',
  },
  'MuiTooltip|popper|base||--_arrowSize': 'Tooltip · popper · arrow size',
  'MuiTooltip|popper|base|&[data-popper-placement*="bottom"] .MuiTooltip-arrow|marginTop': {
    label: 'Tooltip · popper · marginTop',
    hidden: true,
    note: 'Arrow geometry derives from the popper-slot --_arrowSize var — the var row is the knob.',
  },
  'MuiTooltip|popper|base|&[data-popper-placement*="top"] .MuiTooltip-arrow|marginBottom': {
    label: 'Tooltip · popper · marginBottom',
    hidden: true,
    note: 'Arrow geometry derives from the popper-slot --_arrowSize var — the var row is the knob.',
  },
  'MuiTooltip|popper|base|&[data-popper-placement*="right"] .MuiTooltip-arrow|height': {
    label: 'Tooltip · popper · height',
    hidden: true,
    note: 'Arrow geometry derives from the popper-slot --_arrowSize var — the var row is the knob.',
  },
  'MuiTooltip|popper|base|&[data-popper-placement*="right"] .MuiTooltip-arrow|width': {
    label: 'Tooltip · popper · width',
    hidden: true,
    note: 'Arrow geometry derives from the popper-slot --_arrowSize var — the var row is the knob.',
  },
  'MuiTooltip|popper|base|&[data-popper-placement*="right"] .MuiTooltip-arrow|marginInlineStart': {
    label: 'Tooltip · popper · marginInlineStart',
    hidden: true,
    note: 'Arrow geometry derives from the popper-slot --_arrowSize var — the var row is the knob.',
  },
  'MuiTooltip|popper|base|&[data-popper-placement*="left"] .MuiTooltip-arrow|height': {
    label: 'Tooltip · popper · height',
    hidden: true,
    note: 'Arrow geometry derives from the popper-slot --_arrowSize var — the var row is the knob.',
  },
  'MuiTooltip|popper|base|&[data-popper-placement*="left"] .MuiTooltip-arrow|width': {
    label: 'Tooltip · popper · width',
    hidden: true,
    note: 'Arrow geometry derives from the popper-slot --_arrowSize var — the var row is the knob.',
  },
  'MuiTooltip|popper|base|&[data-popper-placement*="left"] .MuiTooltip-arrow|marginInlineEnd': {
    label: 'Tooltip · popper · marginInlineEnd',
    hidden: true,
    note: 'Arrow geometry derives from the popper-slot --_arrowSize var — the var row is the knob.',
  },
  'MuiTooltip|tooltip|base||padding': { label: 'Tooltip · tooltip · padding', done: ['medium'] },
  'MuiTooltip|tooltip|base||fontSize': { label: 'Tooltip · tooltip · fontSize', done: ['medium'] },
  'MuiTooltip|tooltip|base||lineHeight': {
    label: 'Tooltip · tooltip · lineHeight',
    done: ['medium'],
  },
  'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="left"] &|marginInlineEnd': {
    label: 'Tooltip · tooltip · marginInlineEnd',
    done: ['medium'],
  },
  'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="right"] &|marginInlineStart':
    { label: 'Tooltip · tooltip · marginInlineStart', done: ['medium'] },
  'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="top"] &|marginBottom': {
    label: 'Tooltip · tooltip · marginBottom',
    done: ['medium'],
  },
  'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="bottom"] &|marginTop': {
    label: 'Tooltip · tooltip · marginTop',
    done: ['medium'],
  },
  'MuiTreeItem|checkbox|base||marginLeft': {
    label: 'TreeItem · checkbox · marginLeft',
    done: ['medium'],
  },
  'MuiTreeItem|content|base||paddingBlock': {
    label: 'TreeItem · content · paddingBlock',
    done: ['medium'],
  },
  'MuiTreeItem|content|base||paddingRight': {
    label: 'TreeItem · content · paddingRight',
    done: ['medium'],
  },
  'MuiTreeItem|content|base||paddingLeft': {
    label: 'TreeItem · content · paddingLeft',
    done: ['medium'],
    note: 'Master depth calc re-emitted with a step base — a padding shorthand would clobber it.',
  },
  'MuiTreeItem|content|base||gap': { label: 'TreeItem · content · gap', done: ['medium'] },
  'MuiTreeItem|iconContainer|base|& svg|fontSize': {
    label: 'TreeItem · iconContainer · fontSize',
    done: ['medium'],
  },
  'MuiTreeItem|root|base||--TreeView-itemHeight': {
    label: 'TreeItem · row height (--TreeView-itemHeight)',
    done: ['medium'],
    note: 'Upstream hook: content height = var(--TreeView-itemHeight, unset); master is unset (content-sized ≈32) — the unset preset stays zero-diff.',
  },
  'MuiYearCalendar|button|base||width': 'YearCalendar · button · width',
  'MuiYearCalendar|root|base||rowGap': { label: 'YearCalendar · rowGap', done: ['medium'] },
  'MuiYearCalendar|root|base||width': 'YearCalendar · width',
};
