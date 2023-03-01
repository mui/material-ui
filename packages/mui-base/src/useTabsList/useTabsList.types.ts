import * as React from 'react';
import { OptionState, UseListboxOptionSlotProps } from '../useListbox';
import { EventHandlers } from '../utils';
import { TabsListProviderValue } from './TabsListProvider';

export interface TabsListContextValue {
  getTabProps: <TOther extends EventHandlers = {}>(
    tabValue: string | number,
    otherHandlers?: TOther,
  ) => UseListboxOptionSlotProps;
  getTabState: (tabValue: string | number) => OptionState;
}

export interface UseTabsListParameters {
  ref: React.Ref<unknown>;
  value?: string | number | null;
  defaultValue?: string | number | null;
  onChange?: (event: React.SyntheticEvent | null, value: string | number | null) => void;
  orientation?: 'horizontal' | 'vertical';
  direction?: 'ltr' | 'rtl';
}

export type UseTabsListRootSlotProps<TOther = {}> = TOther & {
  'aria-label'?: React.AriaAttributes['aria-label'];
  'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
  'aria-orientation'?: React.AriaAttributes['aria-orientation'];
  role: React.AriaRole;
  ref: React.Ref<any>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
};

export interface UseTabsListReturnValue {
  /**
   * The value of the currently highlighted `Tab`.
   */
  highlightedValue: string | number | null;
  /**
   * If `true`, it will indicate that the text's direction in right-to-left.
   * @default false
   */
  isRtl: boolean;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: 'horizontal' | 'vertical';
  /**
   * The value of the currently selected `Tab`.
   */
  selectedValue: string | number | null;
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <TOther extends Record<string, any> = {}>(
    externalProps?: TOther,
  ) => UseTabsListRootSlotProps<TOther>;
  /**
   * The value to be passed to the TabListProvider above all the tabs.
   */
  contextValue: TabsListProviderValue;
}
