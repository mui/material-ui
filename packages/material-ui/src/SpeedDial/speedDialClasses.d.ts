import { SpeedDialClassKey } from './SpeedDial';

export type SpeedDialClasses = Record<SpeedDialClassKey, string>;

declare const speedDialClasses: SpeedDialClasses;

export function getSpeedDialUtilityClass(slot: string): string;

export default speedDialClasses;
