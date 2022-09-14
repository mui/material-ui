import React from 'react';
import { UseButtonRootSlotProps } from '@mui/base/useButton';

export interface UseTabParameters {
  /**
   * You can provide your own value. Otherwise, we fall back to the child position index.
   */
  value?: number | string;
  /**
   * Callback invoked when new value is being set.
   */
  onChange?: (event: React.SyntheticEvent, value: number | string) => void;
  onClick?: React.MouseEventHandler;
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
