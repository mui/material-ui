import { FilledInputClassKey } from './FilledInput';

export type FilledInputClasses = Record<FilledInputClassKey, string>;

declare const filledInputClasses: FilledInputClasses;

export function getFilledInputUtilityClass(slot: string): string;

export default filledInputClasses;
