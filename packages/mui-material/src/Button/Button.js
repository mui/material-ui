'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import resolveProps from '@mui/utils/resolveProps';
import composeClasses from '@mui/utils/composeClasses';
import { alpha } from '@mui/system/colorManipulator';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled, useTheme } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import ButtonBase, { buttonBaseClasses } from '../ButtonBase';
import capitalize from '../utils/capitalize';
import buttonClasses, { getButtonUtilityClass } from './buttonClasses';
import ButtonGroupContext from '../ButtonGroup/ButtonGroupContext';
import ButtonGroupButtonContext from '../ButtonGroup/ButtonGroupButtonContext';

const useUtilityClasses = (ownerState) => {
  const { color, disableElevation, fullWidth, size, variant, classes } = ownerState;

  const slots = {
    root: [
      'root',
      variant,
      `${variant}${capitalize(color)}`,
      `size${capitalize(size)}`,
      `${variant}Size${capitalize(size)}`,
      `color${capitalize(color)}`,
      disableElevation && 'disableElevation',
      fullWidth && 'fullWidth',
    ],
    label: ['label'],
    startIcon: ['icon', 'startIcon', `iconSize${capitalize(size)}`],
    endIcon: ['icon', 'endIcon', `iconSize${capitalize(size)}`],
  };

  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);

  return {
    ...classes, // forward the focused, disabled, etc. classes to the ButtonBase
    ...composedClasses,
  };
};

const commonIconStyles = [
  {
    props: { size: 'small' },
    style: {
      '& > *:nth-of-type(1)': {
        fontSize: 18,
      },
    },
  },
  {
    props: { size: 'medium' },
    style: {
      '& > *:nth-of-type(1)': {
        fontSize: 20,
      },
    },
  },
  {
    props: { size: 'large' },
    style: {
      '& > *:nth-of-type(1)': {
        fontSize: 22,
      },
    },
  },
];

const ButtonRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
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
})(({ theme }) => {
  const inheritContainedBackgroundColor =
    theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800];

  const inheritContainedHoverBackgroundColor =
    theme.palette.mode === 'light' ? theme.palette.grey.A100 : theme.palette.grey[700];
  return {
    ...theme.typography.button,
    minWidth: 64,
    padding: '6px 16px',
    border: 0,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    transition: theme.transitions.create(
      ['background-color', 'box-shadow', 'border-color', 'color'],
      {
        duration: theme.transitions.duration.short,
      },
    ),
    '&:hover': {
      textDecoration: 'none',
    },
    [`&.${buttonClasses.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled,
    },
    variants: [
      {
        props: { variant: 'contained' },
        style: {
          color: `var(--variant-containedColor)`,
          backgroundColor: `var(--variant-containedBg)`,
          boxShadow: (theme.vars || theme).shadows[2],
          '&:hover': {
            boxShadow: (theme.vars || theme).shadows[4],
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              boxShadow: (theme.vars || theme).shadows[2],
            },
          },
          '&:active': {
            boxShadow: (theme.vars || theme).shadows[8],
          },
          [`&.${buttonClasses.focusVisible}`]: {
            boxShadow: (theme.vars || theme).shadows[6],
          },
          [`&.${buttonClasses.disabled}`]: {
            color: (theme.vars || theme).palette.action.disabled,
            boxShadow: (theme.vars || theme).shadows[0],
            backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
          },
        },
      },
      {
        props: { variant: 'outlined' },
        style: {
          padding: '5px 15px',
          border: '1px solid currentColor',
          borderColor: `var(--variant-outlinedBorder, currentColor)`,
          backgroundColor: `var(--variant-outlinedBg)`,
          color: `var(--variant-outlinedColor)`,
          [`&.${buttonClasses.disabled}`]: {
            border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
          },
        },
      },
      {
        props: { variant: 'text' },
        style: {
          padding: '6px 8px',
          color: `var(--variant-textColor)`,
          backgroundColor: `var(--variant-textBg)`,
        },
      },
      ...Object.entries(theme.palette)
        .filter(([, palette]) => palette && palette.main && palette.dark && palette.contrastText)
        .map(([color]) => ({
          props: { color },
          style: {
            '--variant-textColor': (theme.vars || theme).palette[color].main,
            '--variant-outlinedColor': (theme.vars || theme).palette[color].main,
            '--variant-outlinedBorder': theme.vars
              ? `rgba(${theme.vars.palette[color].mainChannel} / 0.5)`
              : alpha(theme.palette[color].main, 0.5),
            '--variant-containedColor': (theme.vars || theme).palette[color].contrastText,
            '--variant-containedBg': (theme.vars || theme).palette[color].main,
            '@media (hover: hover)': {
              '&:hover': {
                '--variant-containedBg': (theme.vars || theme).palette[color].dark,
                '--variant-textBg': theme.vars
                  ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                  : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
                '--variant-outlinedBorder': (theme.vars || theme).palette[color].main,
                '--variant-outlinedBg': theme.vars
                  ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                  : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
              },
            },
          },
        })),
      {
        props: {
          color: 'inherit',
        },
        style: {
          '--variant-containedColor': theme.vars
            ? // this is safe because grey does not change between default light/dark mode
              theme.vars.palette.text.primary
            : theme.palette.getContrastText?.(inheritContainedBackgroundColor),
          '--variant-containedBg': theme.vars
            ? theme.vars.palette.Button.inheritContainedBg
            : inheritContainedBackgroundColor,
          '@media (hover: hover)': {
            '&:hover': {
              '--variant-containedBg': theme.vars
                ? theme.vars.palette.Button.inheritContainedHoverBg
                : inheritContainedHoverBackgroundColor,
              '--variant-textBg': theme.vars
                ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})`
                : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
              '--variant-outlinedBg': theme.vars
                ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})`
                : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
            },
          },
        },
      },
      {
        props: {
          size: 'small',
          variant: 'text',
        },
        style: {
          padding: '4px 5px',
          fontSize: theme.typography.pxToRem(13),
        },
      },
      {
        props: {
          size: 'large',
          variant: 'text',
        },
        style: {
          padding: '8px 11px',
          fontSize: theme.typography.pxToRem(15),
        },
      },
      {
        props: {
          size: 'small',
          variant: 'outlined',
        },
        style: {
          padding: '3px 9px',
          fontSize: theme.typography.pxToRem(13),
        },
      },
      {
        props: {
          size: 'large',
          variant: 'outlined',
        },
        style: {
          padding: '7px 21px',
          fontSize: theme.typography.pxToRem(15),
        },
      },
      {
        props: {
          size: 'small',
          variant: 'contained',
        },
        style: {
          padding: '4px 10px',
          fontSize: theme.typography.pxToRem(13),
        },
      },
      {
        props: {
          size: 'large',
          variant: 'contained',
        },
        style: {
          padding: '8px 22px',
          fontSize: theme.typography.pxToRem(15),
        },
      },
      {
        props: {
          disableElevation: true,
        },
        style: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
          [`&.${buttonClasses.focusVisible}`]: {
            boxShadow: 'none',
          },
          '&:active': {
            boxShadow: 'none',
          },
          [`&.${buttonClasses.disabled}`]: {
            boxShadow: 'none',
          },
        },
      },
      {
        props: { fullWidth: true },
        style: { width: '100%' },
      },
    ],
  };
});

const ButtonStartIcon = styled('span', {
  name: 'MuiButton',
  slot: 'StartIcon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.startIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  },
})(() => ({
  display: 'inherit',
  marginRight: 8,
  marginLeft: -4,
  variants: [
    {
      props: { size: 'small' },
      style: {
        marginLeft: -2,
      },
    },
    ...commonIconStyles,
  ],
}));

const ButtonEndIcon = styled('span', {
  name: 'MuiButton',
  slot: 'EndIcon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.endIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  },
})(() => ({
  display: 'inherit',
  marginRight: -4,
  marginLeft: 8,
  variants: [
    {
      props: { size: 'small' },
      style: {
        marginRight: -2,
      },
    },
    ...commonIconStyles,
  ],
}));

export const ButtonRootMD3 = styled(ButtonBase, {
  name: 'MuiButton',
  slot: 'Root',
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
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
})(({ ownerState, theme }) => {
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
    filled: tokens.sys.color[`on${capitalize(ownerState.color ?? 'primary')}`],
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

  const borderRadiusValue = tokens.sys.shape.corner.full;
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
    // Sizes are not specified in Material Design 3, this need to be revised
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
    '&:active': {
      '--md-comp-button-icon-color': 'var(--md-comp-button-pressed-icon-color)',
      ...((ownerState.disableRipple || ownerState.disableTouchRipple) && {
        backgroundColor: pressedContainerColor[ownerState.variant ?? 'text'],
      }),
      boxShadow: pressedContainerElevation[ownerState.variant ?? 'text'],
    },
    [`&.${buttonBaseClasses.focusVisible}`]: {
      '--md-comp-button-icon-color': 'var(--md-comp-button-focused-icon-color)',
      backgroundColor: focusedContainerColor[ownerState.variant ?? 'text'],
      boxShadow: focusedContainerElevation[ownerState.variant ?? 'text'],
    },
    [`&.${buttonBaseClasses.disabled}`]: {
      // Allows developer to specify the disabled icon color var
      '--md-comp-button-icon-color': 'var(--md-comp-button-disabled-icon-color)',
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

const ButtonStartIconMD3 = styled('span', {
  name: 'MuiButton',
  slot: 'StartIcon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.startIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  },
})({
  display: 'inherit',
  marginRight: 'var(--Button-gap)',
  ...commonIconStyles,
});

const ButtonEndIconMD3 = styled('span', {
  name: 'MuiButton',
  slot: 'EndIcon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.endIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  },
})({
  display: 'inherit',
  marginLeft: 'var(--Button-gap)',
  ...commonIconStyles,
});

const useIsMd3 = () => {
  const theme = useTheme();
  return !!theme.sys;
};

const Button = React.forwardRef(function Button(inProps, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`
  const contextProps = React.useContext(ButtonGroupContext);
  const buttonGroupButtonContextPositionClassName = React.useContext(ButtonGroupButtonContext);
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useDefaultProps({ props: resolvedProps, name: 'MuiButton' });
  const isMd3 = useIsMd3();
  const {
    children,
    color = 'primary',
    component = 'button',
    className,
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    size = 'medium',
    startIcon: startIconProp,
    type,
    variant = 'text',
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    size,
    type,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const Root = isMd3 ? ButtonRootMD3 : ButtonRoot;
  const StartIcon = isMd3 ? ButtonStartIconMD3 : ButtonStartIcon;
  const EndIcon = isMd3 ? ButtonEndIconMD3 : ButtonEndIcon;

  const startIcon = startIconProp && (
    <StartIcon className={classes.startIcon} ownerState={ownerState}>
      {startIconProp}
    </StartIcon>
  );

  const endIcon = endIconProp && (
    <EndIcon className={classes.endIcon} ownerState={ownerState}>
      {endIconProp}
    </EndIcon>
  );

  const positionClassName = buttonGroupButtonContextPositionClassName || '';

  return (
    <Root
      ownerState={ownerState}
      className={clsx(contextProps.className, classes.root, className, positionClassName)}
      component={component}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
      ref={ref}
      type={type}
      {...other}
      classes={classes}
    >
      {startIcon}
      {children}
      {endIcon}
    </Root>
  );
});

Button.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
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
  component: PropTypes.elementType,
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @ignore
   */
  type: PropTypes.oneOfType([PropTypes.oneOf(['button', 'reset', 'submit']), PropTypes.string]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'outlined', 'text']),
    PropTypes.string,
  ]),
};

export default Button;
