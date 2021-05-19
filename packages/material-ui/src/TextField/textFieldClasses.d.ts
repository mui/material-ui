import { TextFieldClassKey } from './TextField';

declare const textFieldClasses: Record<TextFieldClassKey, string>;

export function getTextFieldUtilityClass(slot: string): string;

export default textFieldClasses;
