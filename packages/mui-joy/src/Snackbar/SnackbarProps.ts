import * as React from 'react';
import { OverrideProps, OverridableStringUnion } from '@mui/types';
import { ClickAwayListenerProps } from '@mui/base/ClickAwayListener';
import { UseSnackbarParameters } from '@mui/base/useSnackbar';
import { ColorPaletteProp, VariantProp, ApplyColorInversion, SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export interface SnackbarSlots {
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

export type SnackbarSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SnackbarSlots,
  {
    root: SlotProps<'div', {}, SnackbarOwnerState>;
    startDecorator: SlotProps<'span', {}, SnackbarOwnerState>;
    endDecorator: SlotProps<'span', {}, SnackbarOwnerState>;
  }
>;

export interface SnackbarPropsColorOverrides {}
export interface SnackbarPropsSizeOverrides {}
export interface SnackbarPropsVariantOverrides {}

export interface SnackbarOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export type { SnackbarCloseReason } from '@mui/base/useSnackbar';

export interface SnackbarTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    UseSnackbarParameters & {
      /**
       * The anchor of the `Snackbar`.
       * On smaller screens, the component grows to occupy all the available width,
       * the horizontal alignment is ignored.
       * @default { vertical: 'bottom', horizontal: 'left' }
       */
      anchorOrigin?: SnackbarOrigin;
      /**
       * Props applied to the `ClickAwayListener` element.
       */
      ClickAwayListenerProps?: Partial<ClickAwayListenerProps>;
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, SnackbarPropsColorOverrides>;
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', SnackbarPropsSizeOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'outlined'
       */
      variant?: OverridableStringUnion<VariantProp, SnackbarPropsVariantOverrides>;
    } & SnackbarSlotsAndSlotProps;
  defaultComponent: D;
}

export type SnackbarProps<
  D extends React.ElementType = SnackbarTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<SnackbarTypeMap<P, D>, D>;

export interface SnackbarOwnerState extends ApplyColorInversion<SnackbarProps> {}
