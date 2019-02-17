import React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from '@material-ui/utils';
import hoistStatics from './hoistInternalStatics';
import ThemeContext from './ThemeContext';

// Provide the theme object as a property to the input component.
const withTheme = Component => {
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && Component === undefined) {
    throw new Error(
      [
        'You are calling withTheme(Component) with an undefined component.',
        'You may have forgotten to import it.',
      ].join('\n'),
    );
  }

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

  hoistStatics(WithTheme, Component);

  return WithTheme;
};

export default withTheme;
