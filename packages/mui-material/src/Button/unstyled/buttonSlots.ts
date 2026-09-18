import * as React from 'react';

/**
 * Button's structural contract.
 *
 * Two things here are worth noticing, because Slider had neither.
 *
 * The root defaults to a plain `button`. Material's Button is built on
 * `ButtonBase`, which is itself a styled Material component, so the styling
 * layer injects it. Behaviour that lives in `ButtonBase`, the ripple and the
 * focus-visible tracking, therefore sits on the styled side today and would
 * have to be split as well for this to be complete.
 *
 *
 * There is no slot for the loading spacer. An icon slot with no icon in it is
 * the spacer, marked with the `loadingIconPlaceholder` class so the styling
 * layer can collapse the side it does not want.
 */
export interface ButtonSlotDefinition {
  elementType: React.ElementType;
  classes: readonly string[];
}

export interface ButtonSlotsDefinition {
  name: string;
  slots: Record<string, ButtonSlotDefinition>;
}

const buttonSlots = {
  name: 'MuiButton',
  slots: {
    root: { elementType: 'button', classes: ['root', 'disabled', 'focusVisible', 'loading'] },
    startIcon: { elementType: 'span', classes: ['icon', 'startIcon', 'loadingIconPlaceholder'] },
    endIcon: { elementType: 'span', classes: ['icon', 'endIcon', 'loadingIconPlaceholder'] },
    // Wraps whatever the `loadingIndicator` prop holds. When that prop is
    // absent the slot gets no children, and the styling layer's own component
    // supplies its default. That is how Material puts a `CircularProgress`
    // there without this layer importing one.
    loadingIndicator: { elementType: 'span', classes: ['loadingIndicator'] },
  },
} satisfies ButtonSlotsDefinition;

export default buttonSlots;
