import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    dense?: boolean;
    disablePadding?: boolean;
    subheader?: React.ReactElement;
  };
  defaultComponent: D;
  classKey: ListClassKey;
}

declare const List: OverridableComponent<ListTypeMap>;

export type ListClassKey = 'root' | 'padding' | 'dense' | 'subheader';

export type ListProps<
  D extends React.ElementType = ListTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ListTypeMap<P, D>, D>;

export default List;
