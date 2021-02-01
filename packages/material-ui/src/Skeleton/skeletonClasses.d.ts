export interface SkeletonClasses {
  root: string;
  text: string;
  rectangular: string;
  circular: string;
  pulse: string;
  wave: string;
  withChildren: string;
  fitContent: string;
  heightAuto: string;
}

declare const skeletonClasses: SkeletonClasses;

export function getSkeletonUtilityClass(slot: string): string;

export default skeletonClasses;
