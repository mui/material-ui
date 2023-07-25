/* eslint-disable react/prop-types */
import * as React from 'react';

export default function createSlot<
  ComponentType extends React.JSXElementConstructor<React.ComponentProps<ComponentType>>,
>(Component: ComponentType) {
  return React.forwardRef<HTMLElement, React.ComponentProps<ComponentType>>(function Slot(
    props,
    ref,
  ) {
    // @ts-ignore ownerState is added by the owner component
    const { ownerState, ...other } = props;

    const rootProps = {
      ref,
      ...other,
    } as unknown as JSX.IntrinsicAttributes &
      JSX.LibraryManagedAttributes<ComponentType, React.ComponentProps<ComponentType>>;

    return <Component {...rootProps} />;
  });
}
