import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import StepIcon from './StepIcon';

export const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  horizontal: {},
  vertical: {},
  alternativeLabel: {
    flexDirection: 'column',
  },
  disabled: {
    cursor: 'default',
  },
  error: {},
  label: {
    color: theme.palette.text.secondary,
  },
  labelActive: {
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  labelCompleted: {
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  labelAlternativeLabel: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2,
  },
  labelError: {
    color: theme.palette.error.main,
  },
  iconContainer: {
    paddingRight: theme.spacing.unit,
  },
  iconContainerAlternativeLabel: {
    paddingRight: 0,
  },
  labelContainer: {
    width: '100%',
  },
});

function StepLabel(props) {
  const {
    active,
    alternativeLabel,
    children,
    classes,
    className: classNameProp,
    completed,
    disabled,
    error,
    icon,
    last,
    optional,
    orientation,
    ...other
  } = props;

  return (
    <span
      className={classNames(
        classes.root,
        classes[orientation],
        {
          [classes.disabled]: disabled,
          [classes.alternativeLabel]: alternativeLabel,
          [classes.error]: error,
        },
        classNameProp,
      )}
      {...other}
    >
      {icon && (
        <span
          className={classNames(classes.iconContainer, {
            [classes.iconContainerAlternativeLabel]: alternativeLabel,
          })}
        >
          <StepIcon
            completed={completed}
            active={active}
            error={error}
            icon={icon}
            alternativeLabel={alternativeLabel}
          />
        </span>
      )}
      <span className={classes.labelContainer}>
        <Typography
          variant="body1"
          component="span"
          className={classNames(classes.label, {
            [classes.labelAlternativeLabel]: alternativeLabel,
            [classes.labelCompleted]: completed,
            [classes.labelActive]: active,
            [classes.labelError]: error,
          })}
        >
          {children}
        </Typography>
        {optional}
      </span>
    </span>
  );
}

StepLabel.propTypes = {
  /**
   * @ignore
   * Sets the step as active. Is passed to child components.
   */
  active: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * In most cases will simply be a string containing a title for the label.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepLabelButton` is a child of `StepLabel`. Is passed to child components.
   */
  disabled: PropTypes.bool,
  /**
   * Mark the step as failed.
   */
  error: PropTypes.bool,
  /**
   * Override the default icon.
   */
  icon: PropTypes.node,
  /**
   * @ignore
   */
  last: PropTypes.bool,
  /**
   * The optional node to display.
   */
  optional: PropTypes.node,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

StepLabel.defaultProps = {
  active: false,
  alternativeLabel: false,
  completed: false,
  disabled: false,
  error: false,
  last: false,
  orientation: 'horizontal',
};

StepLabel.muiName = 'StepLabel';

export default withStyles(styles, { name: 'MuiStepLabel' })(StepLabel);
