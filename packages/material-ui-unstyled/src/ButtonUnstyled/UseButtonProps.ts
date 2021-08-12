import * as React from 'react';

export default interface UseButtonProps {
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   * @default 'button'
   */
  component?: React.ElementType;
  /**
   * The components used for each slot inside the Button.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  href?: string;
  onFocusVisible?: React.FocusEventHandler;
  ref: React.Ref<any>;
  tabIndex?: NonNullable<React.HTMLAttributes<any>['tabIndex']>;
  to?: string;
  /**
   * Type attribute applied when the `component` is `button`.
   * @default 'button'
   */
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}
