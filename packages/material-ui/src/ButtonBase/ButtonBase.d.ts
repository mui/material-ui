import * as React from 'react';
import { TouchRippleProps } from './TouchRipple';
import { OverrideProps, OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

export interface ButtonBaseTypeMap {
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
  defaultComponent: 'button';
  classKey: ButtonBaseClassKey;
}

declare const ButtonBase:
  ((props: { href: string } & OverrideProps<ButtonBaseTypeMap, 'a'>) => JSX.Element)
 & OverridableComponent<ButtonBaseTypeMap>;

export type ButtonBaseProps = SimplifiedPropsOf<typeof ButtonBase>;

export type ButtonBaseClassKey = 'root' | 'disabled' | 'focusVisible';

export interface ButtonBaseActions {
  focusVisible(): void;
}

export default ButtonBase;
