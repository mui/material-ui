import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  elementTypeAcceptingRef,
  refType,
  unstable_capitalize as capitalize,
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
import useButton from '@mui/base/useButton';
import { EventHandlers } from '@mui/base/utils';
import composeClasses from '@mui/base/composeClasses';
import { useThemeProps, alpha } from '@mui/system';
import TouchRipple from './TouchRipple';
import { TouchRippleActions } from './TouchRipple.types';
import useTouchRipple from './useTouchRipple';
import { MD3ColorSchemeTokens, styled } from '../styles';
import buttonClasses, { getButtonUtilityClass } from './buttonClasses';
import { ButtonProps, ExtendButton, ButtonTypeMap, ButtonOwnerState } from './Button.types';

const useUtilityClasses = (styleProps: ButtonOwnerState) => {
  const {
    classes,
    color,
    disabled,
    active,
    disableElevation,
    focusVisible,
    focusVisibleClassName,
    fullWidth,
    size,
    variant,
  } = styleProps;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      active && 'active',
      variant,
      `color${capitalize(color ?? '')}`,
      `size${capitalize(size ?? '')}`,
      disableElevation && 'disableElevation',
      fullWidth && 'fullWidth',
    ],
    label: ['label'],
    startIcon: ['startIcon', `iconSize${capitalize(size ?? '')}`],
    endIcon: ['endIcon', `iconSize${capitalize(size ?? '')}`],
  };

  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);

  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }

  return composedClasses;
};

const commonIconStyles = ({ size }: ButtonOwnerState) => ({
  color: 'var(--md-comp-button-icon-color)',
  ...(size === 'small' && {
    '& > *:nth-of-type(1)': {
      fontSize: 18,
    },
  }),
  ...(size === 'medium' && {
    '& > *:nth-of-type(1)': {
      fontSize: 20,
    },
  }),
  ...(size === 'large' && {
    '& > *:nth-of-type(1)': {
      fontSize: 22,
    },
  }),
});

export const ButtonRoot = styled('button', {
  name: 'MuiButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.variant],
      styles[`${ownerState.variant}${capitalize(ownerState.color)}`],
      styles[`size${capitalize(ownerState.size)}`],
      styles[`${ownerState.variant}Size${capitalize(ownerState.size)}`],
      ownerState.color === 'inherit' && styles.colorInherit,
      ownerState.disableElevation && styles.disableElevation,
      ownerState.fullWidth && styles.fullWidth,
    ];
  },
})<{ ownerState: ButtonOwnerState }>(({ ownerState, theme }) => {
  const tokens = theme.vars || theme;

  const containerColor = {
    elevated: `linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05)), ${tokens.sys.color.surface}`,
    filled: tokens.sys.color[ownerState.color ?? 'primary'],
    filledTonal: tokens.sys.color.secondaryContainer,
    outlined: 'transparent',
    text: 'transparent',
  };

  const labelTextColor = {
    elevated: tokens.sys.color.primary,
    filled:
      tokens.sys.color[
        `on${capitalize(ownerState.color ?? 'primary')}` as keyof MD3ColorSchemeTokens
      ],
    filledTonal: tokens.sys.color.onSecondaryContainer,
    outlined: tokens.sys.color[ownerState.color ?? 'primary'],
    text: tokens.sys.color[ownerState.color ?? 'primary'],
  };

  const disabledContainerColor = {
    elevated: theme.vars
      ? `rgba(${theme.vars.sys.color.onSurfaceChannel} / 0.12)`
      : alpha(theme.sys.color.onSurface, 0.12),
    filled: theme.vars
      ? `rgba(${theme.vars.sys.color.onSurfaceChannel} / 0.12)`
      : alpha(theme.sys.color.onSurface, 0.12),
    filledTonal: theme.vars
      ? `rgba(${theme.vars.sys.color.onSurfaceChannel} / 0.12)`
      : alpha(theme.sys.color.onSurface, 0.12),
    outlined: 'transparent',
    text: 'transparent',
  };

  const hoveredContainerColor = {
    elevated: theme.vars
      ? `rgba(${tokens.sys.color.primaryChannel} / ${tokens.sys.state.hover.stateLayerOpacity})`
      : alpha(theme.sys.color.primary, theme.sys.state.hover.stateLayerOpacity),
    filled: theme.vars
      ? `rgba(${tokens.sys.color[`${ownerState.color ?? 'primary'}Channel`]} / calc(1 - ${
          tokens.sys.state.hover.stateLayerOpacity
        }))`
      : alpha(
          theme.sys.color[ownerState.color ?? 'primary'],
          1 - theme.sys.state.hover.stateLayerOpacity,
        ),
    filledTonal: theme.vars
      ? `rgba(${tokens.sys.color.secondaryContainerChannel} / calc(1 - ${tokens.sys.state.hover.stateLayerOpacity}))`
      : alpha(theme.sys.color.secondaryContainer, 1 - theme.sys.state.hover.stateLayerOpacity),
    outlined: theme.vars
      ? `rgba(${tokens.sys.color[`${ownerState.color ?? 'primary'}Channel`]} / ${
          tokens.sys.state.hover.stateLayerOpacity
        })`
      : alpha(
          theme.sys.color[ownerState.color ?? 'primary'],
          theme.sys.state.hover.stateLayerOpacity,
        ),
    text: theme.vars
      ? `rgba(${tokens.sys.color[`${ownerState.color ?? 'primary'}Channel`]} / ${
          tokens.sys.state.hover.stateLayerOpacity
        })`
      : alpha(
          theme.sys.color[ownerState.color ?? 'primary'],
          theme.sys.state.hover.stateLayerOpacity,
        ),
  };

  const pressedContainerColor = {
    elevated: theme.vars
      ? `rgba(${tokens.sys.color.primaryChannel} / ${tokens.sys.state.pressed.stateLayerOpacity})`
      : alpha(theme.sys.color.primary, theme.sys.state.pressed.stateLayerOpacity),
    filled: theme.vars
      ? `rgba(${tokens.sys.color[`${ownerState.color ?? 'primary'}Channel`]} / calc(1 - ${
          tokens.sys.state.pressed.stateLayerOpacity
        }))`
      : alpha(
          theme.sys.color[ownerState.color ?? 'primary'],
          1 - theme.sys.state.pressed.stateLayerOpacity,
        ),
    filledTonal: theme.vars
      ? `rgba(${tokens.sys.color.secondaryContainerChannel} / calc(1 - ${tokens.sys.state.pressed.stateLayerOpacity}))`
      : alpha(theme.sys.color.secondaryContainer, 1 - theme.sys.state.pressed.stateLayerOpacity),
    outlined: theme.vars
      ? `rgba(${tokens.sys.color[`${ownerState.color ?? 'primary'}Channel`]} / ${
          tokens.sys.state.pressed.stateLayerOpacity
        })`
      : alpha(
          theme.sys.color[ownerState.color ?? 'primary'],
          theme.sys.state.pressed.stateLayerOpacity,
        ),
    text: theme.vars
      ? `rgba(${tokens.sys.color[`${ownerState.color ?? 'primary'}Channel`]} / ${
          tokens.sys.state.pressed.stateLayerOpacity
        })`
      : alpha(
          theme.sys.color[ownerState.color ?? 'primary'],
          theme.sys.state.pressed.stateLayerOpacity,
        ),
  };

  const focusedContainerColor = {
    elevated: theme.vars
      ? `rgba(${tokens.sys.color.primaryChannel} / ${tokens.sys.state.focus.stateLayerOpacity})`
      : alpha(theme.sys.color.primary, theme.sys.state.focus.stateLayerOpacity),
    filled: theme.vars
      ? `rgba(${tokens.sys.color[`${ownerState.color ?? 'primary'}Channel`]} / calc(1 - ${
          tokens.sys.state.focus.stateLayerOpacity
        }))`
      : alpha(
          theme.sys.color[ownerState.color ?? 'primary'],
          1 - theme.sys.state.focus.stateLayerOpacity,
        ),
    // According to the spec, this should be: secondaryContainerChannel / 1 - focusStateLayerOpacity, but this doesn't have the enough contrast
    filledTonal: theme.vars
      ? `rgba(${tokens.sys.color.primaryChannel} / 0.3)`
      : alpha(theme.sys.color.primary, 0.3),
    outlined: theme.vars
      ? `rgba(${tokens.sys.color[`${ownerState.color ?? 'primary'}Channel`]} / ${
          tokens.sys.state.focus.stateLayerOpacity
        })`
      : alpha(
          theme.sys.color[ownerState.color ?? 'primary'],
          theme.sys.state.focus.stateLayerOpacity,
        ),
    text: theme.vars
      ? `rgba(${tokens.sys.color[`${ownerState.color ?? 'primary'}Channel`]} / ${
          tokens.sys.state.focus.stateLayerOpacity
        })`
      : alpha(
          theme.sys.color[ownerState.color ?? 'primary'],
          theme.sys.state.focus.stateLayerOpacity,
        ),
  };

  const containerElevation = {
    elevated: tokens.sys.elevation[1],
    filled: tokens.sys.elevation[0],
    filledTonal: tokens.sys.elevation[0],
    outlined: tokens.sys.elevation[0],
    text: tokens.sys.elevation[0],
  };

  const hoveredContainerElevation = {
    elevated: tokens.sys.elevation[2],
    filled: tokens.sys.elevation[1],
    filledTonal: tokens.sys.elevation[1],
    outlined: tokens.sys.elevation[0],
    text: tokens.sys.elevation[0],
  };

  const focusedContainerElevation = {
    elevated: tokens.sys.elevation[1],
    filled: tokens.sys.elevation[0],
    filledTonal: tokens.sys.elevation[0],
    outlined: tokens.sys.elevation[0],
    text: tokens.sys.elevation[0],
  };

  const pressedContainerElevation = {
    elevated: tokens.sys.elevation[1],
    filled: tokens.sys.elevation[0],
    filledTonal: tokens.sys.elevation[0],
    outlined: tokens.sys.elevation[0],
    text: tokens.sys.elevation[0],
  };

  const disabledLabelTextColor = theme.vars
    ? `rgba(${theme.vars.sys.color.onSurfaceChannel} / 0.38)`
    : alpha(theme.sys.color.onSurface, 0.38);

  const letterSpacing = `${
    theme.sys.typescale.label.large.tracking / theme.sys.typescale.label.large.size
  }rem`;

  const borderRadiusValue: string | number = tokens.sys.shape.corner.full;
  const borderRadius = Number.isNaN(Number(borderRadiusValue))
    ? borderRadiusValue
    : `${borderRadiusValue}px`;

  return {
    // Icon variables default values
    '--md-comp-button-icon-color': labelTextColor[ownerState.variant ?? 'text'],
    '--md-comp-button-hovered-icon-color': labelTextColor[ownerState.variant ?? 'text'], // same as default
    '--md-comp-button-pressed-icon-color': labelTextColor[ownerState.variant ?? 'text'], // same as default
    '--md-comp-button-focused-icon-color': labelTextColor[ownerState.variant ?? 'text'], // same as default
    '--md-comp-button-disabled-icon-color': disabledLabelTextColor,
    // Normalized styles for buttons
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: `var(--Button-margin, 0)`, // Remove the margin in Safari by default
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none', // Reset
    WebkitAppearance: 'none', // Reset
    textDecoration: 'none',
    '&::-moz-focus-inner': {
      borderStyle: 'none', // Remove Firefox dotted outline.
    },
    '@media print': {
      colorAdjust: 'exact',
    },
    padding: '10px 24px',
    minWidth: 64,
    letterSpacing,
    transition: theme.sys.motion.create(
      ['background-color', 'box-shadow', 'border-color', 'color'],
      {
        duration: tokens.sys.motion.duration.short3,
      },
    ),
    fontFamily: tokens.sys.typescale.label.large.family,
    fontWeight: tokens.sys.typescale.label.large.weight,
    fontSize: theme.typography.pxToRem(theme.sys.typescale.label.large.size), // the pxToRem should be moved to typescale in the future
    lineHeight: `calc(${tokens.sys.typescale.label.large.lineHeight} / ${theme.sys.typescale.label.large.size})`,
    borderRadius: `var(--Button-radius, ${borderRadius})`,
    backgroundColor: containerColor[ownerState.variant ?? 'text'],
    color: labelTextColor[ownerState.variant ?? 'text'],
    boxShadow: containerElevation[ownerState.variant ?? 'text'],
    // Outlined variant
    ...(ownerState.variant === 'outlined' && {
      border: `1px solid ${tokens.sys.color.outline}`,
      padding: '9px 23px',
    }),
    '--Button-gap': '0.5rem',
    // Sizes are not specified in Material You, this need to be revised
    ...(ownerState.size === 'small' && {
      '--Button-gap': '0.45rem',
      fontSize: theme.typography.pxToRem(theme.sys.typescale.label.large.size - 1), // the pxToRem should be moved to typescale in the future
      padding: '8px 20px',
      ...(ownerState.variant === 'outlined' && {
        padding: '7px 19px',
      }),
    }),
    ...(ownerState.size === 'large' && {
      '--Button-gap': '0.55rem',
      fontSize: theme.typography.pxToRem(theme.sys.typescale.label.large.size + 1), // the pxToRem should be moved to typescale in the future
      padding: '12px 26px',
      ...(ownerState.variant === 'outlined' && {
        padding: '11px 25px',
      }),
    }),
    '&:hover': {
      '--md-comp-button-icon-color': 'var(--md-comp-button-hovered-icon-color)',
      backgroundColor: hoveredContainerColor[ownerState.variant ?? 'text'],
      boxShadow: hoveredContainerElevation[ownerState.variant ?? 'text'],
    },
    [`&.${buttonClasses.active}`]: {
      '--md-comp-button-icon-color': 'var(--md-comp-button-pressed-icon-color)',
      ...((ownerState.disableRipple || ownerState.disableTouchRipple) && {
        backgroundColor: pressedContainerColor[ownerState.variant ?? 'text'],
      }),
      boxShadow: pressedContainerElevation[ownerState.variant ?? 'text'],
    },
    [`&.${buttonClasses.focusVisible}`]: {
      '--md-comp-button-icon-color': 'var(--md-comp-button-focused-icon-color)',
      backgroundColor: focusedContainerColor[ownerState.variant ?? 'text'],
      boxShadow: focusedContainerElevation[ownerState.variant ?? 'text'],
    },
    [`&.${buttonClasses.disabled}`]: {
      // Allows developer to specify the disabled icon color var
      '--md-comp-button-icon-color': 'var(--md-comp-button-disabled-icon-color)',
      pointerEvents: 'none', // Disable link interactions
      cursor: 'default',
      color: disabledLabelTextColor,
      backgroundColor: disabledContainerColor[ownerState.variant ?? 'text'],
      boxShadow: tokens.sys.elevation[0],
      ...(ownerState.variant === 'outlined' && {
        border: `1px solid ${
          theme.vars
            ? `rgba(${theme.vars.sys.color.onSurfaceChannel} / 0.12)`
            : alpha(theme.sys.color.onSurface, 0.12)
        }`,
      }),
    },
  };
});

const ButtonStartIcon = styled('span', {
  name: 'MuiButton',
  slot: 'StartIcon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.startIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  },
})<{ ownerState: ButtonOwnerState }>(({ ownerState }) => ({
  display: 'inherit',
  marginRight: 'var(--Button-gap)',
  ...commonIconStyles(ownerState),
}));

const ButtonEndIcon = styled('span', {
  name: 'MuiButton',
  slot: 'EndIcon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.endIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  },
})<{ ownerState: ButtonOwnerState }>(({ ownerState }) => ({
  display: 'inherit',
  marginLeft: 'var(--Button-gap)',
  ...commonIconStyles(ownerState),
}));

const Button = React.forwardRef(function Button<
  BaseComponentType extends React.ElementType = ButtonTypeMap['defaultComponent'],
>(inProps: ButtonProps<BaseComponentType>, ref: React.ForwardedRef<any>) {
  const props = useThemeProps({ props: inProps, name: 'MuiButton' });
  const {
    action,
    centerRipple = false,
    children,
    className,
    classes: classesProp,
    color = 'primary',
    component = 'button',
    disabled = false,
    focusableWhenDisabled = false,
    disableElevation = false,
    disableRipple = false,
    disableTouchRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    LinkComponent = 'a',
    onBlur,
    onClick,
    onContextMenu,
    onDragLeave,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    size = 'medium',
    startIcon: startIconProp,
    tabIndex = 0,
    TouchRippleProps,
    type,
    variant = 'text',
    ...other
  } = props;

  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>(null);
  const handleRef = useForkRef(buttonRef, ref);

  const rippleRef = React.useRef<TouchRippleActions>(null);
  let ComponentProp = component;

  if (ComponentProp === 'button' && (other.href || other.to)) {
    ComponentProp = LinkComponent;
  }

  const { focusVisible, active, setFocusVisible, getRootProps } = useButton({
    disabled,
    focusableWhenDisabled,
    href: props.href,
    onFocusVisible,
    tabIndex,
    // @ts-ignore
    to: props.to,
    type,
    ref: handleRef,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current!.focus();
      },
    }),
    [setFocusVisible],
  );

  const { enableTouchRipple, getRippleHandlers } = useTouchRipple({
    disabled,
    disableRipple,
    disableTouchRipple,
    rippleRef,
  });

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (enableTouchRipple && !rippleRef.current) {
        console.error(
          [
            'MUI: The `component` prop provided to Button is invalid.',
            'Please make sure the children prop is rendered in this custom component.',
          ].join('\n'),
        );
      }
    }, [enableTouchRipple]);
  }

  const ownerState = {
    ...props,
    classes: classesProp,
    color,
    component,
    disabled,
    disableElevation,
    active,
    focusVisible,
    fullWidth,
    size,
    tabIndex,
    type,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const startIcon = startIconProp && (
    <ButtonStartIcon className={classes.startIcon} ownerState={ownerState}>
      {startIconProp}
    </ButtonStartIcon>
  );

  const endIcon = endIconProp && (
    <ButtonEndIcon className={classes.endIcon} ownerState={ownerState}>
      {endIconProp}
    </ButtonEndIcon>
  );

  return (
    <ButtonRoot
      as={ComponentProp}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...getRootProps(getRippleHandlers(props) as unknown as EventHandlers)}
      {...other}
    >
      {startIcon}
      {children}
      {endIcon}
      {enableTouchRipple ? (
        /* TouchRipple is only needed client-side, x2 boost on the server. */
        <TouchRipple center={centerRipple} {...TouchRippleProps} ref={rippleRef} />
      ) : null}
    </ButtonRoot>
  );
}) as ExtendButton<ButtonTypeMap>;

Button.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: refType,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: PropTypes.bool,
  /**
   * The content of the component.
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: PropTypes.bool,
  /**
   * Element placed after the children.
   */
  endIcon: PropTypes.node,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: PropTypes.elementType,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onContextMenu: PropTypes.func,
  /**
   * @ignore
   */
  onDragLeave: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onFocusVisible: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * @ignore
   */
  onMouseUp: PropTypes.func,
  /**
   * @ignore
   */
  onTouchEnd: PropTypes.func,
  /**
   * @ignore
   */
  onTouchMove: PropTypes.func,
  /**
   * @ignore
   */
  onTouchStart: PropTypes.func,
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
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: PropTypes.object,
  /**
   * @ignore
   */
  type: PropTypes.oneOfType([PropTypes.oneOf(['button', 'reset', 'submit']), PropTypes.string]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['text', 'outlined', 'filled', 'filledTonal', 'elevated']),
    PropTypes.string,
  ]),
} as any;

export default Button;
