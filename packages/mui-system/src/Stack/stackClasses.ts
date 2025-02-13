import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface StackClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type StackClassKey = keyof StackClasses;

export function getStackUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStack', slot);
}

const stackClasses: StackClasses = generateUtilityClasses('MuiStack', ['root']);

export default stackClasses;
