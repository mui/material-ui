import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'Option';

export interface OptionClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `li` element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root `li` element if `selected={true}`. */
  selected: string;
  /** State class applied to the root `li` element if `highlighted={true}`. */
  highlighted: string;
}

export type OptionClassKey = keyof OptionClasses;

export function getOptionUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const optionClasses: OptionClasses = generateUtilityClasses(COMPONENT_NAME, [
  'root',
  'disabled',
  'selected',
  'highlighted',
]);
