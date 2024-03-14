import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'Popper';

export interface PopperClasses {
  /** Class name applied to the root element. */
  root: string;
}

export type PopperClassKey = keyof PopperClasses;

export function getPopperUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const popperClasses: PopperClasses = generateUtilityClasses(COMPONENT_NAME, ['root']);
