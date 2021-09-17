import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { FormHelperTextClasses } from './formHelperTextClasses';

export interface FormHelperTextTypeMap<P = {}, D extends React.ElementType = 'p'> {
  props: P & {
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
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The variant to use.
     */
    variant?: 'standard' | 'outlined' | 'filled';
  };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Text Fields](https://mui.com/components/text-fields/)
 *
 * API:
 *
 * - [FormHelperText API](https://mui.com/api/form-helper-text/)
 */
declare const FormHelperText: OverridableComponent<FormHelperTextTypeMap>;

export type FormHelperTextProps<
  D extends React.ElementType = FormHelperTextTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<FormHelperTextTypeMap<P, D>, D>;

export default FormHelperText;
