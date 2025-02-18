import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import {
  ColorPaletteProp,
  SxProps,
  TypographySystem,
  VariantProp,
  ApplyColorInversion,
} from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type DialogTitleSlot = 'root';

export interface DialogTitleSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type DialogTitleSlotsAndSlotProps = CreateSlotsAndSlotProps<
  DialogTitleSlots,
  {
    root: SlotProps<'div', {}, DialogTitleOwnerState>;
  }
>;

export interface DialogTitlePropsColorOverrides {}
export interface DialogTitlePropsVariantOverrides {}

export interface DialogTitleTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the DialogTitle if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: OverridableStringUnion<ColorPaletteProp, DialogTitlePropsColorOverrides>;
    /**
     * Applies the theme typography styles.
     * @default { sm: 'title-md', md: 'title-lg', lg: 'h4' }
     */
    level?: keyof TypographySystem | 'inherit';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     */
    variant?: OverridableStringUnion<VariantProp, DialogTitlePropsVariantOverrides>;
  } & DialogTitleSlotsAndSlotProps;
  defaultComponent: D;
}

export type DialogTitleProps<
  D extends React.ElementType = DialogTitleTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<DialogTitleTypeMap<P, D>, D>;

export interface DialogTitleOwnerState extends ApplyColorInversion<DialogTitleProps> {}
