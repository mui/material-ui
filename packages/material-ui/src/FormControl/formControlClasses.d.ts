import { FormControlClassKey } from './FormControl';

export type FormControlClasses = Record<FormControlClassKey, string>;

declare const formControlClasses: FormControlClasses;

export function getFormControlUtilityClasses(slot: string): string;

export default formControlClasses;
