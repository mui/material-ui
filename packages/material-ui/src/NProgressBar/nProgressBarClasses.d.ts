import { NProgressBarClassKey } from './NProgressBar';

export type NProgressBarClasses = Record<NProgressBarClassKey, string>;

declare const nProgressBarClasses: NProgressBarClasses;

export function getNProgressBarUtilityClass(slot: string): string;

export default nProgressBarClasses;
