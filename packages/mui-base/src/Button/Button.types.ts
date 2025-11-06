import * as React from 'react';
import { Simplify } from '@mui/types';
import { UseButtonParameters, UseButtonRootSlotProps } from '../useButton';
import { SlotComponentProps } from '../utils';
import { PolymorphicProps } from '../utils/PolymorphicComponent';

export interface ButtonActions {
  focusVisible(): void;
}

export interface ButtonRootSlotPropsOverrides {}

export interface ButtonOwnProps extends Omit<UseButtonParameters, 'rootRef'> {
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action?: React.Ref<ButtonActions>;
  children?: React.ReactNode;
  className?: string;
  /**
   * The props used for each slot inside the Button.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'button', ButtonRootSlotPropsOverrides, ButtonOwnerState>;
  };
  /**
   * The components used for each slot inside the Button.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: ButtonSlots;
  /**
   * The HTML element that is ultimately rendered, for example 'button' or 'a'
   * @default 'button'
   */
  rootElementName?: keyof HTMLElementTagNameMap;
}

export interface ButtonSlots {
  /**
   * The component that renders the root.
   * @default props.href || props.to ? 'a' : 'button'
   */
  root?: React.ElementType;
}

export type ButtonProps<
  RootComponentType extends React.ElementType = ButtonTypeMap['defaultComponent'],
> = PolymorphicProps<ButtonTypeMap<{}, RootComponentType>, RootComponentType>;

export interface ButtonTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'button',
> {
  props: ButtonOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type ButtonOwnerState = Simplify<
  ButtonOwnProps & {
    active: boolean;
    focusVisible: boolean;
  }
>;

export type ButtonRootSlotProps = Simplify<
  UseButtonRootSlotProps & {
    ownerState: ButtonOwnerState;
    className?: string;
    children?: React.ReactNode;
  }
>;
