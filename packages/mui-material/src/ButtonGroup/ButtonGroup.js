'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { alpha } from '@mui/system/colorManipulator';
import getValidReactChildren from '@mui/utils/getValidReactChildren';
import capitalize from '../utils/capitalize';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import buttonGroupClasses, { getButtonGroupUtilityClass } from './buttonGroupClasses';
import ButtonGroupContext from './ButtonGroupContext';
import ButtonGroupButtonContext from './ButtonGroupButtonContext';

const overridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    { [`& .${buttonGroupClasses.grouped}`]: styles.grouped },
    {
      [`& .${buttonGroupClasses.grouped}`]: styles[`grouped${capitalize(ownerState.orientation)}`],
    },
    { [`& .${buttonGroupClasses.grouped}`]: styles[`grouped${capitalize(ownerState.variant)}`] },
    {
      [`& .${buttonGroupClasses.grouped}`]:
        styles[`grouped${capitalize(ownerState.variant)}${capitalize(ownerState.orientation)}`],
    },
    {
      [`& .${buttonGroupClasses.grouped}`]:
        styles[`grouped${capitalize(ownerState.variant)}${capitalize(ownerState.color)}`],
    },
    {
      [`& .${buttonGroupClasses.firstButton}`]: styles.firstButton,
    },
    {
      [`& .${buttonGroupClasses.lastButton}`]: styles.lastButton,
    },
    {
      [`& .${buttonGroupClasses.middleButton}`]: styles.middleButton,
    },
    styles.root,
    styles[ownerState.variant],
    ownerState.disableElevation === true && styles.disableElevation,
    ownerState.fullWidth && styles.fullWidth,
    ownerState.orientation === 'vertical' && styles.vertical,
  ];
};

const useUtilityClasses = (ownerState) => {
  const { classes, color, disabled, disableElevation, fullWidth, orientation, variant } =
    ownerState;

  const slots = {
    root: [
      'root',
      variant,
      orientation,
      fullWidth && 'fullWidth',
      disableElevation && 'disableElevation',
      `color${capitalize(color)}`,
    ],
    grouped: [
      'grouped',
      `grouped${capitalize(orientation)}`,
      `grouped${capitalize(variant)}`,
      `grouped${capitalize(variant)}${capitalize(orientation)}`,
      `grouped${capitalize(variant)}${capitalize(color)}`,
      disabled && 'disabled',
    ],
    firstButton: ['firstButton'],
    lastButton: ['lastButton'],
    middleButton: ['middleButton'],
  };

  return composeClasses(slots, getButtonGroupUtilityClass, classes);
};

const ButtonGroupRoot = styled('div', {
  name: 'MuiButtonGroup',
  slot: 'Root',
  overridesResolver,
})(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    borderRadius: (theme.vars || theme).shape.borderRadius,
    variants: [
      {
        props: { variant: 'contained' },
        style: {
          boxShadow: (theme.vars || theme).shadows[2],
        },
      },
      {
        props: { disableElevation: true },
        style: {
          boxShadow: 'none',
        },
      },
      {
        props: { fullWidth: true },
        style: {
          width: '100%',
        },
      },
      {
        props: { orientation: 'vertical' },
        style: {
          flexDirection: 'column',
          [`& .${buttonGroupClasses.lastButton},& .${buttonGroupClasses.middleButton}`]: {
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
          },
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
          },
        },
      },
      {
        props: { orientation: 'horizontal' },
        style: {
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          [`& .${buttonGroupClasses.lastButton},& .${buttonGroupClasses.middleButton}`]: {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
        },
      },
      {
        props: { variant: 'text', orientation: 'horizontal' },
        style: {
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderRight: theme.vars
              ? `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)`
              : `1px solid ${
                  theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.23)'
                    : 'rgba(255, 255, 255, 0.23)'
                }`,
            [`&.${buttonGroupClasses.disabled}`]: {
              borderRight: `1px solid ${(theme.vars || theme).palette.action.disabled}`,
            },
          },
        },
      },
      {
        props: { variant: 'text', orientation: 'vertical' },
        style: {
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderBottom: theme.vars
              ? `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)`
              : `1px solid ${
                  theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.23)'
                    : 'rgba(255, 255, 255, 0.23)'
                }`,
            [`&.${buttonGroupClasses.disabled}`]: {
              borderBottom: `1px solid ${(theme.vars || theme).palette.action.disabled}`,
            },
          },
        },
      },
      ...Object.entries(theme.palette)
        .filter(([, value]) => value && value.main)
        .flatMap(([color]) => [
          {
            props: { variant: 'text', color },
            style: {
              [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
                borderColor: theme.vars
                  ? `rgba(${theme.vars.palette[color].mainChannel} / 0.5)`
                  : alpha(theme.palette[color].main, 0.5),
              },
            },
          },
        ]),
      {
        props: { variant: 'outlined', orientation: 'horizontal' },
        style: {
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderRightColor: 'transparent',
            '&:hover': {
              borderRightColor: 'currentColor',
            },
          },
          [`& .${buttonGroupClasses.lastButton},& .${buttonGroupClasses.middleButton}`]: {
            marginLeft: -1,
          },
        },
      },
      {
        props: { variant: 'outlined', orientation: 'vertical' },
        style: {
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderBottomColor: 'transparent',
            '&:hover': {
              borderBottomColor: 'currentColor',
            },
          },
          [`& .${buttonGroupClasses.lastButton},& .${buttonGroupClasses.middleButton}`]: {
            marginTop: -1,
          },
        },
      },
      {
        props: { variant: 'contained', orientation: 'horizontal' },
        style: {
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderRight: `1px solid ${(theme.vars || theme).palette.grey[400]}`,
            [`&.${buttonGroupClasses.disabled}`]: {
              borderRight: `1px solid ${(theme.vars || theme).palette.action.disabled}`,
            },
          },
        },
      },
      {
        props: { variant: 'contained', orientation: 'vertical' },
        style: {
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderBottom: `1px solid ${(theme.vars || theme).palette.grey[400]}`,
            [`&.${buttonGroupClasses.disabled}`]: {
              borderBottom: `1px solid ${(theme.vars || theme).palette.action.disabled}`,
            },
          },
        },
      },
      ...Object.entries(theme.palette)
        .filter(([, value]) => value && value.dark)
        .map(([color]) => ({
          props: { variant: 'contained', color },
          style: {
            [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
              borderColor: (theme.vars || theme).palette[color].dark,
            },
          },
        })),
    ],
    [`& .${buttonGroupClasses.grouped}`]: {
      minWidth: 40,
      boxShadow: 'none',
      props: { variant: 'contained' },
      style: {
        '&:hover': {
          boxShadow: 'none',
        },
      },
    },
  })),
);

const ButtonGroup = React.forwardRef(function ButtonGroup(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiButtonGroup' });
  const {
    children,
    className,
    color = 'primary',
    component = 'div',
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    disableRipple = false,
    fullWidth = false,
    orientation = 'horizontal',
    size = 'medium',
    variant = 'outlined',
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    orientation,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const context = React.useMemo(
    () => ({
      className: classes.grouped,
      color,
      disabled,
      disableElevation,
      disableFocusRipple,
      disableRipple,
      fullWidth,
      size,
      variant,
    }),
    [
      color,
      disabled,
      disableElevation,
      disableFocusRipple,
      disableRipple,
      fullWidth,
      size,
      variant,
      classes.grouped,
    ],
  );

  const validChildren = getValidReactChildren(children);
  const childrenCount = validChildren.length;

  const getButtonPositionClassName = (index) => {
    const isFirstButton = index === 0;
    const isLastButton = index === childrenCount - 1;

    if (isFirstButton && isLastButton) {
      return '';
    }
    if (isFirstButton) {
      return classes.firstButton;
    }
    if (isLastButton) {
      return classes.lastButton;
    }
    return classes.middleButton;
  };

  return (
    <ButtonGroupRoot
      as={component}
      role="group"
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      <ButtonGroupContext.Provider value={context}>
        {validChildren.map((child, index) => {
          return (
            <ButtonGroupButtonContext.Provider
              key={index}
              value={getButtonPositionClassName(index)}
            >
              {child}
            </ButtonGroupButtonContext.Provider>
          );
        })}
      </ButtonGroupContext.Provider>
    </ButtonGroupRoot>
  );
});

ButtonGroup.propTypes /* remove-proptypes */ = {
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
    PropTypes.oneOf(['inherit', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
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
   * If `true`, the button keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the button ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the buttons will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
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
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'outlined', 'text']),
    PropTypes.string,
  ]),
};

export default ButtonGroup;
