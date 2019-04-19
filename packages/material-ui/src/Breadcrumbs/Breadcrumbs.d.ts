import * as React from 'react';
import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

declare const Breadcrumbs: OverridableComponent<{
  props: {
    itemsAfterCollapse?: number;
    itemsBeforeCollapse?: number;
    maxItems?: number;
    separator?: React.ReactNode;
  };
  defaultComponent: 'nav';
  classKey: BreadcrumbsClassKey;
}>;

export type BreadcrumbsClassKey = 'root' | 'ol' | 'separator';

export type BreadcrumbsProps = SimplifiedPropsOf<typeof Breadcrumbs>;

export default Breadcrumbs;
