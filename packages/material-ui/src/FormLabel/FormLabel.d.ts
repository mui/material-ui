import * as React from 'react';
import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

declare const FormLabel: OverridableComponent<{
  props: FormLabelBaseProps & {
    disabled?: boolean;
    error?: boolean;
    filled?: boolean;
    focused?: boolean;
    /**
     * Should only be used if ref forwarding `component` is used.
     * This is imprecise if `<FormLabel component={SomeComponent} />` is used.
     */
    ref?: React.Ref<HTMLElement>;
    required?: boolean;
  };
  defaultComponent: 'label';
  classKey: FormLabelClassKey;
}>;

export type FormLabelClassKey =
  | 'root'
  | 'focused'
  | 'disabled'
  | 'error'
  | 'filled'
  | 'required'
  | 'asterisk';

export type FormLabelBaseProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export type FormLabelProps = SimplifiedPropsOf<typeof FormLabel>;

export default FormLabel;
