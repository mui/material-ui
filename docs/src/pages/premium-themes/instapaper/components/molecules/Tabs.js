import React from 'react';
import clsx from 'clsx';
import MuiTabs from '@material-ui/core/Tabs';
import { TABS } from '../../theme/core';

const Tabs = ({ className, inverted, ...props }) => (
  <MuiTabs
    className={clsx(TABS.root, className, inverted && TABS.inverted)}
    classes={{ indicator: TABS.indicator }}
    {...props}
  />
);

export default Tabs;
