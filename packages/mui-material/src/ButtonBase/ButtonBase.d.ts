import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { TouchRippleActions, TouchRippleProps } from './TouchRipple';
import { OverrideProps, OverridableComponent, OverridableTypeMap } from '../OverridableComponent';
import { ButtonBaseClasses } from './buttonBaseClasses';

export { TouchRippleActions, TouchRippleProps };

export interface ButtonBaseOwnProps {
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action?: React.Ref<ButtonBaseActions>;
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple?: boolean;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ButtonBaseClasses>;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple?: boolean;
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple?: boolean;
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName?: string;
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent?: React.ElementType;
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible?: React.FocusEventHandler<any>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * @default 0
   */
  tabIndex?: NonNullable<React.HTMLAttributes<any>['tabIndex']>;
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps?: Partial<TouchRippleProps>;
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef?: React.Ref<TouchRippleActions>;
}

export interface ButtonBaseTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'button',
> {
  props: AdditionalProps & ButtonBaseOwnProps;
  defaultComponent: RootComponent;
}

/**
 * utility to create component types that inherit props from ButtonBase.
 * This component has an additional overload if the `href` prop is set which
 * can make extension quite tricky
 */
export interface ExtendButtonBaseTypeMap<TypeMap extends OverridableTypeMap> {
  props: TypeMap['props'] & Omit<ButtonBaseTypeMap['props'], 'classes'>;
  defaultComponent: TypeMap['defaultComponent'];
}

export type ExtendButtonBase<TypeMap extends OverridableTypeMap> = ((
  props: { href: string } & OverrideProps<ExtendButtonBaseTypeMap<TypeMap>, 'a'>,
) => React.JSX.Element) &
  OverridableComponent<ExtendButtonBaseTypeMap<TypeMap>>;

/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 *
 * Demos:
 *
 * - [Button](https://mui.com/material-ui/react-button/)
 *
 * API:
 *
 * - [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 */
declare const ButtonBase: ExtendButtonBase<ButtonBaseTypeMap>;

export type ButtonBaseProps<
  RootComponent extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ButtonBaseTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export interface ButtonBaseActions {
  focusVisible(): void;
}

export default ButtonBase;
