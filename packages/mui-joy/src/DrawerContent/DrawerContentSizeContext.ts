import * as React from 'react';
import { DrawerContentProps } from './DrawerContentProps';

const DrawerContentSizeContext = React.createContext<undefined | DrawerContentProps['size']>(undefined);

export default DrawerContentSizeContext;
