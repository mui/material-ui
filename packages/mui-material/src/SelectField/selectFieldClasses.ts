import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface SelectFieldClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type SelectFieldClassKey = keyof SelectFieldClasses;

export function getSelectFieldUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSelectField', slot);
}

const selectFieldClasses: SelectFieldClasses = generateUtilityClasses('MuiSelectField', ['root']);

export default selectFieldClasses;
