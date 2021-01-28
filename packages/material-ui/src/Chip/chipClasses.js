import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getChipUtilityClass(slot) {
  return generateUtilityClass('MuiChip', slot);
}

const chipClasses = generateUtilityClasses('MuiChip', [
  'root',
  'sizeSmall',
  'sizeMedium',
  'colorPrimary',
  'colorSecondary',
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
  'focusVisible',
]);

export default chipClasses;
