import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';
import ButtonBase from '../ButtonBase';
import { capitalize } from '../utils/helpers';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    textAlign: 'center',
    flex: '0 0 auto',
    fontSize: theme.typography.pxToRem(24),
    padding: 12,
    borderRadius: '50%',
    overflow: 'visible', // Explicitly set the default value to solve a bug on IE 11.
    color: theme.palette.action.active,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      backgroundColor: fade(theme.palette.action.active, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&$disabled': {
      backgroundColor: 'transparent',
      color: theme.palette.action.disabled,
    },
  },
  /* Styles applied to the root element if `edge="start"`. */
  edgeStart: {
    marginLeft: -12,
    '$sizeSmall&': {
      marginLeft: -3,
    },
  },
  /* Styles applied to the root element if `edge="end"`. */
  edgeEnd: {
    marginRight: -12,
    '$sizeSmall&': {
      marginRight: -3,
    },
  },
  /* Styles applied to the root element if `color="inherit"`. */
  colorInherit: {
    color: 'inherit',
  },
  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if `size="small"`. */
  sizeSmall: {
    padding: 3,
    fontSize: theme.typography.pxToRem(18),
  },
  /* Styles applied to the children container element. */
  label: {
    width: '100%',
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
});

/**
 * Refer to the [Icons](/components/icons/) section of the documentation
 * regarding the available icon options.
 */
const IconButton = React.forwardRef(function IconButton(props, ref) {
  const {
    edge = false,
    children,
    classes,
    className,
    color = 'default',
    disabled = false,
    disableFocusRipple = false,
    size = 'medium',
    ...other
  } = props;

  return (
    <ButtonBase
      className={clsx(
        classes.root,
        {
          [classes[`color${capitalize(color)}`]]: color !== 'default',
          [classes.disabled]: disabled,
          [classes[`size${capitalize(size)}`]]: size !== 'medium',
          [classes.edgeStart]: edge === 'start',
          [classes.edgeEnd]: edge === 'end',
        },
        className,
      )}
      centerRipple
      focusRipple={!disableFocusRipple}
      disabled={disabled}
      ref={ref}
      {...other}
    >
      <span className={classes.label}>{children}</span>
    </ButtonBase>
  );
});

IconButton.propTypes = {
  /**
   * The icon element.
   */
  children: chainPropTypes(PropTypes.node, props => {
    const found = React.Children.toArray(props.children).some(
      child => React.isValidElement(child) && child.props.onClick,
    );

    if (found) {
      return new Error(
        [
          'Material-UI: you are providing an onClick event listener ' +
            'to a child of a button element.',
          'Firefox will never trigger the event.',
          'You should move the onClick listener to the parent button element.',
          'https://github.com/mui-org/material-ui/issues/13957',
        ].join('\n'),
      );
    }

    return null;
  }),
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
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   * `disableRipple` must also be true.
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   */
  edge: PropTypes.oneOf(['start', 'end', false]),
  /**
   * The size of the button.
   * `small` is equivalent to the dense button styling.
   */
  size: PropTypes.oneOf(['small', 'medium']),
};

export default withStyles(styles, { name: 'MuiIconButton' })(IconButton);
