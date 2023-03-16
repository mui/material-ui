enum ActionTypes {
  blur = 'blur',
  focus = 'focus',
  keyDown = 'keyDown',
  itemClick = 'itemClick',
  itemHover = 'itemHover',
  itemsChange = 'itemsChange',
  setValue = 'setValue',
  setHighlight = 'setHighlight',
  textNavigation = 'textNagivation',
}

// split declaration and export due to https://github.com/codesandbox/codesandbox-client/issues/6435
export { ActionTypes };

interface ItemClickAction<Value> {
  type: ActionTypes.itemClick;
  item: Value;
  event: React.MouseEvent;
}

interface ItemHoverAction<Value> {
  type: ActionTypes.itemHover;
  item: Value;
  event: React.MouseEvent;
}

interface FocusAction {
  type: ActionTypes.focus;
  event: React.FocusEvent;
}

interface BlurAction {
  type: ActionTypes.blur;
  event: React.FocusEvent;
}

interface KeyDownAction {
  type: ActionTypes.keyDown;
  event: React.KeyboardEvent;
}

interface SetValueAction<Value> {
  type: ActionTypes.setValue;
  event: null;
  values: Value[];
}

interface SetHighlightAction<Value> {
  type: ActionTypes.setHighlight;
  event: null;
  value: Value | null;
}

interface TextNavigationAction {
  type: ActionTypes.textNavigation;
  event: React.KeyboardEvent;
  searchString: string;
}

interface ItemsChangeAction<Value> {
  type: ActionTypes.itemsChange;
  event: null;
  items: Value[];
  previousItems: Value[];
}

export type ListAction<Value> =
  | ItemClickAction<Value>
  | ItemHoverAction<Value>
  | FocusAction
  | BlurAction
  | KeyDownAction
  | SetHighlightAction<Value>
  | TextNavigationAction
  | SetValueAction<Value>
  | ItemsChangeAction<Value>;
