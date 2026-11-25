import * as React from 'react';
import type { NumberField as BaseNumberField } from '@base-ui/react/number-field';

import InputAdornment, { inputAdornmentClasses } from '../InputAdornment';
import type { InputAdornmentProps } from '../InputAdornment';
import { styled } from '../zero-styled';
import useSlot from '../utils/useSlot';
import type { NumberFieldOwnerState, NumberFieldProps } from './NumberField.types';
import RenderElement from './RenderElement';

interface NumberFieldAdornmentProps {
  slotName: 'controls' | 'scrubAreaAdornment';
  position: InputAdornmentProps['position'];
  children: React.ReactNode;
  className: string;
  baseState: BaseNumberField.Root.State;
  materialProps: NumberFieldOwnerState;
  externalForwardedProps: Pick<NumberFieldProps, 'slots' | 'slotProps'>;
}

// Filled start adornments have a top offset. Match it on both end adornments in split mode.
const splitEndAdornment = {
  props: { controlsPosition: 'split', position: 'end' },
  style: {
    [`&:where(.${inputAdornmentClasses.filled}:not(.${inputAdornmentClasses.hiddenLabel}))`]: {
      marginTop: 16,
    },
  },
} as const;

const NumberFieldControls = styled(InputAdornment, {
  name: 'MuiNumberField',
  slot: 'controls',
})<{ ownerState: NumberFieldOwnerState }>({
  variants: [
    splitEndAdornment,
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

const NumberFieldScrubAreaAdornment = styled(InputAdornment, {
  name: 'MuiNumberField',
  slot: 'scrubAreaAdornment',
})<{ ownerState: NumberFieldOwnerState }>({ variants: [splitEndAdornment] });

/**
 * Shared InputAdornment adapter for the controls and scrub area adornment slots.
 * Both use the same prop, ref, position and render handling, with separate styled roots.
 *
 * @ignore - internal component.
 */
function NumberFieldAdornmentSlot(props: NumberFieldAdornmentProps) {
  const {
    slotName,
    position,
    children,
    className,
    baseState,
    materialProps,
    externalForwardedProps,
  } = props;
  const ownerState = { ...materialProps, position };
  const [AdornmentSlot, adornmentSlotProps] = useSlot(slotName, {
    elementType: slotName === 'controls' ? NumberFieldControls : NumberFieldScrubAreaAdornment,
    externalForwardedProps,
    ownerState,
    className,
    additionalProps: { position },
  });
  const { render, ...adornmentProps } = adornmentSlotProps;

  return (
    <AdornmentSlot
      {...adornmentProps}
      position={position}
      {...(render &&
        !externalForwardedProps.slots?.[slotName] && {
          component: RenderElement,
          render,
          renderState: baseState,
        })}
    >
      {children}
    </AdornmentSlot>
  );
}

export default NumberFieldAdornmentSlot;
