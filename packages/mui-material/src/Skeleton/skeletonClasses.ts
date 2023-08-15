import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface SkeletonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `size="text"`. */
  text: string;
  /** Styles applied to the root element if `size="text"`. */
  box: string;
  /** Styles applied to the root element if `shape="rectangular"`. */
  rectangular: string;
  /** Styles applied to the root element if `shape="rounded"`. */
  rounded: string;
  /** Styles applied to the root element if `shape="circular"`. */
  circular: string;
  /** Styles applied to the root element if `animation="pulse"`. */
  pulse: string;
  /** Styles applied to the root element if `animation="wave"`. */
  wave: string;
  /** Styles applied when the component is passed children. */
  withChildren: string;
  /** Styles applied when the component is passed children and no width. */
  fitContent: string;
  /** Styles applied when the component is passed children and no height. */
  heightAuto: string;
}

export type SkeletonClassKey = keyof SkeletonClasses;

export function getSkeletonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSkeleton', slot);
}

const skeletonClasses: SkeletonClasses = generateUtilityClasses('MuiSkeleton', [
  'root',
  'text',
  'box',
  'rectangular',
  'rounded',
  'circular',
  'pulse',
  'wave',
  'withChildren',
  'fitContent',
  'heightAuto',
]);

export default skeletonClasses;
