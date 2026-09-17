import * as React from 'react';

/**
 * ButtonBase's structural contract.
 *
 * The ripple is a slot with no default. This layer never learns what a ripple
 * is: it renders whatever is injected, and hands it a ref to the element it
 * sits inside so the slot can bind its own listeners. That is what keeps every
 * line of ripple code, and `TouchRipple`'s keyframes, on the styled side.
 */
export interface ButtonBaseSlotDefinition {
  elementType: React.ElementType | null;
  classes: readonly string[];
}

export interface ButtonBaseSlotsDefinition {
  name: string;
  slots: Record<string, ButtonBaseSlotDefinition>;
}

const buttonBaseSlots = {
  name: 'MuiButtonBase',
  slots: {
    root: { elementType: 'button', classes: ['root', 'disabled', 'focusVisible'] },
    ripple: { elementType: null, classes: [] },
  },
} satisfies ButtonBaseSlotsDefinition;

export default buttonBaseSlots;
