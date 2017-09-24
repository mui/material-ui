import * as React from 'react';
import { StyledComponent } from '..';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  component?: React.ReactType;
  dense?: boolean;
  disablePadding?: boolean;
  rootRef?: React.Ref<any>;
  subheader?: React.ReactElement<any>;
}

declare const List: StyledComponent<ListProps>;

export default List;
