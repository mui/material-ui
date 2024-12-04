import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Popper from '@mui/material/Popper';

<Tooltip title="Hello">
  <button type="button">Hover or touch me</button>
</Tooltip>;

<Tooltip
  title="Hello"
  slots={{
    popper: Popper,
    arrow: 'span',
    tooltip: 'div',
    transition: 'div',
  }}
  slotProps={{
    popper: {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    },
    arrow: {
      'aria-hidden': true,
    },
    tooltip: {},
    transition: {
      timeout: 500,
    },
  }}
>
  <button type="button">Hover or touch me</button>
</Tooltip>;
