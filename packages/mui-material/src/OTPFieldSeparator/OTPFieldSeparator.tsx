'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import { styled } from '../zero-styled';
import { useOTPFieldContext } from '../OTPField/OTPFieldContext';
import type { SxProps, Theme } from '../styles';

export interface OTPFieldSeparatorProps extends Omit<
  BaseOTPField.Separator.Props,
  'tabIndex' | 'aria-hidden' | 'render'
> {
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

const SeparatorRoot = styled('div', { name: 'MuiOTPField', slot: 'Separator' })({
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
  const { children = '-', className, orientation = 'vertical', style, sx, ...other } = props;
  const field = useOTPFieldContext();
  return (
    <BaseOTPField.Separator
      orientation={orientation}
      style={style}
      {...other}
      ref={ref}
      aria-hidden
      className={(state) =>
        clsx(
          field?.classes.separator,
          typeof className === 'function' ? className(state) : className,
        )
      }
      tabIndex={undefined}
      render={<SeparatorRoot sx={sx} />}
    >
      {children}
    </BaseOTPField.Separator>
  );
});

OTPFieldSeparator.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
