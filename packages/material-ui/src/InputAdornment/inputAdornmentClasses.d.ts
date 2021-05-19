import { InputAdornmentClassKey } from './InputAdornment';

export type InputAdornmentClasses = Record<InputAdornmentClassKey, string>;

declare const inputAdornmentClasses: InputAdornmentClasses;

export function getInputAdornmentUtilityClass(slot: string): string;

export default inputAdornmentClasses;
