import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface SkeletonClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `variant="overlay"`. */
  variantOverlay: string;
  /** Class name applied to the root element if `variant="circular"`. */
  variantCircular: string;
  /** Class name applied to the root element if `variant="rectangular"`. */
  variantRectangular: string;
  /** Class name applied to the root element if `variant="text"`. */
  variantText: string;
  /** Class name applied to the root element if `variant="inline"`. */
  variantInline: string;
  /** Class name applied to the root element if `level="h1"`. */
  h1: string;
  /** Class name applied to the root element if `level="h2"`. */
  h2: string;
  /** Class name applied to the root element if `level="h3"`. */
  h3: string;
  /** Class name applied to the root element if `level="h4"`. */
  h4: string;
  /** Class name applied to the root element if `level="h5"`. */
  h5: string;
  /** Class name applied to the root element if `level="h6"`. */
  h6: string;
  /** Class name applied to the root element if `level="body1"`. */
  body1: string;
  /** Class name applied to the root element if `level="body2"`. */
  body2: string;
  /** Class name applied to the root element if `level="body3"`. */
  body3: string;
}

export type SkeletonClassKey = keyof SkeletonClasses;

export function getSkeletonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSkeleton', slot);
}

const skeletonClasses: SkeletonClasses = generateUtilityClasses('MuiSkeleton', [
  'root',
  'variantOverlay',
  'variantCircular',
  'variantRectangular',
  'variantText',
  'variantInline',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body1',
  'body2',
  'body3',
]);

export default skeletonClasses;
