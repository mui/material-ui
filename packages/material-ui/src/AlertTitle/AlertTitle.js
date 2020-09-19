import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    fontWeight: theme.typography.fontWeightMedium,
    marginTop: -2,
  },
});

const AlertTitle = React.forwardRef(function AlertTitle(props, ref) {
  const { classes, className, ...other } = props;

  return (
    <Typography
      gutterBottom
      component="div"
      ref={ref}
      className={clsx(classes.root, className)}
      {...other}
    />
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
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiAlertTitle' })(AlertTitle);
