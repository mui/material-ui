import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TreeViewProps
  extends StandardProps<React.HTMLAttributes<HTMLLIElement>, TreeViewClassKey> {
  collapseIcon?: React.ReactNode;
  expandIcon?: React.ReactNode;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  nodeId: string;
}

export type TreeViewClassKey = 'root' | 'group' | 'content' | 'iconContainer' | 'label';

declare const TreeView: React.ComponentType<TreeViewProps>;

export default TreeView;
