import { generateUtilityClasses, generateUtilityClass } from '@material-ui/unstyled';

export interface FormControlLabelClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `labelPlacement="start"`. */
  labelPlacementStart: string;
  /** Styles applied to the root element if `labelPlacement="top"`. */
  labelPlacementTop: string;
  /** Styles applied to the root element if `labelPlacement="bottom"`. */
  labelPlacementBottom: string;
  /** Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the label's Typography component. */
  label: string;
}

export type FormControlLabelClassKey = keyof FormControlLabelClasses;

export function getFormControlLabelUtilityClasses(slot: string): string {
  return generateUtilityClass('MuiFormControlLabel', slot);
}

const formControlLabelClasses: FormControlLabelClasses = generateUtilityClasses(
  'MuiFormControlLabel',
  ['root', 'labelPlacementStart', 'labelPlacementTop', 'labelPlacementBottom', 'disabled', 'label'],
);

export default formControlLabelClasses;
