import React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { SelectUnstyledCommonProps, SelectOption } from '@mui/base/SelectUnstyled';
import { PopperUnstyledProps } from '@mui/base/PopperUnstyled';
import { ListProps } from '../List/ListProps';
import { SheetProps } from '../Sheet/SheetProps';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type SelectSlot = 'root' | 'popper' | 'listbox';

export interface SelectPropsVariantOverrides {}

export interface SelectPropsColorOverrides {}

export interface SelectPropsSizeOverrides {}

export interface SelectStaticProps extends SelectUnstyledCommonProps {
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
    root?: React.ComponentPropsWithRef<'div'>;
    button?: React.ComponentPropsWithRef<'button'> & { sx?: SxProps };
    listbox?: ListProps;
    popper?: PopperUnstyledProps & SheetProps;
  };
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Trailing adornment for the select.
   */
  endDecorator?: React.ReactNode;
  /**
   * The indicator(*) for the select.
   *    ________________
   *   [ value        * ]
   *    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
   */
  indicator?: React.ReactNode;
  /**
   * Text to show when there is no selected value.
   */
  placeholder?: React.ReactNode;
  /**
   * The size of the component.
   */
  size?: OverridableStringUnion<'sm' | 'md' | 'lg', SelectPropsSizeOverrides>;
  /**
   * Leading adornment for the select.
   */
  startDecorator?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps;
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant?: OverridableStringUnion<VariantProp, SelectPropsVariantOverrides>;
}

export interface SelectProps<TValue extends {}> extends SelectStaticProps {
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue?: TValue | null;

  /**
   * Callback fired when an option is selected.
   */
  onChange?: (value: TValue | null) => void;
  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue?: (option: SelectOption<TValue> | null) => React.ReactNode;
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value?: TValue | null;
}
