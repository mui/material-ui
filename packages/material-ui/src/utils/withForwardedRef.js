import React from 'react';
import { getDisplayName } from '@material-ui/utils';
import hoistStatics from './hoistInternalStatics';

export default function withForwardRef(Component) {
  const ForwardRefComponent = React.forwardRef((props, ref) => (
    // We expect this component to be wrapped in `withStyles` in which `innerRef`
    // is already intercepted and therefore won't appear in `props` here.
    <Component {...props} innerRef={ref} />
  ));

  if (process.env.NODE_ENV !== 'production') {
    ForwardRefComponent.displayName = `ForwardRef(${getDisplayName(Component)})`;
  }

  return hoistStatics(ForwardRefComponent, Component);
}
