import * as React from 'react';

interface TabsContextValue {
  idPrefix: string | null;
  value: number;
  onSelected: (value: number) => void;
}
/**
 * @type {React.Context<{ idPrefix: string; value: string } | null>}
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

export function getPanelId(context: TabsContextValue, value: number) {
  const { idPrefix } = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-P-${value}`;
}

export function getTabId(context: TabsContextValue, value: number) {
  const { idPrefix } = context;
  if (idPrefix === null) {
    return null;
  }
  return `${context.idPrefix}-T-${value}`;
}

export default Context;
