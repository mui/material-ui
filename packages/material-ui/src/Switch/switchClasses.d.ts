import { SwitchClassKey } from './Switch';

declare const switchClasses: Record<SwitchClassKey, string>;

export function getSwitchUtilityClass(slot: string): string;

export default switchClasses;
