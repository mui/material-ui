import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

export const styles = () => ({
  root: {
    padding: '0',
  },
});

const AlertTitle = React.forwardRef(function AlertTitle(props, ref) {
  const { classes, children, className } = props;
  return (
    <Typography component="div" variant="h6" ref={ref} className={clsx(classes.root, className)}>
      {children}
    </Typography>
  );
});

AlertTitle.propTypes = {
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
};

export default withStyles(styles, { name: 'MuiAlertTitle' })(AlertTitle);
