import { ComponentsProps } from './props';
import { ComponentsOverrides } from './overrides';
import { ComponentsVariants } from './variants';

export interface Components<Theme = unknown> {
  MuiAlert?: {
    defaultProps?: ComponentsProps['MuiAlert'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAlert'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiAlert'];
  };
  MuiAlertTitle?: {
    defaultProps?: ComponentsProps['MuiAlertTitle'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAlertTitle'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiAlertTitle'];
  };
  MuiAppBar?: {
    defaultProps?: ComponentsProps['MuiAppBar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAppBar'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiAppBar'];
  };
  MuiAutocomplete?: {
    defaultProps?: ComponentsProps['MuiAutocomplete'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAutocomplete'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiAutocomplete'];
  };
  MuiAvatar?: {
    defaultProps?: ComponentsProps['MuiAvatar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAvatar'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiAvatar'];
  };
  MuiAvatarGroup?: {
    defaultProps?: ComponentsProps['MuiAvatarGroup'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAvatarGroup'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiAvatarGroup'];
  };
  MuiBackdrop?: {
    defaultProps?: ComponentsProps['MuiBackdrop'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiBackdrop'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiBackdrop'];
  };
  MuiBadge?: {
    defaultProps?: ComponentsProps['MuiBadge'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiBadge'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiBadge'];
  };
  MuiBottomNavigation?: {
    defaultProps?: ComponentsProps['MuiBottomNavigation'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiBottomNavigation'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiBottomNavigation'];
  };
  MuiBottomNavigationAction?: {
    defaultProps?: ComponentsProps['MuiBottomNavigationAction'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiBottomNavigationAction'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiBottomNavigationAction'];
  };
  MuiBreadcrumbs?: {
    defaultProps?: ComponentsProps['MuiBreadcrumbs'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiBreadcrumbs'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiBreadcrumbs'];
  };
  MuiButton?: {
    defaultProps?: ComponentsProps['MuiButton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiButton'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiButton'];
  };
  MuiButtonBase?: {
    defaultProps?: ComponentsProps['MuiButtonBase'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiButtonBase'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiButtonBase'];
  };
  MuiButtonGroup?: {
    defaultProps?: ComponentsProps['MuiButtonGroup'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiButtonGroup'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiButtonGroup'];
  };
  MuiCard?: {
    defaultProps?: ComponentsProps['MuiCard'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCard'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiCard'];
  };
  MuiCardActionArea?: {
    defaultProps?: ComponentsProps['MuiCardActionArea'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCardActionArea'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiCardActionArea'];
  };
  MuiCardActions?: {
    defaultProps?: ComponentsProps['MuiCardActions'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCardActions'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiCardActions'];
  };
  MuiCardContent?: {
    defaultProps?: ComponentsProps['MuiCardContent'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCardContent'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiCardContent'];
  };
  MuiCardHeader?: {
    defaultProps?: ComponentsProps['MuiCardHeader'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCardHeader'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiCardHeader'];
  };
  MuiCardMedia?: {
    defaultProps?: ComponentsProps['MuiCardMedia'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCardMedia'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiCardMedia'];
  };
  MuiCheckbox?: {
    defaultProps?: ComponentsProps['MuiCheckbox'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCheckbox'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiCheckbox'];
  };
  MuiChip?: {
    defaultProps?: ComponentsProps['MuiChip'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiChip'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiChip'];
  };
  MuiCircularProgress?: {
    defaultProps?: ComponentsProps['MuiCircularProgress'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCircularProgress'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiCircularProgress'];
  };
  MuiCollapse?: {
    defaultProps?: ComponentsProps['MuiCollapse'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCollapse'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiCollapse'];
  };
  MuiContainer?: {
    defaultProps?: ComponentsProps['MuiContainer'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiContainer'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiContainer'];
  };
  MuiCssBaseline?: {
    defaultProps?: ComponentsProps['MuiCssBaseline'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCssBaseline'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiCssBaseline'];
  };
  MuiDialog?: {
    defaultProps?: ComponentsProps['MuiDialog'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDialog'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiDialog'];
  };
  MuiDialogActions?: {
    defaultProps?: ComponentsProps['MuiDialogActions'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDialogActions'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiDialogActions'];
  };
  MuiDialogContent?: {
    defaultProps?: ComponentsProps['MuiDialogContent'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDialogContent'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiDialogContent'];
  };
  MuiDialogContentText?: {
    defaultProps?: ComponentsProps['MuiDialogContentText'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDialogContentText'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiDialogContentText'];
  };
  MuiDialogTitle?: {
    defaultProps?: ComponentsProps['MuiDialogTitle'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDialogTitle'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiDialogTitle'];
  };
  MuiDivider?: {
    defaultProps?: ComponentsProps['MuiDivider'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDivider'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiDivider'];
  };
  MuiDrawer?: {
    defaultProps?: ComponentsProps['MuiDrawer'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDrawer'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiDrawer'];
  };
  MuiAccordion?: {
    defaultProps?: ComponentsProps['MuiAccordion'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAccordion'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiAccordion'];
  };
  MuiAccordionActions?: {
    defaultProps?: ComponentsProps['MuiAccordionActions'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAccordionActions'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiAccordionActions'];
  };
  MuiAccordionDetails?: {
    defaultProps?: ComponentsProps['MuiAccordionDetails'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAccordionDetails'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiAccordionDetails'];
  };
  MuiAccordionSummary?: {
    defaultProps?: ComponentsProps['MuiAccordionSummary'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiAccordionSummary'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiAccordionSummary'];
  };
  MuiFab?: {
    defaultProps?: ComponentsProps['MuiFab'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiFab'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiFab'];
  };
  MuiFilledInput?: {
    defaultProps?: ComponentsProps['MuiFilledInput'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiFilledInput'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiFilledInput'];
  };
  MuiFormControl?: {
    defaultProps?: ComponentsProps['MuiFormControl'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiFormControl'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiFormControl'];
  };
  MuiFormControlLabel?: {
    defaultProps?: ComponentsProps['MuiFormControlLabel'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiFormControlLabel'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiFormControlLabel'];
  };
  MuiFormGroup?: {
    defaultProps?: ComponentsProps['MuiFormGroup'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiFormGroup'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiFormGroup'];
  };
  MuiFormHelperText?: {
    defaultProps?: ComponentsProps['MuiFormHelperText'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiFormHelperText'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiFormHelperText'];
  };
  MuiFormLabel?: {
    defaultProps?: ComponentsProps['MuiFormLabel'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiFormLabel'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiFormLabel'];
  };
  MuiGrid?: {
    defaultProps?: ComponentsProps['MuiGrid'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiGrid'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiGrid'];
  };
  MuiImageList?: {
    defaultProps?: ComponentsProps['MuiImageList'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiImageList'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiImageList'];
  };
  MuiImageListItem?: {
    defaultProps?: ComponentsProps['MuiImageListItem'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiImageListItem'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiImageListItem'];
  };
  MuiImageListItemBar?: {
    defaultProps?: ComponentsProps['MuiImageListItemBar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiImageListItemBar'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiImageListItemBar'];
  };
  MuiIcon?: {
    defaultProps?: ComponentsProps['MuiIcon'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiIcon'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiIcon'];
  };
  MuiIconButton?: {
    defaultProps?: ComponentsProps['MuiIconButton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiIconButton'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiIconButton'];
  };
  MuiInput?: {
    defaultProps?: ComponentsProps['MuiInput'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiInput'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiInput'];
  };
  MuiInputAdornment?: {
    defaultProps?: ComponentsProps['MuiInputAdornment'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiInputAdornment'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiInputAdornment'];
  };
  MuiInputBase?: {
    defaultProps?: ComponentsProps['MuiInputBase'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiInputBase'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiInputBase'];
  };
  MuiInputLabel?: {
    defaultProps?: ComponentsProps['MuiInputLabel'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiInputLabel'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiInputLabel'];
  };
  MuiLinearProgress?: {
    defaultProps?: ComponentsProps['MuiLinearProgress'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiLinearProgress'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiLinearProgress'];
  };
  MuiLink?: {
    defaultProps?: ComponentsProps['MuiLink'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiLink'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiLink'];
  };
  MuiList?: {
    defaultProps?: ComponentsProps['MuiList'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiList'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiList'];
  };
  MuiListItem?: {
    defaultProps?: ComponentsProps['MuiListItem'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiListItem'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiListItem'];
  };
  MuiListItemButton?: {
    defaultProps?: ComponentsProps['MuiListItemButton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiListItemButton'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiListItemButton'];
  };
  MuiListItemAvatar?: {
    defaultProps?: ComponentsProps['MuiListItemAvatar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiListItemAvatar'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiListItemAvatar'];
  };
  MuiListItemIcon?: {
    defaultProps?: ComponentsProps['MuiListItemIcon'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiListItemIcon'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiListItemIcon'];
  };
  MuiListItemSecondaryAction?: {
    defaultProps?: ComponentsProps['MuiListItemSecondaryAction'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiListItemSecondaryAction'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiListItemSecondaryAction'];
  };
  MuiListItemText?: {
    defaultProps?: ComponentsProps['MuiListItemText'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiListItemText'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiListItemText'];
  };
  MuiListSubheader?: {
    defaultProps?: ComponentsProps['MuiListSubheader'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiListSubheader'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiListSubheader'];
  };
  MuiMenu?: {
    defaultProps?: ComponentsProps['MuiMenu'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiMenu'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiMenu'];
  };
  MuiMenuItem?: {
    defaultProps?: ComponentsProps['MuiMenuItem'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiMenuItem'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiMenuItem'];
  };
  MuiMobileStepper?: {
    defaultProps?: ComponentsProps['MuiMobileStepper'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiMobileStepper'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiMobileStepper'];
  };
  MuiModal?: {
    defaultProps?: ComponentsProps['MuiModal'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiModal'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiModal'];
  };
  MuiNativeSelect?: {
    defaultProps?: ComponentsProps['MuiNativeSelect'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiNativeSelect'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiNativeSelect'];
  };
  MuiOutlinedInput?: {
    defaultProps?: ComponentsProps['MuiOutlinedInput'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiOutlinedInput'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiOutlinedInput'];
  };
  MuiPagination?: {
    defaultProps?: ComponentsProps['MuiPagination'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPagination'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiPagination'];
  };
  MuiPaginationItem?: {
    defaultProps?: ComponentsProps['MuiPaginationItem'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPaginationItem'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiPaginationItem'];
  };
  MuiPaper?: {
    defaultProps?: ComponentsProps['MuiPaper'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPaper'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiPaper'];
  };
  MuiPopover?: {
    defaultProps?: ComponentsProps['MuiPopover'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPopover'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiPopover'];
  };
  MuiRadio?: {
    defaultProps?: ComponentsProps['MuiRadio'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiRadio'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiRadio'];
  };
  MuiRating?: {
    defaultProps?: ComponentsProps['MuiRating'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiRating'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiRating'];
  };
  MuiScopedCssBaseline?: {
    defaultProps?: ComponentsProps['MuiScopedCssBaseline'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiScopedCssBaseline'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiScopedCssBaseline'];
  };
  MuiSelect?: {
    defaultProps?: ComponentsProps['MuiSelect'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSelect'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiSelect'];
  };
  MuiSkeleton?: {
    defaultProps?: ComponentsProps['MuiSkeleton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSkeleton'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiSkeleton'];
  };
  MuiSlider?: {
    defaultProps?: ComponentsProps['MuiSlider'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSlider'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiSlider'];
  };
  MuiSnackbar?: {
    defaultProps?: ComponentsProps['MuiSnackbar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSnackbar'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiSnackbar'];
  };
  MuiSnackbarContent?: {
    defaultProps?: ComponentsProps['MuiSnackbarContent'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSnackbarContent'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiSnackbarContent'];
  };
  MuiSpeedDial?: {
    defaultProps?: ComponentsProps['MuiSpeedDial'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSpeedDial'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiSpeedDial'];
  };
  MuiSpeedDialAction?: {
    defaultProps?: ComponentsProps['MuiSpeedDialAction'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSpeedDialAction'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiSpeedDialAction'];
  };
  MuiSpeedDialIcon?: {
    defaultProps?: ComponentsProps['MuiSpeedDialIcon'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSpeedDialIcon'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiSpeedDialIcon'];
  };
  MuiStack?: {
    defaultProps?: ComponentsProps['MuiStack'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiStack'];
  };
  MuiStep?: {
    defaultProps?: ComponentsProps['MuiStep'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiStep'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiStep'];
  };
  MuiStepButton?: {
    defaultProps?: ComponentsProps['MuiStepButton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiStepButton'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiStepButton'];
  };
  MuiStepConnector?: {
    defaultProps?: ComponentsProps['MuiStepConnector'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiStepConnector'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiStepConnector'];
  };
  MuiStepContent?: {
    defaultProps?: ComponentsProps['MuiStepContent'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiStepContent'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiStepContent'];
  };
  MuiStepIcon?: {
    defaultProps?: ComponentsProps['MuiStepIcon'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiStepIcon'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiStepIcon'];
  };
  MuiStepLabel?: {
    defaultProps?: ComponentsProps['MuiStepLabel'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiStepLabel'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiStepLabel'];
  };
  MuiStepper?: {
    defaultProps?: ComponentsProps['MuiStepper'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiStepper'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiStepper'];
  };
  MuiSvgIcon?: {
    defaultProps?: ComponentsProps['MuiSvgIcon'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSvgIcon'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiSvgIcon'];
  };
  MuiSwitch?: {
    defaultProps?: ComponentsProps['MuiSwitch'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiSwitch'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiSwitch'];
  };
  MuiTab?: {
    defaultProps?: ComponentsProps['MuiTab'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTab'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTab'];
  };
  MuiTable?: {
    defaultProps?: ComponentsProps['MuiTable'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTable'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTable'];
  };
  MuiTableBody?: {
    defaultProps?: ComponentsProps['MuiTableBody'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTableBody'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTableBody'];
  };
  MuiTableCell?: {
    defaultProps?: ComponentsProps['MuiTableCell'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTableCell'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTableCell'];
  };
  MuiTableContainer?: {
    defaultProps?: ComponentsProps['MuiTableContainer'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTableContainer'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTableContainer'];
  };
  MuiTableFooter?: {
    defaultProps?: ComponentsProps['MuiTableFooter'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTableFooter'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTableFooter'];
  };
  MuiTableHead?: {
    defaultProps?: ComponentsProps['MuiTableHead'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTableHead'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTableHead'];
  };
  MuiTablePagination?: {
    defaultProps?: ComponentsProps['MuiTablePagination'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTablePagination'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTablePagination'];
  };
  MuiTableRow?: {
    defaultProps?: ComponentsProps['MuiTableRow'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTableRow'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTableRow'];
  };
  MuiTableSortLabel?: {
    defaultProps?: ComponentsProps['MuiTableSortLabel'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTableSortLabel'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTableSortLabel'];
  };
  MuiTabs?: {
    defaultProps?: ComponentsProps['MuiTabs'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTabs'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTabs'];
  };
  MuiTextField?: {
    defaultProps?: ComponentsProps['MuiTextField'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTextField'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTextField'];
  };
  MuiToggleButton?: {
    defaultProps?: ComponentsProps['MuiToggleButton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiToggleButton'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiToggleButton'];
  };
  MuiToggleButtonGroup?: {
    defaultProps?: ComponentsProps['MuiToggleButtonGroup'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiToggleButtonGroup'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiToggleButtonGroup'];
  };
  MuiToolbar?: {
    defaultProps?: ComponentsProps['MuiToolbar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiToolbar'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiToolbar'];
  };
  MuiTooltip?: {
    defaultProps?: ComponentsProps['MuiTooltip'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTooltip'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTooltip'];
  };
  MuiTouchRipple?: {
    defaultProps?: ComponentsProps['MuiTouchRipple'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTouchRipple'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTouchRipple'];
  };
  MuiTypography?: {
    defaultProps?: ComponentsProps['MuiTypography'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTypography'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTypography'];
  };
  MuiUseMediaQuery?: {
    defaultProps?: ComponentsProps['MuiUseMediaQuery'];
  };
}
