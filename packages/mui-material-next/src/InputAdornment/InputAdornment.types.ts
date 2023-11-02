import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles';
import { FormControlProps } from '../FormControl/FormControl.types';
import { InputAdornmentClasses } from './inputAdornmentClasses';

export interface InputAdornmentOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<InputAdornmentClasses>;
  /**
   * The content of the component, normally an `IconButton` or string.
   */
  children?: React.ReactNode;
  /**
   * Disable pointer events on the root.
   * This allows for the content of the adornment to focus the `input` on click.
   * @default false
   */
  disablePointerEvents?: boolean;
  /**
   * If children is a string then disable wrapping in a Typography component.
   * @default false
   */
  disableTypography?: boolean;
  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: 'start' | 'end';
  /**
   * The components used for each slot inside the InputAdornment.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: InputAdornmentSlots;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps;
  /**
   * The variant to use.
   * Note: If you are using the `TextField` component or the `FormControl` component
   * you do not have to set this manually.
   */
  variant?: 'outlined' | 'filled';
}

export interface InputAdornmentSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export interface InputAdornmentTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'div',
> {
  props: AdditionalProps & InputAdornmentOwnProps;
  defaultComponent: RootComponentType;
}

export type InputAdornmentProps<
  RootComponentType extends React.ElementType = InputAdornmentTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<InputAdornmentTypeMap<AdditionalProps, RootComponentType>, RootComponentType> & {
  component?: React.ElementType;
};

export interface InputAdornmentOwnerState extends InputAdornmentProps {
  hiddenLabel: NonNullable<FormControlProps['hiddenLabel']>;
  size: NonNullable<FormControlProps['size']>;
  disablePointerEvents: NonNullable<InputAdornmentProps['disablePointerEvents']>;
  position: NonNullable<InputAdornmentProps['position']>;
  variant: NonNullable<InputAdornmentProps['variant']>;
}
