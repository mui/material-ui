import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { FormControlContextValue } from '../FormControl/FormControlContext';
import { FormLabelProps, ExtendFormLabelTypeMap } from '../FormLabel/FormLabel.types';
import { Theme } from '../styles';
import { InputLabelClasses } from './inputLabelClasses';

export interface InputLabelPropsSizeOverrides {}

export interface InputLabelOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<InputLabelClasses>;
  color?: FormLabelProps['color'];
  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the `input` of this label is focused.
   */
  focused?: boolean;
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense';
  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required?: boolean;
  /**
   * If `true`, the label is shrunk.
   */
  shrink?: boolean;
  /**
   * The size of the component.
   * @default 'normal'
   */
  size?: OverridableStringUnion<'small' | 'normal', InputLabelPropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The variant to use.
   */
  variant?: 'outlined' | 'filled'; // TODO v6: standardize to TextFieldProps['variant']
}

export type InputLabelTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'label',
> = ExtendFormLabelTypeMap<{
  props: AdditionalProps & InputLabelOwnProps;
  defaultComponent: RootComponent;
}>;

export type InputLabelProps<
  RootComponent extends React.ElementType = InputLabelTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<InputLabelTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export interface InputLabelOwnerState extends InputLabelProps {
  formControl: FormControlContextValue | undefined;
}
