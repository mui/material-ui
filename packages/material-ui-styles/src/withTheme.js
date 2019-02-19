import React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from '@material-ui/utils';
import hoistStatics from './hoistInternalStatics';
import useTheme from './useTheme';
import RefHolder from './RefHolder';

// Provide the theme object as a property to the input component.
// It's an alternative API to useTheme().
// We encourage the usage of useTheme() where possible.
const withTheme = Component => {
  if (process.env.NODE_ENV !== 'production' && Component === undefined) {
    throw new Error(
      [
        'You are calling withTheme(Component) with an undefined component.',
        'You may have forgotten to import it.',
      ].join('\n'),
    );
  }

  const WithTheme = React.forwardRef(function WithTheme(props, ref) {
    const { innerRef, ...other } = props;
    const theme = useTheme();
    return (
      <RefHolder ref={ref}>
        <Component theme={theme} ref={innerRef} {...other} />
      </RefHolder>
    );
  });

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
