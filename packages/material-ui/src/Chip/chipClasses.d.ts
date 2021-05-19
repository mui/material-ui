import { ChipClassKey } from './Chip';

declare const chipClasses: Record<ChipClassKey, string>;

export function getChipUtilityClass(slot: string): string;

export default chipClasses;
