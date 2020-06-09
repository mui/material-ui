import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    width: 2,
    backgroundColor: theme.palette.grey[400],
    flexGrow: 1,
  },
});

const TimelineConnector = React.forwardRef(function TimelineConnector(props, ref) {
  const { classes, className, ...other } = props;

  return <span className={clsx(classes.root, className)} ref={ref} {...other} />;
});

TimelineConnector.propTypes = {
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

export default withStyles(styles, { name: 'MuiTimelineConnector' })(TimelineConnector);
