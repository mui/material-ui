import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface BreadcrumbsProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, BreadcrumbsClassKey> {
  itemsAfterCollapse?: boolean;
  itemsBeforeCollapse?: boolean;
  maxItems?: number;
  separator?: React.ReactNode;
}

export type BreadcrumbsClassKey = 'root' | 'ol' | 'separator';

declare const Breadcrumbs: React.ComponentType<BreadcrumbsProps>;

export default Breadcrumbs;
