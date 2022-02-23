import * as React from 'react';

export interface MenuItemMetadata {
  id: string;
  disabled: boolean;
  ref: React.RefObject<HTMLElement>;
}

export interface MenuItemState {
  disabled: boolean;
}

export interface UseMenuParameters {
  listboxRef?: React.Ref<HTMLElement>;
}
