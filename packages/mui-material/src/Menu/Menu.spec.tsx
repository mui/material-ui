import * as React from 'react';
import Menu from '@mui/material/Menu';

<Menu
  open
  slotProps={{
    root: {
      // passed to Modal
      disablePortal: true,
    },
    paper: {
      // passed to Paper
      elevation: 0,
    },
    list: {
      // passed to MenuList
      disablePadding: true,
    },
    transition: {
      // passed to Transition
      timeout: 200,
    },
  }}
/>;
