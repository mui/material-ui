import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import StepIcon from '../StepIcon';
import StepperContext from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';

export const styles = (theme) => ({
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
  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {},
  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    textAlign: 'left',
    padding: '8px 0',
  },
  /* Styles applied to the `Typography` component which wraps `children`. */
  label: {
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
  /* Pseudo-class applied to the `Typography` component if `active={true}`. */
  active: {},
  /* Pseudo-class applied to the `Typography` component if `completed={true}`. */
  completed: {},
  /* Pseudo-class applied to the root element and `Typography` component if `error={true}`. */
  error: {},
  /* Pseudo-class applied to the root element and `Typography` component if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the `icon` container element. */
  iconContainer: {
    flexShrink: 0, // Fix IE 11 issue
    display: 'flex',
    paddingRight: 8,
    '&$alternativeLabel': {
      paddingRight: 0,
    },
  },
  /* Pseudo-class applied to the root and icon container and `Typography` if `alternativeLabel={true}`. */
  alternativeLabel: {},
  /* Styles applied to the container element which wraps `Typography` and `optional`. */
  labelContainer: {
    width: '100%',
    color: theme.palette.text.secondary,
  },
});

const StepLabel = React.forwardRef(function StepLabel(props, ref) {
  const {
    children,
    classes,
    className,
    error = false,
    optional,
    StepIconComponent: StepIconComponentProp,
    StepIconProps,
    ...other
  } = props;

  const { alternativeLabel, orientation } = React.useContext(StepperContext);
  const { active, disabled, completed, icon } = React.useContext(StepContext);

  let StepIconComponent = StepIconComponentProp;

  if (icon && !StepIconComponent) {
    StepIconComponent = StepIcon;
  }

  return (
    <span
      className={clsx(
        classes.root,
        classes[orientation],
        {
          [classes.disabled]: disabled,
          [classes.alternativeLabel]: alternativeLabel,
          [classes.error]: error,
        },
        className,
      )}
      ref={ref}
      {...other}
    >
      {icon || StepIconComponent ? (
        <span
          className={clsx(classes.iconContainer, {
            [classes.alternativeLabel]: alternativeLabel,
          })}
        >
          <StepIconComponent
            completed={completed}
            active={active}
            error={error}
            icon={icon}
            {...StepIconProps}
          />
        </span>
      ) : null}
      <span className={classes.labelContainer}>
        {children ? (
          <Typography
            variant="body2"
            component="span"
            display="block"
            className={clsx(classes.label, {
              [classes.alternativeLabel]: alternativeLabel,
              [classes.completed]: completed,
              [classes.active]: active,
              [classes.error]: error,
            })}
          >
            {children}
          </Typography>
        ) : null}
        {optional}
      </span>
    </span>
  );
});

StepLabel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * In most cases will simply be a string containing a title for the label.
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
  /**
   * Mark the step as failed.
   */
  error: PropTypes.bool,
  /**
   * Override the default label of the step icon.
   */
  icon: PropTypes.node,
  /**
   * The optional node to display.
   */
  optional: PropTypes.node,
  /**
   * The component to render in place of the [`StepIcon`](/api/step-icon/).
   */
  StepIconComponent: PropTypes.elementType,
  /**
   * Props applied to the [`StepIcon`](/api/step-icon/) element.
   */
  StepIconProps: PropTypes.object,
};

StepLabel.muiName = 'StepLabel';

export default withStyles(styles, { name: 'MuiStepLabel' })(StepLabel);
