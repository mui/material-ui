import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { getDisplayName } from '@material-ui/utils';
import makeStyles from './makeStyles';
import RefHolder from './RefHolder';
import getThemeProps from './getThemeProps';
import useTheme from './useTheme';

// Link a style sheet with a component.
// It does not modify the component passed to it;
// instead, it returns a new component, with a `classes` property.
const withStyles = (stylesOrCreator, options = {}) => Component => {
  const { withTheme = false, name, ...otherOptions } = options;

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
    ...otherOptions,
    Component,
    name: name || Component.displayName,
    classNamePrefix,
  });

  const WithStyles = React.forwardRef(function WithStyles(props, ref) {
    const { classes: classesProp, innerRef, ...other } = props;
    const classes = useStyles(props);

    let theme;
    let more = other;

    if (typeof name === 'string' || withTheme) {
      // name and withTheme are invariant in the outer scope
      // eslint-disable-next-line react-hooks/rules-of-hooks
      theme = useTheme();

      if (name) {
        more = getThemeProps({ theme, name, props: other });
      }

      // Provide the theme to the wrapped component.
      // So we don't have to use the `withTheme()` Higher-order Component.
      if (withTheme) {
        more.theme = theme;
      }
    }

    return (
      <RefHolder ref={ref}>
        <Component ref={innerRef} classes={classes} {...more} />
      </RefHolder>
    );
  });

  WithStyles.propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object,
    /**
     * Use that property to pass a ref callback to the decorated component.
     */
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  };

  if (process.env.NODE_ENV !== 'production') {
    WithStyles.displayName = `WithStyles(${getDisplayName(Component)})`;
  }

  hoistNonReactStatics(WithStyles, Component);

  return WithStyles;
};

export default withStyles;
