import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import StepIcon from '../StepIcon';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    alignItems: 'center',
    '&$alternativeLabel': {
      flexDirection: 'column',
    },
    '&$disabled': {
      cursor: 'default',
    },
  },
  /* Styles applied to the root element if `orientation="horiizontal". */
  horizontal: {},
  /* Styles applied to the root element if `orientation="vertical". */
  vertical: {},
  /* Styles applied to the `Typography` component which wraps `children`. */
  label: {
    color: theme.palette.text.secondary,
    '&$active': {
      color: theme.palette.text.primary,
      fontWeight: 500,
    },
    '&$completed': {
      color: theme.palette.text.primary,
      fontWeight: 500,
    },
    '&$alternativeLabel': {
      textAlign: 'center',
      marginTop: 16,
    },
    '&$error': {
      color: theme.palette.error.main,
    },
  },
  /* Styles applied to the `Typography` component if `active={true}`. */
  active: {},
  /* Styles applied to the `Typography` component if `completed={true}`. */
  completed: {},
  /* Styles applied to the root element and `Typography` component if `error={true}`. */
  error: {},
  /* Styles applied to the root element and `Typography` component if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the `icon` container element. */
  iconContainer: {
    paddingRight: 8,
    '&$alternativeLabel': {
      paddingRight: 0,
    },
  },
  /* Styles applied to the root & icon container and `Typography` if `alternativeLabel={true}`. */
  alternativeLabel: {},
  /* Styles applied to the container element which wraps `Typography` and `optional`. */
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
    StepIconProps,
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
            [classes.alternativeLabel]: alternativeLabel,
          })}
        >
          <StepIcon
            completed={completed}
            active={active}
            error={error}
            icon={icon}
            {...StepIconProps}
          />
        </span>
      )}
      <span className={classes.labelContainer}>
        <Typography
          variant="body1"
          component="span"
          className={classNames(classes.label, {
            [classes.alternativeLabel]: alternativeLabel,
            [classes.completed]: completed,
            [classes.active]: active,
            [classes.error]: error,
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
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
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
  /**
   * Properties applied to the [`StepIcon`](/api/step-icon) element.
   */
  StepIconProps: PropTypes.object,
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
