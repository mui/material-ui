import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { getDisplayName } from '@material-ui/utils';
import { ThemeContext } from './ThemeProvider';

// Provide the theme object as a property to the input component.
const withTheme = () => Component => {
  const WithTheme = props => (
    <ThemeContext.Consumer>
      {theme => {
        const { innerRef, ...other } = props;
        return <Component theme={theme} ref={innerRef} {...other} />;
      }}
    </ThemeContext.Consumer>
  );

  WithTheme.propTypes = {
    /**
     * Use that property to pass a ref callback to the decorated component.
     */
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  };

  if (process.env.NODE_ENV !== 'production') {
    WithTheme.displayName = `WithTheme(${getDisplayName(Component)})`;
  }

  hoistNonReactStatics(WithTheme, Component);

  return WithTheme;
};

export default withTheme;
