import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

export const styles = () => ({
  root: {
    paddingTop: '1em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: '0 0 auto',
  },
  /* Styles applied to the root element if `disableSpacing={false}`. */
  spacing: {
    '& > :not(:first-child)': {
      marginLeft: 8,
    },
  },
});

const AlertActions = React.forwardRef(function AlertActions(props, ref) {
  const { classes, className, disableSpacing, ...other } = props;
  return (
    <div
      className={clsx(classes.root, { [classes.spacing]: !disableSpacing }, className)}
      ref={ref}
      {...other}
    />
  );
});

AlertActions.propTypes = {
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
  disableSpacing: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiAlertActions' })(AlertActions);
