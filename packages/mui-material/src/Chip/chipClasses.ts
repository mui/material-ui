import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface ChipClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `size="medium"`. */
  sizeMedium: string;
  /** Styles applied to the root element if `color="error"`. */
  colorError: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `onClick` is defined or `clickable={true}`. */
  clickable: string;
  /** Styles applied to the root element if `onClick` and `color="primary"` is defined or `clickable={true}`. */
  clickableColorPrimary: string;
  /** Styles applied to the root element if `onClick` and `color="secondary"` is defined or `clickable={true}`. */
  clickableColorSecondary: string;
  /** Styles applied to the root element if `onDelete` is defined. */
  deletable: string;
  /** Styles applied to the root element if `onDelete` and `color="primary"` is defined. */
  deletableColorPrimary: string;
  /** Styles applied to the root element if `onDelete` and `color="secondary"` is defined. */
  deletableColorSecondary: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="filled"`. */
  filled: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
  outlinedPrimary: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
  outlinedSecondary: string;
  /** Styles applied to the root element if `variant="filled"` and `color="primary"`. */
  filledPrimary: string;
  /** Styles applied to the root element if `variant="filled"` and `color="secondary"`. */
  filledSecondary: string;
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
  /** Styles applied to the deleteIcon element if `color="primary"` and `variant="outlined"`. */
  deleteIconOutlinedColorPrimary: string;
  /** Styles applied to the deleteIcon element if `color="secondary"` and `variant="outlined"`. */
  deleteIconOutlinedColorSecondary: string;
  /** Styles applied to the deleteIcon element if `color="primary"` and `variant="filled"`. */
  deleteIconFilledColorPrimary: string;
  /** Styles applied to the deleteIcon element if `color="secondary"` and `variant="filled"`. */
  deleteIconFilledColorSecondary: string;
  /** State class applied to the root element if keyboard focused. */
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
  'colorError',
  'colorInfo',
  'colorPrimary',
  'colorSecondary',
  'colorSuccess',
  'colorWarning',
  'disabled',
  'clickable',
  'clickableColorPrimary',
  'clickableColorSecondary',
  'deletable',
  'deletableColorPrimary',
  'deletableColorSecondary',
  'outlined',
  'filled',
  'outlinedPrimary',
  'outlinedSecondary',
  'filledPrimary',
  'filledSecondary',
  'avatar',
  'avatarSmall',
  'avatarMedium',
  'avatarColorPrimary',
  'avatarColorSecondary',
  'icon',
  'iconSmall',
  'iconMedium',
  'iconColorPrimary',
  'iconColorSecondary',
  'label',
  'labelSmall',
  'labelMedium',
  'deleteIcon',
  'deleteIconSmall',
  'deleteIconMedium',
  'deleteIconColorPrimary',
  'deleteIconColorSecondary',
  'deleteIconOutlinedColorPrimary',
  'deleteIconOutlinedColorSecondary',
  'deleteIconFilledColorPrimary',
  'deleteIconFilledColorSecondary',
  'focusVisible',
]);

export default chipClasses;
