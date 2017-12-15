import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import wrapDisplayName from 'recompose/wrapDisplayName';
import Styled from './Styled';

// Link a style sheet with a component.
// It does not modify the component passed to it;
// instead, it returns a new component, with a `classes` property.
const withStyles = (stylesOrCreator, options = {}) => Component => {
  const Style = () => (
    <Styled styles={stylesOrCreator} options={options}>
      {styledProps => <Component {...styledProps} ref={innerRef} />}
    </Styled>
  );

  Style.propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.object,
    /**
     * Use that property to pass a ref callback to the decorated component.
     */
    innerRef: PropTypes.func,
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
