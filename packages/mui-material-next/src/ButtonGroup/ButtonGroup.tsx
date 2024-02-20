'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { getValidReactChildren } from '@mui/utils';
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
      color,
      orientation === 'vertical' && 'vertical',
      fullWidth && 'fullWidth',
      disableElevation && 'disableElevation',
    ],
    grouped: ['grouped', disabled && 'disabled'],
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
        [`& .${buttonGroupClasses.firstButton}`]: styles.firstButton,
      },
      {
        [`& .${buttonGroupClasses.lastButton}`]: styles.lastButton,
      },
      {
        [`& .${buttonGroupClasses.middleButton}`]: styles.middleButton,
      },
      styles.root,
      styles[color],
      styles[variant],
      disableElevation === true && styles.disableElevation,
      fullWidth && styles.fullWidth,
      orientation === 'vertical' && styles.vertical,
    ];
  },
})<{ ownerState: ButtonGroupOwnerState }>(
  ({
    theme: { vars: tokens },
    ownerState: { disabled, disableElevation, fullWidth, orientation, variant },
  }) => ({
    display: 'inline-flex',
    borderRadius: tokens.sys.shape.corner.full,
    ...(variant === 'elevated' && {
      boxShadow: tokens.sys.elevation[1],
    }),
    ...((disableElevation || disabled) && {
      boxShadow: 'none',
    }),
    ...(fullWidth && {
      width: '100%',
    }),
    ...(orientation === 'vertical' && {
      flexDirection: 'column',
    }),
    [`& .${buttonGroupClasses.grouped}`]: {
      minWidth: 40,
      '&:hover, &:focus': {
        boxShadow: 'none',
      },
      boxShadow: 'none',
    },
    [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
      ...(orientation === 'horizontal' && {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }),
      ...(orientation === 'vertical' && {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
      }),
      ...(variant === 'filled' &&
        orientation === 'horizontal' && {
          borderRight: `1px solid ${tokens.sys.color.outline}`,
          [`&.${buttonGroupClasses.disabled}`]: {
            borderRightColor: `rgba(${tokens.sys.color.outline}, 0.12)`,
          },
        }),
      ...(variant === 'filled' &&
        orientation === 'vertical' && {
          borderBottom: `1px solid ${tokens.sys.color.outline}`,
          [`&.${buttonGroupClasses.disabled}`]: {
            borderBottomColor: `rgba(${tokens.sys.color.outline}, 0.12)`,
          },
        }),
      ...(variant === 'outlined' &&
        orientation === 'horizontal' && {
          borderRightColor: 'transparent',
        }),
      ...(variant === 'outlined' &&
        orientation === 'vertical' && {
          borderBottomColor: 'transparent',
        }),
      ...((variant === 'text' || variant === 'filledTonal' || variant === 'elevated') &&
        orientation === 'horizontal' && {
          borderRight: `1px solid ${tokens.sys.color.outlineVariant}`,
          [`&.${buttonGroupClasses.disabled}`]: {
            borderRightColor: `rgba(${tokens.sys.color.outlineVariant}, 0.12)`,
          },
        }),
      ...((variant === 'text' || variant === 'filledTonal' || variant === 'elevated') &&
        orientation === 'vertical' && {
          borderBottom: `1px solid ${tokens.sys.color.outlineVariant}`,
          [`&.${buttonGroupClasses.disabled}`]: {
            borderBottomColor: `rgba(${tokens.sys.color.outlineVariant}, 0.12)`,
          },
        }),
      '&:hover': {
        ...(variant === 'outlined' &&
          orientation === 'horizontal' && {
            borderRightColor: 'currentColor',
          }),
        ...(variant === 'outlined' &&
          orientation === 'vertical' && {
            borderBottomColor: 'currentColor',
          }),
      },
    },
    [`& .${buttonGroupClasses.lastButton},& .${buttonGroupClasses.middleButton}`]: {
      ...(orientation === 'horizontal' && {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      }),
      ...(orientation === 'vertical' && {
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
      }),
      ...(variant === 'outlined' &&
        orientation === 'horizontal' && {
          marginLeft: -1,
        }),
      ...(variant === 'outlined' &&
        orientation === 'vertical' && {
          marginTop: -1,
        }),
    },
  }),
);

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
    PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
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
    PropTypes.oneOf(['elevated', 'filled', 'filledTonal', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default ButtonGroup;
