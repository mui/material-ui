import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ModalDialogDescriptionClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ModalDialogDescriptionClassKey = keyof ModalDialogDescriptionClasses;

export function getModalDialogDescriptionUtilityClass(slot: string): string {
  return generateUtilityClass('JoyModalDialogDescription', slot);
}

const modalDialogDescriptionClasses: ModalDialogDescriptionClasses = generateUtilityClasses(
  'JoyModalDialogDescription',
  ['root'],
);

export default modalDialogDescriptionClasses;
