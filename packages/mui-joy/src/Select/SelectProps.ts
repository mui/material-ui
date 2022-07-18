import React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { SelectUnstyledCommonProps, SelectOption } from '@mui/base/SelectUnstyled';
import { PopperUnstyledProps } from '@mui/base/PopperUnstyled';
import { ButtonProps } from '../Button/ButtonProps';
import { ListProps } from '../List/ListProps';
import { SheetProps } from '../Sheet/SheetProps';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type SelectSlot = 'root' | 'popper' | 'listbox';

export interface SelectPropsVariantOverrides {}

export interface SelectPropsColorOverrides {}

export interface SelectPropsSizeOverrides {}

export interface SelectProps<TValue extends {}> extends SelectUnstyledCommonProps {
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color?: OverridableStringUnion<ColorPaletteProp, SelectPropsColorOverrides>;
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps?: {
    root?: ButtonProps;
    listbox?: ListProps;
    popper?: PopperUnstyledProps & SheetProps;
  };
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue?: TValue | null;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Callback fired when an option is selected.
   */
  onChange?: (value: TValue | null) => void;
  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue?: (option: SelectOption<TValue> | null) => React.ReactNode;
  /**
   * The size of the component.
   */
  size?: OverridableStringUnion<'sm' | 'md' | 'lg', SelectPropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps;
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value?: TValue | null;
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant?: OverridableStringUnion<VariantProp, SelectPropsVariantOverrides>;
}
