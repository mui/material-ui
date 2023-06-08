import * as React from 'react';
import { ScrollableTabsProps } from './ScrollableTabsProps';

const SizeTabsContext = React.createContext<Exclude<ScrollableTabsProps['size'], undefined>>('md');

export default SizeTabsContext;
