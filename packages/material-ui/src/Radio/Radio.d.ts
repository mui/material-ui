import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface RadioProps
  extends StandardProps<SwitchBaseProps, RadioClassKey, 'checkedIcon' | 'color' | 'icon' | 'type'> {
  checkedIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  icon?: React.ReactNode;
  size?: 'small' | 'medium';
}

export type RadioClassKey = SwitchBaseClassKey | 'colorPrimary' | 'colorSecondary';

/**
 *
 * Demos:
 *
 * - [Radio Buttons](https://material-ui.com/components/radio-buttons/)
 *
 * API:
 *
 * - [Radio API](https://material-ui.com/api/radio/)
 * - inherits [IconButton API](https://material-ui.com/api/icon-button/)
 */
declare const Radio: React.ComponentType<RadioProps>;

export default Radio;
