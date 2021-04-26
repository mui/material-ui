import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getPickersToolbarButtonUtilityClass(slot: string) {
  return generateUtilityClass('MuiPickersToolbarButton', slot);
}

const pickersToolbarButtonClasses = generateUtilityClasses('MuiPickersToolbarButton', [
  'root',
]);

export default pickersToolbarButtonClasses;
