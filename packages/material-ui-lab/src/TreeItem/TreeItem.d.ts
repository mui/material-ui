import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { ContentProps } from './TreeItemContent';

export interface TreeItemProps
  extends StandardProps<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    group?: string;
    content?: string;
    expanded?: string;
    selected?: string;
    focused?: string;
    disabled?: string;
    iconContainer?: string;
    label?: string;
  };
  /**
   * The icon used to collapse the node.
   */
  collapseIcon?: React.ReactNode;
  /**
   * The component used for the content node.
   * @default TreeItemContent
   */
  ContentComponent?: React.ComponentType<ContentProps>;
  /**
   * Props applied to ContentComponent
   */
  ContentProps?: React.HTMLAttributes<HTMLElement>;
  /**
   * If `true`, the node will be disabled.
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
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  TransitionComponent?: React.ComponentType<TransitionProps>;
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps?: TransitionProps;
}

export type TreeItemClassKey = keyof NonNullable<TreeItemProps['classes']>;

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
