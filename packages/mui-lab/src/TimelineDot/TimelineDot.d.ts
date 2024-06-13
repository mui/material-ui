import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { InternalStandardProps as StandardProps } from '@mui/material';
import { TimelineDotClasses } from './timelineDotClasses';

export interface TimelineDotPropsVariantOverrides {}

export interface TimelineDotPropsColorOverrides {}

export interface TimelineDotProps extends StandardProps<React.HTMLAttributes<HTMLSpanElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TimelineDotClasses>;
  /**
   * The dot can have a different colors.
   * @default 'grey'
   */
  color?: OverridableStringUnion<
    'inherit' | 'grey' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    TimelineDotPropsColorOverrides
  >;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The dot can appear filled or outlined.
   * @default 'filled'
   */
  variant?: OverridableStringUnion<'filled' | 'outlined', TimelineDotPropsVariantOverrides>;
}

/**
 *
 * Demos:
 *
 * - [Timeline](https://next.mui.com/material-ui/react-timeline/)
 *
 * API:
 *
 * - [TimelineDot API](https://next.mui.com/material-ui/api/timeline-dot/)
 */
export default function TimelineDot(props: TimelineDotProps): React.JSX.Element;
