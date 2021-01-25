export interface BreadcrumbsClasses {
  root: string;
  ol: string;
  li: string;
  separator: string;
}

declare const breadcrumbsClasses: BreadcrumbsClasses;

export function getBreadcrumbsUtilityClass(slot: string): string;

export default breadcrumbsClasses;
