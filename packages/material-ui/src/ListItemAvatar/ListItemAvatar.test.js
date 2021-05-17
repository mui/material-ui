import * as React from 'react';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import ListItemAvatar, { listItemAvatarClasses as classes } from '@material-ui/core/ListItemAvatar';

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
