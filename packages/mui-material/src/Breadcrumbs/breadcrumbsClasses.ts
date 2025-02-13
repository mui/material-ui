import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface BreadcrumbsClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the ol element. */
  ol: string;
  /** Styles applied to the li element. */
  li: string;
  /** Styles applied to the separator element. */
  separator: string;
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
]);

export default breadcrumbsClasses;
