import * as React from 'react';
import { MuiComponent, PropsOf } from '..';
import { TouchRippleProps } from './TouchRipple';

declare const ButtonBase: MuiComponent<{
  outerProps: {
    action?: (actions: ButtonBaseActions) => void;
    buttonRef?: React.Ref<any> | React.RefObject<any>;
    centerRipple?: boolean;
    disableRipple?: boolean;
    disableTouchRipple?: boolean;
    focusRipple?: boolean;
    focusVisibleClassName?: string;
    onFocusVisible?: React.FocusEventHandler<any>;
    TouchRippleProps?: Partial<TouchRippleProps>;
  };
  defaultRoot: 'button';
  classKey: ButtonBaseClassKey;
}>;

export type ButtonBaseProps = PropsOf<typeof ButtonBase>;

export type ButtonBaseClassKey = 'root' | 'disabled' | 'focusVisible';

export interface ButtonBaseActions {
  focusVisible(): void;
}

export default ButtonBase;
