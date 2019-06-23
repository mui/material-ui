import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TreeViewProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, TreeViewClassKey> {
    defaultChildIcon?: React.ReactNode;
    defaultCollapseIcon?: React.ReactNode;
    defaultEndIcon?: React.ReactNode;
    defaultExpandIcon?: React.ReactNode;
}

export type TreeViewClassKey = 'root';

declare const TreeView: React.ComponentType<TreeViewProps>;

export default TreeView;
