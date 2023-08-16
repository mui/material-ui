import * as React from 'react';
import { DrawerProps } from './DrawerProps';

const DrawerOpenContext = React.createContext<undefined | DrawerProps['open']>(undefined);

export default DrawerOpenContext;
