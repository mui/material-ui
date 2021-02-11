import { TouchRippleClassKey } from './TouchRipple';

export type TouchRippleClasses = Record<TouchRippleClassKey, string>;

declare const touchRippleClasses: TouchRippleClasses;

export function getTouchRippleUtilityClass(slot: string): string;

export default touchRippleClasses;
