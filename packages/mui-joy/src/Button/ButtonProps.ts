import React from 'react';
import {
  OverridableComponent,
  OverridableStringUnion,
  OverridableTypeMap,
  OverrideProps,
} from '@mui/types';
import { SlotComponentProps } from '@mui/base/utils';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type ButtonSlot = 'root' | 'startDecorator' | 'endDecorator';

export interface ButtonPropsVariantOverrides {}

export interface ButtonPropsColorOverrides {}

export interface ButtonPropsSizeOverrides {}

interface ComponentsProps {
  root?: SlotComponentProps<'button', { sx?: SxProps }, ButtonOwnerState>;
  startDecorator?: SlotComponentProps<'span', { sx?: SxProps }, ButtonOwnerState>;
  endDecorator?: SlotComponentProps<'span', { sx?: SxProps }, ButtonOwnerState>;
}

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
     * The props used for each slot inside the component.
     * @default {}
     */
    componentsProps?: ComponentsProps;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Element placed after the children.
     */
    endDecorator?: React.ReactNode;
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
     * If `true`, the button will take up the full width of its container.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * The size of the component.
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', ButtonPropsSizeOverrides>;
    /**
     * Element placed before the children.
     */
    startDecorator?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * @default 0
     */
    tabIndex?: NonNullable<React.HTMLAttributes<any>['tabIndex']>;
    /**
     * The variant to use.
     * @default 'solid'
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
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<ButtonTypeMap<P, D>, D>;

export interface ButtonOwnerState extends ButtonProps {
  /**
   * If `true`, the button's focus is visible.
   */
  focusVisible?: boolean;
}

export type ExtendButton<M extends OverridableTypeMap> = ((
  props: OverrideProps<ExtendButtonTypeMap<M>, 'a'>,
) => JSX.Element) &
  OverridableComponent<ExtendButtonTypeMap<M>>;
