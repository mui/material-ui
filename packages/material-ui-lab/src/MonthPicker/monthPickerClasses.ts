import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getMonthPickerUtilityClass(slot: string) {
  return generateUtilityClass('MuiMonthPicker', slot);
}

const monthPickerClasses = generateUtilityClasses('MuiMonthPicker', ['root']);

export default monthPickerClasses;
