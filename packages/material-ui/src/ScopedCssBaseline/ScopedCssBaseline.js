import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { html, body } from '../CssBaseline/CssBaseline';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    ...html,
    ...body(theme),
    '& *, & *::before, & *::after': {
      boxSizing: 'inherit',
    },
    '& strong, & b': {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
});

const ScopedCssBaseline = React.forwardRef(function ScopedCssBaseline(props, ref) {
  const { classes, className, ...other } = props;

  return <div className={clsx(classes.root, className)} ref={ref} {...other} />;
});

ScopedCssBaseline.propTypes = {
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

export default withStyles(styles, { name: 'MuiScopedCssBaseline' })(ScopedCssBaseline);
