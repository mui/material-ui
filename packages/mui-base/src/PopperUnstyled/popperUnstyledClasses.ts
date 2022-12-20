import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface PopperUnstyledClasses {
  root: string;
}

export type PopperUnstyledClassKey = keyof PopperUnstyledClasses;

export function getPopperUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPopperUnstyled', slot);
}

const popperUnstyledClasses: PopperUnstyledClasses = generateUtilityClasses('MuiPopperUnstyled', [
  'root',
]);

export default popperUnstyledClasses;
