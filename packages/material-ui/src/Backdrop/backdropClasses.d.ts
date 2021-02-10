import { BackdropClassKey } from './Backdrop';

export type BackdropClasses = Record<BackdropClassKey, string>;

declare const backdropClasses: BackdropClasses;

export function getBackdropUtilityClass(slot: string): string;

export default backdropClasses;
