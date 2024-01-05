import * as React from 'react';
import { SlotComponentProps } from '@mui/base';
import { SxProps } from '@mui/system';
import { OverridableStringUnion, OverrideProps, OverridableTypeMap } from '@mui/types';
import { Theme } from '../styles';
import { FormLabelClasses } from './formLabelClasses';

export interface FormLabelPropsColorOverrides {}

export interface FormLabelOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormLabelClasses>;
  /**
   * @ignore
   */
  className?: string;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'tertiary' | 'error' | 'info' | 'warning' | 'success',
    FormLabelPropsColorOverrides
  >;
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the label should use filled classes key.
   */
  filled?: boolean;
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused?: boolean;
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required?: boolean;
  /**
   * The props used for each slot inside the FormLabel.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'label', {}, FormLabelOwnerState>;
  };
  /**
   * The components used for each slot inside the FormLabel.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: FormLabelSlots;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface FormLabelSlots {
  /**
   * The component that renders the root.
   * @default 'span'
   */
  root?: React.ElementType;
}

export interface FormLabelTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'label',
> {
  props: AdditionalProps & FormLabelOwnProps;
  defaultComponent: RootComponent;
}

export interface ExtendFormLabelTypeMap<TypeMap extends OverridableTypeMap> {
  props: TypeMap['props'] & Pick<FormLabelOwnProps, 'filled' | 'color'>;
  defaultComponent: TypeMap['defaultComponent'];
}

export type FormLabelProps<
  RootComponent extends React.ElementType = FormLabelTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<FormLabelTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export interface FormLabelOwnerState extends FormLabelProps {
  color: NonNullable<FormLabelProps['color']>;
}
