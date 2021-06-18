import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface CheckboxClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Pseudo-class applied to the root element if `checked={true}`. */
  checked: string;
  /** Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Pseudo-class applied to the root element if `indeterminate={true}`. */
  indeterminate: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
}

export type CheckboxClassKey = keyof CheckboxClasses;

export function getCheckboxUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCheckbox', slot);
}

const checkboxClasses: CheckboxClasses = generateUtilityClasses('MuiCheckbox', [
  'root',
  'checked',
  'disabled',
  'indeterminate',
  'colorPrimary',
  'colorSecondary',
]);

export default checkboxClasses;
