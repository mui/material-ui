import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { AlertTitleClasses } from './alertTitleClasses';

export interface AlertTitleProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AlertTitleClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Alert](https://mui.com/components/alert/)
 *
 * API:
 *
 * - [AlertTitle API](https://mui.com/api/alert-title/)
 */
export default function AlertTitle(props: AlertTitleProps): JSX.Element;
