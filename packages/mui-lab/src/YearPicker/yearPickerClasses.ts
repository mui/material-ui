import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export function getYearPickerUtilityClass(slot: string) {
  return generateUtilityClass('MuiYearPicker', slot);
}

export const getYearPickerClasses = () => generateUtilityClasses('MuiYearPicker', ['root']);

const yearPickerClasses = getYearPickerClasses();

export default yearPickerClasses;
