import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import '../Button'; // So we don't have any override priority issue.

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    borderRadius: theme.shape.borderRadius,
  },
  /* Styles applied to the root element if variant="contained". */
  contained: {
    boxShadow: theme.shadows[2],
  },
  /* Styles applied to the root element if fullWidth={true}. */
  fullWidth: {
    width: '100%',
  },
  /* Styles applied to the children. */
  grouped: {
    minWidth: 40,
    '&:not(:first-child)': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    '&:not(:last-child)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  /* Styles applied to the children if variant="outlined". */
  groupedOutlined: {
    '&:not(:first-child)': {
      borderLeftColor: 'transparent',
      marginLeft: -1,
    },
  },
  /* Styles applied to the children if variant="outlined" & color="primary". */
  groupedOutlinedPrimary: {
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
  },
  /* Styles applied to the children if variant="outlined" & color="secondary". */
  groupedOutlinedSecondary: {
    '&:hover': {
      borderColor: theme.palette.secondary.main,
    },
  },
  /* Styles applied to the children if variant="contained". */
  groupedContained: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderRight: `1px solid ${theme.palette.grey[400]}`,
    },
  },
  /* Styles applied to the children if variant="contained" & color="primary". */
  groupedContainedPrimary: {
    '&:not(:last-child)': {
      borderRight: `1px solid ${theme.palette.primary.dark}`,
    },
  },
  /* Styles applied to the children if variant="contained" & color="secondary". */
  groupedContainedSecondary: {
    '&:not(:last-child)': {
      borderRight: `1px solid ${theme.palette.secondary.dark}`,
    },
  },
});

const ButtonGroup = React.forwardRef(function ButtonGroup(props, ref) {
  const {
    children,
    classes,
    className: classNameProp,
    color = 'default',
    component: Component = 'div',
    disabled = false,
    disableFocusRipple = false,
    disableRipple = false,
    fullWidth = false,
    size = 'medium',
    variant = 'outlined',
    ...other
  } = props;

  const outlined = variant === 'outlined';
  const contained = variant === 'contained';
  const primary = color === 'primary';
  const secondary = color === 'secondary';
  const buttonClassName = clsx(classes.grouped, {
    [classes.groupedOutlined]: outlined,
    [classes.groupedOutlinedPrimary]: outlined && primary,
    [classes.groupedOutlinedSecondary]: outlined && secondary,
    [classes.groupedContained]: contained,
    [classes.groupedContainedPrimary]: contained && primary,
    [classes.groupedContainedSecondary]: contained && secondary,
  });

  return (
    <Component
      role="group"
      className={clsx(
        classes.root,
        {
          [classes.contained]: contained,
          [classes.fullWidth]: fullWidth,
        },
        classNameProp,
      )}
      ref={ref}
      {...other}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return null;
        }

        warning(
          child.type !== React.Fragment,
          [
            "Material-UI: the ButtonGroup component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n'),
        );

        return React.cloneElement(child, {
          className: clsx(buttonClassName, child.props.className),
          disabled: child.props.disabled || disabled,
          color: child.props.color || color,
          disableFocusRipple,
          disableRipple,
          fullWidth,
          size: child.props.size || size,
          variant: child.props.variant || variant,
        });
      })}
    </Component>
  );
});

ButtonGroup.propTypes = {
  /**
   * The content of the button group.
   */
  children: PropTypes.node.isRequired,
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
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the buttons will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the button keyboard focus ripple will be disabled.
   * `disableRipple` must also be true.
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the button ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the buttons will take up the full width of its container.
   */
  fullWidth: PropTypes.bool,
  /**
   * The size of the button.
   * `small` is equivalent to the dense button styling.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['outlined', 'contained']),
};

export default withStyles(styles, { name: 'MuiButtonGroup' })(ButtonGroup);
