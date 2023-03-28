import { SetStateAction, setStateActionType } from '../utils/useControllableReducer.types';
import type { ListState } from './useList.types';

export const ListActionTypes = {
  blur: 'list:blur',
  focus: 'list:focus',
  keyDown: 'list:keyDown',
  itemClick: 'list:itemClick',
  itemHover: 'list:itemHover',
  itemsChange: 'list:itemsChange',
  setState: setStateActionType,
  textNavigation: 'list:textNavigation',
} as const;

interface ItemClickAction<ItemValue> {
  type: typeof ListActionTypes.itemClick;
  item: ItemValue;
  event: React.MouseEvent;
}

interface ItemHoverAction<ItemValue> {
  type: typeof ListActionTypes.itemHover;
  item: ItemValue;
  event: React.MouseEvent;
}

interface FocusAction {
  type: typeof ListActionTypes.focus;
  event: React.FocusEvent;
}

interface BlurAction {
  type: typeof ListActionTypes.blur;
  event: React.FocusEvent;
}

interface KeyDownAction {
  type: typeof ListActionTypes.keyDown;
  event: React.KeyboardEvent;
}

interface TextNavigationAction {
  type: typeof ListActionTypes.textNavigation;
  event: React.KeyboardEvent;
  searchString: string;
}

interface ItemsChangeAction<ItemValue> {
  type: typeof ListActionTypes.itemsChange;
  event: null;
  items: ItemValue[];
  previousItems: ItemValue[];
}

export type ListAction<ItemValue, State extends ListState<ItemValue>> =
  | BlurAction
  | FocusAction
  | ItemClickAction<ItemValue>
  | ItemHoverAction<ItemValue>
  | ItemsChangeAction<ItemValue>
  | KeyDownAction
  | SetStateAction<State>
  | TextNavigationAction;
