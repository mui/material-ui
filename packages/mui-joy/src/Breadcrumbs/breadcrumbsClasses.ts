import {
  unstable_generateUtilityClass as generateUtilityClass,
  unstable_generateUtilityClasses as generateUtilityClasses,
} from '@mui/utils';

export interface BreadcrumbsClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the ol element. */
  ol: string;
  /** Class name applied to the li element. */
  li: string;
  /** Class name applied to the separator element. */
  separator: string;
  /** Class name applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root element if `size="lg"`. */
  sizeLg: string;
}

export type BreadcrumbsClassKey = keyof BreadcrumbsClasses;

export function getBreadcrumbsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiBreadcrumbs', slot);
}

const breadcrumbsClasses: BreadcrumbsClasses = generateUtilityClasses('MuiBreadcrumbs', [
  'root',
  'ol',
  'li',
  'separator',
  'sizeSm',
  'sizeMd',
  'sizeLg',
]);

export default breadcrumbsClasses;
