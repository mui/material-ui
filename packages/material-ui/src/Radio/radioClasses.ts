import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface RadioClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Pseudo-class applied to the root element if `checked={true}`. */
  checked: string;
  /** Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
}

export type RadioClassKey = keyof RadioClasses;

export function getRadioUtilityClass(slot: string): string {
  return generateUtilityClass('MuiRadio', slot);
}

const radioClasses: RadioClasses = generateUtilityClasses('MuiRadio', [
  'root',
  'checked',
  'disabled',
  'colorPrimary',
  'colorSecondary',
]);

export default radioClasses;
