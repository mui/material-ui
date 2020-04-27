import * as React from 'react';

export interface TabContextValue {
  panelPrefix: string;
  tabPrefix: string;
  value: unknown;
}

export interface TabContextProps {
  children?: React.ReactNode;
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this property to `false`.
   */
  value: unknown;
}
/**
 *
 * API:
 *
 * - [TabContext API](https://material-ui.com/api/tab-context/)
 */
export default function TabContext(props: TabContextProps): JSX.Element;
export function useTabContext(): TabContextValue | null;
