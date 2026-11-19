import * as React from 'react';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';

interface NumberFieldInputRootSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  ownerState?: Record<string, unknown> | undefined;
  numberFieldInputRoot: {
    render?: BaseNumberField.Group.Props['render'] | undefined;
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
  const { render, rootComponent: Root } = numberFieldInputRoot;

  return (
    <BaseNumberField.Group
      {...other}
      ref={ref}
      render={Root ? <Root {...(typeof Root !== 'string' && { ownerState })} /> : render}
    />
  );
});

export default NumberFieldInputRootSlot;
