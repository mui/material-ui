import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import { inputBaseClasses } from '../InputBase';

export interface FilledInputClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if color secondary. */
  colorSecondary: string;
  /** Styles applied to the root element unless `disableUnderline={true}`. */
  underline: string;
  /** State class applied to the root element if the component is focused. */
  focused: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** Styles applied to the root element if `hiddenLabel={true}`. */
  hiddenLabel: string;
  /** Styles applied to the input element. */
  input: string;
}

export type FilledInputClassKey = keyof FilledInputClasses;

export function getFilledInputUtilityClass(slot: string): string {
  return generateUtilityClass('MuiFilledInput', slot);
}

const filledInputClasses: FilledInputClasses = {
  ...inputBaseClasses,
  ...generateUtilityClasses('MuiFilledInput', ['root', 'underline', 'input']),
};

export default filledInputClasses;
