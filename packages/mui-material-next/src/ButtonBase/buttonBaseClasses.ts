import {
  unstable_generateUtilityClasses as generateUtilityClasses,
  unstable_generateUtilityClass as generateUtilityClass,
} from '@mui/utils';

export interface ButtonBaseClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if keyboard focused. */
  focusVisible: string;
  /** State class applied to the root element if the element is active. */
  active: string;
}

export type ButtonBaseClassKey = keyof ButtonBaseClasses;

export function getButtonBaseUtilityClass(slot: string): string {
  return generateUtilityClass('MuiButtonBase', slot);
}

const buttonBaseClasses: ButtonBaseClasses = generateUtilityClasses('MuiButtonBase', [
  'root',
  'disabled',
  'focusVisible',
  'active',
]);

export default buttonBaseClasses;
