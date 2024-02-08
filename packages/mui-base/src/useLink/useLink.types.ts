import * as React from 'react';
import { MuiCancellableEventHandler } from '../utils/MuiCancellableEvent';

export interface UseLinkParameters {
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, allows a disabled link to receive focus.
   * @default false
   */
  focusableWhenDisabled?: boolean;
  href?: string;
  onFocusVisible?: React.FocusEventHandler;
  rootRef?: React.Ref<Element>;
  tabIndex?: NonNullable<React.HTMLAttributes<any>['tabIndex']>;
  to?: string;
  /**
   * The HTML element, e.g.'a', 'span' etc
   * @default ''
   */
  rootElementName?: keyof HTMLElementTagNameMap;
}

export interface UseLinkRootSlotOwnProps {
  'aria-disabled'?: React.AriaAttributes['aria-disabled'];
  disabled?: boolean;
  tabIndex?: number;
  role?: React.AriaRole;
  onKeyDown: MuiCancellableEventHandler<React.KeyboardEvent>;
  onKeyUp: MuiCancellableEventHandler<React.KeyboardEvent>;
  onMouseDown: React.MouseEventHandler;
  ref: React.RefCallback<Element> | null;
}

export type UseLinkRootSlotProps<ExternalProps = {}> = ExternalProps & UseLinkRootSlotOwnProps;

export interface UseLinkReturnValue {
  /**
   * Resolver for the root slot's props.
   * @param externalProps additional props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <ExternalProps extends Record<string, any> = {}>(
    externalProps?: ExternalProps,
  ) => UseLinkRootSlotProps<ExternalProps>;
  /**
   * If `true`, the component is active (pressed).
   */
  active: boolean;
  /**
   * A ref to the component's root DOM element.
   */
  rootRef: React.RefCallback<Element> | null;
}
