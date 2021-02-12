import { InputLabelClassKey } from './InputLabel';

export type InputLabelClasses = Record<InputLabelClassKey, string>;

declare const inputLabelClasses: InputLabelClasses;

export function getInputLabelUtilityClasses(slot: string): string;

export default inputLabelClasses;
