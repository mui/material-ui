import { FormControlLabelClassKey } from './FormControlLabel';

export type FormControlLabelClasses = Record<FormControlLabelClassKey, string>;

declare const formControlLabelClasses: FormControlLabelClasses;

export function getFormControlLabelUtilityClasses(slot: string): string;

export default formControlLabelClasses;
