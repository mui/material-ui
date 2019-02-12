import React from 'react';
import clsx from 'clsx';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import { LIST_ITEM_ICON } from '../../theme/core';

const ListItemIcon = ({ className, children, subcategory, ...props }) => (
  <MuiListItemIcon
    className={clsx(LIST_ITEM_ICON.root, className, subcategory && LIST_ITEM_ICON.subcategory)}
    {...props}
  >
    {children}
  </MuiListItemIcon>
);

export default ListItemIcon;
