export interface BreadcrumbCollapsedClasses {
  root: string;
  button: string;
  icon: string;
}

declare const breadcrumbCollapsedClasses: BreadcrumbCollapsedClasses;

export function getBreadcrumbCollapsedUtilityClass(slot: string): string;

export default breadcrumbCollapsedClasses;
