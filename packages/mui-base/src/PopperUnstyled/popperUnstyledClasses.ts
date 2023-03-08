import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface PopperUnstyledClasses {
  root: string;
}

export type PopperUnstyledClassKey = keyof PopperUnstyledClasses;

export function getPopperUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPopper', slot);
}

const popperUnstyledClasses: PopperUnstyledClasses = generateUtilityClasses('MuiPopper', ['root']);

export default popperUnstyledClasses;
