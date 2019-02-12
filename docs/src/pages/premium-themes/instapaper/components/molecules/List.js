import React from 'react';
import clsx from 'clsx';
import MuiList from '@material-ui/core/List';
import { LIST } from '../../theme/core';

const List = ({ className, ...props }) => (
  <MuiList className={clsx(LIST.root, className)} {...props} />
);

export default List;
