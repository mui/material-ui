import React from 'react';
import clsx from 'clsx';
import MuiTab from '@material-ui/core/Tab';
import { TAB } from '../../theme/core';

const Tab = ({ className, inverted, ...props }) => (
  <MuiTab
    className={clsx(TAB.root, className)}
    classes={{ label: TAB.label, selected: TAB.selected }}
    {...props}
  />
);

export default Tab;
