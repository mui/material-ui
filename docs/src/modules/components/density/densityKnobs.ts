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
}

export const densityKnobs: Record<string, string | DensityKnobMeta> = {
  'MuiAccordionDetails|root|base||paddingBlockStart': 'AccordionDetails · paddingBlockStart',
  'MuiAccordionDetails|root|base||paddingBlockEnd': 'AccordionDetails · paddingBlockEnd',
  'MuiAccordionDetails|root|base||paddingInline': 'AccordionDetails · paddingInline',
  'MuiAccordionDetails|root|base||fontSize': 'AccordionDetails · fontSize',
  'MuiAccordionDetails|root|base||lineHeight': 'AccordionDetails · lineHeight',
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
  'MuiAutocomplete|listbox|base|& .MuiAutocomplete-option|paddingBlock': 'Option block padding',
  'MuiAutocomplete|listbox|base|& .MuiAutocomplete-option|paddingInline': 'Option inline padding',
  'MuiAutocomplete|listbox|base|& .MuiAutocomplete-option|fontSize': 'Option font size',
  'MuiAutocomplete|listbox|base|& .MuiAutocomplete-option|lineHeight': 'Option line height',
  'MuiAutocomplete|root|base||--_autocompleteInputRootPadBlock':
    'Autocomplete · Input root paddingBlock',
  'MuiAutocomplete|root|base||--_autocompleteInputPadBlock':
    'Autocomplete · Input inner paddingBlock',
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root|paddingBlock': {
    label: 'Autocomplete · inputRoot paddingBlock',
    hidden: true,
    note: 'Consumes --_autocompleteInputRootPadBlock — the var row is the knob.',
  },
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root .MuiAutocomplete-input|paddingBlock': {
    label: 'Autocomplete · input paddingBlock',
    hidden: true,
    note: 'Consumes --_autocompleteInputPadBlock — the var row is the knob.',
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
  'MuiAutocomplete|tag|base||margin': 'Autocomplete · tag · margin',
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
  'MuiBreadcrumbs|separator|base||marginInline': 'Breadcrumbs · separator · marginInline',
  'MuiButton|root|size=small||padding': 'Button · padding [size=small]',
  'MuiButton|root|size=medium||padding': 'Button · padding [size=medium]',
  'MuiButton|root|size=large||padding': 'Button · padding [size=large]',
  'MuiButtonGroup|root|base|& .MuiButtonGroup-grouped|minWidth': 'ButtonGroup · button minWidth',
  'MuiCardActions|root|base||padding': 'CardActions · padding',
  'MuiCardActions|root|disableSpacing=false|& > :not(style) ~ :not(style)|marginLeft':
    'CardActions · child gap',
  'MuiCardContent|root|base||padding': 'CardContent · padding',
  'MuiCardContent|root|base|&:last-child|paddingBottom': 'CardContent · paddingBottom [last-child]',
  'MuiCardHeader|action|base||marginBlock': 'CardHeader · action · marginBlock',
  'MuiCardHeader|action|base||marginRight': 'CardHeader · action · marginRight',
  'MuiCardHeader|avatar|base||marginRight': 'CardHeader · avatar · marginRight',
  'MuiCardHeader|root|base||padding': 'CardHeader · padding',
  'MuiCheckbox|root|size=medium||padding': 'Checkbox · padding [size=medium]',
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
  'MuiChip|avatar|size=medium||--_avatarSize': 'Chip · avatar · size [size=medium]',
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
  'MuiChip|avatar|size=small||--_avatarSize': 'Chip · avatar · size [size=small]',
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
  'MuiChip|icon|size=medium||fontSize': 'Chip · icon · fontSize [size=medium]',
  'MuiChip|icon|size=small||fontSize': 'Chip · icon · fontSize [size=small]',
  'MuiChip|label|size=medium||paddingInline': 'Chip · label · paddingInline [size=medium]',
  'MuiChip|label|size=small||paddingInline': 'Chip · label · paddingInline [size=small]',
  'MuiChip|root|size=medium||--_height': 'Chip · height [size=medium]',
  'MuiChip|root|size=medium||height': {
    label: 'Chip · height [size=medium]',
    hidden: true,
    note: 'Derived from the per-size --_height/--_avatarSize/--_deleteIconSize vars — the var rows are the knobs.',
  },
  'MuiChip|root|size=small||--_height': 'Chip · height [size=small]',
  'MuiChip|root|size=small||height': {
    label: 'Chip · height [size=small]',
    hidden: true,
    note: 'Derived from the per-size --_height/--_avatarSize/--_deleteIconSize vars — the var rows are the knobs.',
  },
  'MuiDataGrid|actionsCell|base||gridGap': 'DataGrid · actionsCell · gridGap',
  'MuiDataGrid|cell|base||padding': 'DataGrid · cell · padding',
  'MuiDataGrid|columnHeader|base||padding': 'DataGrid · columnHeader · padding',
  'MuiDataGrid|columnHeaderTitleContainer|base||gap': 'DataGrid · columnHeaderTitleContainer · gap',
  'MuiDataGrid|defaultProps|base||rowHeight': {
    label: 'DataGrid · row height (defaultProps, px)',
    note: 'JS-gated: applies through the rowHeight prop, not CSS — the virtualizer computes row positions from it.',
  },
  'MuiDataGrid|defaultProps|base||columnHeaderHeight': {
    label: 'DataGrid · header height (defaultProps, px)',
    note: 'JS-gated: applies through the columnHeaderHeight prop, not CSS.',
  },
  'MuiDataGrid|editInputCell|base|& input|padding': 'DataGrid · editInputCell · padding',
  'MuiDataGrid|footerContainer|base||minHeight': 'DataGrid · footerContainer · minHeight',
  'MuiDataGrid|rowCount|base||margin': 'DataGrid · rowCount · margin',
  'MuiDataGrid|selectedRowCount|base||margin': 'DataGrid · selectedRowCount · margin',
  'MuiDataGrid|toolbar|base||minHeight': 'DataGrid · toolbar · minHeight',
  'MuiDataGrid|toolbar|base||padding': 'DataGrid · toolbar · padding',
  'MuiDataGrid|toolbar|base||gap': 'DataGrid · toolbar · gap',
  'MuiDataGrid|toolbarDivider|base||margin': 'DataGrid · toolbarDivider · margin',
  'MuiDataGrid|toolbarLabel|base||margin': 'DataGrid · toolbarLabel · margin',
  'MuiDialogActions|root|base||padding': 'DialogActions · padding',
  'MuiDialogContent|root|base||padding': 'DialogContent · padding',
  'MuiDialogContent|root|dividers=true||padding': 'DialogContent · padding [dividers=true]',
  'MuiDialogTitle|root|base||padding': 'DialogTitle · padding',
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
  'MuiFilledInput|input|hiddenLabel=true||paddingTop': {
    label: 'FilledInput · input · paddingTop [hiddenLabel=true]',
    hidden: true,
    note: 'Consumes --_filledInputPadTop/--_filledInputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiFilledInput|input|hiddenLabel=true||paddingBottom': {
    label: 'FilledInput · input · paddingBottom [hiddenLabel=true]',
    hidden: true,
    note: 'Consumes --_filledInputPadTop/--_filledInputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiFilledInput|input|hiddenLabel=true,size=small||paddingTop': {
    label: 'FilledInput · input · paddingTop [hiddenLabel=true,size=small]',
    hidden: true,
    note: 'Consumes --_filledInputPadTop/--_filledInputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiFilledInput|input|hiddenLabel=true,size=small||paddingBottom': {
    label: 'FilledInput · input · paddingBottom [hiddenLabel=true,size=small]',
    hidden: true,
    note: 'Consumes --_filledInputPadTop/--_filledInputPadBottom — the FormControl writer var rows are the knobs.',
  },
  'MuiFilledInput|input|multiline=true||paddingBlock': {
    label: 'FilledInput · input · paddingBlock [multiline=true]',
    hidden: true,
    note: 'Multiline reset to 0 — the box padding moves to the root (master convention).',
  },
  'MuiFilledInput|root|base|.MuiFormControl-root:has(> &)|--_filledInputPadTop':
    'FilledInput · padding top',
  'MuiFilledInput|root|base|.MuiFormControl-root:has(> &)|--_filledInputPadBottom':
    'FilledInput · padding bottom',
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
  'MuiFilledInput|root|size=small|.MuiFormControl-root:has(> &)|--_filledInputPadTop':
    'FilledInput · padding top [size=small]',
  'MuiFilledInput|root|size=small|.MuiFormControl-root:has(> &)|--_filledInputPadBottom':
    'FilledInput · padding bottom [size=small]',
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
  'MuiIconButton|root|size=small||padding': 'IconButton · padding [size=small]',
  'MuiIconButton|root|size=medium||padding': 'IconButton · padding [size=medium]',
  'MuiIconButton|root|size=large||padding': 'IconButton · padding [size=large]',
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
  'MuiInput|root|base|.MuiFormControl-root:has(> &)|--_inputPadTop': 'Input · padding top',
  'MuiInput|root|base|.MuiFormControl-root:has(> &)|--_inputPadBottom': 'Input · padding bottom',
  'MuiInput|root|base|.MuiFormControl-root:has(> &)|--_inputMarginTop': 'Input · margin top',
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
  'MuiInput|root|size=small|.MuiFormControl-root:has(> &)|--_inputPadTop':
    'Input · padding top [size=small]',
  'MuiInput|root|size=small|.MuiFormControl-root:has(> &)|--_inputPadBottom':
    'Input · padding bottom [size=small]',
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
  'MuiInputAdornment|root|position=start||marginRight':
    'InputAdornment · marginRight [position=start]',
  'MuiInputAdornment|root|position=end||marginLeft': 'InputAdornment · marginLeft [position=end]',
  'MuiInputAdornment|root|position=start,size=small||marginRight':
    'InputAdornment · marginRight [position=start,size=small]',
  'MuiInputAdornment|root|position=end,size=small||marginLeft':
    'InputAdornment · marginLeft [position=end,size=small]',
  'MuiInputAdornment|root|variant=filled|&.MuiInputAdornment-positionStart&:not(.MuiInputAdornment-hiddenLabel)|marginTop':
    {
      label: 'InputAdornment · marginTop [variant=filled]',
      hidden: true,
      note: 'Adornment top offset = calc(padTop - padBottom) — follows the FilledInput pad var knobs.',
    },
  'MuiInputBase|input|base||paddingBlock': {
    label: 'InputBase · input · paddingBlock',
    hidden: true,
    note: 'Cascade base for the standard variant — the per-variant pad var knobs (Input/OutlinedInput/FilledInput) own the value.',
  },
  'MuiInputBase|input|base||height': {
    label: 'InputBase · input · height',
    hiddenIn: ['Select'],
    note: 'TextField-only sizing — Select renders its value through the select slot, so hidden there.',
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
  'MuiInputBase|root|base||fontSize': 'InputBase · fontSize',
  'MuiInputBase|root|base||lineHeight': 'InputBase · lineHeight',
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
  'MuiList|root|disablePadding=false||paddingBlock': 'List block padding',
  'MuiListItemButton|root|dense=false||paddingBlock': 'ListItemButton · paddingBlock [dense=false]',
  'MuiListItemButton|root|dense=true||paddingBlock': 'ListItemButton · paddingBlock [dense=true]',
  'MuiListItemButton|root|disableGutters=false||paddingInline':
    'ListItemButton · paddingInline [disableGutters=false]',
  'MuiMenuItem|root|base|& .MuiListItemIcon-root|minWidth': 'MenuItem · icon min width',
  'MuiMenuItem|root|dense=false||minHeight': {
    label: 'min height (mobile)',
    hidden: true,
    note: 'Preset-driven sizing, not independently tunable via sidebar.',
  },
  'MuiMenuItem|root|dense=false||paddingBlock': 'block padding',
  'MuiMenuItem|root|dense=true||minHeight': {
    label: 'min height [dense]',
    hidden: true,
    note: 'Preset-driven sizing, not independently tunable via sidebar.',
  },
  'MuiMenuItem|root|dense=true||paddingBlock': 'block padding [dense]',
  'MuiMenuItem|root|dense=true|& .MuiListItemIcon-root svg|fontSize':
    'MenuItem · icon font size [dense]',
  'MuiMenuItem|root|dense=false,disableGutters=false||paddingInline':
    'inline padding [disableGutters]',
  'MuiMenuItem|root|dense=true,disableGutters=false||paddingInline':
    'inline padding [dense][disableGutters]',
  'MuiOutlinedInput|input|base||paddingBlock': {
    label: 'OutlinedInput · input · paddingBlock',
    hidden: true,
    note: 'Consumes --_outlinedInputPadBlock — the FormControl writer var row is the knob.',
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
  'MuiOutlinedInput|root|base|.MuiFormControl-root:has(> &)|--_outlinedInputPadBlock':
    'OutlinedInput · padding block',
  'MuiOutlinedInput|root|base|.MuiInputLabel-root:has(~ &)|--_restY': {
    label: 'OutlinedInput · --_restY',
    hidden: true,
    note: 'Floating-label rest-Y = calc(--_outlinedInputPadBlock - 0.5px) — follows the pad var knob; consumed by the InputLabel transform.',
  },
  'MuiOutlinedInput|root|size=small|.MuiInputLabel-root:has(~ &)|--_restY': {
    label: 'OutlinedInput · --_restY [size=small]',
    hidden: true,
    note: 'Floating-label rest-Y (small) = calc(--_outlinedInputPadBlock + 0.5px) — follows the pad var knob; consumed by the InputLabel transform.',
  },
  'MuiOutlinedInput|root|size=small|.MuiFormControl-root:has(> &)|--_outlinedInputPadBlock':
    'OutlinedInput · padding block [size=small]',
  'MuiOutlinedInput|root|multiline=true||paddingBlock': {
    label: 'OutlinedInput · paddingBlock [multiline=true]',
    hidden: true,
    note: 'Multiline box padding on the root — consumes --_outlinedInputPadBlock; the FormControl writer var row is the knob.',
  },
  'MuiOutlinedInput|root|multiline=true,size=small||paddingBlock': {
    label: 'OutlinedInput · paddingBlock [multiline=true,size=small]',
    hidden: true,
    note: 'Multiline box padding on the root — consumes --_outlinedInputPadBlock; the FormControl writer var row is the knob.',
  },
  'MuiPaginationItem|root|size=small||minWidth': 'PaginationItem · minWidth [size=small]',
  'MuiPaginationItem|root|size=medium||minWidth': 'PaginationItem · minWidth [size=medium]',
  'MuiPaginationItem|root|size=large||minWidth': 'PaginationItem · minWidth [size=large]',
  'MuiPaginationItem|root|fn:1nddmo||height': 'PaginationItem · height [fn]',
  'MuiPaginationItem|root|fn:1dnyyw||height': 'PaginationItem · height [fn]',
  'MuiPaginationItem|root|fn:1tf0li||height': 'PaginationItem · height [fn]',
  'MuiRadio|root|size=medium||padding': 'Radio · padding [size=medium]',
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
  'MuiSelect|select|base||minHeight': {
    label: 'Select · select · minHeight',
    hidden: true,
    note: 'Preset-driven sizing, not independently tunable via sidebar.',
  },
  'MuiSlider|root|orientation=horizontal||height': 'Slider · height [orientation=horizontal]',
  'MuiSlider|root|orientation=horizontal||paddingBlock':
    'Slider · paddingBlock [orientation=horizontal]',
  'MuiSlider|root|orientation=horizontal|@media (pointer: coarse)|paddingBlock': {
    label: 'Slider · paddingBlock [horizontal, coarse pointer]',
    hidden: true,
    note: 'Frozen 20px re-assert of the 42px coarse-pointer touch floor — never densified.',
  },
  'MuiSlider|root|orientation=horizontal,size=small||height':
    'Slider · height [orientation=horizontal,size=small]',
  'MuiSlider|root|orientation=vertical||width': 'Slider · width [orientation=vertical]',
  'MuiSlider|root|orientation=vertical||paddingInline':
    'Slider · paddingInline [orientation=vertical]',
  'MuiSlider|root|orientation=vertical|@media (pointer: coarse)|paddingInline': {
    label: 'Slider · paddingInline [vertical, coarse pointer]',
    hidden: true,
    note: 'Frozen 20px re-assert of the 42px coarse-pointer touch floor — never densified.',
  },
  'MuiSlider|root|orientation=vertical,size=small||width':
    'Slider · width [orientation=vertical,size=small]',
  'MuiSlider|thumb|base||width': 'Slider · thumb · width',
  'MuiSlider|thumb|base||height': 'Slider · thumb · height',
  'MuiSlider|thumb|size=small||width': 'Slider · thumb · width [size=small]',
  'MuiSlider|thumb|size=small||height': 'Slider · thumb · height [size=small]',
  'MuiSlider|valueLabel|base||padding': 'Slider · valueLabel · padding',
  'MuiSlider|valueLabel|size=small||padding': 'Slider · valueLabel · padding [size=small]',
  'MuiSnackbarContent|root|base||padding': 'SnackbarContent · padding',
  'MuiStep|root|alternativeLabel=false,hasConnector=false,orientation=horizontal||paddingLeft':
    'Step · paddingLeft [first, horizontal]',
  'MuiStep|root|alternativeLabel=false,last=true,orientation=horizontal||paddingRight':
    'Step · paddingRight [last, horizontal]',
  'MuiStepConnector|root|alternativeLabel=false,orientation=vertical||marginLeft':
    'StepConnector · marginLeft [vertical]',
  'MuiStepConnector|root|alternativeLabel=true,orientation=vertical||marginRight':
    'StepConnector · marginRight [vertical, alternativeLabel]',
  'MuiStepConnector|root|alternativeLabel=true,orientation=horizontal||top':
    'StepConnector · top [alternativeLabel, horizontal]',
  'MuiStepContent|root|alternativeLabel=false||marginLeft': 'StepContent · marginLeft',
  'MuiStepContent|root|alternativeLabel=false||paddingLeft': 'StepContent · paddingLeft',
  'MuiStepContent|root|alternativeLabel=true||marginRight':
    'StepContent · marginRight [alternativeLabel=true]',
  'MuiStepContent|root|alternativeLabel=true||paddingRight':
    'StepContent · paddingRight [alternativeLabel=true]',
  'MuiStepLabel|iconContainer|base||paddingRight': 'StepLabel · iconContainer · paddingRight',
  'MuiStepLabel|iconContainer|alternativeLabel=true,orientation=vertical||paddingLeft':
    'StepLabel · iconContainer · paddingLeft [vertical alternativeLabel]',
  'MuiStepLabel|label|alternativeLabel=true,orientation=horizontal|&.MuiStepLabel-alternativeLabel|marginTop':
    'StepLabel · label · marginTop [horizontal alternativeLabel]',
  'MuiSvgIcon|root|fontSize=small||fontSize': 'Svg icon · size [small]',
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
  'MuiTab|root|base||minHeight': {
    label: 'Tab min height',
    hidden: true,
    note: 'Preset-driven sizing, not independently tunable via sidebar.',
  },
  'MuiTab|root|base||paddingBlock': 'Tab block padding',
  'MuiTab|root|base||paddingInline': 'Tab inline padding',
  'MuiTab|root|base||fontSize': 'Tab · fontSize',
  'MuiTab|root|base||lineHeight': 'Tab · lineHeight',
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
  'MuiTableCell|root|size=medium||padding': 'TableCell · padding [size=medium]',
  'MuiTableCell|root|size=small||padding': 'TableCell · padding [size=small]',
  'MuiTableCell|root|padding=checkbox||padding': 'TableCell · padding [padding=checkbox]',
  'MuiTableCell|root|padding=none||padding': {
    label: 'TableCell · padding [padding=none]',
    hidden: true,
    note: 'Frozen 0 re-assert so the size padding never leaks into padding="none" cells — not tunable.',
  },
  'MuiTableCell|root|fn:1k4u0u||fontSize': 'TableCell · fontSize [variant=head or footer]',
  'MuiTableCell|root|fn:1k4u0u||lineHeight': 'TableCell · lineHeight [variant=head or footer]',
  'MuiTablePagination|root|base||fontSize': 'TablePagination · fontSize',
  'MuiTablePagination|root|base|& .MuiTablePagination-toolbar|minHeight':
    'TablePagination · toolbar minHeight',
  'MuiTablePagination|root|base|& .MuiTablePagination-toolbar|paddingRight':
    'TablePagination · toolbar paddingRight',
  'MuiTablePagination|root|base|& .MuiTablePagination-toolbar .MuiTablePagination-actions|marginLeft':
    'TablePagination · actions marginLeft',
  'MuiTablePagination|root|base|& .MuiTablePagination-selectRoot|marginLeft':
    'TablePagination · select marginLeft',
  'MuiTablePagination|root|base|& .MuiTablePagination-selectRoot|marginRight':
    'TablePagination · select marginRight',
  'MuiTablePagination|root|base|& .MuiTablePagination-toolbar .MuiTablePagination-select|paddingLeft':
    'TablePagination · select paddingLeft',
  'MuiTablePagination|root|base|& .MuiTablePagination-toolbar .MuiTablePagination-select|paddingRight':
    'TablePagination · select paddingRight',
  'MuiTableSortLabel|icon|base||fontSize': 'TableSortLabel · icon · fontSize',
  'MuiTableSortLabel|icon|base||marginInline': 'TableSortLabel · icon · marginInline',
  'MuiTabs|root|base||minHeight': {
    label: 'Tabs min height',
    hidden: true,
    note: 'Preset-driven sizing, not independently tunable via sidebar.',
  },
  'MuiTabScrollButton|root|orientation=horizontal||width': 'TabScrollButton · width [horizontal]',
  'MuiTabScrollButton|root|orientation=vertical||height': 'TabScrollButton · height [vertical]',
  'MuiToggleButton|root|size=small||padding': 'ToggleButton · padding [size=small]',
  'MuiToggleButton|root|size=medium||padding': 'ToggleButton · padding [size=medium]',
  'MuiToggleButton|root|size=large||padding': 'ToggleButton · padding [size=large]',
  'MuiToolbar|root|disableGutters=false||paddingInline':
    'Toolbar · paddingInline [disableGutters=false]',
  'MuiToolbar|root|disableGutters=false|@media (min-width:600px)|paddingInline':
    'Toolbar · paddingInline [disableGutters=false]',
  'MuiToolbar|root|variant=dense||minHeight': {
    label: 'Toolbar · minHeight [variant=dense]',
    hidden: true,
    note: 'Preset-driven sizing, not independently tunable via sidebar.',
  },
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
  'MuiTooltip|tooltip|base||fontSize': 'Tooltip · tooltip · fontSize',
  'MuiTooltip|tooltip|base||padding': 'Tooltip · tooltip · padding',
  'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="left"] &|marginInlineEnd':
    'Tooltip · tooltip · marginInlineEnd',
  'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="right"] &|marginInlineStart':
    'Tooltip · tooltip · marginInlineStart',
  'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="top"] &|marginBottom':
    'Tooltip · tooltip · marginBottom',
  'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="bottom"] &|marginTop':
    'Tooltip · tooltip · marginTop',
};
