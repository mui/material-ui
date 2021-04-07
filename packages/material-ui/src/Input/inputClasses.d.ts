import { InputClassKey } from './Input';

export type InputClasses = Record<InputClassKey, string>;

declare const inputClasses: InputClasses;

export function getInputUtilityClass(slot: string): string;

export default inputClasses;
