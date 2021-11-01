import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface SwitchBaseClasses {
  root: string;
  checked: string;
  disabled: string;
  input: string;
  edgeStart: string;
  edgeEnd: string;
}

export type SwitchBaseClassKey = keyof SwitchBaseClasses;

export function getSwitchBaseUtilityClass(slot: string): string {
  return generateUtilityClass('PrivateSwitchBase', slot);
}

export const getSwitchBaseClasses = (): SwitchBaseClasses => generateUtilityClasses('PrivateSwitchBase', [
  'root',
  'checked',
  'disabled',
  'input',
  'edgeStart',
  'edgeEnd',
]);

const switchBaseClasses = getSwitchBaseClasses();

export default switchBaseClasses;
