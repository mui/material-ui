'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import type { SxProps, Theme } from '../styles';
import { useOTPFieldContext } from '../OTPField/OTPFieldContext';
import OTPFieldInputElement from './OTPFieldInputElement';

export interface OTPFieldInputProps extends BaseOTPField.Input.Props {
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
  const { render, sx, ...other } = props;
  const field = useOTPFieldContext();

  return (
    <BaseOTPField.Input
      {...other}
      ref={ref}
      render={(inputProps, state) => {
        const { ownerState } = field;
        const first = state.index === 0;
        // The first input shares the group's accessible name. The remaining inputs announce their position.
        const fieldLabelledBy = first ? field.labelledBy : undefined;
        const labelledBy =
          props['aria-labelledby'] != null ? inputProps['aria-labelledby'] : fieldLabelledBy;
        const label = first
          ? field.ariaLabel
          : (inputProps['aria-label'] ??
            (labelledBy ? undefined : ownerState.getAriaLabel(state.index + 1, state.length)));

        return (
          <OTPFieldInputElement
            className={clsx(field.classes.input, inputProps.className)}
            inputProps={{
              ...inputProps,
              autoFocus: inputProps.autoFocus ?? (first && ownerState.autoFocus),
              'aria-label': label,
              'aria-labelledby': labelledBy,
              'aria-describedby':
                [field.describedBy, inputProps['aria-describedby']].filter(Boolean).join(' ') ||
                undefined,
              'aria-invalid':
                ownerState.error && !state.disabled ? true : inputProps['aria-invalid'],
            }}
            inputRef={first ? ownerState.inputRef : undefined}
            ownerState={ownerState}
            render={render}
            state={state}
            sx={sx}
          />
        );
      }}
    />
  );
});

OTPFieldInput.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  children: PropTypes.node,
  /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component's state.
   */
  className: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * Allows you to replace the component's HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
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
