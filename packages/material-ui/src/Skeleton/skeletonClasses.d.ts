import { SkeletonClassKey } from './Skeleton';

declare const skeletonClasses: Record<SkeletonClassKey, string>;

export function getSkeletonUtilityClass(slot: string): string;

export default skeletonClasses;
