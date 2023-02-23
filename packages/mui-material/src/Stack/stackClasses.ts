import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';
import { StackClasses } from '@mui/system';

export type { StackClassKey } from '@mui/system';
export type { StackClasses };

export function getStackUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStack', slot);
}

const stackClasses: StackClasses = generateUtilityClasses('MuiStack', ['root']);

export default stackClasses;
