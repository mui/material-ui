import * as React from 'react';
import { createRenderer, describeConformance } from '@mui-internal/test-utilities';
import ListItemAvatar, { listItemAvatarClasses as classes } from '@mui/material/ListItemAvatar';

describe('<ListItemAvatar />', () => {
  const { render } = createRenderer();

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
