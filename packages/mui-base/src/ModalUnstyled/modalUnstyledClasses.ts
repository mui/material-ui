import generateUtilityClasses from '../generateUtilityClasses';
import generateUtilityClass from '../generateUtilityClass';

export interface ModalUnstyledClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if the `Modal` has exited. */
  hidden: string;
  /** Styles applied to the backdrop element. */
  backdrop: string;
}

export type ModalUnstyledClassKey = keyof ModalUnstyledClasses;

export function getModalUtilityClass(slot: string): string {
  return generateUtilityClass('MuiModal', slot);
}

const modalUnstyledClasses: ModalUnstyledClasses = generateUtilityClasses('MuiModal', [
  'root',
  'hidden',
  'backdrop',
]);

export default modalUnstyledClasses;
