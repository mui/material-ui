import * as React from 'react';
import { TabsProps } from './TabsProps';

const SizeTabsContext = React.createContext<Exclude<TabsProps['size'], undefined>>('md');

export default SizeTabsContext;
