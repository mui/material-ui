import { StackClasses } from '@mui/system';
import { generateUtilityClass, generateUtilityClasses } from '../className';

export type { StackClassKey } from '@mui/system';
export type { StackClasses };

export function getStackUtilityClass(slot: string): string {
  return generateUtilityClass('JoyStack', slot);
}

const stackClasses: StackClasses = generateUtilityClasses('JoyStack', ['root']);

export default stackClasses;
