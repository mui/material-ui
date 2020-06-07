import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineSeparatorProps extends StandardProps<{}, TimelineSeparatorClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export type TimelineSeparatorClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineSeparator API](https://material-ui.com/api/timeline-separator/)
 */
export default function TimelineSeparator(props: TimelineSeparatorProps): JSX.Element;
