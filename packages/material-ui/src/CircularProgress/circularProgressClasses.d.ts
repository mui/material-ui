import { CircularProgressClassKey } from './CircularProgress';

export type CircularProgressClasses = Record<CircularProgressClassKey, string>;

declare const circularProgressClasses: CircularProgressClasses;

export function getCircularProgressUtilityClass(slot: string): string;

export default circularProgressClasses;
