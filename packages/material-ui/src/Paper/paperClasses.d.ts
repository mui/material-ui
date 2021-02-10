import { PaperClassKey } from './Paper';

export type PaperClasses = Record<PaperClassKey, string>;

declare const paperClasses: PaperClasses;

export function getPaperUtilityClass(slot: string): string;

export default paperClasses;
