import * as React from 'react';
import { DrawerProps } from './DrawerProps';

const DrawerAnchorContext = React.createContext<undefined | DrawerProps['anchor']>(undefined);

export default DrawerAnchorContext;
