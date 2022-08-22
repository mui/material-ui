import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ModalDialogTitleClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ModalDialogTitleClassKey = keyof ModalDialogTitleClasses;

export function getModalDialogTitleUtilityClass(slot: string): string {
  return generateUtilityClass('JoyModalDialogTitle', slot);
}

const modalDialogTitleClasses: ModalDialogTitleClasses = generateUtilityClasses(
  'JoyModalDialogTitle',
  ['root'],
);

export default modalDialogTitleClasses;
