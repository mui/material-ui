import * as React from 'react';
import type { NumberField as BaseNumberField } from '@base-ui/react/number-field';

import InputAdornment from '../InputAdornment';
import type { InputAdornmentProps } from '../InputAdornment';
import { styled } from '../zero-styled';
import useSlot from '../utils/useSlot';
import type { NumberFieldOwnerState, NumberFieldProps } from './NumberField.types';
import RenderElement from './RenderElement';

interface NumberFieldControlsProps {
  position: InputAdornmentProps['position'];
  children: React.ReactNode;
  className: string;
  baseState: BaseNumberField.Root.State;
  materialProps: NumberFieldOwnerState;
  externalForwardedProps: Pick<NumberFieldProps, 'slots' | 'slotProps'>;
}

const NumberFieldControls = styled(InputAdornment, {
  name: 'MuiNumberField',
  slot: 'Controls',
})<{ ownerState: NumberFieldOwnerState }>({
  variants: [
    {
      props: ({ ownerState }: { ownerState: NumberFieldOwnerState }) =>
        ownerState.controlsPosition === 'stacked',
      style: {
        flexDirection: 'column',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        height: 'auto',
        maxHeight: 'none',
      },
    },
  ],
});

/**
 * @ignore - internal component.
 */
function NumberFieldControlsSlot(props: NumberFieldControlsProps) {
  const { position, children, className, baseState, materialProps, externalForwardedProps } = props;
  const ownerState = { ...materialProps, position };
  const [ControlsSlot, controlsSlotProps] = useSlot('controls', {
    elementType: NumberFieldControls,
    externalForwardedProps,
    ownerState,
    className,
    additionalProps: { position },
  });
  const { render, ...controlsProps } = controlsSlotProps;

  return (
    <ControlsSlot
      {...controlsProps}
      position={position}
      {...(render &&
        !externalForwardedProps.slots?.controls && {
          component: RenderElement,
          render,
          renderState: baseState,
        })}
    >
      {children}
    </ControlsSlot>
  );
}

export default NumberFieldControlsSlot;
