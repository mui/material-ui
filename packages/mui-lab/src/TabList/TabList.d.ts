import * as React from 'react';
import { TabsTypeMap } from '@mui/material/Tabs';
import { DistributiveOmit } from '@mui/types';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';

export interface TabListTypeMap<
  P = {},
  D extends React.ElementType = TabsTypeMap['defaultComponent'],
> {
  props: P & {
    /**
     * A list of `<Tab />` elements.
     */
    children?: React.ReactNode;
  } & DistributiveOmit<TabsTypeMap['props'], 'children' | 'value'>;
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/components/tabs/)
 *
 * API:
 *
 * - [TabList API](https://mui.com/api/tab-list/)
 * - inherits [Tabs API](https://mui.com/api/tabs/)
 */
declare const TabList: OverridableComponent<TabListTypeMap>;

export type TabListClassKey = keyof NonNullable<TabListTypeMap['props']['classes']>;

export type TabListProps<
  D extends React.ElementType = TabListTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TabListTypeMap<P, D>, D>;

export default TabList;
