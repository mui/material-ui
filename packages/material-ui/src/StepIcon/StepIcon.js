import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircle from '../internal/svg-icons/CheckCircle';
import Warning from '../internal/svg-icons/Warning';
import withStyles from '../styles/withStyles';
import SvgIcon from '../SvgIcon';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    color: theme.palette.text.disabled,
    '&$active': {
      color: theme.palette.primary.main,
    },
    '&$completed': {
      color: theme.palette.primary.main,
    },
    '&$error': {
      color: theme.palette.error.main,
    },
  },
  /* Styles applied to the SVG text element. */
  text: {
    fill: theme.palette.primary.contrastText,
    fontSize: theme.typography.caption.fontSize,
    fontFamily: theme.typography.fontFamily,
  },
  /* Styles applied to the root element if `active={true}`. */
  active: {},
  /* Styles applied to the root element if `completed={true}`. */
  completed: {},
  /* Styles applied to the root element if `error={true}`. */
  error: {},
});

const StepIcon = React.forwardRef(function StepIcon(props, ref) {
  const { completed = false, icon, active = false, error = false, classes } = props;

  if (typeof icon === 'number' || typeof icon === 'string') {
    if (error) {
      return <Warning className={clsx(classes.root, classes.error)} ref={ref} />;
    }
    if (completed) {
      return <CheckCircle className={clsx(classes.root, classes.completed)} ref={ref} />;
    }
    return (
      <SvgIcon
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
        ref={ref}
      >
        <circle cx="12" cy="12" r="12" />
        <text className={classes.text} x="12" y="16" textAnchor="middle">
          {icon}
        </text>
      </SvgIcon>
    );
  }

  return icon;
});

StepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * Mark the step as failed.
   */
  error: PropTypes.bool,
  /**
   * The icon displayed by the step label.
   */
  icon: PropTypes.node.isRequired,
};

export default withStyles(styles, { name: 'MuiStepIcon' })(StepIcon);
