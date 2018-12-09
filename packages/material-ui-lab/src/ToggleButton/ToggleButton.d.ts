import * as React from 'react';
import { PropTypes, StandardProps, PropsOf } from '@material-ui/core';
import { ButtonBaseClassKey, ButtonBaseProps } from '@material-ui/core/ButtonBase';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

declare const ToggleButton: OverridableComponent<{
  outerProps: ButtonBaseProps & {
    disabled?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    selected?: boolean;
    type?: string;
    value?: any;
  };
  defaultComponent: 'button',
  classKey: ToggleButtonClassKey
}>;

export type ToggleButtonProps = PropsOf<typeof ToggleButton>;

export type ToggleButtonClassKey = ButtonBaseClassKey | 'label' | 'selected';

export default ToggleButton;
