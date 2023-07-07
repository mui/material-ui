import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface SkeletonClasses {
  /** Class name applied to the root element. */
  root: string;
}

export type SkeletonClassKey = keyof SkeletonClasses;

export function getSkeletonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSkeleton', slot);
}

const skeletonClasses: SkeletonClasses = generateUtilityClasses('MuiSkeleton', ['root']);

export default skeletonClasses;
