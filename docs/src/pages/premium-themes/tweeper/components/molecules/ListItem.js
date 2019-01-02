import React from 'react';
import cx from 'classnames';
import MuiListItem from '@material-ui/core/ListItem';
import { LIST_ITEM } from '../../theme/core';

const ListItem = ({
  className,
  header,
  headerLabel,
  headerActionable,
  category,
  subcategory,
  active,
  ...props
}) => (
  <MuiListItem
    className={cx(
      LIST_ITEM.root,
      className,
      header && LIST_ITEM.header,
      headerLabel && LIST_ITEM.headerLabel,
      headerActionable && LIST_ITEM.headerActionable,
      subcategory && LIST_ITEM.subcategory,
      category && LIST_ITEM.category,
      active && LIST_ITEM.active,
    )}
    {...props}
  />
);

export default ListItem;
