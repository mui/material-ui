import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export function getYearPickerUtilityClass(slot: string) {
  return generateUtilityClass('MuiYearPicker', slot);
}

const yearPickerClasses = generateUtilityClasses('MuiYearPicker', ['root']);

export default yearPickerClasses;
