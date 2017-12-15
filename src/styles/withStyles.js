import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import wrapDisplayName from 'recompose/wrapDisplayName';
import Styled from './Styled';

// Wrap a component in `Styled` to provide classes.
const withStyles = (stylesOrCreator, options = {}) => Component => {
  const Style = props => {
    return (
      <Styled styles={stylesOrCreator} options={options} Component={Component}>
        {styledProps => <Component {...styledProps} {...props} />}
      </Styled>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    Style.displayName = wrapDisplayName(Component, 'withStyles');
  }

  hoistNonReactStatics(Style, Component);

  if (process.env.NODE_ENV !== 'production') {
    // Exposed for test purposes.
    Style.Naked = Component;
    Style.options = options;
  }

  return Style;
};

export default withStyles;
