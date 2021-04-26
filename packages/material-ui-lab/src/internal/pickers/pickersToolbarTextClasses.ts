import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getPickersToolbarTextUtilityClass(slot: string) {
  return generateUtilityClass('MuiPickersToolbarText', slot);
}

const pickersToolbarTextClasses = generateUtilityClasses('MuiPickersToolbarText', [
  'root',
  'selected',
]);

export default pickersToolbarTextClasses;
