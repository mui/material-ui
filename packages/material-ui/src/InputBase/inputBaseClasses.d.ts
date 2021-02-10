import { InputBaseClassKey } from './InputBase';

export type InputBaseClasses = Record<InputBaseClassKey, string>;

declare const inputBaseClasses: InputBaseClasses;

export function getInputBaseUtilityClass(slot: string): string;

export default inputBaseClasses;
