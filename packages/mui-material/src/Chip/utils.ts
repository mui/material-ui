import * as React from 'react';
import TouchRipple from '../ButtonBase/TouchRipple';
import type { TouchRippleActions, TouchRippleProps } from '../ButtonBase/TouchRipple';

// TouchRipple.d.ts declares ForwardRefRenderFunction instead of ForwardRefExoticComponent.
// Cast to the correct component type so it works as a JSX element.
export const TouchRippleComponent = TouchRipple as unknown as React.ForwardRefExoticComponent<
  React.RefAttributes<TouchRippleActions> & TouchRippleProps
>;

interface ControlledButtonProps {
  type?: string | undefined;
  role?: React.AriaRole | undefined;
  tabIndex?: number | undefined;
  disabled?: boolean | undefined;
  'aria-disabled'?: React.AriaAttributes['aria-disabled'] | undefined;
}

export function omitControlledButtonProps<T extends object>(
  props: T,
): Omit<T, keyof ControlledButtonProps> {
  const {
    type: ignoredType,
    role: ignoredRole,
    tabIndex: ignoredTabIndex,
    disabled: ignoredDisabled,
    'aria-disabled': ignoredAriaDisabled,
    ...otherProps
  } = props as T & ControlledButtonProps;

  void ignoredType;
  void ignoredRole;
  void ignoredTabIndex;
  void ignoredDisabled;
  void ignoredAriaDisabled;

  return otherProps;
}

export function isDeleteKeyboardEvent(event: React.KeyboardEvent) {
  return event.key === 'Backspace' || event.key === 'Delete';
}
