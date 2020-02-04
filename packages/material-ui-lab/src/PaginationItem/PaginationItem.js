import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { fade, withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import FirstPageIcon from '../internal/svg-icons/FirstPage';
import LastPageIcon from '../internal/svg-icons/LastPage';
import NavigateBeforeIcon from '../internal/svg-icons/NavigateBefore';
import NavigateNextIcon from '../internal/svg-icons/NavigateNext';
import { capitalize } from '@material-ui/core/utils';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    fontSize: theme.typography.pxToRem(14),
    borderRadius: '50%',
    width: 32,
    height: 32,
    margin: '0 3px',
    color: theme.palette.text.primary,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.short,
    }),
    '&:hover, &:focus': {
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&$selected': {
      backgroundColor: theme.palette.action.selected,
      '&:hover, &:focus': {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
      },
      '&$disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
    },
    '&$disabled': {
      color: theme.palette.action.disabled,
      backgroundColor: 'transparent',
      pointerEvents: 'none',
    },
    '&$sizeSmall': {
      width: 24,
      height: 24,
      margin: '0 2px',
      fontSize: theme.typography.pxToRem(13),
    },
    '&$sizeLarge': {
      width: 40,
      height: 40,
      margin: '0 4px',
      fontSize: theme.typography.pxToRem(15),
    },
  },
  /* Styles applied to the button element if `outlined="true"`. */
  outlined: {
    border: `1px solid ${
      theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
    }`,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.action.hover,
    },
    '&$disabled': {
      color: theme.palette.action.disabled,
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
      border: `1px solid ${
        theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.13)' : 'rgba(255, 255, 255, 0.13)'
      }`,
      pointerEvents: 'none',
    },
    '&$selected': {
      color: theme.palette.action.active,
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
      '&:hover, &:focus': {
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
      },
      '&$disabled': {
        color: theme.palette.action.disabled,
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
      },
    },
  },
  /* Styles applied to the button element if `variant="text"` and `color="primary"`. */
  textPrimary: {
    '&:hover, &:focus': {
      color: theme.palette.primary.main,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&$selected': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.primary.main,
        },
      },
      '&$disabled': {
        color: theme.palette.text.primary,
        backgroundColor: 'rgba(0, 0, 0, 0.07)',
      },
    },
  },
  /* Styles applied to the button element if `variant="text"` and `color="secondary"`. */
  textSecondary: {
    '&:hover, &:focus': {
      color: theme.palette.secondary.main,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&$selected': {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.secondary.dark,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.secondary.main,
        },
      },
      '&$disabled': {
        color: theme.palette.text.secondary,
        backgroundColor: 'rgba(0, 0, 0, 0.13)',
      },
    },
  },
  /* Styles applied to the button element if `variant="outlined"` and `color="primary"`. */
  outlinedPrimary: {
    '&:hover, &:focus': {
      color: theme.palette.primary.main,
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      border: `1px solid ${fade(theme.palette.primary.main, 0.2)}`,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&$selected': {
      color: theme.palette.primary.main,
      border: `1px solid ${fade(theme.palette.primary.main, 0.5)}`,
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      '&:hover, &:focus': {
        backgroundColor: fade(theme.palette.primary.dark, 0.17),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
  /* Styles applied to the button element if `variant="outlined"` and `color="secondary"`. */
  outlinedSecondary: {
    '&:hover, &:focus': {
      color: theme.palette.secondary.main,
      backgroundColor: fade(theme.palette.secondary.main, 0.1),
      border: `1px solid ${fade(theme.palette.secondary.main, 0.2)}`,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&$selected': {
      color: theme.palette.secondary.main,
      border: `1px solid ${fade(theme.palette.secondary.main, 0.5)}`,
      backgroundColor: fade(theme.palette.secondary.main, 0.15),
      '&:hover, &:focus': {
        backgroundColor: fade(theme.palette.secondary.dark, 0.17),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
  /* Styles applied to the button element if `rounded="true"`. */
  rounded: {
    borderRadius: theme.shape.borderRadius,
  },
  /* Styles applied to the ellipsis element. */
  ellipsis: {
    fontSize: theme.typography.pxToRem(14),
    textAlign: 'center',
    width: 38,
    '&$disabled': {
      color: fade(theme.palette.text.primary, 0.5),
    },
    '&$sizeSmall': {
      fontSize: theme.typography.pxToRem(13),
      width: 28,
    },
    '&$sizeLarge': {
      fontSize: theme.typography.pxToRem(15),
      width: 48,
    },
  },
  /* Styles applied to the icon element. */
  icon: {
    fontSize: theme.typography.pxToRem(20),
    '&$sizeSmall': {
      fontSize: theme.typography.pxToRem(18),
      width: 28,
    },
    '&$sizeLarge': {
      fontSize: theme.typography.pxToRem(22),
      width: 48,
    },
  },
  /* Pseudo-class applied to the root element if `size="small"`. */
  sizeSmall: {},
  /* Pseudo-class applied to the root element if `size="large"`. */
  sizeLarge: {},
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Pseudo-class applied to the root element if `selected={true}`. */
  selected: {},
});

function defaultGetAriaLabel(type, page, selected) {
  if (type === 'page') {
    return `${selected ? '' : 'go to '}page ${page}`;
  }
  return `Go to ${type} page`;
}

const PaginationItem = React.forwardRef(function PaginationItem(props, ref) {
  const {
    classes,
    className,
    color = 'standard',
    component,
    disabled = false,
    getAriaLabel = defaultGetAriaLabel,
    page,
    onClick: handleClick,
    selected,
    shape = 'round',
    size = 'medium',
    type = 'page',
    variant,
    ...other
  } = props;

  return type === 'start-ellipsis' || type === 'end-ellipsis' ? (
    <div
      ref={ref}
      className={clsx(classes.ellipsis, {
        [classes.disabled]: disabled,
        [classes[`size${capitalize(size)}`]]: size !== 'medium',
      })}
    >
      …
    </div>
  ) : (
    <ButtonBase
      ref={ref}
      component={component}
      disabled={disabled}
      aria-label={getAriaLabel(type, page, selected)}
      aria-current={selected ? 'true' : undefined}
      onClick={event => handleClick(event, page)}
      className={clsx(
        classes.root,
        classes[variant],
        classes[shape],
        {
          [classes[`${variant}${capitalize(color)}`]]: color !== 'standard',
          [classes.disabled]: disabled,
          [classes.selected]: selected,
          [classes[`size${capitalize(size)}`]]: size !== 'medium',
        },
        className,
      )}
      {...other}
    >
      {type === 'page' && page}
      {type === 'previous' && (
        <NavigateBeforeIcon
          className={clsx(classes.icon, {
            [classes[`size${capitalize(size)}`]]: size !== 'medium',
          })}
        />
      )}
      {type === 'next' && (
        <NavigateNextIcon
          className={clsx(classes.icon, {
            [classes[`size${capitalize(size)}`]]: size !== 'medium',
          })}
        />
      )}
      {type === 'first' && (
        <FirstPageIcon
          className={clsx(classes.icon, {
            [classes[`size${capitalize(size)}`]]: size !== 'medium',
          })}
        />
      )}
      {type === 'last' && (
        <LastPageIcon
          className={clsx(classes.icon, {
            [classes[`size${capitalize(size)}`]]: size !== 'medium',
          })}
        />
      )}
    </ButtonBase>
  );
});

PaginationItem.propTypes = {
  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The active color.
   */
  color: PropTypes.oneOf(['standard', 'primary', 'secondary']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the item will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * @param {string} [type = page] The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous').
   * @param {number} page The page number to format.
   * @param {bool} selected If true, the current page is selected.
   * @returns {string}
   */
  getAriaLabel: PropTypes.func,
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onClick: PropTypes.func,
  /**
   * The current page number.
   */
  page: PropTypes.number,
  /**
   * If `true` the pagination item is selected.
   */
  selected: PropTypes.bool,
  /**
   * The shape of the pagination item.
   */
  shape: PropTypes.oneOf(['round', 'rounded']),
  /**
   * The size of the pagination item.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /*
   * The type of pagination item.
   */
  type: PropTypes.oneOf([
    'page',
    'first',
    'last',
    'next',
    'previous',
    'start-ellipsis',
    'end-ellipsis',
  ]),
  /*
   * The pagination item variant.
   */
  variant: PropTypes.oneOf(['text', 'outlined']),
};

export default withStyles(styles, { name: 'PaginationItem' })(PaginationItem);
