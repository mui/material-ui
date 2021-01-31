import { ButtonTypeMap } from './Button';

export type ButtonClasses = ButtonTypeMap['props']['classes'];

declare const buttonClasses: ButtonClasses;

export function getButtonUtilityClass(slot: string): string;

export default buttonClasses;
