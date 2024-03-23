import * as React from 'react';

export function prepareForSlot<ComponentType extends React.ElementType>(Component: ComponentType) {
  type Props = React.ComponentProps<ComponentType>;

  return React.forwardRef<HTMLElement, Props>(function Slot(props, ref) {
    const { ownerState, ...other } = props;
    return React.createElement<Props>(Component, {
      ...(other as Props),
      ref,
    });
  });
}
