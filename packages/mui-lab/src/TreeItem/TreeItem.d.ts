import * as React from 'react';
import { InternalStandardProps as StandardProps, Theme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { SxProps } from '@mui/system';
import { TreeItemContentProps } from './TreeItemContent';
import { TreeItemClasses } from './treeItemClasses';

export interface TreeItemProps
  extends StandardProps<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TreeItemClasses>;
  /**
   * The icon used to collapse the node.
   */
  collapseIcon?: React.ReactNode;
  /**
   * The component used for the content node.
   * @default TreeItemContent
   */
  ContentComponent?: React.JSXElementConstructor<TreeItemContentProps>;
  /**
   * Props applied to ContentComponent
   */
  ContentProps?: React.HTMLAttributes<HTMLElement>;
  /**
   * If `true`, the node is disabled.
   */
  disabled?: boolean;
  /**
   * The icon displayed next to a end node.
   */
  endIcon?: React.ReactNode;
  /**
   * The icon used to expand the node.
   */
  expandIcon?: React.ReactNode;
  /**
   * The icon to display next to the tree node's label.
   */
  icon?: React.ReactNode;
  /**
   * This prop isn't supported.
   * Use the `onNodeFocus` callback on the tree if you need to monitor a node's focus.
   */
  onFocus?: null;
  /**
   * The tree node label.
   */
  label?: React.ReactNode;
  /**
   * The id of the node.
   */
  nodeId: string;
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  TransitionComponent?: React.JSXElementConstructor<TransitionProps>;
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps?: TransitionProps;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Tree view](https://mui.com/material-ui/react-tree-view/)
 *
 * API:
 *
 * - [TreeItem API](https://mui.com/material-ui/api/tree-item/)
 */
export default function TreeItem(props: TreeItemProps): JSX.Element;
