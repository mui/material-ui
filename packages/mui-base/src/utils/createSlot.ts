import * as React from 'react';

export default function createSlot<P>(Component: React.JSXElementConstructor<P>) {
  return React.forwardRef<HTMLElement, P>(function Slot(props, ref) {
    // @ts-ignore ownerState is added by the owner component
    const { ownerState, children, ...other } = props;
    return React.createElement(Component, { ref, ...other }, children);
  });
}
