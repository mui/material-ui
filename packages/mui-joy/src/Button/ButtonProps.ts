import {
  OverridableComponent,
  OverridableStringUnion,
  OverridableTypeMap,
  OverrideProps,
} from '@mui/types';
import React from 'react';
import { ColorPaletteProp } from '../styles/types/colorSystem';
import { VariantProp } from '../styles/types/variants';

export interface ButtonPropsVariantOverrides {}

export interface ButtonPropsColorOverrides {}

export interface ButtonPropsSizeOverrides {}

export interface ButtonTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & {
    /**
     * A ref for imperative actions. It currently only supports `focusVisible()` action.
     */
    action?: React.Ref<{
      focusVisible(): void;
    }>;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ButtonPropsColorOverrides>;
    /**
     * The component used for the Root slot.
     * Either a string to use a HTML element or a component.
     * This is equivalent to `components.Root`. If both are provided, the `component` is used.
     */
    component?: D;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * This prop can help identify which element has keyboard focus.
     * The class name will be applied when the element gains the focus through keyboard interaction.
     * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
     * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
     * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
     * if needed.
     */
    focusVisibleClassName?: string;
    /**
     * If `true`, the button will take up the full width of its container.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * The size of the component.
     * `small` is equivalent to the dense button styling.
     * @default 'medium'
     */
    size?: OverridableStringUnion<'small' | 'large', ButtonPropsSizeOverrides>;
    /**
     * @default 0
     */
    tabIndex?: NonNullable<React.HTMLAttributes<any>['tabIndex']>;
    /**
     * The variant to use.
     * @default 'text'
     */
    variant?: OverridableStringUnion<VariantProp, ButtonPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export interface ExtendButtonTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & ButtonTypeMap['props'];
  defaultComponent: M['defaultComponent'];
}

export type ButtonProps<
  D extends React.ElementType = ButtonTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<ButtonTypeMap<P, D>, D>;

export type ExtendButton<M extends OverridableTypeMap> = ((
  props: OverrideProps<ExtendButtonTypeMap<M>, 'a'>,
) => JSX.Element) &
  OverridableComponent<ExtendButtonTypeMap<M>>;
