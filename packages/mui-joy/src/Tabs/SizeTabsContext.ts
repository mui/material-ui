import * as React from 'react';
import type { TabsProps } from './TabsProps';

const SizeTabsContext = React.createContext<Exclude<TabsProps['size'], undefined>>('md');

if (process.env.NODE_ENV !== 'production') {
  SizeTabsContext.displayName = 'SizeTabsContext';
}

export default SizeTabsContext;
