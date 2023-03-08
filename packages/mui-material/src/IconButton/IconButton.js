import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { alpha } from '@mui/system';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import iconButtonClasses, { getIconButtonUtilityClass } from './iconButtonClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, disabled, color, edge, size } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      color !== 'default' && `color${capitalize(color)}`,
      edge && `edge${capitalize(edge)}`,
      `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getIconButtonUtilityClass, classes);
};

const IconButtonRoot = styled(ButtonBase, {
  name: 'MuiIconButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`],
      ownerState.edge && styles[`edge${capitalize(ownerState.edge)}`],
      styles[`size${capitalize(ownerState.size)}`],
    ];
  },
})(
  ({ theme, ownerState }) => ({
    textAlign: 'center',
    flex: '0 0 auto',
    fontSize: theme.typography.pxToRem(24),
    padding: 8,
    borderRadius: '50%',
    overflow: 'visible', // Explicitly set the default value to solve a bug on IE11.
    color: (theme.vars || theme).palette.action.active,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    ...(!ownerState.disableRipple && {
      '&:hover': {
        backgroundColor: theme.vars
          ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
          : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
    }),
    ...(ownerState.edge === 'start' && {
      marginLeft: ownerState.size === 'small' ? -3 : -12,
    }),
    ...(ownerState.edge === 'end' && {
      marginRight: ownerState.size === 'small' ? -3 : -12,
    }),
  }),
  ({ theme, ownerState }) => {
    const palette = (theme.vars || theme).palette?.[ownerState.color];
    return {
      ...(ownerState.color === 'inherit' && {
        color: 'inherit',
      }),
      ...(ownerState.color !== 'inherit' &&
        ownerState.color !== 'default' && {
          color: palette?.main,
          ...(!ownerState.disableRipple && {
            '&:hover': {
              ...(palette && {
                backgroundColor: theme.vars
                  ? `rgba(${palette.mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                  : alpha(palette.main, theme.palette.action.hoverOpacity),
              }),
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                backgroundColor: 'transparent',
              },
            },
          }),
        }),
      ...(ownerState.size === 'small' && {
        padding: 5,
        fontSize: theme.typography.pxToRem(18),
      }),
      ...(ownerState.size === 'large' && {
        padding: 12,
        fontSize: theme.typography.pxToRem(28),
      }),
      [`&.${iconButtonClasses.disabled}`]: {
        backgroundColor: 'transparent',
        color: (theme.vars || theme).palette.action.disabled,
      },
    };
  },
);

/**
 * Refer to the [Icons](/material-ui/icons/) section of the documentation
 * regarding the available icon options.
 */
const IconButton = React.forwardRef(function IconButton(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiIconButton' });
  const {
    edge = false,
    children,
    className,
    color = 'default',
    disabled = false,
    disableFocusRipple = false,
    size = 'medium',
    ...other
  } = props;

  const ownerState = {
    ...props,
    edge,
    color,
    disabled,
    disableFocusRipple,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <IconButtonRoot
      className={clsx(classes.root, className)}
      centerRipple
      focusRipple={!disableFocusRipple}
      disabled={disabled}
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      {children}
    </IconButtonRoot>
  );
});

IconButton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The icon to display.
   */
  children: chainPropTypes(PropTypes.node, (props) => {
    const found = React.Children.toArray(props.children).some(
      (child) => React.isValidElement(child) && child.props.onClick,
    );

    if (found) {
      return new Error(
        [
          'MUI: You are providing an onClick event listener to a child of a button element.',
          'Prefer applying it to the IconButton directly.',
          'This guarantees that the whole <button> will be responsive to click events.',
        ].join('\n'),
      );
    }

    return null;
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'default'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      'inherit',
      'default',
      'primary',
      'secondary',
      'error',
      'info',
      'success',
      'warning',
    ]),
    PropTypes.string,
  ]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(['end', 'start', false]),
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default IconButton;
