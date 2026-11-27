import * as React from 'react';
import type { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import InputAdornment from '../InputAdornment';
import type { InputAdornmentProps } from '../InputAdornment';
import { styled } from '../zero-styled';
import useSlot from '../utils/useSlot';
import type { NumberFieldOwnerState, NumberFieldProps } from './NumberField.types';
import filledSplitEndAdornmentOffset from './utils/filledSplitEndAdornmentOffset';
import RenderElement from './RenderElement';

interface NumberFieldControlsSlotProps {
  position: InputAdornmentProps['position'];
  children: React.ReactNode;
  className: string;
  baseState: BaseNumberField.Root.State;
  materialProps: NumberFieldOwnerState;
  externalForwardedProps: Pick<NumberFieldProps, 'slots' | 'slotProps'>;
}

const NumberFieldControls = styled(InputAdornment, {
  name: 'MuiNumberField',
  slot: 'controls',
})<{ ownerState: NumberFieldOwnerState }>({
  variants: [
    filledSplitEndAdornmentOffset,
    {
      props: ({ ownerState }: { ownerState: NumberFieldOwnerState }) =>
        ownerState.controlsPosition === 'stacked',
      style: {
        flexDirection: 'column',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        height: 'auto',
        maxHeight: 'none',
        // Let the input set the field height, then divide it between the two buttons.
        '& > *': {
          height: 0,
          minHeight: '50%',
          '& > svg': { maxHeight: '100%' },
        },
      },
    },
  ],
});

/**
 * @ignore - internal component.
 */
export default function NumberFieldControlsSlot(props: NumberFieldControlsSlotProps) {
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
