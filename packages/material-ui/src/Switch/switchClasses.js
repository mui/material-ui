import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getSwitchUtilityClass(slot) {
  return generateUtilityClass('MuiSwitch', slot);
}

const switchClasses = generateUtilityClasses('MuiSwitch', [
  'root',
  'edgeStart',
  'edgeEnd',
  'switchBase',
  'colorPrimary',
  'colorSecondary',
  'sizeSmall',
  'sizeMedium',
  'checked',
  'disabled',
  'input',
  'thumb',
  'track',
]);

export default switchClasses;
