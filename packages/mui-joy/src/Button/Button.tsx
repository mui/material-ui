import * as React from 'react';
import PropTypes from 'prop-types';

export type ButtonProps = JSX.IntrinsicElements['button'];

const Button = (props: ButtonProps) => {
  return <button type="button" {...props} />;
};

Button.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
} as any;

export default Button;
