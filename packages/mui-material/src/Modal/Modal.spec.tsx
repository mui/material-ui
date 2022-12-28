import * as React from 'react';
import Modal, { ModalProps } from '@mui/material/Modal';

const backdropProps: ModalProps['BackdropProps'] = {
  onEntered: () => console.log('entered'),
};

<Modal open BackdropProps={{ onEntered: () => console.log('entered') }}>
  <div />
</Modal>;

// componentsProps and slotProps slots as object
<Modal
  open
  slotProps={{ backdrop: { invisible: true }, root: { id: 'modal' } }}
  componentsProps={{
    backdrop: { transitionDuration: 300 },
    root: { onClick: () => 'Modal clicked' },
  }}
>
  <div />
</Modal>;

// componentsProps and slotProps slots as function
<Modal
  open
  slotProps={{
    root: ({ disableAutoFocus }) => ({ className: disableAutoFocus ? '' : 'focused' }),
    backdrop: ({ exited }) => ({ className: exited ? 'hidden' : '' }),
  }}
  componentsProps={{
    root: ({ exited }) => ({ className: exited ? 'hidden' : '' }),
    backdrop: ({ disableAutoFocus }) => ({ className: disableAutoFocus ? '' : 'modal-focused' }),
  }}
>
  <div />
</Modal>;
