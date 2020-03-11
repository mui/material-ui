import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface SwitchProps
  extends StandardProps<SwitchBaseProps, SwitchClassKey, 'checkedIcon' | 'color' | 'icon'> {
  checkedIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  icon?: React.ReactNode;
  size?: 'small' | 'medium';
}

export type SwitchClassKey =
  | SwitchBaseClassKey
  | 'switchBase'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'sizeSmall'
  | 'thumb'
  | 'track';

/**
 * 
 *
 * Demos:
 * - {@link https://material-ui.com/components/switches Switches}
 * - {@link https://material-ui.com/components/transfer-list Transfer List}
 *
 * API:
 * - {@link https://material-ui.com/api/Switch Switch API}
 * - inherits {@link https://material-ui.com/api//api/icon-button IconButton API}
 */
declare const Switch: React.ComponentType<SwitchProps>;

export default Switch;
