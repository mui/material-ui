import type * as React from 'react';
import type { InternalStandardProps as StandardProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import type { TimelineSeparatorClasses } from './timelineSeparatorClasses';

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
 * - [Timeline](https://mui.com/material-ui/react-timeline/)
 *
 * API:
 *
 * - [TimelineSeparator API](https://mui.com/material-ui/api/timeline-separator/)
 */
export default function TimelineSeparator(props: TimelineSeparatorProps): React.JSX.Element;
