import * as React from 'react';
import { createMount, describeConformanceV5 } from 'test/utils';
import ListItemIcon from './ListItemIcon';
import classes from './listItemIconClasses';

describe('<ListItemIcon />', () => {
  const mount = createMount();

  describeConformanceV5(
    <ListItemIcon>
      <div />
    </ListItemIcon>,
    () => ({
      classes,
      inheritComponent: 'div',
      mount,
      muiName: 'MuiListItemIcon',
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'componentsProp', 'themeVariants'],
    }),
  );
});
