import React from 'react';
import clsx from 'clsx';
import MuiTabs from '@material-ui/core/Tabs';
import { TABS } from '../../theme/core';

const Tabs = ({ className, underline, inverted, ...props }) => (
  <MuiTabs
    className={clsx(TABS.root, className, inverted && TABS.inverted, underline && TABS.underline)}
    classes={{ indicator: TABS.indicator }}
    {...props}
  />
);

export default Tabs;
