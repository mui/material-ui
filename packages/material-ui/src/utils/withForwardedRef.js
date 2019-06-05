import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { getDisplayName } from '@material-ui/utils';

/**
 * Enables ref forwarding on a given component that uses `innerRef` to forward refs
 * This is useful for component implementations that predate `forwardRef` and
 * used other props to forward refs.
 *
 * Instead of `<Component innerRef={ref} />` you can write
 * `<withForwardRef(Component) ref={ref} />`.
 *
 * This HOC does not handle prop collision. In
 * `<withForwardRef(Component) ref={ref} innerRef={innerRef} />` `innerRef` will be dropped
 *
 * Only copies statics from material-ui over.
 *
 * @param {React.ComponentType} Component
 * @returns {React.ForwardRefComponent}
 */
export default function withForwardedRef(Component) {
  const ForwardRefComponent = React.forwardRef((props, ref) => (
    // We expect this component to be wrapped in `withStyles` in which `innerRef`
    // is already intercepted and therefore won't appear in `props` here.
    <Component {...props} innerRef={ref} />
  ));

  if (process.env.NODE_ENV !== 'production') {
    ForwardRefComponent.displayName = `ForwardRef(${getDisplayName(Component)})`;
  }

  return hoistNonReactStatics(ForwardRefComponent, Component);
}
