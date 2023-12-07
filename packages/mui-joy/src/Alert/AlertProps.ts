import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type AlertSlot = 'root' | 'startDecorator' | 'endDecorator';

export interface AlertSlots {
  /**
   * The component that renders the root.
   * @default 'div'
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

export type AlertSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AlertSlots,
  {
    root: SlotProps<'div', {}, AlertOwnerState>;
    startDecorator: SlotProps<'span', {}, AlertOwnerState>;
    endDecorator: SlotProps<'span', {}, AlertOwnerState>;
  }
>;

export interface AlertPropsVariantOverrides {}
export interface AlertPropsColorOverrides {}
export interface AlertPropsSizeOverrides {}

export interface AlertTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    AlertSlotsAndSlotProps & {
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, AlertPropsColorOverrides>;
      /**
       * Element placed after the children.
       */
      endDecorator?: React.ReactNode;
      /**
       * If `true`, the children with an implicit color prop invert their colors to match the component's variant and color.
       * @default false
       */
      invertedColors?: boolean;
      /**
       * The ARIA role attribute of the element.
       * @default 'alert'
       */
      role?: string;
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', AlertPropsSizeOverrides>;
      /**
       * Element placed before the children.
       */
      startDecorator?: React.ReactNode;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'soft'
       */
      variant?: OverridableStringUnion<VariantProp, AlertPropsVariantOverrides>;
    };
  defaultComponent: D;
}

export type AlertProps<
  D extends React.ElementType = AlertTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<AlertTypeMap<P, D>, D>;

export interface AlertOwnerState extends ApplyColorInversion<AlertProps> {}
