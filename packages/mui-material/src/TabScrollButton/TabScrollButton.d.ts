import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { TabScrollButtonClasses } from './tabScrollButtonClasses';

export interface TabScrollButtonProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TabScrollButtonClasses>;
  /**
   * The direction the button should indicate.
   */
  direction: 'left' | 'right';
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * The component orientation (layout flow direction).
   */
  orientation: 'horizontal' | 'vertical';
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/material-ui/react-tabs/)
 *
 * API:
 *
 * - [TabScrollButton API](https://mui.com/material-ui/api/tab-scroll-button/)
 */
export default function TabScrollButton(props: TabScrollButtonProps): JSX.Element;
