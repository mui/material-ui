export interface ModalClasses {
  root: string;
  hidden: string;
}

declare const modalClasses: ModalClasses;

export function getModalUtilityClass(slot: string): string;

export default modalClasses;
