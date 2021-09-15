import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { TimelineSeparatorClasses } from './timelineSeparatorClasses';

export interface TimelineSeparatorProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TimelineSeparatorClasses>;
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
 * - [TimelineSeparator API](https://mui.com/api/timeline-separator/)
 */
export default function TimelineSeparator(props: TimelineSeparatorProps): JSX.Element;
