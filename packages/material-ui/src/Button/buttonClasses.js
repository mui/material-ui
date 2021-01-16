import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getButtonUtilityClass(slot) {
  return generateUtilityClass('MuiButton', slot);
}

const buttonClasses = generateUtilityClasses('MuiButton', [
  'root',
  'label',
  'text',
  'textInherit',
  'textPrimary',
  'textSecondary',
  'outlined',
  'outlinedInherit',
  'outlinedPrimary',
  'outlinedSecondary',
  'contained',
  'containedInherit',
  'containedPrimary',
  'containedSecondary',
  'disableElevation',
  'focusVisible',
  'disabled',
  'colorInherit',
  'textSizeSmall',
  'textSizeMedium',
  'textSizeLarge',
  'outlinedSizeSmall',
  'outlinedSizeMedium',
  'outlinedSizeLarge',
  'containedSizeSmall',
  'containedSizeMedium',
  'containedSizeLarge',
  'sizeMedium',
  'sizeSmall',
  'sizeLarge',
  'fullWidth',
  'startIcon',
  'endIcon',
  'iconSizeSmall',
  'iconSizeMedium',
  'iconSizeLarge',
]);

export default buttonClasses;
