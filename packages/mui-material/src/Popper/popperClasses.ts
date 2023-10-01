import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface PopperClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type PopperClassKey = keyof PopperClasses;

export function getPopperUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPopper', slot);
}

const popperClasses: PopperClasses = generateUtilityClasses('MuiPopper', ['root']);

export default popperClasses;
