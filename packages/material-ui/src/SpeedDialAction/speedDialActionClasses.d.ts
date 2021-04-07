import { SpeedDialActionClassKey } from './SpeedDialAction';

export type SpeedDialActionClasses = Record<SpeedDialActionClassKey, string>;

declare const speedDialActionClasses: SpeedDialActionClasses;

export function getSpeedDialActionUtilityClass(slot: string): string;

export default speedDialActionClasses;
