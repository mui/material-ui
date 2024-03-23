import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface ModalClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if the `Modal` has exited. */
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
