import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import useThemeProps from '../styles/useThemeProps';
import paginationItemClasses, { getPaginationItemUtilityClass } from './paginationItemClasses';
import { useTheme } from '../styles';
import { alpha } from '../styles/colorManipulator';
import ButtonBase from '../ButtonBase';
import { capitalize } from '../utils';
import FirstPageIcon from '../internal/svg-icons/FirstPage';
import LastPageIcon from '../internal/svg-icons/LastPage';
import NavigateBeforeIcon from '../internal/svg-icons/NavigateBefore';
import NavigateNextIcon from '../internal/svg-icons/NavigateNext';
import experimentalStyled from '../styles/experimentalStyled';

const overridesResolver = (props, styles) => {
  const { styleProps: { color, disabled, selected, size, shape, variant } = {} } = props;

  return deepmerge(styles.root || {}, {
    ...styles[variant],
    ...styles[`size${capitalize(size)}`],
    ...(variant === 'text' && {
      ...(color === 'primary' && styles.textPrimary),
      ...(color === 'secondary' && styles.textSecondary),
    }),
    ...(variant === 'outlined' && {
      ...(color === 'primary' && styles.outlinedPrimary),
      ...(color === 'secondary' && styles.outlinedSecondary),
    }),
    ...(shape === 'rounded' && styles.rounded),
    ...(disabled && styles.disabled),
    ...(selected && styles.selected),
    [`&.${paginationItemClasses.ellipsis}`]: styles.ellipsis,
    [`&.${paginationItemClasses.page}`]: styles.page,
    [`& .${paginationItemClasses.icon}`]: styles.icon,
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes, color, disabled, selected, size, shape, variant } = styleProps;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      size !== 'medium' && `size${capitalize(size)}`,
      variant,
      shape,
      color !== 'standard' && `${variant}${capitalize(color)}`,
      disabled && 'disabled',
      selected && 'selected',
    ],
    ellipsis: ['ellipsis'],
    page: ['page'],
    icon: ['icon'],
  };

  return composeClasses(slots, getPaginationItemUtilityClass, classes);
};

const PaginationItemEllipsis = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiPaginationItem',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme, styleProps }) => {
  return {
    /* Styles applied to the root element. */
    ...theme.typography.body2,
    borderRadius: 32 / 2,
    textAlign: 'center',
    boxSizing: 'border-box',
    minWidth: 32,
    padding: '0 6px',
    margin: '0 3px',
    color: theme.palette.text.primary,
    height: 'auto',
    /* Styles applied to the root element if `disabled="true"`. */
    ...(styleProps.disabled && {
      opacity: theme.palette.action.disabledOpacity,
    }),
    /* Styles applied to the root element if `size="small"`. */
    ...(styleProps.size === 'small' && {
      minWidth: 26,
      borderRadius: 26 / 2,
      margin: '0 1px',
      padding: '0 4px',
    }),
    /* Styles applied to the root element if `size="large"`. */
    ...(styleProps.size === 'large' && {
      minWidth: 40,
      borderRadius: 40 / 2,
      padding: '0 10px',
      fontSize: theme.typography.pxToRem(15),
    }),
  };
});

const PaginationItemPage = experimentalStyled(
  ButtonBase,
  {},
  {
    name: 'MuiPaginationItem',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme, styleProps }) => {
  const { color, disabled, selected, size, shape, type, variant } = styleProps;

  return {
    /* Styles applied to the root element. */
    ...theme.typography.body2,
    borderRadius: 32 / 2,
    textAlign: 'center',
    boxSizing: 'border-box',
    minWidth: 32,
    height: 32,
    padding: '0 6px',
    margin: '0 3px',
    color: theme.palette.text.primary,
    '&.Mui-focusVisible': {
      backgroundColor: theme.palette.action.focus,
    },
    ...(disabled && {
      opacity: theme.palette.action.disabledOpacity,
    }),
    /* Styles applied to the root element if `type="page"`. */
    ...(type === 'page' && {
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
      ...(selected && {
        backgroundColor: theme.palette.action.selected,
        '&:hover': {
          backgroundColor: alpha(
            theme.palette.action.selected,
            theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
          ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: theme.palette.action.selected,
          },
        },
        '&.Mui-focusVisible': {
          backgroundColor: alpha(
            theme.palette.action.selected,
            theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
          ),
        },
        ...(disabled && {
          opacity: 1,
          color: theme.palette.action.disabled,
          backgroundColor: theme.palette.action.selected,
        }),
      }),
    }),
    /* Styles applied to the root element if `size="small"`. */
    ...(size === 'small' && {
      minWidth: 26,
      height: 26,
      borderRadius: 26 / 2,
      margin: '0 1px',
      padding: '0 4px',
    }),
    /* Styles applied to the root element if `size="large"`. */
    ...(size === 'large' && {
      minWidth: 40,
      height: 40,
      borderRadius: 40 / 2,
      padding: '0 10px',
      fontSize: theme.typography.pxToRem(15),
    }),
    /* Styles applied to the root element if `variant="text"`. */
    ...(variant === 'text' &&
      selected && {
        ...(color !== 'standard' && {
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
          '&:hover': {
            backgroundColor: theme.palette[color].dark,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: theme.palette[color].main,
            },
          },
          '&.Mui-focusVisible': {
            backgroundColor: theme.palette[color].dark,
          },
        }),
        ...(disabled && {
          color: theme.palette.action.disabled,
        }),
      }),
    /* Styles applied to the root element if `variant="outlined"`. */
    ...(variant === 'outlined' && {
      border: `1px solid ${
        theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
      }`,
      ...(selected && {
        ...(color !== 'standard' && {
          color: theme.palette[color].main,
          border: `1px solid ${alpha(theme.palette[color].main, 0.5)}`,
          backgroundColor: alpha(theme.palette[color].main, theme.palette.action.activatedOpacity),
          '&:hover': {
            backgroundColor: alpha(
              theme.palette[color].main,
              theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity,
            ),
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },
          '&.Mui-focusVisible': {
            backgroundColor: alpha(
              theme.palette[color].main,
              theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity,
            ),
          },
        }),
        ...(disabled && {
          borderColor: theme.palette.action.disabledBackground,
          color: theme.palette.action.disabled,
        }),
      }),
    }),
    /* Styles applied to the root element if `shape="rounded"`. */
    ...(shape === 'rounded' && {
      borderRadius: theme.shape.borderRadius,
    }),
  };
});

const PaginationItemPageIcon = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiPaginationItem',
    slot: 'Icon',
  },
)(({ theme, styleProps }) => ({
  fontSize: theme.typography.pxToRem(20),
  margin: '0 -8px',
  ...(styleProps.size === 'small' && {
    fontSize: theme.typography.pxToRem(18),
  }),
  ...(styleProps.size === 'large' && {
    fontSize: theme.typography.pxToRem(22),
  }),
}));

const PaginationItem = React.forwardRef(function PaginationItem(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiPaginationItem' });
  const {
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

  const styleProps = {
    ...props,
    color,
    disabled,
    selected,
    shape,
    size,
    type,
    variant,
  };

  const theme = useTheme();
  const classes = useUtilityClasses(styleProps);

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
    <PaginationItemEllipsis
      ref={ref}
      styleProps={styleProps}
      className={clsx(classes.root, classes.ellipsis, className)}
      {...other}
    >
      …
    </PaginationItemEllipsis>
  ) : (
    <PaginationItemPage
      ref={ref}
      styleProps={styleProps}
      component={component}
      disabled={disabled}
      className={clsx(classes.root, classes.page, className)}
      {...other}
    >
      {type === 'page' && page}
      {Icon ? (
        <PaginationItemPageIcon as={Icon} styleProps={styleProps} className={classes.icon} />
      ) : null}
    </PaginationItemPage>
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
   * If `true`, the component is disabled.
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
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
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
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'text']),
    PropTypes.string,
  ]),
};

export default PaginationItem;
