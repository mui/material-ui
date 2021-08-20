import * as React from 'react';
import { createClientRender, describeConformance } from 'test/utils';
import ListItemAvatar, { listItemAvatarClasses as classes } from '@material-ui/core/ListItemAvatar';

describe('<ListItemAvatar />', () => {
  const render = createClientRender();

  describeConformance(
    <ListItemAvatar>
      <div />
    </ListItemAvatar>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiListItemAvatar',
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'componentsProp', 'themeVariants'],
    }),
  );
});
