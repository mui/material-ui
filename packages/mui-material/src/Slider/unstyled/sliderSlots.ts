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
  /**
   * Class-name prefixes generated from an open-ended value, such as a palette
   * colour the theme adds. These cannot be enumerated ahead of time.
   */
  dynamicPrefixes: readonly string[];
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
        'sizeSmall',
        // `useUtilityClasses` emits `sizeMedium` too, but `sliderClasses` does
        // not list it, so it is absent from the public class object today.
        'sizeMedium',
        'colorPrimary',
        'colorSecondary',
        'colorError',
        'colorInfo',
        'colorSuccess',
        'colorWarning',
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
  dynamicPrefixes: ['color'],
} satisfies SliderSlotsDefinition;

export default sliderSlots;
