import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineProps extends StandardProps<{}, TimelineClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;

  /**
   * The variant to use.
   */
  variant?: 'standard' | 'outlined';
}

export type TimelineClassKey =
  | 'root';

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [Timeline API](https://material-ui.com/api/timeline/)
 */
export default function Timeline(props: TimelineProps): JSX.Element;
