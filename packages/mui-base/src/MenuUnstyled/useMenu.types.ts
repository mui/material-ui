import * as React from 'react';
import { UseListboxRootSlotProps, UseListboxOptionSlotProps } from '../ListboxUnstyled';
import { EventHandlers } from '../utils';

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

export interface UseMenuReturnValue {
  registerItem: (id: string, metadata: MenuItemMetadata) => void;
  unregisterItem: (id: string) => void;
  menuItems: Record<string, MenuItemMetadata>;
  getListboxProps: <TOther extends EventHandlers>(
    otherHandlers?: TOther,
  ) => UseMenuListboxSlotProps;
  getItemState: (id: string) => MenuItemState;
  getItemProps: <TOther extends EventHandlers = {}>(
    option: string,
    otherHandlers?: TOther,
  ) => UseListboxOptionSlotProps<TOther>;
  highlightedOption: string | null;
  highlightFirstItem: () => void;
  highlightLastItem: () => void;
}
