import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface BackdropClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `invisible={true}`. */
  invisible: string;
}

export type BackdropClassKey = keyof BackdropClasses;

export function getBackdropUtilityClass(slot: string): string {
  return generateUtilityClass('MuiBackdrop', slot);
}

const backdropClasses: BackdropClasses = generateUtilityClasses('MuiBackdrop', [
  'root',
  'invisible',
]);

export default backdropClasses;
