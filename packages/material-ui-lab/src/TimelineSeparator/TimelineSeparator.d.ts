import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@material-ui/core';

export interface TimelineSeparatorProps extends StandardProps<{}> {
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
  };
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
