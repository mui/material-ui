import { GridClassKey } from './Grid';

export type GridClasses = Record<GridClassKey, string>;

declare const gridClasses: GridClasses;

export function getGridUtilityClass(slot: string): string;

export default gridClasses;
