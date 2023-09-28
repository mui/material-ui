import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface DivClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type DivClassKey = keyof DivClasses;

export function getDivUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDiv', slot);
}

const divClasses: DivClasses = generateUtilityClasses('MuiDiv', ['root']);

export default divClasses;
