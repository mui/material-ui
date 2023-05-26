import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type ButtonGroupSlot = 'root';

export interface ButtonGroupSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type ButtonGroupSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ButtonGroupSlots,
  {
    root: SlotProps<'div', {}, ButtonGroupOwnerState>;
  }
>;

export interface ButtonGroupPropsColorOverrides {}
export interface ButtonGroupPropsVariantOverrides {}
export interface ButtonGroupPropsSizeOverrides {}

export interface ButtonGroupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the ButtonGroup if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ButtonGroupPropsColorOverrides>;
    /**
     * If `true`, the border radius of the buttons are not removed.
     */
    detached?: boolean;
    /**
     * If `true`, all the buttons will be disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * The component orientation.
     * @default 'vertical'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * If `true`, each button stretch the width equally.
     * @default false
     */
    stretch?: boolean | React.CSSProperties['flex'];
    /**
     * The size of the component.
     * It accepts theme values between 'sm' and 'lg'.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', ButtonGroupPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, ButtonGroupPropsVariantOverrides>;
  } & ButtonGroupSlotsAndSlotProps;
  defaultComponent: D;
}

export type ButtonGroupProps<
  D extends React.ElementType = ButtonGroupTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ButtonGroupTypeMap<P, D>, D>;

export interface ButtonGroupOwnerState extends ButtonGroupProps {}
