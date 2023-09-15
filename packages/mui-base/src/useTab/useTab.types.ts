import * as React from 'react';
import { UseButtonRootSlotProps } from '../useButton';
import { ListAction } from '../useList';

export interface UseTabParameters {
  /**
   * @ignore
   */
  dispatch: React.Dispatch<ListAction<string | number>>;
  /**
   * If `true`, the tab will be disabled.
   */
  disabled?: boolean;
  /**
   * @ignore
   */
  focusable: boolean;
  /**
   * The id of the tab.
   * If not provided, it will be automatically generated.
   */
  id?: string;
  /**
   * @ignore
   */
  highlighted: boolean;
  /**
   * If `true`, the tab will be disabled.
   */
  onChange?: (event: React.SyntheticEvent, value: number | string) => void;
  /**
   * Callback fired when the tab is clicked.
   */
  onClick?: React.MouseEventHandler;
  /**
   * Ref to the root slot's DOM element.
   */
  rootRef?: React.Ref<Element>;
  /**
   * @ignore
   */
  selected: boolean;
  /**
   * The value of the tab.
   * It's used to associate the tab with a tab panel(s) with the same value.
   * If the value is not provided, it falls back to the position index.
   */
  value?: number | string;
}

export type UseTabRootSlotProps<ExternalProps = {}> = UseButtonRootSlotProps<ExternalProps> & {
  'aria-controls': React.AriaAttributes['aria-controls'];
  'aria-selected': React.AriaAttributes['aria-selected'];
  id: string | undefined;
  ref: React.RefCallback<Element> | null;
  role: React.AriaRole;
};

export interface UseTabReturnValue {
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <ExternalProps extends Record<string, unknown> = {}>(
    externalProps?: ExternalProps,
  ) => UseTabRootSlotProps<ExternalProps>;
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
   * Ref to the root slot's DOM element.
   */
  rootRef: React.RefCallback<Element> | null;
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
