import React from 'react';
import clsx from 'clsx';
import MuiTab from '@material-ui/core/Tab';
import { TAB } from '../../theme/core';

const Tab = ({ className, onlyIcon, ...props }) => (
  <MuiTab className={clsx(TAB.root, className, onlyIcon && TAB.onlyIcon)} {...props} />
);

export default Tab;
