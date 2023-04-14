import * as React from 'react';
import {
  OverridableComponent,
  OverridableStringUnion,
  OverridableTypeMap,
  OverrideProps,
} from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type IconButtonSlot = 'root';

export interface IconButtonSlots {
  /**
   * The component that renders the root.
   * @default 'button'
   */
  root?: React.ElementType;
}

export type IconButtonSlotsAndSlotProps = CreateSlotsAndSlotProps<
  IconButtonSlots,
  {
    root: SlotProps<'button', {}, IconButtonOwnerState>;
  }
>;

export interface IconButtonPropsVariantOverrides {}
export interface IconButtonPropsColorOverrides {}
export interface IconButtonPropsSizeOverrides {}

export interface IconButtonTypeMap<P = {}, D extends React.ElementType = 'button'> {
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
    color?: OverridableStringUnion<ColorPaletteProp, IconButtonPropsColorOverrides>;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
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
     * The size of the component.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', IconButtonPropsSizeOverrides>;
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
     * @default 'soft'
     */
    variant?: OverridableStringUnion<VariantProp, IconButtonPropsVariantOverrides>;
  } & IconButtonSlotsAndSlotProps;
  defaultComponent: D;
}

export interface ExtendIconButtonTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & IconButtonTypeMap['props'];
  defaultComponent: M['defaultComponent'];
}

export type IconButtonProps<
  D extends React.ElementType = IconButtonTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<IconButtonTypeMap<P, D>, D>;

export interface IconButtonOwnerState extends ApplyColorInversion<IconButtonProps> {
  /**
   * If `true`, the element's focus is visible.
   */
  focusVisible?: boolean;
}

export type ExtendIconButton<M extends OverridableTypeMap> = ((
  props: OverrideProps<ExtendIconButtonTypeMap<M>, 'a'>,
) => JSX.Element) &
  OverridableComponent<ExtendIconButtonTypeMap<M>>;
