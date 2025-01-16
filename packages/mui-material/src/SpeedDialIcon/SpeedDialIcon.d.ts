import type * as React from 'react';
import type { SxProps } from '@mui/system';
import type { Theme } from '../styles';
import type { InternalStandardProps as StandardProps } from '..';
import type { SpeedDialIconClasses } from './speedDialIconClasses';

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
 * - [Speed Dial](https://mui.com/material-ui/react-speed-dial/)
 *
 * API:
 *
 * - [SpeedDialIcon API](https://mui.com/material-ui/api/speed-dial-icon/)
 */
declare const SpeedDialIcon: ((props: SpeedDialIconProps) => React.JSX.Element) & {
  muiName: string;
};

export default SpeedDialIcon;
