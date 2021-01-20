import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getIconUtilityClass(slot) {
  return generateUtilityClass('MuiIcon', slot);
}

const iconClasses = generateUtilityClasses('MuiIcon', [
  'root',
  'colorPrimary',
  'colorSecondary',
  'colorAction',
  'colorError',
  'colorDisabled',
  'fontSizeInherit',
  'fontSizeSmall',
  'fontSizeLarge',
]);

export default iconClasses;
