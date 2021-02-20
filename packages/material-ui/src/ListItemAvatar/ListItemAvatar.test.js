import * as React from 'react';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import ListItemAvatar from './ListItemAvatar';
import classes from './listItemAvatarClasses';

describe('<ListItemAvatar />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(
    <ListItemAvatar>
      <div />
    </ListItemAvatar>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      mount,
      muiName: 'MuiListItemAvatar',
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'componentsProp', 'themeVariants'],
    }),
  );
});
