import * as React from 'react';
import { DrawerContentProps } from './DrawerContentProps';

const DrawerContentVariantColorContext = React.createContext<
  undefined | Pick<DrawerContentProps, 'variant' | 'color'>
>(undefined);

export default DrawerContentVariantColorContext;
