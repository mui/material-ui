import { generateUtilityClasses, generateUtilityClass } from '@material-ui/unstyled';

export function getFormControlLabelUtilityClasses(slot) {
  return generateUtilityClass('MuiFormControlLabel', slot);
}

const formControlLabelClasses = generateUtilityClasses('MuiFormControlLabel', [
  'root',
  'labelPlacementStart',
  'labelPlacementTop',
  'labelPlacementBottom',
  'disabled',
  'label',
]);

export default formControlLabelClasses;
