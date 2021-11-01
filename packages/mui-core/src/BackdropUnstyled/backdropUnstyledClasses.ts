import generateUtilityClasses from '../generateUtilityClasses';
import generateUtilityClass from '../generateUtilityClass';

export interface BackdropUnstyledClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `invisible={true}`. */
  invisible: string;
}

export type BackdropUnstyledClassKey = keyof BackdropUnstyledClasses;

export function getBackdropUtilityClass(slot: string): string {
  return generateUtilityClass('MuiBackdrop', slot);
}

export const getBackdropUnstyledClasses = (): BackdropUnstyledClasses => generateUtilityClasses('MuiBackdrop', [
  'root',
  'invisible',
]);

const backdropUnstyledClasses = getBackdropUnstyledClasses();

export default backdropUnstyledClasses;
