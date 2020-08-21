import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TabScrollButtonProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, TabScrollButtonClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * See [CSS API](#css) below for more details.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `orientation="vertical"`. */
    vertical?: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled?: string;
  };
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
 * - [Tabs](https://material-ui.com/components/tabs/)
 *
 * API:
 *
 * - [TabScrollButton API](https://material-ui.com/api/tab-scroll-button/)
 */
export default function TabScrollButton(props: TabScrollButtonProps): JSX.Element;
