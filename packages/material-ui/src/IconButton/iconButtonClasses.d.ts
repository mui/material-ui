import { IconButtonClassKey } from './IconButton';

export type IconButtonClasses = Record<IconButtonClassKey, string>;

declare const iconButtonClasses: IconButtonClasses;

export function getIconButtonUtilityClass(slot: string): string;

export default iconButtonClasses;
