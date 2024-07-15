import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'Button';

export interface ButtonClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `button` element if `active={true}`. */
  active: string;
  /** State class applied to the root `button` element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root `button` element if `focusVisible={true}`. */
  focusVisible: string;
}

export type ButtonClassKey = keyof ButtonClasses;

export function getButtonUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const buttonClasses: ButtonClasses = generateUtilityClasses(COMPONENT_NAME, [
  'root',
  'active',
  'disabled',
  'focusVisible',
]);
