import * as React from 'react';
import { createMount, describeConformanceV5 } from 'test/utils';
import ListItemAvatar from './ListItemAvatar';
import classes from './listItemAvatarClasses';

describe('<ListItemAvatar />', () => {
  const mount = createMount();

  describeConformanceV5(
    <ListItemAvatar>
      <div />
    </ListItemAvatar>,
    () => ({
      classes,
      inheritComponent: 'div',
      mount,
      muiName: 'MuiListItemAvatar',
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'componentsProp', 'themeVariants'],
    }),
  );
});
