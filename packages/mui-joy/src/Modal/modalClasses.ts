import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ModalClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element when open is false. */
  hidden: string;
  /** Class name applied to the backdrop element. */
  backdrop: string;
}

export type ModalClassKey = keyof ModalClasses;

export function getModalUtilityClass(slot: string): string {
  return generateUtilityClass('MuiModal', slot);
}

const modalClasses: ModalClasses = generateUtilityClasses('MuiModal', [
  'root',
  'hidden',
  'backdrop',
]);

export default modalClasses;
