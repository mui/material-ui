import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ModalClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the backdrop element. */
  backdrop: string;
}

export type ModalClassKey = keyof ModalClasses;

export function getModalUtilityClass(slot: string): string {
  return generateUtilityClass('JoyModal', slot);
}

const modalClasses: ModalClasses = generateUtilityClasses('JoyModal', ['root', 'backdrop']);

export default modalClasses;
