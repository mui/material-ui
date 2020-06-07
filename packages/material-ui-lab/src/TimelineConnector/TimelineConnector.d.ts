import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineConnectorProps extends StandardProps<{}, TimelineConnectorClassKey> {
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

export type TimelineConnectorClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineConnector API](https://material-ui.com/api/timeline-item-connector/)
 */
export default function TimelineConnector(props: TimelineConnectorProps): JSX.Element;
