import * as React from 'react';
import { TabsTypeMap } from '@mui/material/Tabs';
import { DistributiveOmit } from '@mui/types';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';

interface TabListOwnProps extends DistributiveOmit<TabsTypeMap['props'], 'children' | 'value'> {
  /**
   * A list of `<Tab />` elements.
   */
  children?: React.ReactNode;
}

export interface TabListTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = TabsTypeMap['defaultComponent'],
> {
  props: AdditionalProps & TabListOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://next.mui.com/material-ui/react-tabs/)
 *
 * API:
 *
 * - [TabList API](https://next.mui.com/material-ui/api/tab-list/)
 * - inherits [Tabs API](https://next.mui.com/material-ui/api/tabs/)
 */
declare const TabList: OverridableComponent<TabListTypeMap>;

export type TabListClassKey = keyof NonNullable<TabListTypeMap['props']['classes']>;

export type TabListProps<
  RootComponent extends React.ElementType = TabListTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TabListTypeMap<AdditionalProps, RootComponent>, RootComponent>;

export default TabList;
