import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface ChipClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `size="medium"`. */
  sizeMedium: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the root element if `color="error"`. */
  colorError: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `onClick` is defined or `clickable={true}`. */
  clickable: string;
  /** Styles applied to the root element if `onClick` and `color="primary"` is defined or `clickable={true}`. */
  clickableColorPrimary: string;
  /** Styles applied to the root element if `onClick` and `color="secondary"` is defined or `clickable={true}`. */
  clickableColorSecondary: string;
  /** Styles applied to the root element if `onClick` and `color="error"` is defined or `clickable={true}`. */
  clickableColorError: string;
  /** Styles applied to the root element if `onClick` and `color="info"` is defined or `clickable={true}`. */
  clickableColorInfo: string;
  /** Styles applied to the root element if `onClick` and `color="success"` is defined or `clickable={true}`. */
  clickableColorSuccess: string;
  /** Styles applied to the root element if `onClick` and `color="warning"` is defined or `clickable={true}`. */
  clickableColorWarning: string;
  /** Styles applied to the root element if `onDelete` is defined. */
  deletable: string;
  /** Styles applied to the root element if `onDelete` and `color="primary"` is defined. */
  deletableColorPrimary: string;
  /** Styles applied to the root element if `onDelete` and `color="secondary"` is defined. */
  deletableColorSecondary: string;
  /** Styles applied to the root element if `onDelete` and `color="error"` is defined. */
  deletableColorError: string;
  /** Styles applied to the root element if `onDelete` and `color="info"` is defined. */
  deletableColorInfo: string;
  /** Styles applied to the root element if `onDelete` and `color="success"` is defined. */
  deletableColorSuccess: string;
  /** Styles applied to the root element if `onDelete` and `color="warning"` is defined. */
  deletableColorWarning: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="filled"`. */
  filled: string;
  /** Styles applied to the root element if `variant="filled"` and `color="primary"`. */
  filledPrimary: string;
  /** Styles applied to the root element if `variant="filled"` and `color="secondary"`. */
  filledSecondary: string;
  /** Styles applied to the root element if `variant="filled"` and `color="error"`. */
  filledError: string;
  /** Styles applied to the root element if `variant="filled"` and `color="info"`. */
  filledInfo: string;
  /** Styles applied to the root element if `variant="filled"` and `color="success"`. */
  filledSuccess: string;
  /** Styles applied to the root element if `variant="filled"` and `color="warning"`. */
  filledWarning: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
  outlinedPrimary: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
  outlinedSecondary: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="error"`. */
  outlinedError: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="info"`. */
  outlinedInfo: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="success"`. */
  outlinedSuccess: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="warning"`. */
  outlinedWarning: string;
  /** Styles applied to the avatar element. */
  avatar: string;
  /** Styles applied to the avatar element if `size="small"`. */
  avatarSmall: string;
  /** Styles applied to the avatar element if `size="medium"`. */
  avatarMedium: string;
  /** Styles applied to the avatar element if `color="primary"`. */
  avatarColorPrimary: string;
  /** Styles applied to the avatar element if `color="secondary"`. */
  avatarColorSecondary: string;
  /** Styles applied to the avatar element if `color="error"`. */
  avatarColorError: string;
  /** Styles applied to the avatar element if `color="info"`. */
  avatarColorInfo: string;
  /** Styles applied to the avatar element if `color="success"`. */
  avatarColorSuccess: string;
  /** Styles applied to the avatar element if `color="warning"`. */
  avatarColorWarning: string;
  /** Styles applied to the icon element. */
  icon: string;
  /** Styles applied to the icon element if `size="small"`. */
  iconSmall: string;
  /** Styles applied to the icon element if `size="medium"`. */
  iconMedium: string;
  /** Styles applied to the icon element if `color="primary"`. */
  iconColorPrimary: string;
  /** Styles applied to the icon element if `color="secondary"`. */
  iconColorSecondary: string;
  /** Styles applied to the icon element if `color="error"`. */
  iconColorError: string;
  /** Styles applied to the icon element if `color="info"`. */
  iconColorInfo: string;
  /** Styles applied to the icon element if `color="success"`. */
  iconColorSuccess: string;
  /** Styles applied to the icon element if `color="warning"`. */
  iconColorWarning: string;
  /** Styles applied to the label `span` element. */
  label: string;
  /** Styles applied to the label `span` element if `size="small"`. */
  labelSmall: string;
  /** Styles applied to the label `span` element if `size="medium"`. */
  labelMedium: string;
  /** Styles applied to the deleteIcon element. */
  deleteIcon: string;
  /** Styles applied to the deleteIcon element if `size="small"`. */
  deleteIconSmall: string;
  /** Styles applied to the deleteIcon element if `size="medium"`. */
  deleteIconMedium: string;
  /** Styles applied to the deleteIcon element if `color="primary"` and `variant="filled"`. */
  deleteIconColorPrimary: string;
  /** Styles applied to the deleteIcon element if `color="secondary"` and `variant="filled"`. */
  deleteIconColorSecondary: string;
  /** Styles applied to the deleteIcon element if `color="error"` and `variant="filled"`. */
  deleteIconColorError: string;
  /** Styles applied to the deleteIcon element if `color="info"` and `variant="filled"`. */
  deleteIconColorInfo: string;
  /** Styles applied to the deleteIcon element if `color="success"` and `variant="filled"`. */
  deleteIconColorSuccess: string;
  /** Styles applied to the deleteIcon element if `color="warning"` and `variant="filled"`. */
  deleteIconColorWarning: string;
  /** Styles applied to the deleteIcon element if `color="primary"` and `variant="outlined"`. */
  deleteIconOutlinedColorPrimary: string;
  /** Styles applied to the deleteIcon element if `color="secondary"` and `variant="outlined"`. */
  deleteIconOutlinedColorSecondary: string;
  /** Styles applied to the deleteIcon element if `color="error"` and `variant="outlined"`. */
  deleteIconOutlinedColorError: string;
  /** Styles applied to the deleteIcon element if `color="info"` and `variant="outlined"`. */
  deleteIconOutlinedColorInfo: string;
  /** Styles applied to the deleteIcon element if `color="success"` and `variant="outlined"`. */
  deleteIconOutlinedColorSuccess: string;
  /** Styles applied to the deleteIcon element if `color="warning"` and `variant="outlined"`. */
  deleteIconOutlinedColorWarning: string;
  /** Pseudo-class applied to the root element if keyboard focused. */
  focusVisible: string;
}

export type ChipClassKey = keyof ChipClasses;

export function getChipUtilityClass(slot: string): string {
  return generateUtilityClass('MuiChip', slot);
}

const chipClasses: ChipClasses = generateUtilityClasses('MuiChip', [
  'root',
  'sizeSmall',
  'sizeMedium',
  'colorPrimary',
  'colorSecondary',
  'colorError',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'disabled',
  'clickable',
  'clickableColorPrimary',
  'clickableColorSecondary',
  'clickableColorError',
  'clickableColorInfo',
  'clickableColorSuccess',
  'clickableColorWarning',
  'deletable',
  'deletableColorPrimary',
  'deletableColorSecondary',
  'deletableColorError',
  'deletableColorInfo',
  'deletableColorSuccess',
  'deletableColorWarning',
  'outlined',
  'filled',
  'filledPrimary',
  'filledSecondary',
  'filledError',
  'filledInfo',
  'filledSuccess',
  'filledWarning',
  'outlinedPrimary',
  'outlinedSecondary',
  'outlinedError',
  'outlinedInfo',
  'outlinedSuccess',
  'outlinedWarning',
  'avatar',
  'avatarSmall',
  'avatarMedium',
  'avatarColorPrimary',
  'avatarColorSecondary',
  'avatarColorError',
  'avatarColorInfo',
  'avatarColorSuccess',
  'avatarColorWarning',
  'icon',
  'iconSmall',
  'iconMedium',
  'iconColorPrimary',
  'iconColorSecondary',
  'iconColorError',
  'iconColorInfo',
  'iconColorSuccess',
  'iconColorWarning',
  'label',
  'labelSmall',
  'labelMedium',
  'deleteIcon',
  'deleteIconSmall',
  'deleteIconMedium',
  'deleteIconColorPrimary',
  'deleteIconColorSecondary',
  'deleteIconColorError',
  'deleteIconColorInfo',
  'deleteIconColorSuccess',
  'deleteIconColorWarning',
  'deleteIconOutlinedColorPrimary',
  'deleteIconOutlinedColorSecondary',
  'deleteIconOutlinedColorError',
  'deleteIconOutlinedColorInfo',
  'deleteIconOutlinedColorSuccess',
  'deleteIconOutlinedColorWarning',
  'focusVisible',
]);

export default chipClasses;
