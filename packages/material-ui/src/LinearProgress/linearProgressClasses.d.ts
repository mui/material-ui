import { LinearProgressClassKey } from './LinearProgress';

export type LinearProgressClasses = Record<LinearProgressClassKey, string>;

declare const linearProgressClasses: LinearProgressClasses;

export function getLinearProgressUtilityClass(slot: string): string;

export default linearProgressClasses;
