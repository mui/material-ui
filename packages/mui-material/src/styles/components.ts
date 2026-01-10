import { ComponentsProps } from './props';
import { ComponentsOverrides } from './overrides';
import { ComponentsVariants } from './variants';

export interface Components<Theme = unknown> {
  /**
   * Whether to merge the className and style coming from the component props with the default props.
   * @default false
   */
  mergeClassNameAndStyle?: boolean;
  MuiAlert?: {
    defaultProps?: ComponentsProps['MuiAlert'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAlert'];
    variants?: ComponentsVariants<Theme>['MuiAlert'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiAlertTitle?: {
    defaultProps?: ComponentsProps['MuiAlertTitle'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAlertTitle'];
    variants?: ComponentsVariants<Theme>['MuiAlertTitle'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiAppBar?: {
    defaultProps?: ComponentsProps['MuiAppBar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAppBar'];
    variants?: ComponentsVariants<Theme>['MuiAppBar'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiAutocomplete?: {
    defaultProps?: ComponentsProps['MuiAutocomplete'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAutocomplete'];
    variants?: ComponentsVariants<Theme>['MuiAutocomplete'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiAvatar?: {
    defaultProps?: ComponentsProps['MuiAvatar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAvatar'];
    variants?: ComponentsVariants<Theme>['MuiAvatar'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiAvatarGroup?: {
    defaultProps?: ComponentsProps['MuiAvatarGroup'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAvatarGroup'];
    variants?: ComponentsVariants<Theme>['MuiAvatarGroup'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiBackdrop?: {
    defaultProps?: ComponentsProps['MuiBackdrop'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiBackdrop'];
    variants?: ComponentsVariants<Theme>['MuiBackdrop'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiBadge?: {
    defaultProps?: ComponentsProps['MuiBadge'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiBadge'];
    variants?: ComponentsVariants<Theme>['MuiBadge'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiBottomNavigation?: {
    defaultProps?: ComponentsProps['MuiBottomNavigation'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiBottomNavigation'];
    variants?: ComponentsVariants<Theme>['MuiBottomNavigation'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiBottomNavigationAction?: {
    defaultProps?: ComponentsProps['MuiBottomNavigationAction'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiBottomNavigationAction'];
    variants?: ComponentsVariants<Theme>['MuiBottomNavigationAction'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiBreadcrumbs?: {
    defaultProps?: ComponentsProps['MuiBreadcrumbs'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiBreadcrumbs'];
    variants?: ComponentsVariants<Theme>['MuiBreadcrumbs'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiButton?: {
    defaultProps?: ComponentsProps['MuiButton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiButton'];
    variants?: ComponentsVariants<Theme>['MuiButton'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiButtonBase?: {
    defaultProps?: ComponentsProps['MuiButtonBase'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiButtonBase'];
    variants?: ComponentsVariants<Theme>['MuiButtonBase'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiButtonGroup?: {
    defaultProps?: ComponentsProps['MuiButtonGroup'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiButtonGroup'];
    variants?: ComponentsVariants<Theme>['MuiButtonGroup'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiCard?: {
    defaultProps?: ComponentsProps['MuiCard'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCard'];
    variants?: ComponentsVariants<Theme>['MuiCard'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiCardActionArea?: {
    defaultProps?: ComponentsProps['MuiCardActionArea'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCardActionArea'];
    variants?: ComponentsVariants<Theme>['MuiCardActionArea'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiCardActions?: {
    defaultProps?: ComponentsProps['MuiCardActions'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCardActions'];
    variants?: ComponentsVariants<Theme>['MuiCardActions'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiCardContent?: {
    defaultProps?: ComponentsProps['MuiCardContent'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCardContent'];
    variants?: ComponentsVariants<Theme>['MuiCardContent'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiCardHeader?: {
    defaultProps?: ComponentsProps['MuiCardHeader'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCardHeader'];
    variants?: ComponentsVariants<Theme>['MuiCardHeader'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiCardMedia?: {
    defaultProps?: ComponentsProps['MuiCardMedia'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCardMedia'];
    variants?: ComponentsVariants<Theme>['MuiCardMedia'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiCheckbox?: {
    defaultProps?: ComponentsProps['MuiCheckbox'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCheckbox'];
    variants?: ComponentsVariants<Theme>['MuiCheckbox'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiChip?: {
    defaultProps?: ComponentsProps['MuiChip'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiChip'];
    variants?: ComponentsVariants<Theme>['MuiChip'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiCircularProgress?: {
    defaultProps?: ComponentsProps['MuiCircularProgress'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCircularProgress'];
    variants?: ComponentsVariants<Theme>['MuiCircularProgress'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiCollapse?: {
    defaultProps?: ComponentsProps['MuiCollapse'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCollapse'];
    variants?: ComponentsVariants<Theme>['MuiCollapse'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiContainer?: {
    defaultProps?: ComponentsProps['MuiContainer'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiContainer'];
    variants?: ComponentsVariants<Theme>['MuiContainer'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiCssBaseline?: {
    defaultProps?: ComponentsProps['MuiCssBaseline'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCssBaseline'];
    variants?: ComponentsVariants<Theme>['MuiCssBaseline'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiDialog?: {
    defaultProps?: ComponentsProps['MuiDialog'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDialog'];
    variants?: ComponentsVariants<Theme>['MuiDialog'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiDialogActions?: {
    defaultProps?: ComponentsProps['MuiDialogActions'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDialogActions'];
    variants?: ComponentsVariants<Theme>['MuiDialogActions'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiDialogContent?: {
    defaultProps?: ComponentsProps['MuiDialogContent'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDialogContent'];
    variants?: ComponentsVariants<Theme>['MuiDialogContent'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiDialogContentText?: {
    defaultProps?: ComponentsProps['MuiDialogContentText'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDialogContentText'];
    variants?: ComponentsVariants<Theme>['MuiDialogContentText'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiDialogTitle?: {
    defaultProps?: ComponentsProps['MuiDialogTitle'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDialogTitle'];
    variants?: ComponentsVariants<Theme>['MuiDialogTitle'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiDivider?: {
    defaultProps?: ComponentsProps['MuiDivider'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDivider'];
    variants?: ComponentsVariants<Theme>['MuiDivider'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiDrawer?: {
    defaultProps?: ComponentsProps['MuiDrawer'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDrawer'];
    variants?: ComponentsVariants<Theme>['MuiDrawer'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiAccordion?: {
    defaultProps?: ComponentsProps['MuiAccordion'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAccordion'];
    variants?: ComponentsVariants<Theme>['MuiAccordion'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiAccordionActions?: {
    defaultProps?: ComponentsProps['MuiAccordionActions'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAccordionActions'];
    variants?: ComponentsVariants<Theme>['MuiAccordionActions'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiAccordionDetails?: {
    defaultProps?: ComponentsProps['MuiAccordionDetails'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAccordionDetails'];
    variants?: ComponentsVariants<Theme>['MuiAccordionDetails'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiAccordionSummary?: {
    defaultProps?: ComponentsProps['MuiAccordionSummary'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAccordionSummary'];
    variants?: ComponentsVariants<Theme>['MuiAccordionSummary'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiFab?: {
    defaultProps?: ComponentsProps['MuiFab'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiFab'];
    variants?: ComponentsVariants<Theme>['MuiFab'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiFilledInput?: {
    defaultProps?: ComponentsProps['MuiFilledInput'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiFilledInput'];
    variants?: ComponentsVariants<Theme>['MuiFilledInput'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiFormControl?: {
    defaultProps?: ComponentsProps['MuiFormControl'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiFormControl'];
    variants?: ComponentsVariants<Theme>['MuiFormControl'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiFormControlLabel?: {
    defaultProps?: ComponentsProps['MuiFormControlLabel'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiFormControlLabel'];
    variants?: ComponentsVariants<Theme>['MuiFormControlLabel'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiFormGroup?: {
    defaultProps?: ComponentsProps['MuiFormGroup'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiFormGroup'];
    variants?: ComponentsVariants<Theme>['MuiFormGroup'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiFormHelperText?: {
    defaultProps?: ComponentsProps['MuiFormHelperText'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiFormHelperText'];
    variants?: ComponentsVariants<Theme>['MuiFormHelperText'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiFormLabel?: {
    defaultProps?: ComponentsProps['MuiFormLabel'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiFormLabel'];
    variants?: ComponentsVariants<Theme>['MuiFormLabel'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiGridLegacy?: {
    defaultProps?: ComponentsProps['MuiGridLegacy'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiGridLegacy'];
    variants?: ComponentsVariants<Theme>['MuiGridLegacy'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiGrid?: {
    defaultProps?: ComponentsProps['MuiGrid'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiGrid'];
    variants?: ComponentsVariants<Theme>['MuiGrid'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiImageList?: {
    defaultProps?: ComponentsProps['MuiImageList'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiImageList'];
    variants?: ComponentsVariants<Theme>['MuiImageList'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiImageListItem?: {
    defaultProps?: ComponentsProps['MuiImageListItem'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiImageListItem'];
    variants?: ComponentsVariants<Theme>['MuiImageListItem'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiImageListItemBar?: {
    defaultProps?: ComponentsProps['MuiImageListItemBar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiImageListItemBar'];
    variants?: ComponentsVariants<Theme>['MuiImageListItemBar'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiIcon?: {
    defaultProps?: ComponentsProps['MuiIcon'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiIcon'];
    variants?: ComponentsVariants<Theme>['MuiIcon'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiIconButton?: {
    defaultProps?: ComponentsProps['MuiIconButton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiIconButton'];
    variants?: ComponentsVariants<Theme>['MuiIconButton'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiInput?: {
    defaultProps?: ComponentsProps['MuiInput'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiInput'];
    variants?: ComponentsVariants<Theme>['MuiInput'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiInputAdornment?: {
    defaultProps?: ComponentsProps['MuiInputAdornment'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiInputAdornment'];
    variants?: ComponentsVariants<Theme>['MuiInputAdornment'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiInputBase?: {
    defaultProps?: ComponentsProps['MuiInputBase'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiInputBase'];
    variants?: ComponentsVariants<Theme>['MuiInputBase'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiInputLabel?: {
    defaultProps?: ComponentsProps['MuiInputLabel'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiInputLabel'];
    variants?: ComponentsVariants<Theme>['MuiInputLabel'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiLinearProgress?: {
    defaultProps?: ComponentsProps['MuiLinearProgress'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiLinearProgress'];
    variants?: ComponentsVariants<Theme>['MuiLinearProgress'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiLink?: {
    defaultProps?: ComponentsProps['MuiLink'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiLink'];
    variants?: ComponentsVariants<Theme>['MuiLink'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiList?: {
    defaultProps?: ComponentsProps['MuiList'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiList'];
    variants?: ComponentsVariants<Theme>['MuiList'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiListItem?: {
    defaultProps?: ComponentsProps['MuiListItem'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiListItem'];
    variants?: ComponentsVariants<Theme>['MuiListItem'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiListItemButton?: {
    defaultProps?: ComponentsProps['MuiListItemButton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiListItemButton'];
    variants?: ComponentsVariants<Theme>['MuiListItemButton'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiListItemAvatar?: {
    defaultProps?: ComponentsProps['MuiListItemAvatar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiListItemAvatar'];
    variants?: ComponentsVariants<Theme>['MuiListItemAvatar'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiListItemIcon?: {
    defaultProps?: ComponentsProps['MuiListItemIcon'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiListItemIcon'];
    variants?: ComponentsVariants<Theme>['MuiListItemIcon'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiListItemSecondaryAction?: {
    defaultProps?: ComponentsProps['MuiListItemSecondaryAction'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiListItemSecondaryAction'];
    variants?: ComponentsVariants<Theme>['MuiListItemSecondaryAction'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiListItemText?: {
    defaultProps?: ComponentsProps['MuiListItemText'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiListItemText'];
    variants?: ComponentsVariants<Theme>['MuiListItemText'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiListSubheader?: {
    defaultProps?: ComponentsProps['MuiListSubheader'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiListSubheader'];
    variants?: ComponentsVariants<Theme>['MuiListSubheader'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiMenu?: {
    defaultProps?: ComponentsProps['MuiMenu'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiMenu'];
    variants?: ComponentsVariants<Theme>['MuiMenu'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiMenuItem?: {
    defaultProps?: ComponentsProps['MuiMenuItem'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiMenuItem'];
    variants?: ComponentsVariants<Theme>['MuiMenuItem'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiMenuList?: {
    defaultProps?: ComponentsProps['MuiMenuList'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiMenuList'];
    variants?: ComponentsVariants<Theme>['MuiMenuList'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiMobileStepper?: {
    defaultProps?: ComponentsProps['MuiMobileStepper'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiMobileStepper'];
    variants?: ComponentsVariants<Theme>['MuiMobileStepper'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiModal?: {
    defaultProps?: ComponentsProps['MuiModal'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiModal'];
    variants?: ComponentsVariants<Theme>['MuiModal'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiNativeSelect?: {
    defaultProps?: ComponentsProps['MuiNativeSelect'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiNativeSelect'];
    variants?: ComponentsVariants<Theme>['MuiNativeSelect'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiOutlinedInput?: {
    defaultProps?: ComponentsProps['MuiOutlinedInput'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiOutlinedInput'];
    variants?: ComponentsVariants<Theme>['MuiOutlinedInput'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiPagination?: {
    defaultProps?: ComponentsProps['MuiPagination'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPagination'];
    variants?: ComponentsVariants<Theme>['MuiPagination'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiPaginationItem?: {
    defaultProps?: ComponentsProps['MuiPaginationItem'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPaginationItem'];
    variants?: ComponentsVariants<Theme>['MuiPaginationItem'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiPaper?: {
    defaultProps?: ComponentsProps['MuiPaper'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPaper'];
    variants?: ComponentsVariants<Theme>['MuiPaper'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiPopper?: {
    defaultProps?: ComponentsProps['MuiPopper'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPopper'];
  shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiPopover?: {
    defaultProps?: ComponentsProps['MuiPopover'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPopover'];
    variants?: ComponentsVariants<Theme>['MuiPopover'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiRadio?: {
    defaultProps?: ComponentsProps['MuiRadio'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiRadio'];
    variants?: ComponentsVariants<Theme>['MuiRadio'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiRadioGroup?: {
    defaultProps?: ComponentsProps['MuiRadioGroup'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiRadioGroup'];
    variants?: ComponentsVariants<Theme>['MuiRadioGroup'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiRating?: {
    defaultProps?: ComponentsProps['MuiRating'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiRating'];
    variants?: ComponentsVariants<Theme>['MuiRating'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiScopedCssBaseline?: {
    defaultProps?: ComponentsProps['MuiScopedCssBaseline'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiScopedCssBaseline'];
    variants?: ComponentsVariants<Theme>['MuiScopedCssBaseline'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiSelect?: {
    defaultProps?: ComponentsProps['MuiSelect'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSelect'];
    variants?: ComponentsVariants<Theme>['MuiSelect'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiSkeleton?: {
    defaultProps?: ComponentsProps['MuiSkeleton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSkeleton'];
    variants?: ComponentsVariants<Theme>['MuiSkeleton'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiSlider?: {
    defaultProps?: ComponentsProps['MuiSlider'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSlider'];
    variants?: ComponentsVariants<Theme>['MuiSlider'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiSnackbar?: {
    defaultProps?: ComponentsProps['MuiSnackbar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSnackbar'];
    variants?: ComponentsVariants<Theme>['MuiSnackbar'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiSnackbarContent?: {
    defaultProps?: ComponentsProps['MuiSnackbarContent'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSnackbarContent'];
    variants?: ComponentsVariants<Theme>['MuiSnackbarContent'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiSpeedDial?: {
    defaultProps?: ComponentsProps['MuiSpeedDial'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSpeedDial'];
    variants?: ComponentsVariants<Theme>['MuiSpeedDial'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiSpeedDialAction?: {
    defaultProps?: ComponentsProps['MuiSpeedDialAction'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSpeedDialAction'];
    variants?: ComponentsVariants<Theme>['MuiSpeedDialAction'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiSpeedDialIcon?: {
    defaultProps?: ComponentsProps['MuiSpeedDialIcon'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSpeedDialIcon'];
    variants?: ComponentsVariants<Theme>['MuiSpeedDialIcon'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiStack?: {
    defaultProps?: ComponentsProps['MuiStack'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiStack'];
    variants?: ComponentsVariants<Theme>['MuiStack'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiStep?: {
    defaultProps?: ComponentsProps['MuiStep'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiStep'];
    variants?: ComponentsVariants<Theme>['MuiStep'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiStepButton?: {
    defaultProps?: ComponentsProps['MuiStepButton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiStepButton'];
    variants?: ComponentsVariants<Theme>['MuiStepButton'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiStepConnector?: {
    defaultProps?: ComponentsProps['MuiStepConnector'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiStepConnector'];
    variants?: ComponentsVariants<Theme>['MuiStepConnector'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiStepContent?: {
    defaultProps?: ComponentsProps['MuiStepContent'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiStepContent'];
    variants?: ComponentsVariants<Theme>['MuiStepContent'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiStepIcon?: {
    defaultProps?: ComponentsProps['MuiStepIcon'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiStepIcon'];
    variants?: ComponentsVariants<Theme>['MuiStepIcon'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiStepLabel?: {
    defaultProps?: ComponentsProps['MuiStepLabel'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiStepLabel'];
    variants?: ComponentsVariants<Theme>['MuiStepLabel'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiStepper?: {
    defaultProps?: ComponentsProps['MuiStepper'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiStepper'];
    variants?: ComponentsVariants<Theme>['MuiStepper'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiSvgIcon?: {
    defaultProps?: ComponentsProps['MuiSvgIcon'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSvgIcon'];
    variants?: ComponentsVariants<Theme>['MuiSvgIcon'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiSwipeableDrawer?: {
    defaultProps?: ComponentsProps['MuiSwipeableDrawer'];
  };
  MuiSwitch?: {
    defaultProps?: ComponentsProps['MuiSwitch'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSwitch'];
    variants?: ComponentsVariants<Theme>['MuiSwitch'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTab?: {
    defaultProps?: ComponentsProps['MuiTab'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTab'];
    variants?: ComponentsVariants<Theme>['MuiTab'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTable?: {
    defaultProps?: ComponentsProps['MuiTable'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTable'];
    variants?: ComponentsVariants<Theme>['MuiTable'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTableBody?: {
    defaultProps?: ComponentsProps['MuiTableBody'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTableBody'];
    variants?: ComponentsVariants<Theme>['MuiTableBody'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTableCell?: {
    defaultProps?: ComponentsProps['MuiTableCell'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTableCell'];
    variants?: ComponentsVariants<Theme>['MuiTableCell'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTableContainer?: {
    defaultProps?: ComponentsProps['MuiTableContainer'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTableContainer'];
    variants?: ComponentsVariants<Theme>['MuiTableContainer'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTableFooter?: {
    defaultProps?: ComponentsProps['MuiTableFooter'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTableFooter'];
    variants?: ComponentsVariants<Theme>['MuiTableFooter'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTableHead?: {
    defaultProps?: ComponentsProps['MuiTableHead'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTableHead'];
    variants?: ComponentsVariants<Theme>['MuiTableHead'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTablePagination?: {
    defaultProps?: ComponentsProps['MuiTablePagination'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTablePagination'];
    variants?: ComponentsVariants<Theme>['MuiTablePagination'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTablePaginationActions?: {
    defaultProps?: ComponentsProps['MuiTablePaginationActions'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTablePaginationActions'];
    variants?: ComponentsVariants<Theme>['MuiTablePaginationActions'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTableRow?: {
    defaultProps?: ComponentsProps['MuiTableRow'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTableRow'];
    variants?: ComponentsVariants<Theme>['MuiTableRow'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTableSortLabel?: {
    defaultProps?: ComponentsProps['MuiTableSortLabel'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTableSortLabel'];
    variants?: ComponentsVariants<Theme>['MuiTableSortLabel'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTabs?: {
    defaultProps?: ComponentsProps['MuiTabs'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTabs'];
    variants?: ComponentsVariants<Theme>['MuiTabs'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTextField?: {
    defaultProps?: ComponentsProps['MuiTextField'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTextField'];
    variants?: ComponentsVariants<Theme>['MuiTextField'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiToggleButton?: {
    defaultProps?: ComponentsProps['MuiToggleButton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiToggleButton'];
    variants?: ComponentsVariants<Theme>['MuiToggleButton'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiToggleButtonGroup?: {
    defaultProps?: ComponentsProps['MuiToggleButtonGroup'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiToggleButtonGroup'];
    variants?: ComponentsVariants<Theme>['MuiToggleButtonGroup'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiToolbar?: {
    defaultProps?: ComponentsProps['MuiToolbar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiToolbar'];
    variants?: ComponentsVariants<Theme>['MuiToolbar'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTooltip?: {
    defaultProps?: ComponentsProps['MuiTooltip'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTooltip'];
    variants?: ComponentsVariants<Theme>['MuiTooltip'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTouchRipple?: {
    defaultProps?: ComponentsProps['MuiTouchRipple'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTouchRipple'];
    variants?: ComponentsVariants<Theme>['MuiTouchRipple'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiTypography?: {
    defaultProps?: ComponentsProps['MuiTypography'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTypography'];
    variants?: ComponentsVariants<Theme>['MuiTypography'];
    shouldForwardProp?: (propName: PropertyKey) => boolean;
  };
  MuiUseMediaQuery?: {
    defaultProps?: ComponentsProps['MuiUseMediaQuery'];
  };
}
