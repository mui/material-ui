import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface NodeInfo {
  nodeId: string;
  label: string;
}

export interface TreeViewProps
  extends StandardProps<React.HTMLAttributes<HTMLUListElement>, TreeViewClassKey> {
  defaultCollapseIcon?: React.ReactNode;
  defaultEndIcon?: React.ReactNode;
  defaultExpanded?: string[];
  defaultExpandIcon?: React.ReactNode;
  defaultParentIcon?: React.ReactNode;
  isNodeExpandable?: (nodeId: string | number | undefined) => boolean;
  onNodeCollapsed?: (nodeId: string | number | undefined) => void;
  onNodeExpanded?: (nodeId: string | number | undefined) => NodeInfo[] | undefined;
  onNodeToggle?: (nodeId: string, expanded: boolean) => void;
}

export type TreeViewClassKey = 'root';

declare const TreeView: React.ComponentType<TreeViewProps>;

export default TreeView;
