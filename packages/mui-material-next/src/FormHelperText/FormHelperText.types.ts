import * as React from 'react';
import { SlotComponentProps } from '@mui/base';
import { SxProps } from '@mui/system';
import { OverrideProps, OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { FormControlProps } from '../FormControl/FormControl.types';
import { FormHelperTextClasses } from './formHelperTextClasses';

export interface FormHelperTextPropsVariantOverrides {}

export interface FormHelperTextOwnProps {
  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormHelperTextClasses>;
  /**
   * @ignore
   */
  className?: string;
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled?: boolean;
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled?: boolean;
  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused?: boolean;
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense';
  /**
   * If `true`, the helper text should use required classes key.
   */
  required?: boolean;
  /**
   * The props used for each slot inside the FormHelperText.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'p', {}, FormHelperTextOwnerState>;
  };
  /**
   * The components used for each slot inside the FormHelperText.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: FormHelperTextSlots;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: OverridableStringUnion<'outlined' | 'filled', FormHelperTextPropsVariantOverrides>;
}

export interface FormHelperTextSlots {
  /**
   * The component that renders the root.
   * @default 'p'
   */
  root?: React.ElementType;
}

export interface FormHelperTextTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'p',
> {
  props: AdditionalProps & FormHelperTextOwnProps;
  defaultComponent: RootComponent;
}

export type FormHelperTextProps<
  RootComponent extends React.ElementType = FormHelperTextTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<FormHelperTextTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export interface FormHelperTextOwnerState extends FormHelperTextProps {
  contained: boolean;
  size: NonNullable<FormControlProps['size']>;
  variant: NonNullable<FormControlProps['variant']>;
}
