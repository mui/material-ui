import * as React from 'react';
import { UseButtonRootSlotProps } from '../useButton';

export interface UseTabParameters {
  /**
   * The value of the tab.
   * It's used to associate the tab with a tab panel(s) with the same value.
   * If the value is not provided, it falls back to the position index.
   */
  value?: number | string;
  /**
   * If `true`, the tab will be disabled.
   */
  onChange?: (event: React.SyntheticEvent, value: number | string) => void;
  /**
   * Callback fired when the tab is clicked.
   */
  onClick?: React.MouseEventHandler;
  /**
   * If `true`, the tab will be disabled.
   */
  disabled?: boolean;
  /**
   * The id of the tab.
   * If not provided, it will be automatically generated.
   */
  id?: string;
  /**
   * Ref to the DOM element associated with the tab.
   */
  ref?: React.Ref<any>;
}

export type UseTabRootSlotProps<TOther = {}> = UseButtonRootSlotProps<TOther> & {
  'aria-controls': React.AriaAttributes['aria-controls'];
  'aria-selected': React.AriaAttributes['aria-selected'];
  id: string | undefined;
  role: React.AriaRole;
};

export interface UseTabReturnValue {
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <TOther extends Record<string, any> = {}>(
    externalProps?: TOther,
  ) => UseTabRootSlotProps<TOther>;
  /**
   * If `true`, the tab is active (as in `:active` pseudo-class; in other words, pressed).
   */
  active: boolean;
  /**
   * If `true`, the tab has visible focus.
   * This is a workaround for browsers that do not support this feature natively.
   */
  focusVisible: boolean;
  /**
   * If `true`, the tab is highlighted.
   */
  highlighted: boolean;
  /**
   * 0-based index of the tab in the list of tabs.
   */
  index: number;
  /**
   * If `true`, the tab is selected.
   */
  selected: boolean;
  /**
   * Sets the focus-visible state of the tab.
   * This is a workaround for browsers that do not support this feature natively.
   */
  setFocusVisible: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Total number of tabs in the nearest parent TabsList.
   * This can be used to determine if the tab is the last one to style it accordingly.
   */
  totalTabsCount: number;
}
