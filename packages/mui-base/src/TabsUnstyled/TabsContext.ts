import * as React from 'react';

export interface TabsContextValue {
  /**
   * Id used as a prefix for the current Tabs.
   */
  idPrefix: string | undefined;
  /**
   * The currently selected tab's value.
   */
  value: number | string | false;
  /**
   * Callback for setting new value.
   */
  onSelected: (event: React.SyntheticEvent, value: number | string | false) => void;
  /**
   * The component orientation (layout flow direction).
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The direction of the text.
   */
  direction?: 'ltr' | 'rtl';
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus?: boolean;
}

/**
 * @ignore - internal component.
 */
const Context = React.createContext<TabsContextValue | null>(null);

if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'TabsContext';
}

/**
 * @returns {unknown}
 */
export function useTabContext() {
  return React.useContext(Context);
}

export function getPanelId(context: TabsContextValue, value: number | string | false) {
  const { idPrefix } = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-P-${value}`;
}

export function getTabId(context: TabsContextValue, value: number | string | false) {
  const { idPrefix } = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-T-${value}`;
}

export default Context;
