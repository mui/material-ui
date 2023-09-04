import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface SnackbarClasses {
  /** Class name applied to the endDecorator element if supplied. */
  endDecorator: string;
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the startDecorator element if supplied. */
  startDecorator: string;
}

export type SnackbarClassKey = keyof SnackbarClasses;

export function getSnackbarUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSnackbar', slot);
}

const snackbarClasses: SnackbarClasses = generateUtilityClasses('MuiSnackbar', [
  'root',
  'endDecorator',
  'startDecorator',
]);

export default snackbarClasses;
