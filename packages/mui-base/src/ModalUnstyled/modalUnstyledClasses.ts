import generateUtilityClasses from '../generateUtilityClasses';
import generateUtilityClass from '../generateUtilityClass';

export interface ModalUnstyledClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if the `Modal` has exited. */
  hidden: string;
}

export type ModalUnstyledClassKey = keyof ModalUnstyledClasses;

// TODO: change `MuiModal` to 'BaseModal` after it's possible to customize the prefix from Material UI components.
export function getModalUtilityClass(slot: string): string {
  return generateUtilityClass('MuiModal', slot);
}

const modalUnstyledClasses: ModalUnstyledClasses = generateUtilityClasses('MuiModal', [
  'root',
  'hidden',
]);

export default modalUnstyledClasses;
