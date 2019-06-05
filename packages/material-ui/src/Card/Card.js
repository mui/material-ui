import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Paper from '../Paper';
import withStyles from '../styles/withStyles';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    overflow: 'hidden',
  },
};

const Card = React.forwardRef(function Card(props, ref) {
  const { classes, className, raised = false, ...other } = props;

  return (
    <Paper
      className={clsx(classes.root, className)}
      elevation={raised ? 8 : 1}
      ref={ref}
      {...other}
    />
  );
});

Card.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the card will use raised styling.
   */
  raised: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiCard' })(Card);
