import { ButtonClassKey } from './Button';

export type ButtonClasses = Record<ButtonClassKey, string>;

declare const buttonClasses: ButtonClasses;

export function getButtonUtilityClass(slot: string): string;

export default buttonClasses;
