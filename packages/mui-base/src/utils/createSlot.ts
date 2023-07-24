/* eslint-disable react/prop-types */
import * as React from 'react';

export default function createSlot<
  ComponentType extends React.JSXElementConstructor<React.ComponentProps<ComponentType>>,
>(Component: ComponentType) {
  return React.forwardRef<HTMLElement, React.ComponentProps<typeof Component>>(function Slot(
    props,
    ref,
  ) {
    // @ts-ignore ownerState is added by the owner component
    const { ownerState, children, ...other } = props;
    return React.createElement(typeof Component, { ref, ...other }, children);
  });
}
