import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TreeItemProps
  extends StandardProps<React.HTMLAttributes<HTMLLIElement>, TreeItemClassKey> {
  collapseIcon?: React.ReactNode;
  expandIcon?: React.ReactNode;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  nodeId: string;
}

export type TreeItemClassKey = 'root' | 'group' | 'content' | 'iconContainer' | 'label';

declare const TreeItem: React.ComponentType<TreeItemProps>;

export default TreeItem;
