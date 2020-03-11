import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface BreadcrumbsTypeMap<P = {}, D extends React.ElementType = 'nav'> {
  props: P & {
    itemsAfterCollapse?: number;
    itemsBeforeCollapse?: number;
    maxItems?: number;
    separator?: React.ReactNode;
  };
  defaultComponent: D;
  classKey: BreadcrumbsClassKey;
}

/**
 * 
 *
 * Demos:
 * - {@link https://material-ui.com/components/breadcrumbs Breadcrumbs}
 *
 * API:
 * - {@link https://material-ui.com/api/Breadcrumbs Breadcrumbs API}
 * 
 */
declare const Breadcrumbs: OverridableComponent<BreadcrumbsTypeMap>;

export type BreadcrumbsClassKey = 'root' | 'ol' | 'li' | 'separator';

export type BreadcrumbsProps<
  D extends React.ElementType = BreadcrumbsTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BreadcrumbsTypeMap<P, D>, D>;

export default Breadcrumbs;
