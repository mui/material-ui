import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { chainPropTypes, getDisplayName } from '@material-ui/utils';
import useTheme from '../useTheme';

export function withThemeCreator(options = {}) {
  const { defaultTheme } = options;

  const withTheme = (Component) => {
    if (process.env.NODE_ENV !== 'production') {
      if (Component === undefined) {
        throw new Error(
          [
            'You are calling withTheme(Component) with an undefined component.',
            'You may have forgotten to import it.',
          ].join('\n'),
        );
      }
    }

    const WithTheme = React.forwardRef(function WithTheme(props, ref) {
      const { innerRef, ...other } = props;
      const theme = useTheme() || defaultTheme;
      return <Component theme={theme} ref={innerRef || ref} {...other} />;
    });

    WithTheme.propTypes = {
      /**
       * Use that prop to pass a ref to the decorated component.
       * @deprecated
       */
      innerRef: chainPropTypes(PropTypes.oneOfType([PropTypes.func, PropTypes.object]), (props) => {
        if (props.innerRef == null) {
          return null;
        }

        return new Error(
          'Material-UI: The `innerRef` prop is deprecated and will be removed in v5. ' +
            'Refs are now automatically forwarded to the inner component.',
        );
      }),
    };

    if (process.env.NODE_ENV !== 'production') {
      WithTheme.displayName = `WithTheme(${getDisplayName(Component)})`;
    }

    hoistNonReactStatics(WithTheme, Component);

    if (process.env.NODE_ENV !== 'production') {
      // Exposed for test purposes.
      WithTheme.Naked = Component;
    }

    return WithTheme;
  };

  return withTheme;
}

// Provide the theme object as a prop to the input component.
// It's an alternative API to useTheme().
// We encourage the usage of useTheme() where possible.
const withTheme = withThemeCreator();

export default withTheme;
