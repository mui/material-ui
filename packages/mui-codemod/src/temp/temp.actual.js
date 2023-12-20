import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export function getButtonUtilityClass(slot) {
  return generateUtilityClass('MuiButton', slot);
}

const buttonClasses = generateUtilityClasses('MuiButton', [
  'root',
  'text',
  'textInherit',
  'textPrimary',
  'textSecondary',
  'textSuccess',
  'textError',
  'textInfo',
  'textWarning',
  'outlined',
  'outlinedInherit',
  'outlinedPrimary',
  'outlinedSecondary',
  'outlinedSuccess',
  'outlinedError',
  'outlinedInfo',
  'outlinedWarning',
  'contained',
  'containedInherit',
  'containedPrimary',
  'containedSecondary',
  'containedSuccess',
  'containedError',
  'containedInfo',
  'containedWarning',
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
