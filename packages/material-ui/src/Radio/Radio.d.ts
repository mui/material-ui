import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface RadioProps
  extends StandardProps<SwitchBaseProps, RadioClassKey, 'checkedIcon' | 'color' | 'icon'> {
  checkedIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  icon?: React.ReactNode;
  size?: 'small' | 'medium';
}

export type RadioClassKey = SwitchBaseClassKey | 'colorPrimary' | 'colorSecondary';

/**
 * 
 *
 * Demos:
 * - {@link https://material-ui.com/components/radio-buttons Radio Buttons}
 *
 * API:
 * - {@link https://material-ui.com/api/Radio Radio API}
 * - inherits {@link https://material-ui.com/api//api/icon-button IconButton API}
 */
declare const Radio: React.ComponentType<RadioProps>;

export default Radio;
