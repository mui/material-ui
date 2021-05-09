import { SelectFieldClassKey } from './SelectField';

declare const selectFieldClasses: Record<SelectFieldClassKey, string>;

export function getSelectFieldUtilityClass(slot: string): string;

export default selectFieldClasses;
