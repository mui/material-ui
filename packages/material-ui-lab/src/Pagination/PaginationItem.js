import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { fade, withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { capitalize } from '@material-ui/core/utils';

const styles = theme => ({
  root: {
    listStyleType: 'none',
  },
  button: {
    borderRadius: '50%',
    width: 32,
    height: 32,
    margin: '0 4px',
    color: theme.palette.text.primary,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.short,
    }),
    '&:hover, &:focus': {
      backgroundColor: fade(theme.palette.action.active, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&$selected': {
      backgroundColor: fade(theme.palette.action.active, 0.09),
      '&:hover, &:focus': {
        backgroundColor: fade(theme.palette.action.active, 0.15),
      },
      '&$disabled': {
        backgroundColor: fade(theme.palette.action.disabled, 0.07),
      },
    },
    '&$disabled': {
      color: fade(theme.palette.text.primary, 0.5),
      backgroundColor: 'transparent',
      pointerEvents: 'none',
    },
  },
  rounded: {
    borderRadius: theme.shape.borderRadius,
  },
  outlined: {
    border: `1px solid ${
      theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
      }`,
    '&:hover, &:focus': {
      backgroundColor: fade(theme.palette.action.active, 0.05),
    },
    '&$disabled': {
      color: fade(theme.palette.action.disabled, 0.2),
      backgroundColor: fade(theme.palette.action.disabled, 0.03),
      border: `1px solid ${
        theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.13)' : 'rgba(255, 255, 255, 0.13)'
        }`,
      pointerEvents: 'none',
    },
    '&$selected': {
      color: theme.palette.action.active,
      backgroundColor: fade(theme.palette.action.active, 0.12),
      '&:hover, &:focus': {
        backgroundColor: fade(theme.palette.action.active, 0.15),
      },
      '&$disabled': {
        color: fade(theme.palette.action.disabled, 0.3),
        backgroundColor: fade(theme.palette.action.disabled, 0.06),
      },
    },
  },
  textPrimary: {
    '&:hover, &:focus': {
      color: theme.palette.primary.main,
      backgroundColor: fade(theme.palette.primary.main, 0.2),
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
        backgroundColor: fade(theme.palette.action.disabled, 0.07),
      },
    },
  },
  textSecondary: {
    '&:hover, &:focus': {
      color: theme.palette.secondary.main,
      backgroundColor: fade(theme.palette.secondary.main, 0.2),
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
        backgroundColor: fade(theme.palette.action.disabled, 0.07),
      },
    },
  },
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
  sizeSmall: {
    width: 24,
    height: 24,
  },
  sizeLarge: {
    width: 40,
    height: 40,
  },
  ellipsis: {
    textAlign: 'center',
    width: 24,
    margin: '0 8px',
    '&sizeSmall': {
      margin: 0,
    },
    '&sizeLarge': {
      margin: '0 16px',
    },
  },
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Pseudo-class applied to the root element if `selected={true}`. */
  selected: {},
});

function ariaLabel(type, page, selected) {
  if (type === 'page') {
    return `${selected ? '' : 'go to '}page ${page}`;
  }
  return `Go to ${type} page`;
}

/**
 * @ignore - internal component.
 */
function PaginationItem(props) {
  const {
    classes,
    className,
    color = 'standard',
    disabled,
    getAriaLabel,
    page,
    queryString,
    onChange: handleChange,
    selected,
    shape = 'round',
    size = 'medium',
    type = 'page',
    variant,
    ...other
  } = props;

  const buttonClass = clsx(classes.button, classes[variant], classes[shape], {
    [classes[`${variant}${capitalize(color)}`]]: color !== 'standard',
    [classes.disabled]: disabled,
    [classes.selected]: selected,
    [classes[`size${capitalize(size)}`]]: size !== 'medium',
  });

  return (
    <React.Fragment>
      {type === 'ellipsis' ? (
        <li className={clsx(classes.root, className)} {...other}>
          <div className={classes.ellipsis}>...</div>
        </li>
      ) : (
          <li className={clsx(classes.root, className)} {...other}>
            <ButtonBase
              aria-label={
                getAriaLabel ? getAriaLabel(type, page, selected) : ariaLabel(type, page, selected)
              }
              aria-current={selected ? 'page' : undefined}
              component={handleChange ? 'div' : 'a'}
              href={handleChange ? undefined : `?${queryString}=${page}`}
              onClick={handleChange ? event => handleChange(event, page) : undefined}
              className={buttonClass}
            >
              {type === 'page' && page}
              {type === 'previous' && <NavigateBeforeIcon />}
              {type === 'next' && <NavigateNextIcon />}
              {type === 'first' && <FirstPageIcon />}
              {type === 'last' && <LastPageIcon />}
            </ButtonBase>
          </li>
        )}
    </React.Fragment>
  );
}

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
   * If `true`, the button will be disabled.
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
  onChange: PropTypes.func,
  /**
   * The current page number.
   */
  page: PropTypes.number,
  /**
   * The query string used to identify the page.
   */
  queryString: PropTypes.string,
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
  type: PropTypes.oneOf(['page', 'ellipsis', 'first', 'last', 'next', 'previous']),
  /*
   * The pagination item variant.
   */
  variant: PropTypes.oneOf(['text', 'outlined']),
};

export default withStyles(styles, { name: 'PrivatePaginationItem' })(PaginationItem);
