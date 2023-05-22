import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface PopperClasses {
  /** Class name applied to the root element. */
  root: string;
}

export type PopperClassKey = keyof PopperClasses;

export function getPopperUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPopper', slot);
}

const popperClasses: PopperClasses = generateUtilityClasses('MuiPopper', ['root']);

export default popperClasses;
