import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import composeClasses from './composeClasses';
import useThemeProps from './useThemeProps';
import createTheme from './createTheme';
import systemStyled from './styled';
import { getContainerUtilityClass as defaultGetContainerUtilityClasses } from './Container/containerClasses';

const systemDefaultTheme = createTheme();

const useUtilityClasses = (ownerState, getContainerUtilityClass) => {
  const { classes, fixed, disableGutters, maxWidth } = ownerState;

  const slots = {
    root: [
      'root',
      maxWidth && `maxWidth${capitalize(String(maxWidth))}`,
      fixed && 'fixed',
      disableGutters && 'disableGutters',
    ],
  };

  return composeClasses(slots, getContainerUtilityClass, classes);
};

export default function createContainer(options = {}) {
  const {
    defaultTheme = systemDefaultTheme,
    // This will allow adding custom styled fn (for example for custom sx style function)
    styled = systemStyled,
    getContainerUtilityClass = defaultGetContainerUtilityClasses,
  } = options;

  const ContainerRoot = styled('div', {
    name: 'MuiContainer',
    slot: 'Root',
    overridesResolver: (props, styles) => {
      const { ownerState } = props;

      return [
        styles.root,
        styles[`maxWidth${capitalize(String(ownerState.maxWidth))}`],
        ownerState.fixed && styles.fixed,
        ownerState.disableGutters && styles.disableGutters,
      ];
    },
  })(
    ({ theme, ownerState }) => ({
      width: '100%',
      marginLeft: 'auto',
      boxSizing: 'border-box',
      marginRight: 'auto',
      display: 'block', // Fix IE11 layout when used with main.
      ...(!ownerState.disableGutters && {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
        },
      }),
    }),
    ({ theme, ownerState }) =>
      ownerState.fixed &&
      Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
        const value = theme.breakpoints.values[breakpoint];

        if (value !== 0) {
          acc[theme.breakpoints.up(breakpoint)] = {
            maxWidth: `${value}${theme.breakpoints.unit}`,
          };
        }
        return acc;
      }, {}),
    ({ theme, ownerState }) => ({
      ...(ownerState.maxWidth === 'xs' && {
        [theme.breakpoints.up('xs')]: {
          maxWidth: Math.max(theme.breakpoints.values.xs, 444),
        },
      }),
      ...(ownerState.maxWidth &&
        ownerState.maxWidth !== 'xs' && {
          [theme.breakpoints.up(ownerState.maxWidth)]: {
            maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`,
          },
        }),
    }),
  );

  const Container = React.forwardRef(function Container(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: 'MuiContainer', defaultTheme });
    const {
      className,
      component = 'div',
      disableGutters = false,
      fixed = false,
      maxWidth = 'lg',
      classes: classesProp,
      ...other
    } = props;

    const ownerState = {
      ...props,
      component,
      disableGutters,
      fixed,
      maxWidth,
    };

    const classes = useUtilityClasses(ownerState, getContainerUtilityClass);

    return (
      <ContainerRoot
        as={component}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        ref={ref}
        {...other}
      />
    );
  });

  Container.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    disableGutters: PropTypes.bool,
    fixed: PropTypes.bool,
    maxWidth: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs', false]),
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
      PropTypes.func,
      PropTypes.object,
    ]),
  };

  return Container;
}
