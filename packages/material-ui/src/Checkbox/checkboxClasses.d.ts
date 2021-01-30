import { CheckboxClassKey } from './Checkbox';

declare const checkboxClasses: Record<CheckboxClassKey, string>;

export function getCheckboxUtilityClass(slot: string): string;

export default checkboxClasses;
