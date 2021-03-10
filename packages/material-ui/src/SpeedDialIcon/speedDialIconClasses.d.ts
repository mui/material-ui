import { SpeedDialIconClassKey } from './SpeedDialIcon';

export type SpeedDialIconClasses = Record<SpeedDialIconClassKey, string>;

declare const speedDialIconClasses: SpeedDialIconClasses;

export function getSpeedDialIconUtilityClass(slot: string): string;

export default speedDialIconClasses;
