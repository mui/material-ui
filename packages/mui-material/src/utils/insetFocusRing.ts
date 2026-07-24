import { focusVisibleOffsetVar, focusVisibleBehaviorVar } from '../styles/focusVisibleVars';

// Private-var contract read by the curated `theme.focusVisible` ring. A clip-prone component
// (one rendered inside a MUI-owned `overflow: hidden`, e.g. Tab, MenuItem) spreads this on its
// root so the ring insets instead of being clipped, without the component knowing the ring width:
// `--_focusVisible-offset` flips the outline-offset sign (1 outset default → -1 inset);
// `--_focusVisible-behavior` makes a user-provided box-shadow inset. One knob per technique, so
// the ring adapts whether the active indicator is the default outline or a customized box-shadow.
const insetFocusRing = {
  [focusVisibleOffsetVar]: -1,
  [focusVisibleBehaviorVar]: 'inset',
};

export default insetFocusRing;
