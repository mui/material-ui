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
  /**
   * State class applied to the root element while scrubbing.
   * @ignore Documented on the root slot. The generated rule table lists direct theme override keys.
   */
  scrubbing: string;
  /** Styles applied to each controls adornment. */
  controls: string;
  /** Styles applied to the wrapper around the start adornment content. */
  startAdornment: string;
  /** Styles applied to the wrapper around the end adornment content. */
  endAdornment: string;
  /** Styles applied to the increment button. */
  incrementButton: string;
  /** Styles applied to the decrement button. */
  decrementButton: string;
  /** Styles applied to the scrub area. */
  scrubArea: string;
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
  'startAdornment',
  'endAdornment',
  'incrementButton',
  'decrementButton',
  'scrubArea',
  'scrubAreaCursor',
]);

export default numberFieldClasses;
