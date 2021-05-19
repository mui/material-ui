import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';

export interface AlertTitleProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
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

export type AlertTitleClassKey = keyof NonNullable<AlertTitleProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Alert](https://material-ui.com/components/alert/)
 *
 * API:
 *
 * - [AlertTitle API](https://material-ui.com/api/alert-title/)
 */
export default function AlertTitle(props: AlertTitleProps): JSX.Element;
