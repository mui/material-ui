import { SwitchBaseClassKey } from './SwitchBase';

export type SwitchBaseClasses = Record<SwitchBaseClassKey, string>;

declare const switchBaseClasses: SwitchBaseClasses;

export function getSwitchBaseUtilityClass(slot: string): string;

export default switchBaseClasses;
