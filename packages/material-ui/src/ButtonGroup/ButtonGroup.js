import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import capitalize from '../utils/capitalize';
import { alpha } from '../styles/colorManipulator';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import Button from '../Button';
import buttonGroupClasses, { getButtonGroupUtilityClass } from './buttonGroupClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(styles.root || {}, {
    ...styles[styleProps.variant],
    ...(styleProps.disableElevation === true && styles.disableElevation),
    ...(styleProps.fullWidth && styles.fullWidth),
    ...(styleProps.orientation === 'vertical' && styles.vertical),
    [`& .${buttonGroupClasses.grouped}`]: {
      ...styles.grouped,
      ...styles[`grouped${capitalize(styleProps.orientation)}`],
      ...styles[`grouped${capitalize(styleProps.variant)}`],
      ...styles[`grouped${capitalize(styleProps.variant)}${capitalize(styleProps.orientation)}`],
      ...styles[`grouped${capitalize(styleProps.variant)}${capitalize(styleProps.color)}`],
    },
  });
};

const useUtilityClasses = (styleProps) => {
  const { color, disableElevation, fullWidth, orientation, variant, classes } = styleProps;

  const slots = {
    root: [
      'root',
      variant,
      disableElevation && 'disableElevation',
      fullWidth && 'fullWidth',
      orientation === 'vertical' && 'vertical',
    ],
    grouped: [
      'grouped',
      `grouped${capitalize(orientation)}`,
      `grouped${capitalize(variant)}`,
      `grouped${capitalize(variant)}${capitalize(orientation)}`,
      color !== 'default' && `grouped${capitalize(variant)}${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getButtonGroupUtilityClass, classes);
};

const ButtonGroupRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiButtonGroup',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme, styleProps }) => ({
  display: 'inline-flex',
  borderRadius: theme.shape.borderRadius,
  ...(styleProps.variant === 'contained' && {
    boxShadow: theme.shadows[2],
  }),
  ...(styleProps.disableElevation && {
    boxShadow: 'none',
  }),
  ...(styleProps.fullWidth && {
    width: '100%',
  }),
  ...(styleProps.orientation === 'vertical' && {
    flexDirection: 'column',
  }),
  [`& .${buttonGroupClasses.grouped}`]: {
    minWidth: 40,
    ...(styleProps.orientation === 'horizontal' && {
      '&:not(:first-of-type)': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      '&:not(:last-of-type)': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
    }),
    ...(styleProps.orientation === 'vertical' && {
      '&:not(:first-of-type)': {
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
      },
      '&:not(:last-of-type)': {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
      },
    }),
    ...(styleProps.variant === 'text' &&
      styleProps.orientation === 'horiztonal' && {
        '&:not(:last-of-type)': {
          borderRight: `1px solid ${
            theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
          }`,
        },
      }),
    ...(styleProps.variant === 'text' &&
      styleProps.orientation === 'vertical' && {
        '&:not(:last-of-type)': {
          borderBottom: `1px solid ${
            theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
          }`,
        },
      }),
    ...(styleProps.variant === 'text' &&
      styleProps.color === 'primary' && {
        '&:not(:last-of-type)': {
          borderColor: alpha(theme.palette.primary.main, 0.5),
        },
      }),
    ...(styleProps.variant === 'text' &&
      styleProps.color === 'secondary' && {
        '&:not(:last-of-type)': {
          borderColor: alpha(theme.palette.secondary.main, 0.5),
        },
      }),
    ...(styleProps.variant === 'outlined' &&
      styleProps.orientation === 'horizontal' && {
        '&:not(:first-of-type)': {
          marginLeft: -1,
        },
        '&:not(:last-of-type)': {
          borderRightColor: 'transparent',
        },
      }),
    ...(styleProps.variant === 'outlined' &&
      styleProps.orientation === 'vertical' && {
        '&:not(:first-of-type)': {
          marginTop: -1,
        },
        '&:not(:last-of-type)': {
          borderBottomColor: 'transparent',
        },
      }),
    ...(styleProps.variant === 'outlined' &&
      styleProps.color === 'primary' && {
        '&:hover': {
          borderColor: theme.palette.primary.main,
        },
      }),
    ...(styleProps.variant === 'outlined' &&
      styleProps.color === 'secondary' && {
        '&:hover': {
          borderColor: theme.palette.secondary.main,
        },
      }),
    ...(styleProps.variant === 'contained' && {
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
    }),
    ...(styleProps.variant === 'contained' &&
      styleProps.orientation === 'horizontal' && {
        '&:not(:last-of-type)': {
          borderRight: `1px solid ${theme.palette.grey[400]}`,
          '&.Mui-disabled': {
            borderRight: `1px solid ${theme.palette.action.disabled}`,
          },
        },
      }),
    ...(styleProps.variant === 'contained' &&
      styleProps.orientation === 'vertical' && {
        '&:not(:last-of-type)': {
          borderBottom: `1px solid ${theme.palette.grey[400]}`,
          '&.Mui-disabled': {
            borderBottom: `1px solid ${theme.palette.action.disabled}`,
          },
        },
      }),
    ...(styleProps.variant === 'contained' &&
      styleProps.color === 'primary' && {
        '&:not(:last-of-type)': {
          borderColor: theme.palette.primary.dark,
        },
      }),
    ...(styleProps.variant === 'contained' &&
      styleProps.color === 'secondary' && {
        '&:not(:last-of-type)': {
          borderColor: theme.palette.secondary.dark,
        },
      }),
  },
}));

// Force a side effect so we don't have any override priority issue.
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
Button.styles;

const ButtonGroup = React.forwardRef(function ButtonGroup(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiButtonGroup' });
  const {
    children,
    className,
    color = 'primary',
    component: Component = 'div',
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

  const styleProps = {
    ...props,
    color,
    component: Component,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    orientation,
    size,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <ButtonGroupRoot
      as={Component}
      role="group"
      className={clsx(classes.root, className)}
      ref={ref}
      styleProps={styleProps}
      {...other}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(
              [
                "Material-UI: The ButtonGroup component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            );
          }
        }

        return React.cloneElement(child, {
          className: clsx(classes.grouped, child.props.className),
          color: child.props.color || color,
          disabled: child.props.disabled || disabled,
          disableElevation: child.props.disableElevation || disableElevation,
          disableFocusRipple,
          disableRipple,
          fullWidth,
          size: child.props.size || size,
          variant: child.props.variant || variant,
        });
      })}
    </ButtonGroupRoot>
  );
});

ButtonGroup.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary']),
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
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
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
