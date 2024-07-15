export const ListActionTypes = {
  blur: 'list:blur',
  focus: 'list:focus',
  itemClick: 'list:itemClick',
  itemHover: 'list:itemHover',
  itemsChange: 'list:itemsChange',
  keyDown: 'list:keyDown',
  resetHighlight: 'list:resetHighlight',
  highlightLast: 'list:highlightLast',
  textNavigation: 'list:textNavigation',
  clearSelection: 'list:clearSelection',
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
  key: string;
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

interface ResetHighlightAction {
  type: typeof ListActionTypes.resetHighlight;
  event: React.SyntheticEvent | null;
}

interface HighlightLastAction {
  type: typeof ListActionTypes.highlightLast;
  event: React.SyntheticEvent | null;
}

interface ClearSelectionAction {
  type: typeof ListActionTypes.clearSelection;
}

/**
 * A union of all standard actions that can be dispatched to the list reducer.
 */
export type ListAction<ItemValue> =
  | BlurAction
  | FocusAction
  | ItemClickAction<ItemValue>
  | ItemHoverAction<ItemValue>
  | ItemsChangeAction<ItemValue>
  | KeyDownAction
  | ResetHighlightAction
  | HighlightLastAction
  | TextNavigationAction
  | ClearSelectionAction;
