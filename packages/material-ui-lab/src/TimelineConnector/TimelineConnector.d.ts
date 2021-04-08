import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@material-ui/core';
import { Theme } from '@material-ui/styles';
import { SxProps } from '@material-ui/system';

export interface TimelineConnectorProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
  };
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type TimelineConnectorClassKey = keyof NonNullable<TimelineConnectorProps['classes']>;

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
