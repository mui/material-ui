import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineConnectorProps extends StandardProps<{}, TimelineConnectorClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
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
 * - [TimelineConnector API](https://material-ui.com/api/timeline-connector/)
 */
export default function TimelineConnector(props: TimelineConnectorProps): JSX.Element;
