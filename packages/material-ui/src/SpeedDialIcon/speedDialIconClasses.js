import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getSpeedDialIconUtilityClass(slot) {
  return generateUtilityClass('MuiSpeedDialIcon', slot);
}

const speedDialIconClasses = generateUtilityClasses('MuiSpeedDialIcon', [
  'root',
  'icon',
  'iconOpen',
  'iconWithOpenIconOpen',
  'openIcon',
  'openIconOpen',
]);

export default speedDialIconClasses;
