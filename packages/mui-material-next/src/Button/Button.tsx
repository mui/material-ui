import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  elementTypeAcceptingRef,
  refType,
  unstable_capitalize as capitalize,
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
import { useButton, UseButtonRootSlotOwnProps } from '@mui/base/ButtonUnstyled';
import composeClasses from '@mui/base/composeClasses';
import { useThemeProps, alpha } from '@mui/system';
import { MD3ColorSchemeTokens, styled } from '../styles';
import buttonClasses, { getButtonUtilityClass } from './buttonClasses';
import { ButtonProps, ExtendButton, ButtonTypeMap, ButtonOwnerState } from './Button.types';

const useUtilityClasses = (styleProps: ButtonOwnerState) => {
  const {
    classes,
    color,
    disabled,
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
      variant,
      `${variant}${capitalize(color ?? '')}`,
      `size${capitalize(size ?? '')}`,
      `${variant}Size${capitalize(size ?? '')}`,
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
  const containerColor = {
    elevated: `linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05)), ${
      (theme.vars || theme).palette.md3.colors.surface
    }`,
    filled: (theme.vars || theme).palette.md3.colors[ownerState.color ?? 'primary'],
    filledTonal: (theme.vars || theme).palette.md3.colors.secondaryContainer,
    outlined: 'none',
    text: 'none',
  };

  const labelTextColor = {
    elevated: (theme.vars || theme).palette.md3.colors.primary,
    filled: (theme.vars || theme).palette.md3.colors[
      `on${capitalize(ownerState.color ?? 'primary')}` as keyof MD3ColorSchemeTokens
    ],
    filledTonal: (theme.vars || theme).palette.md3.colors.onSecondaryContainer,
    outlined: (theme.vars || theme).palette.md3.colors[ownerState.color ?? 'primary'],
    text: (theme.vars || theme).palette.md3.colors[ownerState.color ?? 'primary'],
  };

  const disabeldContainerColor = {
    elevated: theme.vars
      ? `rgba(${theme.vars.palette.md3.colors.onSurfaceChannel} / 0.12)`
      : alpha(theme.palette.md3.colors.onSurface, 0.12),
    filled: theme.vars
      ? `rgba(${theme.vars.palette.md3.colors.onSurfaceChannel} / 0.12)`
      : alpha(theme.palette.md3.colors.onSurface, 0.12),
    filledTonal: theme.vars
      ? `rgba(${theme.vars.palette.md3.colors.onSurfaceChannel} / 0.12)`
      : alpha(theme.palette.md3.colors.onSurface, 0.12),
    outlined: 'none',
    text: 'none',
  };

  const hoveredContainerColor = {
    elevated: theme.vars
      ? `rgba(${(theme.vars || theme).palette.md3.colors.primaryChannel} / ${
          (theme.vars || theme).state.hover.stateLayerOpacity
        })`
      : alpha(theme.palette.md3.colors.primary, theme.state.hover.stateLayerOpacity),
    filled: theme.vars
      ? `rgba(${
          (theme.vars || theme).palette.md3.colors[`${ownerState.color ?? 'primary'}Channel`]
        } / calc(1 - ${(theme.vars || theme).state.hover.stateLayerOpacity}))`
      : alpha(
          theme.palette.md3.colors[ownerState.color ?? 'primary'],
          1 - theme.state.hover.stateLayerOpacity,
        ),
    filledTonal: theme.vars
      ? `rgba(${(theme.vars || theme).palette.md3.colors.secondaryContainerChannel} / calc(1 - ${
          (theme.vars || theme).state.hover.stateLayerOpacity
        }))`
      : alpha(theme.palette.md3.colors.secondaryContainer, 1 - theme.state.hover.stateLayerOpacity),
    outlined: theme.vars
      ? `rgba(${
          (theme.vars || theme).palette.md3.colors[`${ownerState.color ?? 'primary'}Channel`]
        } / ${(theme.vars || theme).state.hover.stateLayerOpacity})`
      : alpha(
          theme.palette.md3.colors[ownerState.color ?? 'primary'],
          theme.state.hover.stateLayerOpacity,
        ),
    text: theme.vars
      ? `rgba(${
          (theme.vars || theme).palette.md3.colors[`${ownerState.color ?? 'primary'}Channel`]
        } / ${(theme.vars || theme).state.hover.stateLayerOpacity})`
      : alpha(
          theme.palette.md3.colors[ownerState.color ?? 'primary'],
          theme.state.hover.stateLayerOpacity,
        ),
  };

  const hoveredContainerElevation = {
    elevated: theme.shadows[4], // not the correct value, need to be validated
    filled: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
    filledTonal: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
    outlined: 'none',
    text: 'none',
  };

  const pressedContainerColor = {
    elevated: theme.vars
      ? `rgba(${(theme.vars || theme).palette.md3.colors.primaryChannel} / ${
          (theme.vars || theme).state.pressed.stateLayerOpacity
        })`
      : alpha(theme.palette.md3.colors.primary, theme.state.pressed.stateLayerOpacity),
    filled: theme.vars
      ? `rgba(${
          (theme.vars || theme).palette.md3.colors[`${ownerState.color ?? 'primary'}Channel`]
        } / calc(1 - ${(theme.vars || theme).state.pressed.stateLayerOpacity}))`
      : alpha(
          theme.palette.md3.colors[ownerState.color ?? 'primary'],
          1 - theme.state.pressed.stateLayerOpacity,
        ),
    filledTonal: theme.vars
      ? `rgba(${(theme.vars || theme).palette.md3.colors.secondaryContainerChannel} / calc(1 - ${
          (theme.vars || theme).state.pressed.stateLayerOpacity
        }))`
      : alpha(
          theme.palette.md3.colors.secondaryContainer,
          1 - theme.state.pressed.stateLayerOpacity,
        ),
    outlined: theme.vars
      ? `rgba(${
          (theme.vars || theme).palette.md3.colors[`${ownerState.color ?? 'primary'}Channel`]
        } / ${(theme.vars || theme).state.pressed.stateLayerOpacity})`
      : alpha(
          theme.palette.md3.colors[ownerState.color ?? 'primary'],
          theme.state.pressed.stateLayerOpacity,
        ),
    text: theme.vars
      ? `rgba(${
          (theme.vars || theme).palette.md3.colors[`${ownerState.color ?? 'primary'}Channel`]
        } / ${(theme.vars || theme).state.pressed.stateLayerOpacity})`
      : alpha(
          theme.palette.md3.colors[ownerState.color ?? 'primary'],
          theme.state.pressed.stateLayerOpacity,
        ),
  };

  const focusedContainerColor = {
    elevated: theme.vars
      ? `rgba(${(theme.vars || theme).palette.md3.colors.primaryChannel} / ${
          (theme.vars || theme).state.focus.stateLayerOpacity
        })`
      : alpha(theme.palette.md3.colors.primary, theme.state.focus.stateLayerOpacity),
    filled: theme.vars
      ? `rgba(${
          (theme.vars || theme).palette.md3.colors[`${ownerState.color ?? 'primary'}Channel`]
        } / calc(1 - ${(theme.vars || theme).state.focus.stateLayerOpacity}))`
      : alpha(
          theme.palette.md3.colors[ownerState.color ?? 'primary'],
          1 - theme.state.focus.stateLayerOpacity,
        ),
    filledTonal: theme.vars
      ? `rgba(${(theme.vars || theme).palette.md3.colors.secondaryContainerChannel} / calc(1 - ${
          (theme.vars || theme).state.focus.stateLayerOpacity
        }))`
      : alpha(theme.palette.md3.colors.secondaryContainer, 1 - theme.state.focus.stateLayerOpacity),
    outlined: theme.vars
      ? `rgba(${
          (theme.vars || theme).palette.md3.colors[`${ownerState.color ?? 'primary'}Channel`]
        } / ${(theme.vars || theme).state.focus.stateLayerOpacity})`
      : alpha(
          theme.palette.md3.colors[ownerState.color ?? 'primary'],
          theme.state.focus.stateLayerOpacity,
        ),
    text: theme.vars
      ? `rgba(${
          (theme.vars || theme).palette.md3.colors[`${ownerState.color ?? 'primary'}Channel`]
        } / ${(theme.vars || theme).state.focus.stateLayerOpacity})`
      : alpha(
          theme.palette.md3.colors[ownerState.color ?? 'primary'],
          theme.state.focus.stateLayerOpacity,
        ),
  };

  const containerElevation = {
    elevated: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
    filled: 'none', // md.sys.elevation.level0
    filledTonal: 'none', // md.sys.elevation.level0
    outlined: 'none', // md.sys.elevation.level0
    text: 'none', // md.sys.elevation.level0
  };
  const disabledLabelTextColor = theme.vars
    ? `rgba(${theme.vars.palette.md3.colors.onSurfaceChannel} / 0.38)`
    : alpha(theme.palette.md3.colors.onSurface, 0.38);

  const letterSpacing = `${
    theme.typescale.label.large.tracking / theme.typescale.label.large.size
  }rem`;

  return {
    // What's missing:
    // 1. The container state opacities are calculated in the background color for now
    // '--md-comp-button-disabled-container-opacity': '',
    // '--md-comp-button-disabled-label-text-opacity': '',
    // '--md-comp-button-disabled-icon-opacity': '',
    // '--md-comp-button-hovered-container-state-layer-opacity': '',
    // '--md-comp-button-focused-container-state-layer-opacity': '',
    // '--md-comp-button-pressed-container-state-layer-opacity': '',
    // 2. The elevations are not correctly implemented, as I still couldn't find an actual specification around their values
    // '--md-comp-button-container-shadow-color': '',
    // '--md-comp-button-focused-container-elevation': '',
    // '--md-comp-button-pressed-container-elevation': '',
    // 3. Not sure how to make the tracking work with the CSS variables as there is a calculation needed
    // '--md-comp-button-label-text-tracking': (theme.vars || theme).typescale.label.large.tracking,
    // Icon variables default values
    '--md-comp-button-icon-color': labelTextColor[ownerState.variant ?? 'text'],
    '--md-comp-button-hovered-icon-color': labelTextColor[ownerState.variant ?? 'text'], // same as default
    '--md-comp-button-pressed-icon-color': labelTextColor[ownerState.variant ?? 'text'], // same as default
    '--md-comp-button-focused-icon-color': labelTextColor[ownerState.variant ?? 'text'], // same as default
    '--md-comp-button-disabled-icon-color': disabledLabelTextColor,
    // Dynamic variables
    '--md-comp-button-label-text-line-height': `calc(${
      (theme.vars || theme).typescale.label.large.lineHeight
    } / ${theme.typescale.label.large.size})`,
    // Noramlized styles for buttons
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent', // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0, // Remove the margin in Safari
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
    // Taken from MD2, haven't really found a spec on transitions
    transition: theme.transitions.create(
      ['background-color', 'box-shadow', 'border-color', 'color'],
      {
        duration: theme.transitions.duration.short,
      },
    ),
    fontFamily: `var(--md-comp-button-label-text-font, ${
      (theme.vars || theme).typescale.label.large.family
    })`,
    fontWeight: `var(--md-comp-button-label-text-weight, ${
      (theme.vars || theme).typescale.label.large.weight
    })`,
    fontSize: `var(--md-comp-button-label-text-size, ${
      theme.typography.pxToRem(theme.typescale.label.large.size) // the pxToRem should be moved to typescale in the future
    })`,
    lineHeight: 'var(--md-comp-button-label-text-line-height)',
    borderRadius: (theme.vars || theme).shape.borderRadius,
    background: `var(--md-comp-button-container-color, ${
      containerColor[ownerState.variant ?? 'text']
    })`,
    color: `var(--md-comp-button-label-text-color, ${
      labelTextColor[ownerState.variant ?? 'text']
    })`,
    boxShadow: `var(--md-comp-button-container-elevation, ${
      containerElevation[ownerState.variant ?? 'text']
    })`,
    // Outlined varaiant
    ...(ownerState.variant === 'outlined' && {
      border: `1px solid ${(theme.vars || theme).palette.md3.colors.outline}`,
      padding: '9px 23px',
    }),
    // Sizes are not specified in Material You, this need to be revised
    ...(ownerState.size === 'small' && {
      fontSize: `var(--md-comp-button-label-text-size, ${
        theme.typography.pxToRem(theme.typescale.label.large.size - 1) // the pxToRem should be moved to typescale in the future
      })`,
      padding: '8px 20px',
      ...(ownerState.variant === 'outlined' && {
        padding: '7px 19px',
      }),
    }),
    ...(ownerState.size === 'large' && {
      fontSize: `var(--md-comp-button-label-text-size, ${
        theme.typography.pxToRem(theme.typescale.label.large.size + 1) // the pxToRem should be moved to typescale in the future
      })`,
      padding: '12px 26px',
      ...(ownerState.variant === 'outlined' && {
        padding: '11px 25px',
      }),
    }),
    '&:hover': {
      '--md-comp-button-icon-color': 'var(--md-comp-button-hovered-icon-color)',
      color: `var(--md-comp-button-hovered-label-text-color, ${
        labelTextColor[ownerState.variant ?? 'text']
      })`,
      backgroundColor: `var(--md-comp-button-hovered-container-state-layer-color, ${
        hoveredContainerColor[ownerState.variant ?? 'text']
      })`,
      boxShadow: `var(--md-comp-button-hovered-container-elevation, ${
        hoveredContainerElevation[ownerState.variant ?? 'text']
      })`,
    },
    '&:active': {
      '--md-comp-button-icon-color': 'var(--md-comp-button-pressed-icon-color)',
      color: `var(--md-comp-button-pressed-label-text-color, ${
        labelTextColor[ownerState.variant ?? 'text']
      })`,
      backgroundColor: `var(--md-comp-button-pressed-container-state-layer-color, ${
        pressedContainerColor[ownerState.variant ?? 'text']
      })`,
    },
    [`&.${buttonClasses.focusVisible}`]: {
      '--md-comp-button-icon-color': 'var(--md-comp-button-focused-icon-color)',
      color: `var(--md-comp-button-focused-label-text-color, ${
        labelTextColor[ownerState.variant ?? 'text']
      })`,
      backgroundColor: `var(--md-comp-button-focused-container-state-layer-color, ${
        focusedContainerColor[ownerState.variant ?? 'text']
      })`,
    },
    [`&.${buttonClasses.disabled}`]: {
      // Allows deverloper to specify the disabled icon color var
      '--md-comp-button-icon-color': 'var(--md-comp-button-disabled-icon-color)',
      pointerEvents: 'none', // Disable link interactions
      cursor: 'default',
      color: `var(--md-comp-button-disabled-label-text-color, ${disabledLabelTextColor})`,
      background: `var(--md-comp-button-disabled-container-color, ${
        disabeldContainerColor[ownerState.variant ?? 'text']
      })`,
      boxShadow: 'var(--md-comp-button-disabled-container-elevation, none)', // Should be md.sys.elevation.level0
      ...(ownerState.variant === 'outlined' && {
        border: `1px solid ${
          theme.vars
            ? `rgba(${theme.vars.palette.md3.colors.onSurfaceChannel} / 0.12)`
            : alpha(theme.palette.md3.colors.onSurface, 0.12)
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
  marginRight: 8,
  marginLeft: -8,
  ...(ownerState.size === 'small' && {
    marginLeft: -2,
  }),
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
  marginRight: -8,
  marginLeft: 8,
  ...(ownerState.size === 'small' && {
    marginRight: -2,
  }),
  ...commonIconStyles(ownerState),
}));

const Button = React.forwardRef(function Button<
  BaseComponentType extends React.ElementType = ButtonTypeMap['defaultComponent'],
>(inProps: ButtonProps<BaseComponentType>, ref: React.ForwardedRef<any>) {
  const props = useThemeProps({ props: inProps, name: 'MuiButton' });
  const {
    action,
    children,
    className,
    color = 'primary',
    component = 'button',
    disabled = false,
    focusableWhenDisabled = false,
    disableElevation = false,
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
    type,
    variant = 'text',
    ...other
  } = props;

  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>(null);
  const handleRef = useForkRef(buttonRef, ref);

  let ComponentProp = component;

  if (ComponentProp === 'button' && (other.href || other.to)) {
    ComponentProp = LinkComponent;
  }

  const { focusVisible, setFocusVisible, getRootProps } = useButton({
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

  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    disableElevation,
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
      {...getRootProps()}
      {...other}
    >
      {startIcon}
      {children}
      {endIcon}
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
   * The content of the component.
   */
  children: PropTypes.node,
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
    PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']),
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
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
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
