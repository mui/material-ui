import React from 'react';
import cx from 'classnames';
import MuiTabs from '@material-ui/core/Tabs';
import { TABS } from '../../theme/core';

const Tabs = ({ className, inverted, ...props }) => (
  <MuiTabs
    className={cx(TABS.root, className, inverted && TABS.inverted)}
    classes={{ indicator: TABS.indicator }}
    {...props}
  />
);

export default Tabs;
