'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { alpha } from '@mui/system';
import { getValidReactChildren, unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import buttonGroupClasses, { getButtonGroupUtilityClass } from './buttonGroupClasses';
import ButtonGroupContext from './ButtonGroupContext';
import ButtonGroupButtonContext from './ButtonGroupButtonContext';
import { ButtonGroupOwnerState, ButtonGroupProps, ButtonGroupTypeMap } from './ButtonGroup.types';

const useUtilityClasses = (ownerState: ButtonGroupOwnerState) => {
  const { classes, color, disabled, disableElevation, fullWidth, orientation, variant } =
    ownerState;

  const slots = {
    root: [
      'root',
      variant,
      orientation === 'vertical' && 'vertical',
      fullWidth && 'fullWidth',
      disableElevation && 'disableElevation',
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
  overridesResolver(props, styles) {
    const {
      ownerState: { color, disableElevation, fullWidth, orientation, variant },
    } = props;

    return [
      { [`& .${buttonGroupClasses.grouped}`]: styles.grouped },
      {
        [`& .${buttonGroupClasses.grouped}`]: styles[`grouped${capitalize(orientation)}`],
      },
      { [`& .${buttonGroupClasses.grouped}`]: styles[`grouped${capitalize(variant)}`] },
      {
        [`& .${buttonGroupClasses.grouped}`]:
          styles[`grouped${capitalize(variant)}${capitalize(orientation)}`],
      },
      {
        [`& .${buttonGroupClasses.grouped}`]:
          styles[`grouped${capitalize(variant)}${capitalize(color)}`],
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
      styles[variant],
      disableElevation === true && styles.disableElevation,
      fullWidth && styles.fullWidth,
      orientation === 'vertical' && styles.vertical,
    ];
  },
})<{ ownerState: ButtonGroupOwnerState }>(({ theme, ownerState }) => ({
  display: 'inline-flex',
  borderRadius: (theme.vars || theme).shape.borderRadius,
  ...(ownerState.variant === 'contained' && {
    boxShadow: (theme.vars || theme).shadows[2],
  }),
  ...(ownerState.disableElevation && {
    boxShadow: 'none',
  }),
  ...(ownerState.fullWidth && {
    width: '100%',
  }),
  ...(ownerState.orientation === 'vertical' && {
    flexDirection: 'column',
  }),
  [`& .${buttonGroupClasses.grouped}`]: {
    minWidth: 40,
    '&:hover': {
      ...(ownerState.variant === 'contained' && {
        boxShadow: 'none',
      }),
    },
    ...(ownerState.variant === 'contained' && {
      boxShadow: 'none',
    }),
  },
  [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
    ...(ownerState.orientation === 'horizontal' && {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    }),
    ...(ownerState.orientation === 'vertical' && {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    }),
    ...(ownerState.variant === 'text' &&
      ownerState.orientation === 'horizontal' && {
        borderRight: theme.vars
          ? `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)`
          : `1px solid ${
              theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
            }`,
        [`&.${buttonGroupClasses.disabled}`]: {
          borderRight: `1px solid ${(theme.vars || theme).palette.action.disabled}`,
        },
      }),
    ...(ownerState.variant === 'text' &&
      ownerState.orientation === 'vertical' && {
        borderBottom: theme.vars
          ? `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)`
          : `1px solid ${
              theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
            }`,
        [`&.${buttonGroupClasses.disabled}`]: {
          borderBottom: `1px solid ${(theme.vars || theme).palette.action.disabled}`,
        },
      }),
    ...(ownerState.variant === 'text' &&
      ownerState.color !== 'inherit' && {
        borderColor: theme.vars
          ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.5)`
          : alpha(theme.palette[ownerState.color].main, 0.5),
      }),
    ...(ownerState.variant === 'outlined' &&
      ownerState.orientation === 'horizontal' && {
        borderRightColor: 'transparent',
      }),
    ...(ownerState.variant === 'outlined' &&
      ownerState.orientation === 'vertical' && {
        borderBottomColor: 'transparent',
      }),
    ...(ownerState.variant === 'contained' &&
      ownerState.orientation === 'horizontal' && {
        borderRight: `1px solid ${(theme.vars || theme).palette.grey[400]}`,
        [`&.${buttonGroupClasses.disabled}`]: {
          borderRight: `1px solid ${(theme.vars || theme).palette.action.disabled}`,
        },
      }),
    ...(ownerState.variant === 'contained' &&
      ownerState.orientation === 'vertical' && {
        borderBottom: `1px solid ${(theme.vars || theme).palette.grey[400]}`,
        [`&.${buttonGroupClasses.disabled}`]: {
          borderBottom: `1px solid ${(theme.vars || theme).palette.action.disabled}`,
        },
      }),
    ...(ownerState.variant === 'contained' &&
      ownerState.color !== 'inherit' && {
        borderColor: (theme.vars || theme).palette[ownerState.color].dark,
      }),
    '&:hover': {
      ...(ownerState.variant === 'outlined' &&
        ownerState.orientation === 'horizontal' && {
          borderRightColor: 'currentColor',
        }),
      ...(ownerState.variant === 'outlined' &&
        ownerState.orientation === 'vertical' && {
          borderBottomColor: 'currentColor',
        }),
    },
  },
  [`& .${buttonGroupClasses.lastButton},& .${buttonGroupClasses.middleButton}`]: {
    ...(ownerState.orientation === 'horizontal' && {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    }),
    ...(ownerState.orientation === 'vertical' && {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
    }),
    ...(ownerState.variant === 'outlined' &&
      ownerState.orientation === 'horizontal' && {
        marginLeft: -1,
      }),
    ...(ownerState.variant === 'outlined' &&
      ownerState.orientation === 'vertical' && {
        marginTop: -1,
      }),
  },
}));

/**
 *
 * Demos:
 *
 * - [Button Group](https://mui.com/material-ui/react-button-group/)
 *
 * API:
 *
 * - [ButtonGroup API](https://mui.com/material-ui/api/button-group/)
 */
const ButtonGroup = React.forwardRef(function ButtonGroup<
  BaseComponentType extends React.ElementType = ButtonGroupTypeMap['defaultComponent'],
>(inProps: ButtonGroupProps<BaseComponentType>, ref: React.ForwardedRef<HTMLDivElement>) {
  const props = useThemeProps({ props: inProps, name: 'MuiButtonGroup' });
  const {
    children,
    className,
    color = 'primary',
    component = 'div',
    disabled = false,
    disableElevation = false,
    disableTouchRipple = false,
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
    disableTouchRipple,
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
      disableTouchRipple,
      disableRipple,
      fullWidth,
      size,
      variant,
    }),
    [
      color,
      disabled,
      disableElevation,
      disableTouchRipple,
      disableRipple,
      fullWidth,
      size,
      variant,
      classes.grouped,
    ],
  );

  const validChildren = getValidReactChildren(children);
  const childrenCount = validChildren.length;

  const getButtonPositionClassName = (index: number) => {
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
}) as OverridableComponent<ButtonGroupTypeMap>;

ButtonGroup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
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
   * If `true`, the button ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: PropTypes.bool,
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
} as any;

export default ButtonGroup;
