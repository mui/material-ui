import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

export const styles = () => ({
  root: {
    padding: 0,
  },
});

const AlertContent = React.forwardRef(function AlertContent(props, ref) {
  const { classes, children, className, variant = 'text' } = props;

  const content = variant === 'text' ? <Typography>{children}</Typography> : children;

  return (
    <div className={clsx(classes.root, className)} ref={ref}>
      {content}
    </div>
  );
});

AlertContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  variant: PropTypes.oneOf(['container', 'text']),
};

export default withStyles(styles, { name: 'MuiAlertContent' })(AlertContent);
