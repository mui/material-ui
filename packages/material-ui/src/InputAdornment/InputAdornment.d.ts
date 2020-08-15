import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface InputAdornmentTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component, normally an `IconButton` or string.
     */
    children?: React.ReactNode;
    /**
     * Disable pointer events on the root.
     * This allows for the content of the adornment to focus the input on click.
     */
    disablePointerEvents?: boolean;
    /**
     * If children is a string then disable wrapping in a Typography component.
     */
    disableTypography?: boolean;
    /**
     * The position this adornment should appear relative to the `Input`.
     */
    position?: 'start' | 'end';
    /**
     * The variant to use.
     * Note: If you are using the `TextField` component or the `FormControl` component
     * you do not have to set this manually.
     */
    variant?: 'standard' | 'outlined' | 'filled';
  };
  defaultComponent: D;
  classKey: InputAdornmentClassKey;
}
/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [InputAdornment API](https://material-ui.com/api/input-adornment/)
 */
declare const InputAdornment: OverridableComponent<InputAdornmentTypeMap>;

export type InputAdornmentClassKey =
  | 'root'
  | 'filled'
  | 'positionStart'
  | 'positionEnd'
  | 'disablePointerEvents'
  | 'hiddenLabel'
  | 'marginDense';

export type InputAdornmentProps<
  D extends React.ElementType = InputAdornmentTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<InputAdornmentTypeMap<P, D>, D>;

export default InputAdornment;
