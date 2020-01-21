import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

export interface TreeItemProps
  extends StandardProps<React.HTMLAttributes<HTMLLIElement>, TreeItemClassKey> {
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
   * The tree node label.
   */
  label?: React.ReactNode;
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
  | 'group'
  | 'content'
  | 'iconContainer'
  | 'label';

export default function TreeItem(props: TreeItemProps): JSX.Element;
