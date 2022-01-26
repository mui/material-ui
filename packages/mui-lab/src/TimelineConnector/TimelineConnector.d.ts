import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { TimelineConnectorClasses } from './timelineConnectorClasses';

export interface TimelineConnectorProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TimelineConnectorClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Timeline](https://mui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineConnector API](https://mui.com/api/timeline-connector/)
 */
export default function TimelineConnector(props: TimelineConnectorProps): JSX.Element;
