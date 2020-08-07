import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineDotProps extends StandardProps<{}, TimelineDotClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The dot can appear filled or outlined.
   */
  variant?: 'default' | 'outlined';
  /**
   * The dot can have a different colors.
   */
  color?: 'inherit' | 'primary' | 'secondary' | 'grey';
}

export type TimelineDotClassKey =
  | 'root'
  | 'defaultDefault'
  | 'defaultPrimary'
  | 'defaultSecondary'
  | 'outlinedDefault'
  | 'outlinedPrimary'
  | 'outlinedSecondary';

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineDot API](https://material-ui.com/api/timeline-dot/)
 */
export default function TimelineDot(props: TimelineDotProps): JSX.Element;
