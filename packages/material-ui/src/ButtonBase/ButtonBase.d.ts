import * as React from 'react';
import { MuiComponent, PropsOf } from '..';
import { TouchRippleProps } from './TouchRipple';
import { OverrideMuiProps } from '../muiComponent';

export interface ButtonBaseTypeMap {
  outerProps: {
    href?: string;
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
  defaultComponent: 'button';
  classKey: ButtonBaseClassKey;
}

declare const ButtonBase: {
  (props: { href: string } & OverrideMuiProps<ButtonBaseTypeMap, 'a'>): JSX.Element;
} & MuiComponent<ButtonBaseTypeMap>;

export type ButtonBaseProps = PropsOf<typeof ButtonBase>;

export type ButtonBaseClassKey = 'root' | 'disabled' | 'focusVisible';

export interface ButtonBaseActions {
  focusVisible(): void;
}

export default ButtonBase;
