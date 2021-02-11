import { ButtonBaseClassKey } from './ButtonBase';

export type ButtonBaseClasses = Record<ButtonBaseClassKey, string>;

declare const buttonBaseClasses: ButtonBaseClasses;

export function getButtonBaseUtilityClass(slot: string): string;

export default buttonBaseClasses;
