import { FabClassKey } from './Fab';

export type FabClasses = Record<FabClassKey, string>;

declare const fabClasses: FabClasses;

export function getFabUtilityClass(slot: string): string;

export default fabClasses;
