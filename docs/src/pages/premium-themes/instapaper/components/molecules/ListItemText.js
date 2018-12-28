import React from 'react';
import cx from 'classnames';
import MuiListItemText from '@material-ui/core/ListItemText';
import { LIST_ITEM_TEXT } from '../../theme/core';

const ListItemText = ({ className, category, subcategory, subcategoryPrimary, ...props }) => (
  <MuiListItemText
    className={cx(
      LIST_ITEM_TEXT.root,
      className,
      category && LIST_ITEM_TEXT.category,
      subcategory && LIST_ITEM_TEXT.subcategory,
      subcategoryPrimary && LIST_ITEM_TEXT.subcategoryPrimary,
    )}
    classes={{
      primary: LIST_ITEM_TEXT.primary,
    }}
    {...props}
  />
);

export default ListItemText;
