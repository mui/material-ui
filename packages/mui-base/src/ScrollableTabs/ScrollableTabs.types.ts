import * as React from 'react';
import { TabsOwnerState, TabsOwnProps } from '@mui/base';
import { Simplify } from '@mui/types';
import { TabsSlots } from '@mui/joy';
import { PolymorphicProps } from '../utils/PolymorphicComponent';

export interface ScrollableTabsOwnProps extends TabsOwnProps {
  fixed?: boolean;
  hideScrollbar?: boolean;
  scrollableX?: boolean;
  scrollableY?: boolean;
  visibleScrollbar?: boolean;
}

type TabsOrientation = 'horizontal' | 'vertical';

type TabsDirection = 'ltr' | 'rtl';

export interface ScrollableTabsTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'div',
> {
  props: ScrollableTabsOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type ScrollableTabsProps<
  RootComponentType extends React.ElementType = ScrollableTabsTypeMap['defaultComponent'],
> = PolymorphicProps<ScrollableTabsTypeMap<{}, RootComponentType>, RootComponentType>;

export type ScrollableTabsOwnerState = Simplify<
  ScrollableTabsOwnProps & {
    orientation: TabsOrientation;
    direction: TabsDirection;
  }
>;

export type TabsScrollerSlotProps = {
  ownerState: ScrollableTabsOwnerState;
  ref: React.Ref<any>;
  className?: string;
};
