import * as React from 'react';
import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

declare const List: OverridableComponent<{
  props: {
    dense?: boolean;
    disablePadding?: boolean;
    subheader?: React.ReactElement;
  };
  defaultComponent: 'ul';
  classKey: ListClassKey;
}>;

export type ListClassKey = 'root' | 'padding' | 'dense' | 'subheader';

export type ListProps = SimplifiedPropsOf<typeof List>;

export default List;
