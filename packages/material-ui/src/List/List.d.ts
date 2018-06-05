import * as React from 'react';
import { StandardProps } from '..';

export interface ListProps<C>
  extends StandardProps<React.HTMLAttributes<HTMLUListElement>, ListClassKey> {
  component?: React.ReactType<C>;
  dense?: boolean;
  disablePadding?: boolean;
  subheader?: React.ReactElement<any>;
}

export type ListClassKey = 'root' | 'padding' | 'dense' | 'subheader';

declare class List<C> extends React.Component<C & ListProps<C>> {}

export default List;
