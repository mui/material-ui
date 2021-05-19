import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getBreadcrumbsUtilityClass(slot) {
  return generateUtilityClass('MuiBreadcrumbs', slot);
}

const breadcrumbsClasses = generateUtilityClasses('MuiBreadcrumbs', [
  'root',
  'ol',
  'li',
  'separator',
]);

export default breadcrumbsClasses;
