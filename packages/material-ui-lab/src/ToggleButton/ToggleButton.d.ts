import * as React from 'react';

import { PropTypes, StandardProps } from '@material-ui/core';
import { ButtonBaseClassKey, ButtonBaseProps } from '@material-ui/core/ButtonBase';
import { ButtonProps } from '@material-ui/core/Button';

export interface ToggleButtonProps
  extends StandardProps<ButtonBaseProps, ToggleButtonClassKey, 'component'> {
  component?: React.ReactType<ToggleButtonProps>;
  disabled?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  selected?: boolean;
  type?: ButtonProps['type'];
  value?: any;
}

export type ToggleButtonClassKey = ButtonBaseClassKey | 'label' | 'selected';

declare const ToggleButton: React.ComponentType<ToggleButtonProps>;

export default ToggleButton;
