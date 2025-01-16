import * as React from 'react';
import { expectType } from '@mui/types';
import Modal, { ModalOwnerState } from '@mui/joy/Modal';

<Modal open component="div">
  <div />
</Modal>;

<Modal open data-testid="any">
  <div />
</Modal>;

<Modal
  open
  slots={{
    root: 'div',
    backdrop: 'div',
  }}
>
  <div />
</Modal>;

<Modal
  open
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    backdrop: {
      component: 'div',
      'data-testid': 'test',
    },
  }}
>
  <div />
</Modal>;

<Modal
  open
  slotProps={{
    root: (ownerState) => {
      expectType<ModalOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    backdrop: (ownerState) => {
      expectType<ModalOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
>
  <div />
</Modal>;
