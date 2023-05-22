import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ModalOverflowClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ModalOverflowClassKey = keyof ModalOverflowClasses;

export function getModalOverflowUtilityClass(slot: string): string {
  return generateUtilityClass('MuiModalOverflow', slot);
}

const modalOverflowClasses: ModalOverflowClasses = generateUtilityClasses('MuiModalOverflow', [
  'root',
]);

export default modalOverflowClasses;
