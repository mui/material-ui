'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import { styled } from '../zero-styled';
import { useOTPFieldContext } from '../OTPField/OTPFieldContext';
import type { OTPFieldProps } from '../OTPField/OTPField.types';
import type { SxProps, Theme } from '../styles';

export interface OTPFieldSeparatorProps extends BaseOTPField.Separator.Props {
  /**
   * Hide the separator from assistive technology.
   * @default true
   */
  'aria-hidden'?: BaseOTPField.Separator.Props['aria-hidden'] | undefined;
  /**
   * The content displayed between character inputs.
   * @default '-'
   */
  children?: React.ReactNode;
  /**
   * The orientation of the separator.
   * @default 'vertical'
   */
  orientation?: BaseOTPField.Separator.Props['orientation'] | undefined;
  /** System styles for this decorative separator. */
  sx?: SxProps<Theme> | undefined;
}

const SeparatorRoot = styled(BaseOTPField.Separator, { name: 'MuiOTPField', slot: 'Separator' })<{
  ownerState: OTPFieldProps;
}>({
  alignSelf: 'center',
});

/**
 * A decorative separator between OTPField inputs.
 *
 * Demos:
 *
 * - [OTP Field](https://next.mui.com/material-ui/react-otp-field/)
 *
 * API:
 *
 * - [OTPFieldSeparator API](https://next.mui.com/material-ui/api/otp-field-separator/)
 */
const OTPFieldSeparator = React.forwardRef(function OTPFieldSeparator(
  props: OTPFieldSeparatorProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    'aria-hidden': ariaHidden = true,
    children = '-',
    className,
    orientation = 'vertical',
    ...other
  } = props;
  const field = useOTPFieldContext();
  return (
    <SeparatorRoot
      {...other}
      ownerState={field?.ownerState ?? {}}
      ref={ref}
      aria-hidden={ariaHidden}
      className={clsx(
        field?.classes.separator,
        typeof className === 'function' ? className({ orientation }) : className,
      )}
      orientation={orientation}
    >
      {children}
    </SeparatorRoot>
  );
});

OTPFieldSeparator.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Hide the separator from assistive technology.
   * @default true
   */
  'aria-hidden': PropTypes.oneOfType([PropTypes.oneOf(['false', 'true']), PropTypes.bool]),
  /**
   * The content displayed between character inputs.
   * @default '-'
   */
  children: PropTypes.node,
  /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component's state.
   */
  className: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * The orientation of the separator.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
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
   * System styles for this decorative separator.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default OTPFieldSeparator;
