import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineSeparatorProps extends StandardProps<{}, TimelineSeparatorClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
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
