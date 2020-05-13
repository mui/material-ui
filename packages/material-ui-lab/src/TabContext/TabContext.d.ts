import * as React from 'react';

export interface TabContextValue {
  idPrefix: string;
  value: string;
}

export interface TabContextProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The value of the currently selected `Tab`.
   */
  value: string;
}
/**
 *
 * API:
 *
 * - [TabContext API](https://material-ui.com/api/tab-context/)
 */
export default function TabContext(props: TabContextProps): JSX.Element;
export function useTabContext(): TabContextValue | null;
export function getPanelId(context: TabContextValue, tabValue: string): string;
export function getTabId(context: TabContextValue, tabValue: string): string;
