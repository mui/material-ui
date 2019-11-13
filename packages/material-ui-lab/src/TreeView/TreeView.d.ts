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
   * Selected node ids. (Uncontrolled)
   */
  defaultSelected?: string[];
  /**
   * If `true` selection is disabled.
   */
  disableSelection?: boolean;
  /**
   * Expanded node ids. (Controlled)
   */
  expanded?: string[];
  /**
   * If true `ctrl` and `shift` will trigger multiselect.
   */
  multiSelect?: boolean;
  /**
   * Callback fired when tree items are selected/unselected.
   *
   * @param {object} event The event source of the callback
   * @param {array} nodeIds The ids of the selected nodes.
   */
  onNodeSelect?: (event: React.ChangeEvent<{}>, nodeIds: string[]) => void;
  /**
   * Callback fired when tree items are expanded/collapsed.
   *
   * @param {object} event The event source of the callback
   * @param {array} nodeIds The ids of the expanded nodes.
   */
  onNodeToggle?: (event: React.ChangeEvent<{}>, nodeIds: string[]) => void;
  /**
   * Selected node ids. (Controlled)
   */
  selected?: string[];
}

export type TreeViewClassKey = 'root';

export default function TreeView(props: TreeViewProps): JSX.Element;
