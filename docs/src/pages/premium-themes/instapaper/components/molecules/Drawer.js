import React from 'react';
import cx from 'classnames';
import MuiDrawer from '@material-ui/core/Drawer';
import { DRAWER } from '../../theme/core';

const Drawer = ({
  className,
  header,
  headerLabel,
  subcategory,
  subcategoryText,
  subcategoryTextPrimary,
  subcategoryIcon,
  categoryText,
  categoryTextPrimary,
  ...props
}) => (
  <MuiDrawer
    className={cx(
      DRAWER.root,
      className,
      header && DRAWER.header,
      headerLabel && DRAWER.headerLabel,
      subcategory && DRAWER.subcategory,
      subcategoryText && DRAWER.subcategoryText,
      subcategoryTextPrimary && DRAWER.subcategoryTextPrimary,
      subcategoryIcon && DRAWER.subcategoryIcon,
      categoryText && DRAWER.categoryText,
      categoryTextPrimary && DRAWER.categoryTextPrimary,
    )}
    {...props}
  />
);

export default Drawer;
