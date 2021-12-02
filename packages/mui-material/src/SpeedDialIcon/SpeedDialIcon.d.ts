import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '..';
import { SpeedDialIconClasses } from './speedDialIconClasses';

export interface SpeedDialIconProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SpeedDialIconClasses>;
  /**
   * The icon to display.
   */
  icon?: React.ReactNode;
  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon?: React.ReactNode;
  /**
   * @ignore
   * If `true`, the component is shown.
   */
  open?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Speed Dial](https://mui.com/components/speed-dial/)
 *
 * API:
 *
 * - [SpeedDialIcon API](https://mui.com/api/speed-dial-icon/)
 */
declare const SpeedDialIcon: ((props: SpeedDialIconProps) => JSX.Element) & { muiName: string };

export default SpeedDialIcon;
