import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface BreadcrumbsClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the ol element. */
  ol: string;
  /** Styles applied to the li element. */
  li: string;
  /** Styles applied to the separator element. */
  separator: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
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
