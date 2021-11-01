import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface ButtonBaseClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if keyboard focused. */
  focusVisible: string;
}

export type ButtonBaseClassKey = keyof ButtonBaseClasses;

export function getButtonBaseUtilityClass(slot: string): string {
  return generateUtilityClass('MuiButtonBase', slot);
}

export const getButtonBaseClasses = (): ButtonBaseClasses => generateUtilityClasses('MuiButtonBase', [
  'root',
  'disabled',
  'focusVisible',
]);

const buttonBaseClasses = getButtonBaseClasses();

export default buttonBaseClasses;
