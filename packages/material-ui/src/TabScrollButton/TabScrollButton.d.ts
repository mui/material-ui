import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TabScrollButtonProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, TabScrollButtonClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Which direction should the button indicate?
   */
  direction: 'left' | 'right';
  /**
   * If `true`, the element will be disabled.
   */
  disabled?: boolean;
  /**
   * The tabs orientation (layout flow direction).
   */
  orientation: 'horizontal' | 'vertical';
}

export type TabScrollButtonClassKey = 'root' | 'vertical' | 'disabled';
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/components/tabs/)
 *
 * API:
 *
 * - [TabScrollButton API](https://mui.com/api/tab-scroll-button/)
 */
export default function TabScrollButton(props: TabScrollButtonProps): JSX.Element;
