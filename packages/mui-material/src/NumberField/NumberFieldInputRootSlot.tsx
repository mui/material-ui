import * as React from 'react';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';

import RenderElement from './RenderElement';

interface NumberFieldInputRootSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  ownerState?: Record<string, unknown> | undefined;
  numberFieldInputRoot: {
    render?: BaseNumberField.Group.Props['render'] | undefined;
    renderState: BaseNumberField.Group.State;
    rootComponent?: React.ElementType | undefined;
  };
}

/**
 * Applies Base UI's Group semantics to the Material input root without another wrapper.
 * @ignore - internal component.
 */
const NumberFieldInputRootSlot = React.forwardRef(function NumberFieldInputRootSlot(
  props: NumberFieldInputRootSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { numberFieldInputRoot, ownerState, ...other } = props;
  const { render, renderState, rootComponent } = numberFieldInputRoot;
  const Root = rootComponent ?? RenderElement;

  return (
    <BaseNumberField.Group
      render={
        <Root
          {...other}
          ref={ref}
          {...(rootComponent && typeof rootComponent !== 'string' && { ownerState })}
          {...(!rootComponent && { render, renderState: { ...renderState } })}
        />
      }
    />
  );
});

export default NumberFieldInputRootSlot;
