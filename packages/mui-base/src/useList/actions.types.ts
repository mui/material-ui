import { SetStateAction, setStateActionType } from '../utils/useControllableReducer.types';
import type { ListState } from './useList.types';

export const ActionTypes = {
  blur: 'blur',
  focus: 'focus',
  keyDown: 'keyDown',
  itemClick: 'itemClick',
  itemHover: 'itemHover',
  itemsChange: 'itemsChange',
  setState: setStateActionType,
  textNavigation: 'textNavigation',
} as const;

interface ItemClickAction<Value> {
  type: typeof ActionTypes.itemClick;
  item: Value;
  event: React.MouseEvent;
}

interface ItemHoverAction<Value> {
  type: typeof ActionTypes.itemHover;
  item: Value;
  event: React.MouseEvent;
}

interface FocusAction {
  type: typeof ActionTypes.focus;
  event: React.FocusEvent;
}

interface BlurAction {
  type: typeof ActionTypes.blur;
  event: React.FocusEvent;
}

interface KeyDownAction {
  type: typeof ActionTypes.keyDown;
  event: React.KeyboardEvent;
}

interface TextNavigationAction {
  type: typeof ActionTypes.textNavigation;
  event: React.KeyboardEvent;
  searchString: string;
}

interface ItemsChangeAction<Value> {
  type: typeof ActionTypes.itemsChange;
  event: null;
  items: Value[];
  previousItems: Value[];
}

export type ListAction<Value, State extends ListState<Value>> =
  | BlurAction
  | FocusAction
  | ItemClickAction<Value>
  | ItemHoverAction<Value>
  | ItemsChangeAction<Value>
  | KeyDownAction
  | SetStateAction<State>
  | TextNavigationAction;
