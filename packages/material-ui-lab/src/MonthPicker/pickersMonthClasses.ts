import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getPickersMonthUtilityClass(slot: string) {
  return generateUtilityClass('MuiPickersMonth', slot);
}

const pickersMonthClasses = generateUtilityClasses('MuiPickersMonth', ['root', 'selected']);

export default pickersMonthClasses;
