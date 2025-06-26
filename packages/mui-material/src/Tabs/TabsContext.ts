'use client';
import * as React from 'react';
import type { TabProps } from '@mui/material/Tab';
import type { TabsProps } from './Tabs';

interface TabsContextType {
  fullWidth?: boolean;
  indicator?: React.JSX.Element;
  mounted?: boolean;
  selectionFollowsFocus?: TabsProps['selectionFollowsFocus'];
  onChange?: TabsProps['onChange'];
  textColor?: TabsProps['textColor'];
  tabsValue?: TabsProps['value'];
  registerTab?: (tabValue: TabProps['value']) => {
    finalValue: TabProps['value'];
    assignedIndex: number;
  };
  unregisterTab?: (tabValue: TabProps['value']) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

if (process.env.NODE_ENV !== 'production') {
  TabsContext.displayName = 'TabsContext';
}

export default TabsContext;

export function useTabsContext() {
  const ctx = React.useContext(TabsContext);

  if (ctx === null) {
    throw new Error('Material UI: The Tab component must be used inside a Tabs component');
  }

  return ctx;
}
