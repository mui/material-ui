// @inheritedComponent ButtonBase

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { componentPropType, chainPropTypes } from '@material-ui/utils';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';
import ButtonBase from '../ButtonBase';
import { capitalize } from '../utils/helpers';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    lineHeight: 1.75, // To remove with v4.
    ...theme.typography.button,
    boxSizing: 'border-box',
    minWidth: 64,
    padding: '6px 16px',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: fade(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      '&$disabled': {
        backgroundColor: 'transparent',
      },
    },
    '&$disabled': {
      color: theme.palette.action.disabled,
    },
  },
  /* Styles applied to the span element that wraps the children. */
  label: {
    width: '100%', // assure the correct width for iOS Safari
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
  /* Styles applied to the root element if `variant="text"`. */
  text: {
    padding: '6px 8px',
  },
  /* Styles applied to the root element if `variant="text"` and `color="primary"`. */
  textPrimary: {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Styles applied to the root element if `variant="text"` and `color="secondary"`. */
  textSecondary: {
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Styles applied to the root element for backwards compatibility with legacy variant naming. */
  flat: {},
  /* Styles applied to the root element for backwards compatibility with legacy variant naming. */
  flatPrimary: {},
  /* Styles applied to the root element for backwards compatibility with legacy variant naming. */
  flatSecondary: {},
  /* Styles applied to the root element if `variant="outlined"`. */
  outlined: {
    padding: '5px 16px',
    border: `1px solid ${
      theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
    }`,
    '&$disabled': {
      border: `1px solid ${theme.palette.action.disabled}`,
    },
  },
  /* Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
  outlinedPrimary: {
    color: theme.palette.primary.main,
    border: `1px solid ${fade(theme.palette.primary.main, 0.5)}`,
    '&:hover': {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
  outlinedSecondary: {
    color: theme.palette.secondary.main,
    border: `1px solid ${fade(theme.palette.secondary.main, 0.5)}`,
    '&:hover': {
      border: `1px solid ${theme.palette.secondary.main}`,
      backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&$disabled': {
      border: `1px solid ${theme.palette.action.disabled}`,
    },
  },
  /* Styles applied to the root element if `variant="[contained | fab]"`. */
  contained: {
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    backgroundColor: theme.palette.grey[300],
    boxShadow: theme.shadows[2],
    '&$focusVisible': {
      boxShadow: theme.shadows[6],
    },
    '&:active': {
      boxShadow: theme.shadows[8],
    },
    '&$disabled': {
      color: theme.palette.action.disabled,
      boxShadow: theme.shadows[0],
      backgroundColor: theme.palette.action.disabledBackground,
    },
    '&:hover': {
      backgroundColor: theme.palette.grey.A100,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.grey[300],
      },
      '&$disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
    },
  },
  /* Styles applied to the root element if `variant="[contained | fab]"` and `color="primary"`. */
  containedPrimary: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  /* Styles applied to the root element if `variant="[contained | fab]"` and `color="secondary"`. */
  containedSecondary: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  },
  /* Styles applied to the root element for backwards compatibility with legacy variant naming. */
  raised: {}, // legacy
  /* Styles applied to the root element for backwards compatibility with legacy variant naming. */
  raisedPrimary: {}, // legacy
  /* Styles applied to the root element for backwards compatibility with legacy variant naming. */
  raisedSecondary: {}, // legacy
  /* Styles applied to the root element if `variant="[fab | extendedFab]"`. */
  fab: {
    borderRadius: '50%',
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    boxShadow: theme.shadows[6],
    '&:active': {
      boxShadow: theme.shadows[12],
    },
  },
  /* Styles applied to the root element if `variant="extendedFab"`. */
  extendedFab: {
    borderRadius: 48 / 2,
    padding: '0 16px',
    width: 'auto',
    minWidth: 48,
    height: 48,
  },
  /* Styles applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: {},
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if `color="inherit"`. */
  colorInherit: {
    color: 'inherit',
    borderColor: 'currentColor',
  },
  /* Styles applied to the root element if `mini={true}` & `variant="[fab | extendedFab]"`. */
  mini: {
    width: 40,
    height: 40,
  },
  /* Styles applied to the root element if `size="small"`. */
  sizeSmall: {
    padding: '4px 8px',
    minWidth: 64,
    fontSize: theme.typography.pxToRem(13),
  },
  /* Styles applied to the root element if `size="large"`. */
  sizeLarge: {
    padding: '8px 24px',
    fontSize: theme.typography.pxToRem(15),
  },
  /* Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: {
    width: '100%',
  },
});

function Button(props) {
  const {
    children,
    classes,
    className: classNameProp,
    color,
    disabled,
    disableFocusRipple,
    focusVisibleClassName,
    fullWidth,
    mini,
    size,
    variant,
    ...other
  } = props;

  const fab = variant === 'fab' || variant === 'extendedFab';
  const contained = variant === 'contained' || variant === 'raised';
  const text = variant === 'text' || variant === 'flat';
  const className = classNames(
    classes.root,
    {
      [classes.fab]: fab,
      [classes.mini]: fab && mini,
      [classes.extendedFab]: variant === 'extendedFab',
      [classes.text]: text,
      [classes.textPrimary]: text && color === 'primary',
      [classes.textSecondary]: text && color === 'secondary',
      [classes.flat]: text,
      [classes.flatPrimary]: text && color === 'primary',
      [classes.flatSecondary]: text && color === 'secondary',
      [classes.contained]: contained || fab,
      [classes.containedPrimary]: (contained || fab) && color === 'primary',
      [classes.containedSecondary]: (contained || fab) && color === 'secondary',
      [classes.raised]: contained || fab,
      [classes.raisedPrimary]: (contained || fab) && color === 'primary',
      [classes.raisedSecondary]: (contained || fab) && color === 'secondary',
      [classes.outlined]: variant === 'outlined',
      [classes.outlinedPrimary]: variant === 'outlined' && color === 'primary',
      [classes.outlinedSecondary]: variant === 'outlined' && color === 'secondary',
      [classes[`size${capitalize(size)}`]]: size !== 'medium',
      [classes.disabled]: disabled,
      [classes.fullWidth]: fullWidth,
      [classes.colorInherit]: color === 'inherit',
    },
    classNameProp,
  );

  return (
    <ButtonBase
      className={className}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={classNames(classes.focusVisible, focusVisibleClassName)}
      {...other}
    >
      <span className={classes.label}>{children}</span>
    </ButtonBase>
  );
}

Button.propTypes = {
  /**
   * The content of the button.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: componentPropType,
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   * `disableRipple` must also be true.
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * If `true`, the button will take up the full width of its container.
   */
  fullWidth: PropTypes.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * If `true`, and `variant` is `'fab'`, will use mini floating action button styling.
   */
  mini: PropTypes.bool,
  /**
   * The size of the button.
   * `small` is equivalent to the dense button styling.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * @ignore
   */
  type: PropTypes.string,
  /**
   * The variant to use.
   * __WARNING__: `flat` and `raised` are deprecated.
   * Instead use `text` and `contained` respectively.
   * `fab` and `extendedFab` are deprecated.
   * Instead use `<Fab>` and `<Fab variant="extended">`
   */
  variant: chainPropTypes(
    PropTypes.oneOf(['text', 'outlined', 'contained', 'fab', 'extendedFab', 'flat', 'raised']),
    props => {
      if (props.variant === 'flat') {
        return new Error(
          'Material-UI: the `flat` variant will be removed in the next major release. ' +
            '`text` is equivalent and should be used instead.',
        );
      }
      if (props.variant === 'raised') {
        return new Error(
          'Material-UI: the `raised` variant will be removed in the next major release. ' +
            '`contained` is equivalent and should be used instead.',
        );
      }
      if (props.variant === 'fab') {
        return new Error(
          'Material-UI: the `fab` variant will be removed in the next major release. ' +
            'The `<Fab>` component is equivalent and should be used instead.',
        );
      }
      if (props.variant === 'extendedFab') {
        return new Error(
          'Material-UI: the `fab` variant will be removed in the next major release. ' +
            'The `<Fab>` component with `variant="extended"` is equivalent ' +
            'and should be used instead.',
        );
      }

      return null;
    },
  ),
};

Button.defaultProps = {
  color: 'default',
  component: 'button',
  disabled: false,
  disableFocusRipple: false,
  fullWidth: false,
  mini: false,
  size: 'medium',
  type: 'button',
  variant: 'text',
};

export default withStyles(styles, { name: 'MuiButton' })(Button);
