import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface ButtonBaseClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Pseudo-class applied to the root element if keyboard focused. */
  focusVisible: string;
}

export type ButtonBaseClassKey = keyof ButtonBaseClasses;

export function getButtonBaseUtilityClass(slot: string): string {
  return generateUtilityClass('MuiButtonBase', slot);
}

const buttonBaseClasses: ButtonBaseClasses = generateUtilityClasses('MuiButtonBase', [
  'root',
  'disabled',
  'focusVisible',
]);

export default buttonBaseClasses;
