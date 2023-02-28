import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import Paper from '../Paper';
import { getAppBarUtilityClass } from './appBarClasses';

const useUtilityClasses = (ownerState) => {
  const { color, position, classes } = ownerState;

  const slots = {
    root: ['root', `color${capitalize(color)}`, `position${capitalize(position)}`],
  };

  return composeClasses(slots, getAppBarUtilityClass, classes);
};

// var2 is the fallback.
// Ex. var1: 'var(--a)', var2: 'var(--b)'; return: 'var(--a, var(--b))'
const joinVars = (var1, var2) => (var1 ? `${var1?.replace(')', '')}, ${var2})` : var2);

const AppBarRoot = styled(Paper, {
  name: 'MuiAppBar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[`position${capitalize(ownerState.position)}`],
      styles[`color${capitalize(ownerState.color)}`],
    ];
  },
})(({ theme, ownerState }) => {
  const backgroundColorDefault =
    theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900];

  return {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box', // Prevent padding issue with the Modal and fixed positioned AppBar.
    flexShrink: 0,
    ...(ownerState.position === 'fixed' && {
      position: 'fixed',
      zIndex: (theme.vars || theme).zIndex.appBar,
      top: 0,
      left: 'auto',
      right: 0,
      '@media print': {
        // Prevent the app bar to be visible on each printed page.
        position: 'absolute',
      },
    }),
    ...(ownerState.position === 'absolute' && {
      position: 'absolute',
      zIndex: (theme.vars || theme).zIndex.appBar,
      top: 0,
      left: 'auto',
      right: 0,
    }),
    ...(ownerState.position === 'sticky' && {
      // ⚠️ sticky is not supported by IE11.
      position: 'sticky',
      zIndex: (theme.vars || theme).zIndex.appBar,
      top: 0,
      left: 'auto',
      right: 0,
    }),
    ...(ownerState.position === 'static' && {
      position: 'static',
    }),
    ...(ownerState.position === 'relative' && {
      position: 'relative',
    }),
    ...(!theme.vars && {
      ...(ownerState.color === 'default' && {
        backgroundColor: backgroundColorDefault,
        color: theme.palette.getContrastText(backgroundColorDefault),
      }),
      ...(ownerState.color &&
        ownerState.color !== 'default' &&
        ownerState.color !== 'inherit' &&
        ownerState.color !== 'transparent' && {
          backgroundColor: theme.palette[ownerState.color].main,
          color: theme.palette[ownerState.color].contrastText,
        }),
      ...(ownerState.color === 'inherit' && {
        color: 'inherit',
      }),
      ...(theme.palette.mode === 'dark' &&
        !ownerState.enableColorOnDark && {
          backgroundColor: null,
          color: null,
        }),
      ...(ownerState.color === 'transparent' && {
        backgroundColor: 'transparent',
        color: 'inherit',
        ...(theme.palette.mode === 'dark' && {
          backgroundImage: 'none',
        }),
      }),
    }),
    ...(theme.vars && {
      ...(ownerState.color === 'default' && {
        '--AppBar-background': ownerState.enableColorOnDark
          ? theme.vars.palette.AppBar.defaultBg
          : joinVars(theme.vars.palette.AppBar.darkBg, theme.vars.palette.AppBar.defaultBg),
        '--AppBar-color': ownerState.enableColorOnDark
          ? theme.vars.palette.text.primary
          : joinVars(theme.vars.palette.AppBar.darkColor, theme.vars.palette.text.primary),
      }),
      ...(ownerState.color &&
        !ownerState.color.match(/^(default|inherit|transparent)$/) && {
          '--AppBar-background': ownerState.enableColorOnDark
            ? theme.vars.palette[ownerState.color].main
            : joinVars(theme.vars.palette.AppBar.darkBg, theme.vars.palette[ownerState.color].main),
          '--AppBar-color': ownerState.enableColorOnDark
            ? theme.vars.palette[ownerState.color].contrastText
            : joinVars(
                theme.vars.palette.AppBar.darkColor,
                theme.vars.palette[ownerState.color].contrastText,
              ),
        }),
      backgroundColor: 'var(--AppBar-background)',
      color: ownerState.color === 'inherit' ? 'inherit' : 'var(--AppBar-color)',
      ...(ownerState.color === 'transparent' && {
        backgroundImage: 'none',
        backgroundColor: 'transparent',
        color: 'inherit',
      }),
    }),
  };
});

const AppBar = React.forwardRef(function AppBar(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiAppBar' });
  const {
    className,
    color = 'primary',
    enableColorOnDark = false,
    position = 'fixed',
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    position,
    enableColorOnDark,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <AppBarRoot
      square
      component="header"
      ownerState={ownerState}
      elevation={4}
      className={clsx(
        classes.root,
        {
          'mui-fixed': position === 'fixed', // Useful for the Dialog
        },
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

AppBar.propTypes /* remove-proptypes */ = {
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary', 'transparent']),
    PropTypes.string,
  ]),
  /**
   * If true, the `color` prop is applied in dark mode.
   * @default false
   */
  enableColorOnDark: PropTypes.bool,
  /**
   * The positioning type. The behavior of the different options is described
   * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
   * @default 'fixed'
   */
  position: PropTypes.oneOf(['absolute', 'fixed', 'relative', 'static', 'sticky']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default AppBar;
