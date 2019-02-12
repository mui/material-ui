import React from 'react';
import clsx from 'clsx';
import MuiTab from '@material-ui/core/Tab';
import { TAB } from '../../theme/core';

const Tab = ({ className, onlyIcon, inverted, ...props }) => (
  <MuiTab
    className={clsx(TAB.root, className, onlyIcon && TAB.onlyIcon)}
    classes={{
      label: TAB.label,
      wrapper: TAB.wrapper,
      selected: TAB.selected,
    }}
    {...props}
  />
);

export default Tab;
