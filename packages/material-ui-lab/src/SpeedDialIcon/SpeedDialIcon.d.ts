import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface SpeedDialIconProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>, SpeedDialIconClassKey, 'children'> {
  /**
   * The icon to display in the SpeedDial Floating Action Button.
   */
  icon?: React.ReactNode;
  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon?: React.ReactNode;
  /**
   * @ignore
   * If `true`, the SpeedDial is open.
   */
  open?: boolean;
}

export type SpeedDialIconClassKey =
  | 'root'
  | 'icon'
  | 'iconOpen'
  | 'iconWithOpenIconOpen'
  | 'openIcon'
  | 'openIconOpen';

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
export default function SpeedDialIcon(props: SpeedDialIconProps): JSX.Element;
