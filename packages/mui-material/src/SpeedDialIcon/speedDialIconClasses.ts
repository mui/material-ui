import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface SpeedDialIconClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the icon component. */
  icon: string;
  /** Styles applied to the icon component if `open={true}`. */
  iconOpen: string;
  /** Styles applied to the icon when an `openIcon` is provided and if `open={true}`. */
  iconWithOpenIconOpen: string;
  /** Styles applied to the `openIcon` if provided. */
  openIcon: string;
  /** Styles applied to the `openIcon` if provided and if `open={true}`. */
  openIconOpen: string;
}

export type SpeedDialIconClassKey = keyof SpeedDialIconClasses;

export function getSpeedDialIconUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSpeedDialIcon', slot);
}

export const getSpeedDialIconClasses = (): SpeedDialIconClasses => generateUtilityClasses('MuiSpeedDialIcon', [
  'root',
  'icon',
  'iconOpen',
  'iconWithOpenIconOpen',
  'openIcon',
  'openIconOpen',
]);

const speedDialIconClasses = getSpeedDialIconClasses();

export default speedDialIconClasses;
