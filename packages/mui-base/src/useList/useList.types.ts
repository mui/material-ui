import * as React from 'react';
import { ActionTypes, ListAction } from './actions.types';

type UseListStrictParametersRequiredKeys =
  | 'isItemDisabled'
  | 'disableListWrap'
  | 'disabledItemsFocusable'
  | 'itemComparer'
  | 'orientation'
  | 'itemStringifier'
  | 'selectionLimit';

export type UseListParametersWithDefaults<ItemValue> = Omit<
  UseListParameters<ItemValue>,
  UseListStrictParametersRequiredKeys
> &
  Required<Pick<UseListParameters<ItemValue>, UseListStrictParametersRequiredKeys>>;

export type FocusManagementType = 'DOM' | 'activeDescendant';

export type ListReducerAction<T> = ListAction<T> & {
  props: UseListParametersWithDefaults<T>;
};

export interface ListState<ItemValue> {
  highlightedValue: ItemValue | null;
  selectedValues: ItemValue[];
}

export type ListReducer<ItemValue> = (
  state: ListState<ItemValue>,
  action: ListReducerAction<ItemValue>,
) => ListState<ItemValue>;

export interface UseListParameters<ItemValue> {
  /**
   * The default selected value. Use when the list component is not controlled.
   */
  defaultValue?: ItemValue[];
  /**
   * If `true`, it will be possible to highlight disabled items.
   * @default false
   */
  disabledItemsFocusable?: boolean;
  /**
   * If `true`, the highlight will not wrap around the list if arrow keys are used.
   * @default false
   */
  disableListWrap?: boolean;
  focusManagement?: FocusManagementType;
  /**
   * A function that returns the DOM element associated with an item.
   * This is required to set focus when using the `DOM` focus management.
   *
   * @param item List item to get the DOM element for.
   */
  getItemDomElement?: (itemValue: ItemValue) => HTMLElement | null;
  /**
   * A function that returns the id of an item.
   * This is required to set `aria-activedescendant` and is required when using the `activeDescendant` focus management.
   *
   * @param itemValue List item to get the id for.
   */
  getItemId?: (itemValue: ItemValue) => string | undefined;
  /**
   * A function that determines if a particular item is disabled.
   * @default () => false
   */
  isItemDisabled?: (itemValue: ItemValue, index: number) => boolean;
  /**
   * Ref of the list root DOM element.
   */
  listRef?: React.Ref<any>;
  /**
   * Callback fired when the selected value changes.
   */
  onChange?: (
    e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    values: ItemValue[],
    reason: ActionTypes,
  ) => void;
  /**
   * Callback fired when the highlighted item changes.
   * The `value` is null if there is no highlighted item.
   */
  onHighlightChange?: (
    e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: ItemValue | null,
    reason: ActionTypes,
  ) => void;
  /**
   * A function that tests equality between two items' values.
   * @default (a, b) => a === b
   */
  itemComparer?: (itemValue1: ItemValue, itemValue2: ItemValue) => boolean;
  /**
   * A function that generates the id attribute of individual options.
   */
  itemIdGenerator?: (value: ItemValue, index: number) => string;
  /**
   * A function that converts an object to its string representation
   * @default (o) => o
   */
  itemStringifier?: (option: ItemValue) => string | undefined;
  /**
   * Array of list items.
   */
  items: ItemValue[];
  /**
   * Orientation of the items in the list.
   * Determines the actions that are performed when arrow keys are pressed.
   */
  orientation?: 'horizontal-ltr' | 'horizontal-rtl' | 'vertical';
  /**
   * Maximum number of items that can be selected at once.
   * Set to `null` to disable the limit.
   *
   * @default null
   */
  selectionLimit?: number | null;
  /**
   * Custom state reducer function. It calculates the new state (highlighted and selected items)
   * based on the previous one and the performed action.
   */
  stateReducer?: ListReducer<ItemValue>;
  /**
   * The selected value. Use when the list component is controlled.
   */
  value?: ItemValue[];
}

export interface ListItemState {
  disabled: boolean;
  /**
   * Determines if the item is focusable.
   * If `undefined`, focusing doesn't apply as focusManagement is set to 'activeDescendant'.
   */
  focusable: boolean | undefined;
  highlighted: boolean;
  index: number;
  selected: boolean;
}

interface UseListRootSlotOwnProps {
  'aria-activedescendant'?: React.AriaAttributes['aria-activedescendant'];
  id?: string;
  onBlur: React.FocusEventHandler;
  onKeyDown: React.KeyboardEventHandler;
  tabIndex: number;
  ref: React.Ref<any>;
}

export type UseListRootSlotProps<TOther = {}> = TOther & UseListRootSlotOwnProps;
