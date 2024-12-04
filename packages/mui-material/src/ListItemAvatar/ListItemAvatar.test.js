import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import ListItemAvatar, { listItemAvatarClasses as classes } from '@mui/material/ListItemAvatar';
import describeConformance from '../../test/describeConformance';

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
