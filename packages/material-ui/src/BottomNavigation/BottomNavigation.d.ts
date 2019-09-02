import * as React from 'react';
import { StandardProps } from '..';

export interface BottomNavigationProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    BottomNavigationClassKey,
    'onChange'
  > {
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {any} value We default to the index of the child
   */
  onChange?(event: React.ChangeEvent<{}>, value: any): void;
  /**
   * If `true`, all `BottomNavigationAction`s will show their labels.
   * By default, only the selected `BottomNavigationAction` will show its label.
   */
  showLabels?: boolean;
  /**
   * The value of the currently selected `BottomNavigationAction`.
   */
  value?: any;
}

export type BottomNavigationClassKey = 'root';

export default function BottomNavigation(props: BottomNavigationProps): JSX.Element;
