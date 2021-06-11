import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';
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
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineSeparator API](https://material-ui.com/api/timeline-separator/)
 */
export default function TimelineSeparator(props: TimelineSeparatorProps): JSX.Element;
