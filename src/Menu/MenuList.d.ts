import * as React from 'react';
import { StyledComponent } from '..';
import { ListProps } from '../List';

export type MenuListProps = {
  onKeyDown?: React.ReactEventHandler<React.KeyboardEvent<any>>;
} & ListProps;

export default class MenuList extends StyledComponent<MenuListProps> {}
