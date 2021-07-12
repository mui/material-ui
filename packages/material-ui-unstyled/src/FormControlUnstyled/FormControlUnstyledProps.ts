import * as React from 'react';
import { FormControlUnstyledClasses } from './formControlUnstyledClasses';

export interface FormControlUnstyledProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormControlUnstyledClasses>;
  className?: string;
  component?: React.ElementType;
  components?: {
    Root?: React.ElementType;
  };
  componentsProps?: {
    root?: object;
  };
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error?: boolean;
  /**
   * Extra properties to be placed on the FormControlContext.
   * @default {}
   */
  extraContextProperties?: object;
  /**
   * If `true`, the component is displayed in focused state.
   * @default false
   */
  focused?: boolean;
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel?: boolean;
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required?: boolean;
}
