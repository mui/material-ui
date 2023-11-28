import * as React from 'react';
import { expectType } from '@mui/types';
import Tooltip, { TooltipOwnerState } from '@mui/joy/Tooltip';

<Tooltip title="title" open component="div">
  <div />
</Tooltip>;

<Tooltip title="title" open data-testid="any">
  <div />
</Tooltip>;

<Tooltip
  title="title"
  open
  slots={{
    root: 'div',
    arrow: 'div',
  }}
>
  <div />
</Tooltip>;

<Tooltip
  title="title"
  open
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
      open: false,
    },
    arrow: {
      component: 'div',
      'data-testid': 'test',
    },
  }}
>
  <div />
</Tooltip>;

<Tooltip
  title="title"
  open
  slotProps={{
    root: (ownerState) => {
      expectType<TooltipOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
        open: false,
      };
    },
    arrow: (ownerState) => {
      expectType<TooltipOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
>
  <div />
</Tooltip>;
