import React from 'react';
import clsx from 'clsx';
import MuiDivider from '@material-ui/core/Divider';
import { DIVIDER } from '../../theme/core';

const Divider = ({ className, vertical, ...props }) => (
  <MuiDivider className={clsx(DIVIDER.root, className, vertical && DIVIDER.vertical)} {...props} />
);

export default Divider;
