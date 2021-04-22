import { SelectClassKey } from './Select';

declare const selectClasses: Record<SelectClassKey, string>;

export function getSelectUtilityClasses(slot: string): string;

export default selectClasses;
