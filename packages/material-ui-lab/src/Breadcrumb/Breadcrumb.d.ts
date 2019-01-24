import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface BreadcrumbProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, BreadcrumbClassKey> {}

export type BreadcrumbClassKey = 'root';

declare const Breadcrumb: React.ComponentType<BreadcrumbProps>;

export default Breadcrumb;
