/* eslint-disable */
// Keys are managed by `pnpm density:codegen` — one per emitTable row, in table order.
// EDIT THE VALUES ONLY. Regen preserves your labels and syncs the keys to the presets;
// a new leaf appears with a guessed label, a removed leaf drops out. CI diffs this file.

export const densityLabels: Record<string, string> = {
  'MuiAccordionDetails|root|base||paddingBlockStart': 'AccordionDetails · paddingBlockStart',
  'MuiAccordionDetails|root|base||paddingBlockEnd': 'AccordionDetails · paddingBlockEnd',
  'MuiAccordionDetails|root|base||paddingInline': 'AccordionDetails · paddingInline',
  'MuiAccordionDetails|root|base||fontSize': 'AccordionDetails · fontSize',
  'MuiAccordionDetails|root|base||lineHeight': 'AccordionDetails · lineHeight',
  'MuiAccordionSummary|content|base||marginBlock': 'AccordionSummary · content · marginBlock',
  'MuiAccordionSummary|content|fn:ya70cs|&.Mui-expanded|marginBlock':
    'AccordionSummary · content · marginBlock (expanded)',
  'MuiAccordionSummary|root|base||minHeight': 'AccordionSummary · minHeight',
  'MuiAccordionSummary|root|base||padding': 'AccordionSummary · padding',
  'MuiAccordionSummary|root|fn:ya70cs|&.Mui-expanded|minHeight':
    'AccordionSummary · minHeight (expanded)',
  'MuiAlert|icon|base||marginRight': 'Alert · icon · marginRight',
  'MuiAlert|root|base||paddingBlock': 'Alert · paddingBlock',
  'MuiAlert|root|base||paddingInline': 'Alert · paddingInline',
  'MuiAutocomplete|listbox|base|& .MuiAutocomplete-option|minHeight': 'Option min height',
  'MuiAutocomplete|listbox|base|& .MuiAutocomplete-option|paddingBlock': 'Option block padding',
  'MuiAutocomplete|listbox|base|& .MuiAutocomplete-option|paddingInline': 'Option inline padding',
  'MuiAutocomplete|listbox|base|& .MuiAutocomplete-option|fontSize':
    'Autocomplete · listbox · Option fontSize',
  'MuiAutocomplete|listbox|base|& .MuiAutocomplete-option|lineHeight':
    'Autocomplete · listbox · Option lineHeight',
  'MuiAutocomplete|root|base||--_autocompleteInputRootPadBlock':
    'Autocomplete · Input root paddingBlock',
  'MuiAutocomplete|root|base||--_autocompleteInputPadBlock':
    'Autocomplete · Input inner paddingBlock',
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root|paddingBlock':
    'Autocomplete · inputRoot paddingBlock',
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root .MuiAutocomplete-input|paddingBlock':
    'Autocomplete · input paddingBlock',
  'MuiAutocomplete|root|base|& .MuiFormControl-root:has(> .MuiOutlinedInput-root)|--_outlinedInputPadBlock':
    'Autocomplete · --_outlinedInputPadBlock',
  'MuiAutocomplete|root|base|&:has(.MuiInputBase-sizeSmall)|--_autocompleteInputRootPadBlock':
    'Autocomplete · Input root paddingBlock [size=small]',
  'MuiAutocomplete|root|base|&:has(.MuiInputBase-sizeSmall)|--_autocompleteInputPadBlock':
    'Autocomplete · Input inner paddingBlock [size=small]',
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root.MuiInputBase-sizeSmall|paddingBlock':
    'Autocomplete · paddingBlock',
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root.MuiInputBase-sizeSmall .MuiAutocomplete-input|paddingBlock':
    'Autocomplete · paddingBlock',
  'MuiAutocomplete|tag|base||margin': 'Autocomplete · tag · margin',
  'MuiAvatar|root|base||width': 'Avatar · width',
  'MuiAvatar|root|base||height': 'Avatar · height',
  'MuiBadge|badge|variant=standard||minWidth': 'Badge · badge · minWidth [variant=standard]',
  'MuiBadge|badge|variant=standard||height': 'Badge · badge · height [variant=standard]',
  'MuiBadge|badge|variant=standard||padding': 'Badge · badge · padding [variant=standard]',
  'MuiBadge|badge|variant=dot||minWidth': 'Badge · badge · minWidth [variant=dot]',
  'MuiBadge|badge|variant=dot||height': 'Badge · badge · height [variant=dot]',
  'MuiBottomNavigation|root|base||height': 'BottomNavigation · height',
  'MuiBottomNavigationAction|root|base||paddingInline': 'BottomNavigationAction · paddingInline',
  'MuiBreadcrumbs|separator|base||marginInline': 'Breadcrumbs · separator · marginInline',
  'MuiButton|root|size=small||padding': 'Button · padding [size=small]',
  'MuiButton|root|size=medium||padding': 'Button · padding [size=medium]',
  'MuiButton|root|size=large||padding': 'Button · padding [size=large]',
  'MuiButtonGroup|root|base|& .MuiButtonGroup-grouped|minWidth': 'ButtonGroup · minWidth',
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
  'MuiCheckbox|root|size=medium|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft':
    'Checkbox · marginLeft [size=medium]',
  'MuiCheckbox|root|size=medium|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight':
    'Checkbox · marginRight [size=medium]',
  'MuiCheckbox|root|size=small||padding': 'Checkbox · padding [size=small]',
  'MuiCheckbox|root|size=small|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft':
    'Checkbox · marginLeft [size=small]',
  'MuiCheckbox|root|size=small|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight':
    'Checkbox · marginRight [size=small]',
  'MuiChip|avatar|size=medium||--_avatarSize': 'Chip · avatar · size [size=medium]',
  'MuiChip|avatar|size=medium||width': 'Chip · avatar · width [size=medium]',
  'MuiChip|avatar|size=medium||height': 'Chip · avatar · height [size=medium]',
  'MuiChip|avatar|size=medium||marginLeft': 'Chip · avatar · marginLeft [size=medium]',
  'MuiChip|avatar|size=small||--_avatarSize': 'Chip · avatar · size [size=small]',
  'MuiChip|avatar|size=small||width': 'Chip · avatar · width [size=small]',
  'MuiChip|avatar|size=small||height': 'Chip · avatar · height [size=small]',
  'MuiChip|avatar|size=small||marginLeft': 'Chip · avatar · marginLeft [size=small]',
  'MuiChip|deleteIcon|size=medium||--_deleteIconSize': 'Chip · delete icon · size [size=medium]',
  'MuiChip|deleteIcon|size=medium||fontSize': 'Chip · deleteIcon · fontSize [size=medium]',
  'MuiChip|deleteIcon|size=medium||marginRight': 'Chip · deleteIcon · marginRight [size=medium]',
  'MuiChip|deleteIcon|size=small||--_deleteIconSize': 'Chip · delete icon · size [size=small]',
  'MuiChip|deleteIcon|size=small||fontSize': 'Chip · deleteIcon · fontSize [size=small]',
  'MuiChip|deleteIcon|size=small||marginRight': 'Chip · deleteIcon · marginRight [size=small]',
  'MuiChip|icon|size=medium||fontSize': 'Chip · icon · fontSize [size=medium]',
  'MuiChip|icon|size=small||fontSize': 'Chip · icon · fontSize [size=small]',
  'MuiChip|label|size=medium||paddingInline': 'Chip · label · paddingInline [size=medium]',
  'MuiChip|label|size=small||paddingInline': 'Chip · label · paddingInline [size=small]',
  'MuiChip|root|size=medium||--_height': 'Chip · height [size=medium]',
  'MuiChip|root|size=medium||height': 'Chip · height [size=medium]',
  'MuiChip|root|size=small||--_height': 'Chip · height [size=small]',
  'MuiChip|root|size=small||height': 'Chip · height [size=small]',
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
  'MuiFilledInput|input|base||paddingTop': 'FilledInput · input · paddingTop',
  'MuiFilledInput|input|base||paddingBottom': 'FilledInput · input · paddingBottom',
  'MuiFilledInput|input|hiddenLabel=true||paddingTop':
    'FilledInput · input · paddingTop [hiddenLabel=true]',
  'MuiFilledInput|input|hiddenLabel=true||paddingBottom':
    'FilledInput · input · paddingBottom [hiddenLabel=true]',
  'MuiFilledInput|input|hiddenLabel=true,size=small||paddingTop':
    'FilledInput · input · paddingTop [hiddenLabel=true,size=small]',
  'MuiFilledInput|input|hiddenLabel=true,size=small||paddingBottom':
    'FilledInput · input · paddingBottom [hiddenLabel=true,size=small]',
  'MuiFilledInput|input|multiline=true||paddingBlock':
    'FilledInput · input · paddingBlock [multiline=true]',
  'MuiFilledInput|root|base|.MuiFormControl-root:has(> &)|--_filledInputPadTop':
    'FilledInput · padding top',
  'MuiFilledInput|root|base|.MuiFormControl-root:has(> &)|--_filledInputPadBottom':
    'FilledInput · padding bottom',
  'MuiFilledInput|root|base|.MuiInputLabel-root:has(~ &)|--_restY': 'FilledInput · --_restY',
  'MuiFilledInput|root|base|.MuiInputLabel-root:has(~ &)|--_shrinkY': 'FilledInput · shrink Y',
  'MuiFilledInput|root|size=small|.MuiFormControl-root:has(> &)|--_filledInputPadTop':
    'FilledInput · padding top [size=small]',
  'MuiFilledInput|root|size=small|.MuiFormControl-root:has(> &)|--_filledInputPadBottom':
    'FilledInput · padding bottom [size=small]',
  'MuiFilledInput|root|size=small|.MuiInputLabel-root:has(~ &)|--_restY':
    'FilledInput · --_restY [size=small]',
  'MuiFilledInput|root|size=small|.MuiInputLabel-root:has(~ &)|--_shrinkY':
    'FilledInput · shrink Y [size=small]',
  'MuiFilledInput|root|multiline=true||paddingTop': 'FilledInput · paddingTop [multiline=true]',
  'MuiFilledInput|root|multiline=true||paddingBottom':
    'FilledInput · paddingBottom [multiline=true]',
  'MuiFilledInput|root|multiline=true,size=small||paddingTop':
    'FilledInput · paddingTop [multiline=true,size=small]',
  'MuiFilledInput|root|multiline=true,size=small||paddingBottom':
    'FilledInput · paddingBottom [multiline=true,size=small]',
  'MuiFilledInput|root|hiddenLabel=true,multiline=true||paddingTop':
    'FilledInput · paddingTop [multiline=true,hiddenLabel=true]',
  'MuiFilledInput|root|hiddenLabel=true,multiline=true||paddingBottom':
    'FilledInput · paddingBottom [multiline=true,hiddenLabel=true]',
  'MuiFilledInput|root|hiddenLabel=true,multiline=true,size=small||paddingTop':
    'FilledInput · paddingTop [multiline=true,hiddenLabel=true,size=small]',
  'MuiFilledInput|root|hiddenLabel=true,multiline=true,size=small||paddingBottom':
    'FilledInput · paddingBottom [multiline=true,hiddenLabel=true,size=small]',
  'MuiInput|input|base||paddingTop': 'Input · input · paddingTop',
  'MuiInput|input|base||paddingBottom': 'Input · input · paddingBottom',
  'MuiInput|input|size=small||paddingTop': 'Input · input · paddingTop [size=small]',
  'MuiInput|input|size=small||paddingBottom': 'Input · input · paddingBottom [size=small]',
  'MuiInput|input|multiline=true||paddingBlock': 'Input · input · paddingBlock [multiline=true]',
  'MuiInput|root|base|.MuiFormControl-root:has(> &)|--_inputPadTop': 'Input · padding top',
  'MuiInput|root|base|.MuiFormControl-root:has(> &)|--_inputPadBottom': 'Input · padding bottom',
  'MuiInput|root|base|.MuiFormControl-root:has(> &)|--_inputMarginTop': 'Input · margin top',
  'MuiInput|root|base|.MuiInputLabel-root:has(~ &)|--_restY': 'Input · --_restY',
  'MuiInput|root|base|label + &, .MuiInputLabel-root + &|marginTop': 'Input · marginTop',
  'MuiInput|root|size=small|.MuiFormControl-root:has(> &)|--_inputPadTop':
    'Input · padding top [size=small]',
  'MuiInput|root|size=small|.MuiFormControl-root:has(> &)|--_inputPadBottom':
    'Input · padding bottom [size=small]',
  'MuiInput|root|size=small|.MuiInputLabel-root:has(~ &)|--_restY': 'Input · --_restY [size=small]',
  'MuiInput|root|multiline=true||paddingTop': 'Input · paddingTop [multiline=true]',
  'MuiInput|root|multiline=true||paddingBottom': 'Input · paddingBottom [multiline=true]',
  'MuiInput|root|multiline=true,size=small||paddingTop':
    'Input · paddingTop [multiline=true,size=small]',
  'MuiInput|root|multiline=true,size=small||paddingBottom':
    'Input · paddingBottom [multiline=true,size=small]',
  'MuiInputAdornment|root|position=start||marginRight':
    'InputAdornment · marginRight [position=start]',
  'MuiInputAdornment|root|position=end||marginLeft': 'InputAdornment · marginLeft [position=end]',
  'MuiInputAdornment|root|position=start,size=small||marginRight':
    'InputAdornment · marginRight [position=start,size=small]',
  'MuiInputAdornment|root|position=end,size=small||marginLeft':
    'InputAdornment · marginLeft [position=end,size=small]',
  'MuiInputAdornment|root|variant=filled|&.MuiInputAdornment-positionStart&:not(.MuiInputAdornment-hiddenLabel)|marginTop':
    'InputAdornment · marginTop [variant=filled]',
  'MuiInputBase|input|base||paddingBlock': 'InputBase · input · paddingBlock',
  'MuiInputBase|input|base||height': 'InputBase · input · height',
  'MuiInputBase|input|size=small||paddingTop': 'InputBase · input · paddingTop [size=small]',
  'MuiInputBase|input|multiline=true||paddingBlock':
    'InputBase · input · paddingBlock [multiline=true]',
  'MuiInputBase|root|base||fontSize': 'InputBase · fontSize',
  'MuiInputBase|root|base||lineHeight': 'InputBase · lineHeight',
  'MuiInputLabel|root|fn:1u4zrm||transform': 'InputLabel · transform [fn]',
  'MuiInputLabel|root|shrink=true||transform': 'InputLabel · transform [shrink=true]',
  'MuiInputLabel|root|variant=filled||transform': 'InputLabel · transform [variant=filled]',
  'MuiInputLabel|root|shrink=true,variant=filled||transform':
    'InputLabel · transform [variant=filled,shrink=true]',
  'MuiInputLabel|root|variant=outlined||transform': 'InputLabel · transform [variant=outlined]',
  'MuiInputLabel|root|shrink=true,variant=outlined||transform':
    'InputLabel · transform [variant=outlined,shrink=true]',
  'MuiList|root|disablePadding=false||paddingBlock': 'List block padding',
  'MuiListItemButton|root|dense=false||paddingBlock': 'ListItemButton · paddingBlock [dense=false]',
  'MuiListItemButton|root|dense=true||paddingBlock': 'ListItemButton · paddingBlock [dense=true]',
  'MuiListItemButton|root|disableGutters=false||paddingInline':
    'ListItemButton · paddingInline [disableGutters=false]',
  'MuiMenuItem|root|base|& .MuiListItemIcon-root|minWidth': 'MenuItem · icon min width',
  'MuiMenuItem|root|dense=false||minHeight': 'min height (mobile)',
  'MuiMenuItem|root|dense=false||paddingBlock': 'block padding',
  'MuiMenuItem|root|dense=true||minHeight': 'min height [dense]',
  'MuiMenuItem|root|dense=true||paddingBlock': 'block padding [dense]',
  'MuiMenuItem|root|dense=true|& .MuiListItemIcon-root svg|fontSize':
    'MenuItem · icon font size [dense]',
  'MuiMenuItem|root|dense=false,disableGutters=false||paddingInline':
    'inline padding [disableGutters]',
  'MuiMenuItem|root|dense=true,disableGutters=false||paddingInline':
    'inline padding [dense][disableGutters]',
  'MuiOutlinedInput|input|base||paddingBlock': 'OutlinedInput · input · paddingBlock',
  'MuiOutlinedInput|input|size=small||paddingBlock':
    'OutlinedInput · input · paddingBlock [size=small]',
  'MuiOutlinedInput|input|multiline=true||paddingBlock':
    'OutlinedInput · input · paddingBlock [multiline=true]',
  'MuiOutlinedInput|root|base|.MuiFormControl-root:has(> &)|--_outlinedInputPadBlock':
    'OutlinedInput · padding block',
  'MuiOutlinedInput|root|base|.MuiInputLabel-root:has(~ &)|--_restY': 'OutlinedInput · --_restY',
  'MuiOutlinedInput|root|size=small|.MuiInputLabel-root:has(~ &)|--_restY':
    'OutlinedInput · --_restY [size=small]',
  'MuiOutlinedInput|root|size=small|.MuiFormControl-root:has(> &)|--_outlinedInputPadBlock':
    'OutlinedInput · padding block [size=small]',
  'MuiOutlinedInput|root|multiline=true||paddingBlock':
    'OutlinedInput · paddingBlock [multiline=true]',
  'MuiOutlinedInput|root|multiline=true,size=small||paddingBlock':
    'OutlinedInput · paddingBlock [multiline=true,size=small]',
  'MuiPaginationItem|root|size=small||minWidth': 'PaginationItem · minWidth [size=small]',
  'MuiPaginationItem|root|size=medium||minWidth': 'PaginationItem · minWidth [size=medium]',
  'MuiPaginationItem|root|size=large||minWidth': 'PaginationItem · minWidth [size=large]',
  'MuiPaginationItem|root|fn:1nddmo||height': 'PaginationItem · height [fn]',
  'MuiPaginationItem|root|fn:1dnyyw||height': 'PaginationItem · height [fn]',
  'MuiPaginationItem|root|fn:1tf0li||height': 'PaginationItem · height [fn]',
  'MuiRadio|root|size=medium||padding': 'Radio · padding [size=medium]',
  'MuiRadio|root|size=medium|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft':
    'Radio · marginLeft [size=medium]',
  'MuiRadio|root|size=medium|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight':
    'Radio · marginRight [size=medium]',
  'MuiRadio|root|size=small||padding': 'Radio · padding [size=small]',
  'MuiRadio|root|size=small|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft':
    'Radio · marginLeft [size=small]',
  'MuiRadio|root|size=small|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight':
    'Radio · marginRight [size=small]',
  'MuiSelect|select|base||minHeight': 'Select · select · minHeight',
  'MuiSnackbarContent|root|base||padding': 'SnackbarContent · padding',
  'MuiStep|root|alternativeLabel=false,hasConnector=false,orientation=horizontal||paddingLeft':
    'Step · paddingLeft [orientation=horizontal,alternativeLabel=false,hasConnector=false]',
  'MuiStep|root|alternativeLabel=false,last=true,orientation=horizontal||paddingRight':
    'Step · paddingRight [orientation=horizontal,alternativeLabel=false,last=true]',
  'MuiStepLabel|iconContainer|base||paddingRight': 'StepLabel · iconContainer · paddingRight',
  'MuiSvgIcon|root|fontSize=small||fontSize': 'Svg icon · size [small]',
  'MuiSvgIcon|root|fontSize=medium||fontSize': 'Svg icon · size [medium]',
  'MuiSvgIcon|root|fontSize=large||fontSize': 'Svg icon · size [large]',
  'MuiTab|root|base||minHeight': 'Tab min height',
  'MuiTab|root|base||paddingBlock': 'Tab block padding',
  'MuiTab|root|base||paddingInline': 'Tab inline padding',
  'MuiTab|root|base||fontSize': 'Tab · fontSize',
  'MuiTab|root|base||lineHeight': 'Tab · lineHeight',
  'MuiTab|root|fn:1bbekq||minHeight': 'Icon+label min height',
  'MuiTab|root|fn:1bbekq||paddingBlock': 'Icon+label block padding',
  'MuiTab|root|fn:8b76di|& > .MuiTab-icon|marginBottom': 'Icon gap (top layout)',
  'MuiTab|root|fn:ekzzmq|& > .MuiTab-icon|marginTop': 'Icon gap (bottom layout)',
  'MuiTab|root|fn:s0l8zx|& > .MuiTab-icon|marginRight': 'Icon gap (start layout)',
  'MuiTab|root|fn:8au602|& > .MuiTab-icon|marginLeft': 'Icon gap (end layout)',
  'MuiTableCell|root|size=medium||padding': 'TableCell · padding [size=medium]',
  'MuiTableCell|root|size=small||padding': 'TableCell · padding [size=small]',
  'MuiTableCell|root|padding=checkbox||padding': 'TableCell · padding [padding=checkbox]',
  'MuiTableCell|root|padding=none||padding': 'TableCell · padding [padding=none]',
  'MuiTabs|root|base||minHeight': 'Tabs min height',
  'MuiTabScrollButton|root|orientation=horizontal||width': 'TabScrollButton · width [horizontal]',
  'MuiTabScrollButton|root|orientation=vertical||height': 'TabScrollButton · height [vertical]',
  'MuiToggleButton|root|size=small||padding': 'ToggleButton · padding [size=small]',
  'MuiToggleButton|root|size=medium||padding': 'ToggleButton · padding [size=medium]',
  'MuiToggleButton|root|size=large||padding': 'ToggleButton · padding [size=large]',
  'MuiToolbar|root|disableGutters=false||paddingInline':
    'Toolbar · paddingInline [disableGutters=false]',
  'MuiToolbar|root|disableGutters=false|@media (min-width:600px)|paddingInline':
    'Toolbar · paddingInline [disableGutters=false]',
  'MuiToolbar|root|variant=dense||minHeight': 'Toolbar · minHeight [variant=dense]',
  'MuiTooltip|arrow|base||width': 'Tooltip · arrow · width',
  'MuiTooltip|arrow|base||height': 'Tooltip · arrow · height',
  'MuiTooltip|popper|base||--_arrowSize': 'Tooltip · popper · arrow size',
  'MuiTooltip|popper|base|&[data-popper-placement*="bottom"] .MuiTooltip-arrow|marginTop':
    'Tooltip · popper · marginTop',
  'MuiTooltip|popper|base|&[data-popper-placement*="top"] .MuiTooltip-arrow|marginBottom':
    'Tooltip · popper · marginBottom',
  'MuiTooltip|popper|base|&[data-popper-placement*="right"] .MuiTooltip-arrow|height':
    'Tooltip · popper · height',
  'MuiTooltip|popper|base|&[data-popper-placement*="right"] .MuiTooltip-arrow|width':
    'Tooltip · popper · width',
  'MuiTooltip|popper|base|&[data-popper-placement*="right"] .MuiTooltip-arrow|marginInlineStart':
    'Tooltip · popper · marginInlineStart',
  'MuiTooltip|popper|base|&[data-popper-placement*="left"] .MuiTooltip-arrow|height':
    'Tooltip · popper · height',
  'MuiTooltip|popper|base|&[data-popper-placement*="left"] .MuiTooltip-arrow|width':
    'Tooltip · popper · width',
  'MuiTooltip|popper|base|&[data-popper-placement*="left"] .MuiTooltip-arrow|marginInlineEnd':
    'Tooltip · popper · marginInlineEnd',
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
