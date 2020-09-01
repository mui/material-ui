import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@material-ui/core';

export interface TreeViewPropsBase extends StandardProps<React.HTMLAttributes<HTMLUListElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
  };
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
   * @default []
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
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable?: boolean;
  /**
   * If `true` selection is disabled.
   * @default false
   */
  disableSelection?: boolean;
  /**
   * Expanded node ids. (Controlled)
   */
  expanded?: string[];
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id?: string;
  /**
   * Callback fired when tree items are focused.
   *
   * @param {object} event The event source of the callback
   * @param {string} value of the focused node.
   */
  onNodeFocus?: (event: React.ChangeEvent<{}>, nodeId: string) => void;
  /**
   * Callback fired when tree items are expanded/collapsed.
   *
   * @param {object} event The event source of the callback.
   * @param {array} nodeIds The ids of the expanded nodes.
   */
  onNodeToggle?: (event: React.ChangeEvent<{}>, nodeIds: string[]) => void;
}

export interface MultiSelectTreeViewProps extends TreeViewPropsBase {
  /**
   * Selected node ids. (Uncontrolled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   * @default []
   */
  defaultSelected?: string[];
  /**
   * Selected node ids. (Controlled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  selected?: string[];
  /**
   * If true `ctrl` and `shift` will trigger multiselect.
   * @default false
   */
  multiSelect?: true;
  /**
   * Callback fired when tree items are selected/unselected.
   *
   * @param {object} event The event source of the callback
   * @param {(array|string)} value of the selected nodes. When `multiSelect` is true
   * this is an array of strings; when false (default) a string.
   */
  onNodeSelect?: (event: React.ChangeEvent<{}>, nodeIds: string[]) => void;
}

export interface SingleSelectTreeViewProps extends TreeViewPropsBase {
  /**
   * Selected node ids. (Uncontrolled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   * @default []
   */
  defaultSelected?: string;
  /**
   * Selected node ids. (Controlled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  selected?: string;
  /**
   * If true `ctrl` and `shift` will trigger multiselect.
   * @default false
   */
  multiSelect?: false;
  /**
   * Callback fired when tree items are selected/unselected.
   *
   * @param {object} event The event source of the callback
   * @param {(array|string)} value of the selected nodes. When `multiSelect` is true
   * this is an array of strings; when false (default) a string.
   */
  onNodeSelect?: (event: React.ChangeEvent<{}>, nodeIds: string) => void;
}

export type TreeViewProps = SingleSelectTreeViewProps | MultiSelectTreeViewProps;

export type TreeViewClassKey = keyof NonNullable<TreeViewProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Tree View](https://material-ui.com/components/tree-view/)
 *
 * API:
 *
 * - [TreeView API](https://material-ui.com/api/tree-view/)
 */
export default function TreeView(props: TreeViewProps): JSX.Element;
