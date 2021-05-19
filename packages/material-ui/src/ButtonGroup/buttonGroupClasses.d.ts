import { ButtonGroupClassKey } from './ButtonGroup';

export type ButtonGroupClasses = Record<ButtonGroupClassKey, string>;

declare const buttonGroupClasses: ButtonGroupClasses;

export function getButtonGroupUtilityClass(slot: string): string;

export default buttonGroupClasses;
