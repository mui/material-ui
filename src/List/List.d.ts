import * as React from 'react';
import { StyledComponent } from '..';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  component?: React.ReactType;
  dense?: boolean;
  disablePadding?: boolean;
  rootRef?: React.Ref<any>;
  subheader?: React.ReactElement<any>;
}

export type ListClassKey =
  | 'root'
  | 'padding'
  | 'dense'
  | 'subheader'
  ;

declare const List: StyledComponent<ListProps, ListClassKey>;

export default List;
