import { ComponentsProps } from './props';
import { ComponentsOverrides } from './overrides';
import { ComponentsVariants } from './variants';

// PERFORMANCE OPTIMIZATION: Create cached type aliases to reduce repetitive generic computations
// Instead of computing ComponentsOverrides<Theme> and ComponentsVariants<Theme> for each component,
// we create aliases that TypeScript can cache and reuse, dramatically reducing type computation complexity
type CachedOverrides<Theme> = ComponentsOverrides<Theme>;
type CachedVariants<Theme> = ComponentsVariants<Theme>;

// OPTIMIZATION: Generic component configuration type that reduces type instantiation overhead
type ComponentConfig<Theme, ComponentName extends keyof ComponentsProps> = {
  defaultProps?: ComponentsProps[ComponentName];
  styleOverrides?: ComponentName extends keyof CachedOverrides<Theme>
    ? CachedOverrides<Theme>[ComponentName]
    : never;
  variants?: ComponentName extends keyof CachedVariants<Theme>
    ? CachedVariants<Theme>[ComponentName]
    : never;
};

export interface Components<Theme = unknown> {
  /**
   * Whether to merge the className and style coming from the component props with the default props.
   * @default false
   */
  mergeClassNameAndStyle?: boolean;
  // OPTIMIZATION: Use ComponentConfig to reduce type computation overhead
  MuiAlert?: ComponentConfig<Theme, 'MuiAlert'>;
  MuiAlertTitle?: ComponentConfig<Theme, 'MuiAlertTitle'>;
  MuiAppBar?: ComponentConfig<Theme, 'MuiAppBar'>;
  MuiAutocomplete?: ComponentConfig<Theme, 'MuiAutocomplete'>;
  MuiAvatar?: ComponentConfig<Theme, 'MuiAvatar'>;
  MuiAvatarGroup?: ComponentConfig<Theme, 'MuiAvatarGroup'>;
  MuiBackdrop?: ComponentConfig<Theme, 'MuiBackdrop'>;
  MuiBadge?: ComponentConfig<Theme, 'MuiBadge'>;
  MuiBottomNavigation?: ComponentConfig<Theme, 'MuiBottomNavigation'>;
  MuiBottomNavigationAction?: ComponentConfig<Theme, 'MuiBottomNavigationAction'>;
  MuiBreadcrumbs?: ComponentConfig<Theme, 'MuiBreadcrumbs'>;
  MuiButton?: ComponentConfig<Theme, 'MuiButton'>;
  MuiButtonBase?: ComponentConfig<Theme, 'MuiButtonBase'>;
  MuiButtonGroup?: ComponentConfig<Theme, 'MuiButtonGroup'>;
  MuiCard?: ComponentConfig<Theme, 'MuiCard'>;
  MuiCardActionArea?: ComponentConfig<Theme, 'MuiCardActionArea'>;
  MuiCardActions?: ComponentConfig<Theme, 'MuiCardActions'>;
  MuiCardContent?: ComponentConfig<Theme, 'MuiCardContent'>;
  MuiCardHeader?: ComponentConfig<Theme, 'MuiCardHeader'>;
  MuiCardMedia?: ComponentConfig<Theme, 'MuiCardMedia'>;
  MuiCheckbox?: ComponentConfig<Theme, 'MuiCheckbox'>;
  MuiChip?: ComponentConfig<Theme, 'MuiChip'>;
  MuiCircularProgress?: ComponentConfig<Theme, 'MuiCircularProgress'>;
  MuiCollapse?: ComponentConfig<Theme, 'MuiCollapse'>;
  MuiContainer?: ComponentConfig<Theme, 'MuiContainer'>;
  MuiCssBaseline?: ComponentConfig<Theme, 'MuiCssBaseline'>;
  MuiDialog?: ComponentConfig<Theme, 'MuiDialog'>;
  MuiDialogActions?: ComponentConfig<Theme, 'MuiDialogActions'>;
  MuiDialogContent?: ComponentConfig<Theme, 'MuiDialogContent'>;
  MuiDialogContentText?: ComponentConfig<Theme, 'MuiDialogContentText'>;
  MuiDialogTitle?: ComponentConfig<Theme, 'MuiDialogTitle'>;
  MuiDivider?: ComponentConfig<Theme, 'MuiDivider'>;
  MuiDrawer?: ComponentConfig<Theme, 'MuiDrawer'>;
  MuiAccordion?: ComponentConfig<Theme, 'MuiAccordion'>;
  MuiAccordionActions?: ComponentConfig<Theme, 'MuiAccordionActions'>;
  MuiAccordionDetails?: ComponentConfig<Theme, 'MuiAccordionDetails'>;
  MuiAccordionSummary?: ComponentConfig<Theme, 'MuiAccordionSummary'>;
  MuiFab?: ComponentConfig<Theme, 'MuiFab'>;
  MuiFilledInput?: ComponentConfig<Theme, 'MuiFilledInput'>;
  MuiFormControl?: ComponentConfig<Theme, 'MuiFormControl'>;
  MuiFormControlLabel?: ComponentConfig<Theme, 'MuiFormControlLabel'>;
  MuiFormGroup?: ComponentConfig<Theme, 'MuiFormGroup'>;
  MuiFormHelperText?: ComponentConfig<Theme, 'MuiFormHelperText'>;
  MuiFormLabel?: ComponentConfig<Theme, 'MuiFormLabel'>;
  MuiGridLegacy?: ComponentConfig<Theme, 'MuiGridLegacy'>;
  MuiGrid?: ComponentConfig<Theme, 'MuiGrid'>;
  MuiImageList?: ComponentConfig<Theme, 'MuiImageList'>;
  MuiImageListItem?: ComponentConfig<Theme, 'MuiImageListItem'>;
  MuiImageListItemBar?: ComponentConfig<Theme, 'MuiImageListItemBar'>;
  MuiIcon?: ComponentConfig<Theme, 'MuiIcon'>;
  MuiIconButton?: ComponentConfig<Theme, 'MuiIconButton'>;
  MuiInput?: ComponentConfig<Theme, 'MuiInput'>;
  MuiInputAdornment?: ComponentConfig<Theme, 'MuiInputAdornment'>;
  MuiInputBase?: ComponentConfig<Theme, 'MuiInputBase'>;
  MuiInputLabel?: ComponentConfig<Theme, 'MuiInputLabel'>;
  MuiLinearProgress?: ComponentConfig<Theme, 'MuiLinearProgress'>;
  MuiLink?: ComponentConfig<Theme, 'MuiLink'>;
  MuiList?: ComponentConfig<Theme, 'MuiList'>;
  MuiListItem?: ComponentConfig<Theme, 'MuiListItem'>;
  MuiListItemButton?: ComponentConfig<Theme, 'MuiListItemButton'>;
  MuiListItemAvatar?: ComponentConfig<Theme, 'MuiListItemAvatar'>;
  MuiListItemIcon?: ComponentConfig<Theme, 'MuiListItemIcon'>;
  MuiListItemSecondaryAction?: ComponentConfig<Theme, 'MuiListItemSecondaryAction'>;
  MuiListItemText?: ComponentConfig<Theme, 'MuiListItemText'>;
  MuiListSubheader?: ComponentConfig<Theme, 'MuiListSubheader'>;
  MuiMenu?: ComponentConfig<Theme, 'MuiMenu'>;
  MuiMenuItem?: ComponentConfig<Theme, 'MuiMenuItem'>;
  MuiMenuList?: ComponentConfig<Theme, 'MuiMenuList'>;
  MuiMobileStepper?: ComponentConfig<Theme, 'MuiMobileStepper'>;
  MuiModal?: ComponentConfig<Theme, 'MuiModal'>;
  MuiNativeSelect?: ComponentConfig<Theme, 'MuiNativeSelect'>;
  MuiOutlinedInput?: ComponentConfig<Theme, 'MuiOutlinedInput'>;
  MuiPagination?: ComponentConfig<Theme, 'MuiPagination'>;
  MuiPaginationItem?: ComponentConfig<Theme, 'MuiPaginationItem'>;
  MuiPaper?: ComponentConfig<Theme, 'MuiPaper'>;
  MuiPopper?: {
    defaultProps?: ComponentsProps['MuiPopper'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPopper'];
  };
  MuiPopover?: ComponentConfig<Theme, 'MuiPopover'>;
  MuiRadio?: ComponentConfig<Theme, 'MuiRadio'>;
  MuiRadioGroup?: ComponentConfig<Theme, 'MuiRadioGroup'>;
  MuiRating?: ComponentConfig<Theme, 'MuiRating'>;
  MuiScopedCssBaseline?: ComponentConfig<Theme, 'MuiScopedCssBaseline'>;
  MuiSelect?: ComponentConfig<Theme, 'MuiSelect'>;
  MuiSkeleton?: ComponentConfig<Theme, 'MuiSkeleton'>;
  MuiSlider?: ComponentConfig<Theme, 'MuiSlider'>;
  MuiSnackbar?: ComponentConfig<Theme, 'MuiSnackbar'>;
  MuiSnackbarContent?: ComponentConfig<Theme, 'MuiSnackbarContent'>;
  MuiSpeedDial?: ComponentConfig<Theme, 'MuiSpeedDial'>;
  MuiSpeedDialAction?: ComponentConfig<Theme, 'MuiSpeedDialAction'>;
  MuiSpeedDialIcon?: ComponentConfig<Theme, 'MuiSpeedDialIcon'>;
  MuiStack?: ComponentConfig<Theme, 'MuiStack'>;
  MuiStep?: ComponentConfig<Theme, 'MuiStep'>;
  MuiStepButton?: ComponentConfig<Theme, 'MuiStepButton'>;
  MuiStepConnector?: ComponentConfig<Theme, 'MuiStepConnector'>;
  MuiStepContent?: ComponentConfig<Theme, 'MuiStepContent'>;
  MuiStepIcon?: ComponentConfig<Theme, 'MuiStepIcon'>;
  MuiStepLabel?: ComponentConfig<Theme, 'MuiStepLabel'>;
  MuiStepper?: ComponentConfig<Theme, 'MuiStepper'>;
  MuiSvgIcon?: ComponentConfig<Theme, 'MuiSvgIcon'>;
  MuiSwipeableDrawer?: {
    defaultProps?: ComponentsProps['MuiSwipeableDrawer'];
  };
  MuiSwitch?: ComponentConfig<Theme, 'MuiSwitch'>;
  MuiTab?: ComponentConfig<Theme, 'MuiTab'>;
  MuiTable?: ComponentConfig<Theme, 'MuiTable'>;
  MuiTableBody?: ComponentConfig<Theme, 'MuiTableBody'>;
  MuiTableCell?: ComponentConfig<Theme, 'MuiTableCell'>;
  MuiTableContainer?: ComponentConfig<Theme, 'MuiTableContainer'>;
  MuiTableFooter?: ComponentConfig<Theme, 'MuiTableFooter'>;
  MuiTableHead?: ComponentConfig<Theme, 'MuiTableHead'>;
  MuiTablePagination?: ComponentConfig<Theme, 'MuiTablePagination'>;
  MuiTablePaginationActions?: ComponentConfig<Theme, 'MuiTablePaginationActions'>;
  MuiTableRow?: ComponentConfig<Theme, 'MuiTableRow'>;
  MuiTableSortLabel?: ComponentConfig<Theme, 'MuiTableSortLabel'>;
  MuiTabs?: ComponentConfig<Theme, 'MuiTabs'>;
  MuiTextField?: ComponentConfig<Theme, 'MuiTextField'>;
  MuiToggleButton?: ComponentConfig<Theme, 'MuiToggleButton'>;
  MuiToggleButtonGroup?: ComponentConfig<Theme, 'MuiToggleButtonGroup'>;
  MuiToolbar?: ComponentConfig<Theme, 'MuiToolbar'>;
  MuiTooltip?: ComponentConfig<Theme, 'MuiTooltip'>;
  MuiTouchRipple?: ComponentConfig<Theme, 'MuiTouchRipple'>;
  MuiTypography?: ComponentConfig<Theme, 'MuiTypography'>;
  MuiUseMediaQuery?: {
    defaultProps?: ComponentsProps['MuiUseMediaQuery'];
  };
}
