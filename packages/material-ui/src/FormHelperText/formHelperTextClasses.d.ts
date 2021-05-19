import { FormHelperTextClassKey } from './FormHelperText';

export type FormHelperTextClasses = Record<FormHelperTextClassKey, string>;

declare const formHelperTextClasses: FormHelperTextClasses;

export function getFormHelperTextUtilityClasses(slot: string): string;

export default formHelperTextClasses;
