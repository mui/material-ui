import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { Omit } from '@material-ui/types';

export interface TreeItemProps
  extends StandardProps<Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'>, TreeItemClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The icon used to collapse the node.
   */
  collapseIcon?: React.ReactNode;
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
   * `onClick` handler for the icon container. Call `event.preventDefault()` to prevent `onNodeToggle` from being called.
   */
  onIconClick?: React.MouseEventHandler;
  /**
   * The tree node label.
   */
  label?: React.ReactNode;
  /**
   * `onClick` handler for the label container. Call `event.preventDefault()` to prevent `onNodeToggle` from being called.
   */
  onLabelClick?: React.MouseEventHandler;
  /**
   * The id of the node.
   */
  nodeId: string;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent?: React.ComponentType<TransitionProps>;
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps?: TransitionProps;
}

export type TreeItemClassKey =
  | 'root'
  | 'expanded'
  | 'selected'
  | 'focused'
  | 'group'
  | 'content'
  | 'iconContainer'
  | 'label';

/**
 *
 * Demos:
 *
 * - [Tree View](https://material-ui.com/components/tree-view/)
 *
 * API:
 *
 * - [TreeItem API](https://material-ui.com/api/tree-item/)
 */
export default function TreeItem(props: TreeItemProps): JSX.Element;
