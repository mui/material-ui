'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes, unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses, useSlotProps } from '@mui/base';
import { useThemeProps, alpha, shouldForwardProp } from '@mui/system';
import resolveProps from '@mui/utils/resolveProps';
import ButtonBase from '../ButtonBase';
import { styled } from '../styles';
import { getIconButtonUtilityClass } from './iconButtonClasses';
import buttonBaseClasses from '../ButtonBase/buttonBaseClasses';
import { IconButtonOwnerState, IconButtonProps, IconButtonTypeMap } from './IconButton.types';
import { ButtonGroupButtonContext, ButtonGroupContext } from '../ButtonGroup';

const useUtilityClasses = (ownerState: IconButtonOwnerState) => {
  const { classes, color, edge, size } = ownerState;

  const slots = {
    root: [
      'root',
      `color${capitalize(color ?? '')}`,
      `size${capitalize(size ?? '')}`,
      edge && `edge${capitalize(edge)}`,
    ],
    label: ['label'],
  };

  const composedClasses = composeClasses(slots, getIconButtonUtilityClass, classes);

  return {
    ...classes, // forward the focused, disabled, etc. classes to the ButtonBase
    ...composedClasses,
  };
};

export const IconButtonRoot = styled(ButtonBase, {
  name: 'MuiIconButton',
  slot: 'Root',
  shouldForwardProp: (prop) => shouldForwardProp(prop),
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[`color${capitalize(ownerState.color)}`],
      styles[`size${capitalize(ownerState.size)}`],
      ownerState.edge && styles[`edge${capitalize(ownerState.edge)}`],
    ];
  },
})<{ ownerState: IconButtonOwnerState }>(
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
    const tokens = theme.vars || theme;

    const palette =
      tokens.palette?.[
        !ownerState.color || ownerState.color === 'inherit' || ownerState.color === 'default'
          ? 'primary'
          : ownerState.color
      ];

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
      [`&.${buttonBaseClasses.disabled}`]: {
        backgroundColor: 'transparent',
        color: tokens.palette.action.disabled,
      },
    };
  },
);

/**
 * Refer to the [Icons](/material-ui/icons/) section of the documentation
 * regarding the available icon options.
 */
const IconButton = React.forwardRef(function IconButton<
  BaseComponentType extends React.ElementType = IconButtonTypeMap['defaultComponent'],
>(inProps: IconButtonProps<BaseComponentType>, ref: React.ForwardedRef<any>) {
  const contextProps = React.useContext(ButtonGroupContext);
  const buttonGroupButtonContextPositionClassName = React.useContext(ButtonGroupButtonContext);
  const resolvedProps = resolveProps(
    (contextProps ?? {}) as IconButtonProps<BaseComponentType>,
    inProps,
  );
  const props = useThemeProps({ props: resolvedProps, name: 'MuiIconButton' });
  const {
    edge = false,
    children,
    classes: classesProp,
    color = 'default',
    size = 'medium',
    ...other
  } = props;

  const ownerState = {
    ...props,
    classes: classesProp,
    edge,
    color,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const positionClassName = buttonGroupButtonContextPositionClassName ?? '';

  const rootProps = useSlotProps({
    elementType: IconButtonRoot,
    externalForwardedProps: other,
    externalSlotProps: {},
    additionalProps: {
      classes,
      ref,
    },
    ownerState,
    className: clsx(contextProps?.className, positionClassName),
  });

  return <IconButtonRoot {...rootProps}>{children}</IconButtonRoot>;
});

IconButton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
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
   * @ignore
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: PropTypes.bool,
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
  sx: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default IconButton;
