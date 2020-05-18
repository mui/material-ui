import * as React from 'react';
import useTheme from './useTheme';

export default function themed({ component: Component, name }) {
  function StyledComponent(props) {
    const theme = useTheme();
    const defaultProps = theme?.props[name];

    // TODO theme?.overrides[name]

    return <Component theme={theme} {...defaultProps} {...props} />;
  }

  if (process.env.NODE_ENV !== 'production') {
    StyledComponent.displayName = name;
  }

  return StyledComponent;
}
