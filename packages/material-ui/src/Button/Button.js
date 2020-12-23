import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useThemeVariants } from '@material-ui/styles';
import withStyles from '../styles/withStyles';
import { alpha } from '../styles/colorManipulator';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';

export const styles = (theme) => ({
  /* Styles applied to the startIcon element if supplied. */
  startIcon: {
    display: 'inherit',
    marginRight: 8,
    marginLeft: -4,
    '&$iconSizeSmall': {
      marginLeft: -2,
    },
  },
  /* Styles applied to the endIcon element if supplied. */
  endIcon: {
    display: 'inherit',
    marginRight: -4,
    marginLeft: 8,
    '&$iconSizeSmall': {
      marginRight: -2,
    },
  },
  /* Styles applied to the icon element if supplied and `size="small"`. */
  iconSizeSmall: {
    '& > *:first-child': {
      fontSize: 18,
    },
  },
  /* Styles applied to the icon element if supplied and `size="medium"`. */
  iconSizeMedium: {
    '& > *:first-child': {
      fontSize: 20,
    },
  },
  /* Styles applied to the icon element if supplied and `size="large"`. */
  iconSizeLarge: {
    '& > *:first-child': {
      fontSize: 22,
    },
  },
});

const ButtonLabel = experimentalStyled(ButtonBase, {}, {
  name: 'Button',
  slot: 'Label',
  overridesResolver
})({
  width: '100%', // Ensure the correct width for iOS Safari
  display: 'inherit',
  alignItems: 'inherit',
  justifyContent: 'inherit',
});

const ButtonRoot = experimentalStyled(ButtonBase, {}, {
  name: 'Button',
  slot: 'Root',
  overridesResolver
})((props) => ({
  ...props.theme.typography.button,
  minWidth: 64,
  padding: '6px 16px',
  borderRadius: props.theme.shape.borderRadius,
  transition: props.theme.transitions.create(
    ['background-color', 'box-shadow', 'border-color', 'color'],
    {
      duration: props.theme.transitions.duration.short,
    },
  ),

  '&:hover': {
    textDecoration: 'none',
    backgroundColor: alpha(props.theme.palette.text.primary, props.theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },

    ...(props.styleProps.variant === 'text' && props.styleProps.color !== 'inherit' && {
      backgroundColor: alpha(props.theme.palette[props.styleProps.color].main, props.theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    }),

    ...(props.styleProps.variant === 'outlined' && props.styleProps.color !== 'inherit' && {
      border: `1px solid ${props.theme.palette[props.styleProps.color].main}`,
      backgroundColor: alpha(props.theme.palette[props.styleProps.color].main, props.theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    }),

    ...(props.styleProps.variant === 'contained' && {
      backgroundColor: props.theme.palette.grey.A100,
      boxShadow: props.theme.shadows[4],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: props.theme.shadows[2],
        backgroundColor: props.theme.palette.grey[300],
      },
    }),

    ...(props.styleProps.variant === 'contained' && props.styleProps.color !== 'inherit' && {
      backgroundColor: theme.palette[props.styleProps.color].dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette[props.styleProps.color].main,
      },
    }),

    ...(props.styleProps.disableElevation && {
      boxShadow: 'none',
    }),
  },

  '&:active': {
    ...(props.styleProps.variant === 'contained' && {
      boxShadow: props.theme.shadows[8],
    }),
    ...(props.styleProps.disableElevation && {
      boxShadow: 'none',
    }),
  },

  '&.Mui-focusVisible': {
    ...(props.styleProps.variant === 'contained' && {
      boxShadow: props.theme.shadows[6],
    }),
    ...(props.styleProps.disableElevation && {
      boxShadow: 'none',
    }),
  },

  '&.Mui-disabled': {
    color: props.theme.palette.action.disabled,
    ...(props.styleProps.variant === 'outlined' && {
      border: `1px solid ${props.theme.palette.action.disabledBackground}`,
    }),
    ...(props.styleProps.variant === 'outlined' && props.styleProps.color !== 'inherit' && {
      border: `1px solid ${theme.palette.action.disabled}`,
    }),
    ...(props.styleProps.variant === 'contained' && {
      color: props.theme.palette.action.disabled,
      boxShadow: props.theme.shadows[0],
      backgroundColor: props.theme.palette.action.disabledBackground,
    }),
    ...(props.styleProps.disableElevation && {
      boxShadow: 'none',
    }),
  },


  ...(props.styleProps.variant === 'text' && {
    padding: '6px 8px',
  }),
  ...(props.styleProps.variant === 'text' && props.styleProps.color !== 'inherit' && {
    color: props.theme.palette[props.styleProps.color].main,
  }),
  ...(props.styleProps.variant === 'outlined' && {
    padding: '5px 15px',
    border: `1px solid ${
      props.theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
    }`,
  }),
  ...(props.styleProps.variant === 'outlined' && props.styleProps.color !== 'inherit' && {
    color: props.theme.palette[props.styleProps.color].main,
    border: `1px solid ${alpha(props.theme.palette[props.styleProps.color].main, 0.5)}`,
  }),
  ...(props.styleProps.variant === 'contained' && {
    color: props.theme.palette.getContrastText(theme.palette.grey[300]),
    backgroundColor: props.theme.palette.grey[300],
    boxShadow: props.theme.shadows[2],
  }),
  ...(props.styleProps.variant === 'contained' && props.styleProps.color !== 'inherit' && {
    color: props.theme.palette[props.styleProps.color].contrastText,
    backgroundColor: theme.palette[props.styleProps.color].main,
  }),
  ...(props.styleProps.disableElevation && {
    boxShadow: 'none',
  }),

  ...(props.styleProps.color === 'inherit' && {
    color: 'inherit',
    borderColor: 'currentColor',
  }),

  ...(props.styleProps.size === 'small' && props.styleProps.variant === 'text' && {
    padding: '4px 5px',
    fontSize: props.theme.typography.pxToRem(13),
  }),

  ...(props.styleProps.size === 'large' && props.styleProps.variant === 'text' && {
    padding: '8px 11px',
    fontSize: props.theme.typography.pxToRem(15),
  }),

  ...(props.styleProps.size === 'small' && props.styleProps.variant === 'outlined' && {
    padding: '3px 9px',
    fontSize: props.theme.typography.pxToRem(13),
  }),

  ...(props.styleProps.size === 'large' && props.styleProps.variant === 'outlined' && {
    padding: '7px 21px',
    fontSize: props.theme.typography.pxToRem(15),
  }),

  ...(props.styleProps.size === 'small' && props.styleProps.variant === 'contained' && {
    padding: '4px 10px',
    fontSize: props.theme.typography.pxToRem(13),
  }),

  ...(props.styleProps.size === 'large' && props.styleProps.variant === 'contained' && {
    padding: '8px 22px',
    fontSize: props.theme.typography.pxToRem(15),
  }),

  ...(props.styleProps.fullWidth && {
    width: '100%',
  }),
}));


const Button = React.forwardRef(function Button(props, ref) {
  const {
    children,
    classes,
    className,
    color = 'primary',
    component = 'button',
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

  const themeVariantsClasses = useThemeVariants(
    {
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
    },
    'MuiButton',
  );

  const startIcon = startIconProp && (
    <span className={clsx(classes.startIcon, classes[`iconSize${capitalize(size)}`])}>
      {startIconProp}
    </span>
  );

  const endIcon = endIconProp && (
    <span className={clsx(classes.endIcon, classes[`iconSize${capitalize(size)}`])}>
      {endIconProp}
    </span>
  );

  return (
    <ButtonBase
      className={clsx(
        classes.root,
        classes[variant],
        {
          [classes[`${variant}${capitalize(color)}`]]: color !== 'inherit',
          [classes[`${variant}Size${capitalize(size)}`]]: size !== 'medium',
          [classes[`size${capitalize(size)}`]]: size !== 'medium',
          [classes.disableElevation]: disableElevation,
          [classes.disabled]: disabled,
          [classes.fullWidth]: fullWidth,
          [classes.colorInherit]: color === 'inherit',
        },
        themeVariantsClasses,
        className,
      )}
      component={component}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
      ref={ref}
      type={type}
      {...other}
    >
      {/*
       * The inner <span> is required to vertically align the children.
       * Browsers don't support `display: flex` on a <button> element.
       * https://github.com/philipwalton/flexbugs/blob/master/README.md#flexbug-9
       * TODO v5: evaluate if still required for the supported browsers.
       */}
      <span className={classes.label}>
        {startIcon}
        {children}
        {endIcon}
      </span>
    </ButtonBase>
  );
});

Button.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the button.
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
   * If `true`, the button is disabled.
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
   * to highlight the element by applying separate styles with the `focusVisibleClassName`.
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
   * The size of the button.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
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

export default withStyles(styles, { name: 'MuiButton' })(Button);
