import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { expectType } from '@mui/types';

<Snackbar
  slots={{
    root: 'dialog',
    content: 'span',
    clickAwayListener: 'div',
    transition: 'span',
  }}
/>;

<Snackbar
  slotProps={{
    root: {
      className: 'flex',
      sx: { color: 'red' },
    },
    content: {
      action: null,
      className: 'flex',
      sx: { color: 'red' },
    },
    clickAwayListener: {
      onClickAway(event) {
        expectType<MouseEvent | TouchEvent, typeof event>(event);
      },
    },
    transition: {
      timeout: 1000,
      onEnter(node, isAppearing) {
        expectType<HTMLElement, typeof node>(node);
        expectType<boolean, typeof isAppearing>(isAppearing);
      },
    },
  }}
/>;
