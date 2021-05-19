import { ModalUnstyledClassKey } from './ModalUnstyled';

export type ModalUnstyledClasses = Record<ModalUnstyledClassKey, string>;

declare const modalUnstyledClasses: ModalUnstyledClasses;

export function getModalUtilityClass(slot: string): string;

export default modalUnstyledClasses;
