'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import FormControl from '../FormControl';
import type { OTPFieldProps } from './OTPField.types';
import { getOTPFieldUtilityClass } from './otpFieldClasses';

const OTPField = React.forwardRef(function OTPField(
  props: OTPFieldProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, className } = props;
  const rootClasses = composeClasses({ root: ['root'] }, getOTPFieldUtilityClass, classes);

  return <FormControl ref={ref} className={clsx(rootClasses.root, className)} />;
});

OTPField.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * A CSS class name applied to the root element.
   */
  className: PropTypes.string,
} as any;

export default OTPField;
