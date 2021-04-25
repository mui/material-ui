import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getPickersYearUtilityClass(slot: string) {
  return generateUtilityClass('MuiPickersYear', slot);
}

const pickersYearClasses = generateUtilityClasses('MuiPickersYear', [
  'root',
  'modeDesktop',
  'modeMobile',
  'yearButton',
  'disabled',
  'selected',
]);

export default pickersYearClasses;
