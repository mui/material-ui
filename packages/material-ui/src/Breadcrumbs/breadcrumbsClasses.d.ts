import { BreadcrumbsClassKey } from './Breadcrumbs';

export type BreadcrumbsClasses = Record<BreadcrumbsClassKey, string>;

declare const breadcrumbsClasses: BreadcrumbsClasses;

export function getBreadcrumbsUtilityClass(slot: string): string;

export default breadcrumbsClasses;
