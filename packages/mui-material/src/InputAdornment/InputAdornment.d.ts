import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '..';
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The variant to use.
   * Note: If you are using the `TextField` component or the `FormControl` component
   * you do not have to set this manually.
   */
  variant?: 'standard' | 'outlined' | 'filled';
}

export interface InputAdornmentTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & InputAdornmentOwnProps;
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [Text Field](https://v6.mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [InputAdornment API](https://v6.mui.com/material-ui/api/input-adornment/)
 */
declare const InputAdornment: OverridableComponent<InputAdornmentTypeMap>;

export type InputAdornmentProps<
  RootComponent extends React.ElementType = InputAdornmentTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<InputAdornmentTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default InputAdornment;
