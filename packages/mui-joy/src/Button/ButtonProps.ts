import * as React from 'react';
import {
  OverridableComponent,
  OverridableStringUnion,
  OverridableTypeMap,
  OverrideProps,
} from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type ButtonSlot = 'root' | 'startDecorator' | 'endDecorator' | 'loadingIndicatorCenter';

export interface ButtonSlots {
  /**
   * The component that renders the root.
   * @default 'button'
   */
  root?: React.ElementType;
  /**
   * The component that renders the start decorator.
   * @default 'span'
   */
  startDecorator?: React.ElementType;
  /**
   * The component that renders the end decorator.
   * @default 'span'
   */
  endDecorator?: React.ElementType;
  /**
   * The component that renders the loading indicator center.
   * @default 'span'
   */
  loadingIndicatorCenter?: React.ElementType;
}

export interface ButtonPropsVariantOverrides {}
export interface ButtonPropsColorOverrides {}
export interface ButtonPropsSizeOverrides {}

export type ButtonSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ButtonSlots,
  {
    root: SlotProps<'button', {}, ButtonOwnerState>;
    startDecorator: SlotProps<'span', {}, ButtonOwnerState>;
    endDecorator: SlotProps<'span', {}, ButtonOwnerState>;
    loadingIndicatorCenter: SlotProps<'span', {}, ButtonOwnerState>;
  }
>;

export interface ButtonTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P &
    ButtonSlotsAndSlotProps & {
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
       * @default 'md'
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
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'solid'
       */
      variant?: OverridableStringUnion<VariantProp, ButtonPropsVariantOverrides>;
      /**
       * If `true`, the loading indicator is shown and the button becomes disabled.
       * @default false
       */
      loading?: boolean;
      /**
       * The node should contain an element with `role="progressbar"` with an accessible name.
       * By default we render a `CircularProgress` that is labelled by the button itself.
       * @default <CircularProgress />
       */
      loadingIndicator?: React.ReactNode;
      /**
       * The loading indicator can be positioned on the start, end, or the center of the button.
       * @default 'center'
       */
      loadingPosition?: 'start' | 'end' | 'center';
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

export interface ButtonOwnerState extends ApplyColorInversion<ButtonProps> {
  /**
   * If `true`, the button's focus is visible.
   */
  focusVisible?: boolean;
}

export type ExtendButton<M extends OverridableTypeMap> = ((
  props: OverrideProps<ExtendButtonTypeMap<M>, 'a'>,
) => React.JSX.Element) &
  OverridableComponent<ExtendButtonTypeMap<M>>;
