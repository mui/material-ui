import * as React from 'react';
import SliderValueLabel from '../SliderValueLabel';

/**
 * The slot declaration: the unstyled component's structural contract.
 *
 * Per slot it records the default element and the stable class names that slot
 * can carry. It deliberately records no *conditions* — when each class applies
 * is logic and stays in `useUtilityClasses`, because conditions like
 * `ownerState.marked` are computed (`marks.some((mark) => mark.label)`) and no
 * declarative matcher expresses them.
 *
 * `@mui/material` reads this to generate a styled shell and an overridesResolver
 * per slot. It is the only thing it needs to know about the structure.
 *
 * Note what is absent: no `color`, no `size`. Those select an appearance rather
 * than describing state, so the vocabulary for them belongs to whichever
 * styling layer is in use, and reaches this component through `appearance`.
 */
export interface SliderSlotDefinition {
  /**
   * The element rendered when nothing is injected through `slots`.
   */
  elementType: React.ElementType;
  /**
   * Every stable class this slot can carry, without the `MuiSlider-` prefix.
   */
  classes: readonly string[];
}

export interface SliderSlotsDefinition {
  name: string;
  slots: Record<string, SliderSlotDefinition>;
}

const sliderSlots = {
  name: 'MuiSlider',
  slots: {
    root: {
      elementType: 'span',
      classes: [
        'root',
        'disabled',
        'dragging',
        'marked',
        'vertical',
        'trackInverted',
        'trackFalse',
      ],
    },
    rail: { elementType: 'span', classes: ['rail'] },
    track: { elementType: 'span', classes: ['track'] },
    thumb: { elementType: 'span', classes: ['thumb', 'disabled', 'active', 'focusVisible'] },
    mark: { elementType: 'span', classes: ['mark', 'markActive'] },
    markLabel: { elementType: 'span', classes: ['markLabel', 'markLabelActive'] },
    valueLabel: {
      elementType: SliderValueLabel,
      classes: ['valueLabel', 'valueLabelOpen', 'valueLabelCircle', 'valueLabelLabel'],
    },
    input: { elementType: 'input', classes: [] },
  },
} satisfies SliderSlotsDefinition;

export default sliderSlots;
