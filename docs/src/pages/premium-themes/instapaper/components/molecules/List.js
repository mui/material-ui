import React from 'react';
import cx from 'classnames';
import MuiList from '@material-ui/core/List';
import { LIST } from '../../theme/core';

const List = ({ className, ...props }) => (
  <MuiList className={cx(LIST.root, className)} {...props} />
);

export default List;
