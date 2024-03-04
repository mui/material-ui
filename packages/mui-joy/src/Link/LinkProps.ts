import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import {
  ColorPaletteProp,
  SxProps,
  SystemProps,
  ApplyColorInversion,
  TypographySystem,
  VariantProp,
  TextColor,
} from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type LinkSlot = 'root' | 'startDecorator' | 'endDecorator';

export interface LinkSlots {
  /**
   * The component that renders the root.
   * @default 'a'
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
}

export interface LinkPropsVariantOverrides {}

export interface LinkPropsColorOverrides {}

export type LinkSlotsAndSlotProps = CreateSlotsAndSlotProps<
  LinkSlots,
  {
    root: SlotProps<'a', {}, LinkOwnerState>;
    startDecorator: SlotProps<'span', {}, LinkOwnerState>;
    endDecorator: SlotProps<'span', {}, LinkOwnerState>;
  }
>;

export interface LinkTypeMap<P = {}, D extends React.ElementType = 'a'> {
  props: P &
    Omit<SystemProps, 'color'> & {
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      /**
       * The color of the link.
       * @default 'primary'
       */
      color?: OverridableStringUnion<ColorPaletteProp, LinkPropsColorOverrides>;
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
       * Applies the theme typography styles.
       * @default 'body-md'
       */
      level?: keyof TypographySystem | 'inherit';
      /**
       * If `true`, the ::after pseudo element is added to cover the area of interaction.
       * The parent of the overlay Link should have `relative` CSS position.
       * @default false
       */
      overlay?: boolean;
      /**
       * The system color.
       */
      textColor?: TextColor;
      /**
       * Element placed before the children.
       */
      startDecorator?: React.ReactNode;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * Controls when the link should have an underline.
       * @default 'hover'
       */
      underline?: 'none' | 'hover' | 'always';
      /**
       * Applies the theme link styles.
       * @default 'plain'
       */
      variant?: OverridableStringUnion<VariantProp, LinkPropsVariantOverrides>;
    } & LinkSlotsAndSlotProps;
  defaultComponent: D;
}

export type LinkProps<
  D extends React.ElementType = LinkTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
    focusVisible?: boolean;
  },
> = OverrideProps<LinkTypeMap<P, D>, D>;

export interface LinkOwnerState extends ApplyColorInversion<LinkProps> {
  /**
   * If `true`, the element's focus is visible.
   */
  focusVisible?: boolean;
  /**
   * @internal
   * If `true`, the element is rendered inside a Typography component.
   */
  nesting: boolean;
}
