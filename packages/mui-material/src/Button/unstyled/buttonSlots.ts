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
 * The same is true of `loadingIndicator`, whose Material default is a
 * `CircularProgress`. It is a slot here so the component does not have to
 * import one.
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
    startIcon: { elementType: 'span', classes: ['icon', 'startIcon'] },
    endIcon: { elementType: 'span', classes: ['icon', 'endIcon'] },
    loadingIndicator: { elementType: 'span', classes: ['loadingIndicator'] },
    // `buttonClasses` documents a `loadingIconPlaceholder` class, but
    // `useUtilityClasses` has never emitted it, so it does not reach the DOM.
    // Left as it is rather than fixed here, since this is a structural split.
    loadingIconPlaceholder: { elementType: 'span', classes: [] },
    // The spinner shown when no `loadingIndicator` is given. Material's is a
    // CircularProgress; this layer has no opinion and renders an empty span.
    loadingSpinner: { elementType: 'span', classes: [] },
  },
} satisfies ButtonSlotsDefinition;

export default buttonSlots;
