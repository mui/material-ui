import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import FormControlContext from './FormControlContext';
import { getDisplayName } from '@material-ui/utils';

export default function withFormControlContext(Component) {
  const EnhancedComponent = props => (
    <FormControlContext.Consumer>
      {context => <Component muiFormControl={context} {...props} />}
    </FormControlContext.Consumer>
  );

  if (process.env.NODE_ENV !== 'production') {
    EnhancedComponent.displayName = `WithFormControlContext(${getDisplayName(Component)})`;
  }

  hoistNonReactStatics(EnhancedComponent, Component);

  return EnhancedComponent;
}
