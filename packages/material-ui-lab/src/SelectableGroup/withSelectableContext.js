import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import SelectableGroupContext from './SelectableGroupContext';
import { getDisplayName } from '@material-ui/utils';

export default function withSelectableGroupContext(Component) {
  const EnhancedComponent = props => (
    <SelectableGroupContext.Consumer>
      {context => <Component muiSelectableGroup={context} {...props} />}
    </SelectableGroupContext.Consumer>
  );

  if (process.env.NODE_ENV !== 'production') {
    EnhancedComponent.displayName = `WithSelectableGroupContext(${getDisplayName(Component)})`;
  }

  hoistNonReactStatics(EnhancedComponent, Component);

  return EnhancedComponent;
}
