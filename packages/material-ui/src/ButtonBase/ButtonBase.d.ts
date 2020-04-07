import * as React from 'react';
import { TouchRippleProps } from './TouchRipple';
import { OverrideProps, OverridableComponent, OverridableTypeMap } from '../OverridableComponent';

export interface ButtonBaseTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & {
    action?: React.Ref<ButtonBaseActions>;
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
  defaultComponent: D;
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
  props: { href: string } & OverrideProps<ExtendButtonBaseTypeMap<M>, 'a'>
) => JSX.Element) &
  OverridableComponent<ExtendButtonBaseTypeMap<M>>;

/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 * Demos:
 *
 * - [Buttons](https://material-ui.com/components/buttons/)
 *
 * API:
 *
 * - [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const ButtonBase: ExtendButtonBase<ButtonBaseTypeMap>;

export type ButtonBaseProps<
  D extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonBaseTypeMap<P, D>, D>;

export type ButtonBaseClassKey = 'root' | 'disabled' | 'focusVisible';

export interface ButtonBaseActions {
  focusVisible(): void;
}

export default ButtonBase;
