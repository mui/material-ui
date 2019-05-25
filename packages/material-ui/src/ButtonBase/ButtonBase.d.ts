import * as React from 'react';
import { TouchRippleProps } from './TouchRipple';
import {
  OverrideProps,
  OverridableComponent,
  SimplifiedPropsOf,
  OverridableTypeMap,
} from '../OverridableComponent';

export interface ButtonBaseTypeMap {
  props: {
    action?: (actions: ButtonBaseActions) => void;
    /**
     * Prefer `ref` instead.
     */
    buttonRef?: React.Ref<unknown>;
    centerRipple?: boolean;
    disabled?: boolean;
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

/**
 * utility to create component types that inherit props from ButtonBase.
 * This component has an additional overload if the `href` prop is set which
 * can make extension quite tricky
 */
export interface ExtendButtonBaseTypeMap<M extends OverridableTypeMap> {
  props: ButtonBaseTypeMap['props'] & M['props'];
  defaultComponent: M['defaultComponent'];
  classKey: M['classKey'];
}

export type ExtendButtonBase<M extends OverridableTypeMap> = ((
  props: { href: string } & OverrideProps<ExtendButtonBaseTypeMap<M>, 'a'>,
) => JSX.Element) &
  OverridableComponent<ExtendButtonBaseTypeMap<M>>;

declare const ButtonBase: ExtendButtonBase<ButtonBaseTypeMap>;

export type ButtonBaseProps = SimplifiedPropsOf<typeof ButtonBase>;

export type ButtonBaseClassKey = 'root' | 'disabled' | 'focusVisible';

export interface ButtonBaseActions {
  focusVisible(): void;
}

export default ButtonBase;
