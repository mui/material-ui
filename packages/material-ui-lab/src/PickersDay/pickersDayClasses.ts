import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getPickersDayUtilityClass(slot: string) {
  return generateUtilityClass('MuiPickersDay', slot);
}

const pickersDayClasses = generateUtilityClasses('MuiPickersDay', [
  'root',
  'dayWithMargin',
  'dayOutsideMonth',
  'hiddenDaySpacingFiller',
  'today',
  'selected',
  'disabled',
]);

export default pickersDayClasses;
