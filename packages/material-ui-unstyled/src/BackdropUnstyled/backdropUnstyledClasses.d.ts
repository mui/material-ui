import { BackdropUnstyledClassKey } from './BackdropUnstyled';

export type BackdropUnstyledClasses = Record<BackdropUnstyledClassKey, string>;

declare const backdropUnstyledClasses: BackdropUnstyledClasses;

export function getBackdropUtilityClass(slot: string): string;

export default backdropUnstyledClasses;
