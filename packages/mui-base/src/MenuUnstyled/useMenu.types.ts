import * as React from 'react';
import { UseListboxRootSlotProps } from '../ListboxUnstyled';

export interface MenuItemMetadata {
  id: string;
  disabled: boolean;
  ref: React.RefObject<HTMLElement>;
  label?: string;
}

export interface MenuItemState {
  disabled: boolean;
  highlighted: boolean;
}

export interface UseMenuParameters {
  open?: boolean;
  onClose?: () => void;
  listboxId?: string;
  listboxRef?: React.Ref<HTMLElement>;
}

interface UseMenuListboxSlotEventHandlers {
  onBlur: React.FocusEventHandler;
  onKeyDown: React.KeyboardEventHandler;
}

export type UseMenuListboxSlotProps<TOther = {}> = UseListboxRootSlotProps<
  Omit<TOther, keyof UseMenuListboxSlotEventHandlers> & UseMenuListboxSlotEventHandlers
> & { role: React.AriaRole };
