import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface SnackbarUnstyledClasses {
  /** Class name applied to the root element. */
  root: string;
}

export function getSnackbarUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('BaseSnackbar', slot);
}

const snackbarUnstyledClasses: SnackbarUnstyledClasses = generateUtilityClasses('BaseSnackbar', [
  'root',
]);

export default snackbarUnstyledClasses;
