import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 0,
    alignItems: 'center',
  },
});

const TimelineSeparator = React.forwardRef(function TimelineSeparator(props, ref) {
  const { classes, className, ...other } = props;

  return <div className={clsx(classes.root, className)} ref={ref} {...other} />;
});

TimelineSeparator.propTypes = {
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

export default withStyles(styles, { name: 'MuiTimelineSeparator' })(TimelineSeparator);
