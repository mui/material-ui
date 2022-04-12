import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '..';
import { InputAdornmentClasses } from './inputAdornmentClasses';

export interface InputAdornmentTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
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
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The variant to use.
     * Note: If you are using the `TextField` component or the `FormControl` component
     * you do not have to set this manually.
     */
    variant?: 'standard' | 'outlined' | 'filled';
  };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Text fields](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [InputAdornment API](https://mui.com/material-ui/api/input-adornment/)
 */
declare const InputAdornment: OverridableComponent<InputAdornmentTypeMap>;

export type InputAdornmentProps<
  D extends React.ElementType = InputAdornmentTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<InputAdornmentTypeMap<P, D>, D>;

export default InputAdornment;
