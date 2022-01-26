import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export function getYearPickerUtilityClass(slot: string) {
  return generateUtilityClass('MuiYearPicker', slot);
}

const yearPickerClasses = generateUtilityClasses('MuiYearPicker', ['root']);

export default yearPickerClasses;
