import React from 'react';
import cx from 'classnames';
import MuiToolbar from '@material-ui/core/Toolbar';
import { TOOLBAR } from '../../theme/core';

const Toolbar = ({ className, narrow, ...props }) => (
  <MuiToolbar className={cx(TOOLBAR.root, className, narrow && TOOLBAR.narrow)} {...props} />
);

export default Toolbar;
