import * as React from 'react';
import { UseListboxRootSlotProps } from '../ListboxUnstyled';

export interface MenuItemMetadata {
  id: string;
  disabled: boolean;
  label?: string;
  ref: React.RefObject<HTMLElement>;
}

export interface MenuItemState {
  disabled: boolean;
  highlighted: boolean;
}

export interface UseMenuParameters {
  open?: boolean;
  onClose?: () => void;
  listboxId?: string;
  listboxRef?: React.Ref<any>;
}

interface UseMenuListboxSlotEventHandlers {
  onBlur: React.FocusEventHandler;
  onKeyDown: React.KeyboardEventHandler;
}

export type UseMenuListboxSlotProps<TOther = {}> = UseListboxRootSlotProps<
  Omit<TOther, keyof UseMenuListboxSlotEventHandlers> & UseMenuListboxSlotEventHandlers
> & {
  ref: React.Ref<any>;
  role: React.AriaRole;
};
