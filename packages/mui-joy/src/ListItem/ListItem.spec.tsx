import * as React from 'react';
import { expectType } from '@mui/types';
import ListItem, { ListItemOwnerState } from '@mui/joy/ListItem';

<ListItem component="div" />;

<ListItem data-testid="any" />;

<ListItem
  slots={{
    root: 'div',
    startAction: 'div',
    endAction: 'div',
  }}
/>;

<ListItem
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    startAction: {
      component: 'div',
      'data-testid': 'test',
    },
    endAction: {
      component: 'div',
      'data-testid': 'test',
    },
  }}
/>;

<ListItem
  slotProps={{
    root: (ownerState) => {
      expectType<ListItemOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    startAction: (ownerState) => {
      expectType<ListItemOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    endAction: (ownerState) => {
      expectType<ListItemOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
