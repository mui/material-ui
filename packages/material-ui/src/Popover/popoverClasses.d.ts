import { PopoverClassKey } from './Popover';

declare const popoverClasses: Record<PopoverClassKey, string>;

export function getPopoverUtilityClass(slot: string): string;

export default popoverClasses;
