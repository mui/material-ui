import { RadioClassKey } from './Radio';

export type RadioClasses = Record<RadioClassKey, string>;

declare const radioClasses: RadioClasses;

export function getRadioUtilityClass(slot: string): string;

export default radioClasses;
