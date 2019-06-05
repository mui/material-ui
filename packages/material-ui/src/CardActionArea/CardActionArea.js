import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    textAlign: 'inherit',
    width: '100%',
    '&:hover $focusHighlight': {
      opacity: theme.palette.action.hoverOpacity,
    },
    '&$focusVisible $focusHighlight': {
      opacity: 0.12,
    },
  },
  /* Styles applied to the ButtonBase root element if the action area is keyboard focused. */
  focusVisible: {},
  /* Styles applied to the overlay that covers the action area when it is keyboard focused. */
  focusHighlight: {
    pointerEvents: 'none',
    position: 'absolute',
    backgroundColor: 'currentcolor',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.short,
    }),
  },
});

const CardActionArea = React.forwardRef(function CardActionArea(props, ref) {
  const { children, classes, className, focusVisibleClassName, ...other } = props;

  return (
    <ButtonBase
      className={clsx(classes.root, className)}
      focusVisibleClassName={clsx(focusVisibleClassName, classes.focusVisible)}
      ref={ref}
      {...other}
    >
      {children}
      <span className={classes.focusHighlight} />
    </ButtonBase>
  );
});

CardActionArea.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
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
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiCardActionArea' })(CardActionArea);
