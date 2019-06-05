import React from 'react';
import clsx from 'clsx';
import MuiToolbar from '@material-ui/core/Toolbar';
import { TOOLBAR } from '../../theme/core';

const Toolbar = ({ className, narrow, ...props }) => (
  <MuiToolbar className={clsx(TOOLBAR.root, className, narrow && TOOLBAR.narrow)} {...props} />
);

export default Toolbar;
