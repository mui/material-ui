import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircle from '../internal/svg-icons/CheckCircle';
import Warning from '../internal/svg-icons/Warning';
import withStyles from '../styles/withStyles';
import SvgIcon from '../SvgIcon';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.shortest,
    }),
    color: theme.palette.text.disabled,
    '&$completed': {
      color: theme.palette.primary.main,
    },
    '&$active': {
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
  /* Pseudo-class applied to the root element if `active={true}`. */
  active: {},
  /* Pseudo-class applied to the root element if `completed={true}`. */
  completed: {},
  /* Pseudo-class applied to the root element if `error={true}`. */
  error: {},
});

const StepIcon = React.forwardRef(function StepIcon(props, ref) {
  const {
    active = false,
    classes,
    className: classNameProp,
    completed = false,
    error = false,
    icon,
    ...other
  } = props;

  if (typeof icon === 'number' || typeof icon === 'string') {
    const className = clsx(classNameProp, classes.root, {
      [classes.active]: active,
      [classes.error]: error,
      [classes.completed]: completed,
    });

    if (error) {
      return <Warning className={className} ref={ref} />;
    }

    if (completed) {
      return <CheckCircle className={className} ref={ref} />;
    }

    return (
      <SvgIcon className={className} ref={ref} {...other}>
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
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * Mark the step as failed.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

export default withStyles(styles, { name: 'MuiStepIcon' })(StepIcon);
