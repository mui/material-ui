import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface CheckboxProps
  extends StandardProps<
    SwitchBaseProps,
    CheckboxClassKey,
    'checkedIcon' | 'color' | 'icon' | 'type'
  > {
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
 * Demos:
 *
 * - [Checkboxes](https://material-ui.com/components/checkboxes/)
 * - [Transfer List](https://material-ui.com/components/transfer-list/)
 *
 * API:
 *
 * - [Checkbox API](https://material-ui.com/api/checkbox/)
 * - inherits [IconButton API](https://material-ui.com/api/icon-button/)
 */
declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;
