import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface CheckboxProps
  extends StandardProps<SwitchBaseProps, CheckboxClassKey, 'checkedIcon' | 'color' | 'icon'> {
  checkedIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  icon?: React.ReactNode;
  indeterminate?: boolean;
  indeterminateIcon?: React.ReactNode;
  size?: 'small' | 'medium';
}

export type CheckboxClassKey =
  | SwitchBaseClassKey
  | 'indeterminate'
  | 'colorPrimary'
  | 'colorSecondary';

/**
 * 
 *
 * Demos:
 * - {@link https://material-ui.com/components/checkboxes Checkboxes}
 * - {@link https://material-ui.com/components/transfer-list Transfer List}
 *
 * API:
 * - {@link https://material-ui.com/api/Checkbox Checkbox API}
 * - inherits {@link https://material-ui.com/api//api/icon-button IconButton API}
 */
declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;
