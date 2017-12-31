import * as React from 'react';
import { StandardProps } from '..';

export interface ListProps
  extends StandardProps<React.HTMLAttributes<HTMLUListElement>, ListClassKey> {
  component?: React.ReactType<ListProps>;
  dense?: boolean;
  disablePadding?: boolean;
  rootRef?: React.Ref<any>;
  subheader?: React.ReactElement<any>;
}

export type ListClassKey = 'root' | 'padding' | 'dense' | 'subheader';

declare const List: React.ComponentType<ListProps>;

export default List;
