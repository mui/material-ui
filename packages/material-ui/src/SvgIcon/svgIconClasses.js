import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getSvgIconUtilityClass(slot) {
  return generateUtilityClass('MuiSvgIcon', slot);
}

const svgIconClasses = generateUtilityClasses('MuiSvgIcon', [
  'root',
  'colorPrimary',
  'colorSecondary',
  'colorAction',
  'colorError',
  'colorDisabled',
  'fontSizeInherit',
  'fontSizeSmall',
  'fontSizeMedium',
  'fontSizeLarge',
]);

export default svgIconClasses;
