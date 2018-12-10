import * as React from 'react';
import { TouchRippleProps } from './TouchRipple';
import {
  OverrideProps,
  OverridableComponent,
  SimplifiedPropsOf,
  OverridableTypeMap,
} from '../OverridableComponent';

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

export interface ExtendButtonBaseTypeMap<M extends OverridableTypeMap> {
  outerProps: ButtonBaseTypeMap['outerProps'] & M['outerProps'];
  innerProps?: M['innerProps'];
  defaultComponent: M['defaultComponent'];
  classKey: M['classKey'];
}

export type ExtendButtonBase<M extends OverridableTypeMap> = ((
  props: { href: string } & OverrideProps<ExtendButtonBaseTypeMap<M>, 'a'>,
) => JSX.Element) &
  OverridableComponent<ExtendButtonBaseTypeMap<M>>;

declare const ButtonBase: ((
  props: { href: string } & OverrideProps<ButtonBaseTypeMap, 'a'>,
) => JSX.Element) &
  OverridableComponent<ButtonBaseTypeMap>;

export type ButtonBaseProps = SimplifiedPropsOf<typeof ButtonBase>;

export type ButtonBaseClassKey = 'root' | 'disabled' | 'focusVisible';

export interface ButtonBaseActions {
  focusVisible(): void;
}

export default ButtonBase;
