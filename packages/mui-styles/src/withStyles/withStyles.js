import * as React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { getDisplayName } from '@mui/utils';
import makeStyles from '../makeStyles';
import getThemeProps from '../getThemeProps';
import useTheme from '../useTheme';

// Link a style sheet with a component.
// It does not modify the component passed to it;
// instead, it returns a new component, with a `classes` property.
const withStyles =
  (stylesOrCreator, options = {}) =>
  (Component) => {
    const { defaultTheme, withTheme = false, name, ...stylesOptions } = options;

    if (process.env.NODE_ENV !== 'production') {
      if (Component === undefined) {
        throw new Error(
          [
            'You are calling withStyles(styles)(Component) with an undefined component.',
            'You may have forgotten to import it.',
          ].join('\n'),
        );
      }
    }

    let classNamePrefix = name;

    if (process.env.NODE_ENV !== 'production') {
      if (!name) {
        // Provide a better DX outside production.
        const displayName = getDisplayName(Component);
        if (displayName !== undefined) {
          classNamePrefix = displayName;
        }
      }
    }

    const useStyles = makeStyles(stylesOrCreator, {
      defaultTheme,
      Component,
      name: name || Component.displayName,
      classNamePrefix,
      ...stylesOptions,
    });

    const WithStyles = React.forwardRef(function WithStyles(props, ref) {
      const { classes: classesProp, ...other } = props;
      // The wrapper receives only user supplied props, which could be a subset of
      // the actual props Component might receive due to merging with defaultProps.
      // So copying it here would give us the same result in the wrapper as well.
      const classes = useStyles({ ...Component.defaultProps, ...props });

      let theme;
      let more = other;

      if (typeof name === 'string' || withTheme) {
        // name and withTheme are invariant in the outer scope
        // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
        // eslint-disable-next-line react-hooks/rules-of-hooks
        theme = useTheme() || defaultTheme;

        if (name) {
          more = getThemeProps({ theme, name, props: other });
        }

        // Provide the theme to the wrapped component.
        // So we don't have to use the `withTheme()` Higher-order Component.
        if (withTheme && !more.theme) {
          more.theme = theme;
        }
      }

      return <Component ref={ref} classes={classes} {...more} />;
    });

    WithStyles.propTypes = {
      /**
       * Override or extend the styles applied to the component.
       */
      classes: PropTypes.object,
    };

    if (process.env.NODE_ENV !== 'production') {
      WithStyles.displayName = `WithStyles(${getDisplayName(Component)})`;
    }

    hoistNonReactStatics(WithStyles, Component);

    if (process.env.NODE_ENV !== 'production') {
      // Exposed for test purposes.
      WithStyles.Naked = Component;
      WithStyles.options = options;
      WithStyles.useStyles = useStyles;
    }

    return WithStyles;
  };

export default withStyles;
