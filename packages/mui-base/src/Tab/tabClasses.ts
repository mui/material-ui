import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'Tab';

export interface TabClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `button` element if `selected={true}`. */
  selected: string;
  /** State class applied to the root `button` element if `disabled={true}`. */
  disabled: string;
}

export type TabClassKey = keyof TabClasses;

export function getTabUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const tabClasses: TabClasses = generateUtilityClasses(COMPONENT_NAME, [
  'root',
  'selected',
  'disabled',
]);
