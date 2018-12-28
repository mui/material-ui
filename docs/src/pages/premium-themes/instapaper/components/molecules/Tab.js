import React from 'react';
import cx from 'classnames';
import MuiTab from '@material-ui/core/Tab';
import { TAB } from '../../theme/core';

const Tab = ({ className, inverted, ...props }) => (
  <MuiTab
    className={cx(TAB.root, className)}
    classes={{ label: TAB.label, selected: TAB.selected }}
    {...props}
  />
);

export default Tab;
