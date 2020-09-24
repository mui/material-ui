import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { fade, useTheme, withStyles, useThemeVariants } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { capitalize } from '@material-ui/core/utils';
import FirstPageIcon from '../internal/svg-icons/FirstPage';
import LastPageIcon from '../internal/svg-icons/LastPage';
import NavigateBeforeIcon from '../internal/svg-icons/NavigateBefore';
import NavigateNextIcon from '../internal/svg-icons/NavigateNext';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    ...theme.typography.body2,
    borderRadius: 32 / 2,
    textAlign: 'center',
    boxSizing: 'border-box',
    minWidth: 32,
    height: 32,
    padding: '0 6px',
    margin: '0 3px',
    color: theme.palette.text.primary,
  },
  /* Styles applied to the root element if `type="page"`. */
  page: {
    transition: theme.transitions.create(['color', 'background-color'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&$focusVisible': {
      backgroundColor: theme.palette.action.focus,
    },
    '&$selected': {
      backgroundColor: theme.palette.action.selected,
      '&:hover': {
        backgroundColor: fade(
          theme.palette.action.selected,
          theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.action.selected,
        },
      },
      '&$focusVisible': {
        backgroundColor: fade(
          theme.palette.action.selected,
          theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
        ),
      },
      '&$disabled': {
        opacity: 1,
        color: theme.palette.action.disabled,
        backgroundColor: theme.palette.action.selected,
      },
    },
    '&$disabled': {
      opacity: theme.palette.action.disabledOpacity,
    },
  },
  /* Styles applied applied to the root element if `size="small"`. */
  sizeSmall: {
    minWidth: 26,
    height: 26,
    borderRadius: 26 / 2,
    margin: '0 1px',
    padding: '0 4px',
    '& $icon': {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  /* Styles applied applied to the root element if `size="large"`. */
  sizeLarge: {
    minWidth: 40,
    height: 40,
    borderRadius: 40 / 2,
    padding: '0 10px',
    fontSize: theme.typography.pxToRem(15),
    '& $icon': {
      fontSize: theme.typography.pxToRem(22),
    },
  },
  /* Styles applied to the root element if `variant="text"`. */
  text: {},
  /* Styles applied to the root element if `variant="text"` and `color="primary"`. */
  textPrimary: {
    '&$selected': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      '&:hover, &$focusVisible': {
        backgroundColor: theme.palette.primary.dark,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.primary.main,
        },
      },
      '&$disabled': {
        color: theme.palette.action.disabled,
      },
    },
  },
  /* Styles applied to the root element if `variant="text"` and `color="secondary"`. */
  textSecondary: {
    '&$selected': {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
      '&:hover, &$focusVisible': {
        backgroundColor: theme.palette.secondary.dark,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.secondary.main,
        },
      },
      '&$disabled': {
        color: theme.palette.action.disabled,
      },
    },
  },
  /* Styles applied to the root element if `variant="outlined"`. */
  outlined: {
    border: `1px solid ${
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
    }`,
    '&$selected': {
      '&$disabled': {
        border: `1px solid ${theme.palette.action.disabledBackground}`,
      },
    },
  },
  /* Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
  outlinedPrimary: {
    '&$selected': {
      color: theme.palette.primary.main,
      border: `1px solid ${fade(theme.palette.primary.main, 0.5)}`,
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.activatedOpacity),
      '&:hover, &$focusVisible': {
        backgroundColor: fade(
          theme.palette.primary.main,
          theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
      '&$disabled': {
        color: theme.palette.action.disabled,
      },
    },
  },
  /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
  outlinedSecondary: {
    '&$selected': {
      color: theme.palette.secondary.main,
      border: `1px solid ${fade(theme.palette.secondary.main, 0.5)}`,
      backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.activatedOpacity),
      '&:hover, &$focusVisible': {
        backgroundColor: fade(
          theme.palette.secondary.main,
          theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
      '&$disabled': {
        color: theme.palette.action.disabled,
      },
    },
  },
  /* Styles applied to the root element if `rounded="true"`. */
  rounded: {
    borderRadius: theme.shape.borderRadius,
  },
  /* Styles applied to the root element if `type="start-ellipsis"` or `type="end-ellipsis"`. */
  ellipsis: {
    height: 'auto',
    '&$disabled': {
      opacity: theme.palette.action.disabledOpacity,
    },
  },
  /* Pseudo-class applied to the root element if keyboard focused. */
  focusVisible: {},
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Pseudo-class applied to the root element if `selected={true}`. */
  selected: {},
  /* Styles applied to the icon element. */
  icon: {
    fontSize: theme.typography.pxToRem(20),
    margin: '0 -8px',
  },
});

const PaginationItem = React.forwardRef(function PaginationItem(props, ref) {
  const {
    classes,
    className,
    color = 'standard',
    component,
    disabled = false,
    page,
    selected = false,
    shape = 'circular',
    size = 'medium',
    type = 'page',
    variant = 'text',
    ...other
  } = props;

  const themeVariantsClasses = useThemeVariants(
    {
      ...props,
      color,
      disabled,
      selected,
      shape,
      size,
      type,
      variant,
    },
    'MuiPaginationItem',
  );

  const theme = useTheme();

  const normalizedIcons =
    theme.direction === 'rtl'
      ? {
          previous: NavigateNextIcon,
          next: NavigateBeforeIcon,
          last: FirstPageIcon,
          first: LastPageIcon,
        }
      : {
          previous: NavigateBeforeIcon,
          next: NavigateNextIcon,
          first: FirstPageIcon,
          last: LastPageIcon,
        };

  const Icon = normalizedIcons[type];

  return type === 'start-ellipsis' || type === 'end-ellipsis' ? (
    <div
      ref={ref}
      className={clsx(classes.root, classes.ellipsis, {
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
      focusVisibleClassName={classes.focusVisible}
      className={clsx(
        classes.root,
        classes.page,
        classes[variant],
        classes[shape],
        {
          [classes[`${variant}${capitalize(color)}`]]: color !== 'standard',
          [classes.disabled]: disabled,
          [classes.selected]: selected,
          [classes[`size${capitalize(size)}`]]: size !== 'medium',
        },
        themeVariantsClasses,
        className,
      )}
      {...other}
    >
      {type === 'page' && page}
      {Icon ? <Icon className={classes.icon} /> : null}
    </ButtonBase>
  );
});

PaginationItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
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
   * The active color.
   * @default 'standard'
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'standard']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the item will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * The current page number.
   */
  page: PropTypes.number,
  /**
   * If `true` the pagination item is selected.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The shape of the pagination item.
   * @default 'circular'
   */
  shape: PropTypes.oneOf(['circular', 'rounded']),
  /**
   * The size of the pagination item.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  /**
   * The type of pagination item.
   * @default 'page'
   */
  type: PropTypes.oneOf([
    'end-ellipsis',
    'first',
    'last',
    'next',
    'page',
    'previous',
    'start-ellipsis',
  ]),
  /**
   * The pagination item variant.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'text']),
    PropTypes.string,
  ]),
};

export default withStyles(styles, { name: 'MuiPaginationItem' })(PaginationItem);
