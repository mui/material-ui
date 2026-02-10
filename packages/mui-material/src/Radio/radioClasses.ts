import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface RadioClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `checked={true}`. */
  checked: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
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
  'sizeSmall',
]);

export default radioClasses;
