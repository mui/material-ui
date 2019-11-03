import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TreeViewProps
  extends StandardProps<React.HTMLAttributes<HTMLUListElement>, TreeViewClassKey> {
  /**
   * The default icon used to collapse the node.
   */
  defaultCollapseIcon?: React.ReactNode;
  /**
   * The default icon displayed next to a end node. This is applied to all
   * tree nodes and can be overridden by the TreeItem `icon` prop.
   */
  defaultEndIcon?: React.ReactNode;
  /**
   * Expanded node ids. (Uncontrolled)
   */
  defaultExpanded?: string[];
  /**
   * The default icon used to expand the node.
   */
  defaultExpandIcon?: React.ReactNode;
  /**
   * The default icon displayed next to a parent node. This is applied to all
   * parent nodes and can be overridden by the TreeItem `icon` prop.
   */
  defaultParentIcon?: React.ReactNode;
  /**
   * Expanded node ids. (Controlled)
   */
  expanded?: string[];
  /**
   * Callback fired when tree items are expanded/collapsed.
   *
   * @param {array} nodeIds The ids of the toggled nodes.
   * @param {boolean} expanded The nodes' status - If `true` the nodes were expanded. If `false` the node were collapsed.
   */
  onNodeToggle?: (nodeIds: [string], expanded: boolean) => void;
}

export type TreeViewClassKey = 'root';

export default function TreeView(props: TreeViewProps): JSX.Element;
