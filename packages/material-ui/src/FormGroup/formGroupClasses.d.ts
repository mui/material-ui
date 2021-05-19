import { FormGroupClassKey } from './FormGroup';

declare const formGroupClasses: Record<FormGroupClassKey, string>;

export function getFormGroupUtilityClass(slot: string): string;

export default formGroupClasses;
