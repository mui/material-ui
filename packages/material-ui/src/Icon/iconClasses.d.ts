import { IconClassKey } from './Icon';

export type IconClasses = Record<IconClassKey, string>;

declare const iconClasses: IconClasses;

export function getIconUtilityClass(slot: string): string;

export default iconClasses;
