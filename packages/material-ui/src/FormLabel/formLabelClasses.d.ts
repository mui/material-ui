import { FormLabelClassKey } from './FormLabel';

export type FormLabelClasses = Record<FormLabelClassKey, string>;

declare const formLabelClasses: FormLabelClasses;

export function getFormLabelUtilityClasses(slot: string): string;

export default formLabelClasses;
