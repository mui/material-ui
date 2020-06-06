import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import StepIcon from '../StepIcon';

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
  },
});

const StepLabel = React.forwardRef(function StepLabel(props, ref) {
  const {
    // eslint-disable-next-line react/prop-types
    active = false,
    // eslint-disable-next-line react/prop-types
    alternativeLabel = false,
    children,
    classes,
    className,
    // eslint-disable-next-line react/prop-types
    completed = false,
    disabled = false,
    error = false,
    // eslint-disable-next-line react/prop-types
    expanded,
    icon,
    // eslint-disable-next-line react/prop-types
    last,
    optional,
    // eslint-disable-next-line react/prop-types
    orientation = 'horizontal',
    StepIconComponent: StepIconComponentProp,
    StepIconProps,
    ...other
  } = props;

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
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
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
