import * as React from 'react';
import { UseButtonRootSlotProps } from '../useButton';

export interface UseTabParameters {
  /**
   * You can provide your own value. Otherwise, it falls back to the child position index.
   */
  value?: number | string;
  /**
   * Callback invoked when new value is being set.
   */
  onChange?: (event: React.SyntheticEvent, value: number | string) => void;
  onClick?: React.MouseEventHandler;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  onFocus?: React.FocusEventHandler;
  ref: React.Ref<any>;
}

interface UseTabRootSlotEventHandlers {
  onClick?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
}

export type UseTabRootSlotProps<TOther = {}> = UseButtonRootSlotProps<
  UseTabRootSlotEventHandlers & TOther
> & {
  'aria-controls': React.AriaAttributes['aria-controls'];
  'aria-selected': React.AriaAttributes['aria-selected'];
  disabled: boolean;
  id: string | undefined;
  role: React.AriaRole;
};

export interface UseTabReturnValue {
  /**
   * If `true`, the tab will be selected.
   */
  selected: boolean;
  /**
   * If `true`, the tab's focus will be visible.
   */
  focusVisible: boolean;
  /**
   * Callback for setting the `focusVisible` param.
   */
  setFocusVisible: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * If `true`, the component will be disabled.
   * @default false
   */
  disabled: boolean;
  /**
   * If `true`, the component will be active.
   * @default false
   */
  active: boolean;
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <TOther extends Record<string, any> = {}>(
    externalProps?: TOther,
  ) => UseTabRootSlotProps<TOther>;
}
