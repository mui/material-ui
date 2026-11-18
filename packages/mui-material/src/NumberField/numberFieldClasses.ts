import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface NumberFieldClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the Material input root. */
  input: string;
  /** Styles applied to the native input element. */
  htmlInput: string;
  /** Styles applied to the input label. */
  inputLabel: string;
  /** Styles applied to the helper text. */
  formHelperText: string;
  /** State class applied to the root element while scrubbing. */
  scrubbing: string;
  /** Styles applied to each controls adornment. */
  controls: string;
  /** Styles applied to the increment button. */
  incrementButton: string;
  /** Styles applied to the decrement button. */
  decrementButton: string;
  /** Styles applied to the scrub area. */
  scrubArea: string;
  /** Styles applied to the scrub area's adornment. */
  scrubAreaAdornment: string;
  /** Styles applied to the scrub area cursor. */
  scrubAreaCursor: string;
}

export type NumberFieldClassKey = keyof NumberFieldClasses;

export function getNumberFieldUtilityClass(slot: string): string {
  return generateUtilityClass('MuiNumberField', slot);
}

const numberFieldClasses: NumberFieldClasses = generateUtilityClasses('MuiNumberField', [
  'root',
  'input',
  'htmlInput',
  'inputLabel',
  'formHelperText',
  'scrubbing',
  'controls',
  'incrementButton',
  'decrementButton',
  'scrubArea',
  'scrubAreaAdornment',
  'scrubAreaCursor',
]);

export default numberFieldClasses;
