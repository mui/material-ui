import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'Snackbar';

export interface SnackbarClasses {
  /** Class name applied to the root element. */
  root: string;
}

export function getSnackbarUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const snackbarClasses: SnackbarClasses = generateUtilityClasses(COMPONENT_NAME, ['root']);
