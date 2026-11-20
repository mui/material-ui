'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import type { SxProps, Theme } from '../styles';
import OTPFieldInputElement from './OTPFieldInputElement';

export interface OTPFieldInputProps extends Omit<
  BaseOTPField.Input.Props,
  | 'children'
  | 'dangerouslySetInnerHTML'
  | 'id'
  | 'name'
  | 'form'
  | 'value'
  | 'disabled'
  | 'readOnly'
  | 'required'
  | 'tabIndex'
  | 'render'
> {
  /** System styles for this character input. */
  sx?: SxProps<Theme> | undefined;
}

/**
 * A single character in an OTPField.
 *
 * Demos:
 *
 * - [OTP Field](https://next.mui.com/material-ui/react-otp-field/)
 *
 * API:
 *
 * - [OTPFieldInput API](https://next.mui.com/material-ui/api/otp-field-input/)
 */
const OTPFieldInput = React.forwardRef(function OTPFieldInput(
  props: OTPFieldInputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  // The primitive owns the value, IDs, form submission, and keyboard navigation.
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    className,
    style,
    sx,
    ...other
  } = props;
  const {
    children,
    dangerouslySetInnerHTML,
    id,
    name,
    form,
    value,
    defaultValue,
    disabled,
    readOnly,
    required,
    tabIndex,
    ...nativeProps
  }: React.InputHTMLAttributes<HTMLInputElement> = other;
  return (
    <BaseOTPField.Input
      {...nativeProps}
      className={className}
      style={style}
      ref={ref}
      render={(inputProps, state) => (
        <OTPFieldInputElement
          inputProps={inputProps}
          state={state}
          sx={sx}
          ariaLabel={ariaLabel}
          ariaLabelledBy={ariaLabelledBy}
          ariaDescribedBy={ariaDescribedBy}
        />
      )}
    />
  );
});

OTPFieldInput.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  'aria-describedby': PropTypes.string,
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  'aria-label': PropTypes.string,
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component's state.
   */
  className: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * Style applied to the element, or a function that
   * returns a style object based on the component's state.
   */
  style: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * System styles for this character input.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default OTPFieldInput;
