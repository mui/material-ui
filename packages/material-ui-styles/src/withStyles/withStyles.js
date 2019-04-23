import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { chainPropTypes, getDisplayName } from '@material-ui/utils';
import makeStyles from '../makeStyles';
import getThemeProps from '../getThemeProps';
import useTheme from '../useTheme';

// Link a style sheet with a component.
// It does not modify the component passed to it;
// instead, it returns a new component, with a `classes` property.
const withStyles = (stylesOrCreator, options = {}) => Component => {
  const { defaultTheme, withTheme = false, name, ...stylesOptions } = options;

  if (process.env.NODE_ENV !== 'production' && Component === undefined) {
    throw new Error(
      [
        'You are calling withStyles(styles)(Component) with an undefined component.',
        'You may have forgotten to import it.',
      ].join('\n'),
    );
  }

  let classNamePrefix = name;

  if (process.env.NODE_ENV !== 'production' && !name) {
    // Provide a better DX outside production.
    classNamePrefix = getDisplayName(Component);
    warning(
      typeof classNamePrefix === 'string',
      [
        'Material-UI: the component displayName is invalid. It needs to be a string.',
        `Please fix the following component: ${Component}.`,
      ].join('\n'),
    );
  }

  const useStyles = makeStyles(stylesOrCreator, {
    defaultTheme,
    Component,
    name: name || Component.displayName,
    classNamePrefix,
    ...stylesOptions,
  });

  const WithStyles = React.forwardRef(function WithStyles(props, ref) {
    const { classes: classesProp, innerRef, ...other } = props;
    const classes = useStyles(props);

    let theme;
    let more = other;

    if (typeof name === 'string' || withTheme) {
      // name and withTheme are invariant in the outer scope
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

    return <Component ref={innerRef || ref} classes={classes} {...more} />;
  });

  WithStyles.propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object,
    /**
     * Use that property to pass a ref callback to the decorated component.
     * @deprecated
     */
    innerRef: chainPropTypes(PropTypes.oneOfType([PropTypes.func, PropTypes.object]), props => {
      if (props.innerRef == null) {
        return null;
      }

      return null;
      // return new Error(
      //   'Material-UI: the `innerRef` prop is deprecated and will be removed in v5. ' +
      //     'Refs are now automatically forwarded to the inner component.',
      // );
    }),
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
