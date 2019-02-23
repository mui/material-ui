import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { getDisplayName } from '@material-ui/utils';
import useSelectedState from './useSelectedState';

export default function withSelectableGroupContext(Component) {
  const WithSelectableGroupContext = props => {
    const selectState = useSelectedState();
    return <Component selectState={selectState} {...props} />;
  };

  if (process.env.NODE_ENV !== 'production') {
    WithSelectableGroupContext.displayName = `WithSelectableGroupContext(${getDisplayName(
      Component,
    )})`;
  }

  hoistNonReactStatics(WithSelectableGroupContext, Component);

  return WithSelectableGroupContext;
}
