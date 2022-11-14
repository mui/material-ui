import * as React from 'react';
import Modal, { ModalProps } from '@mui/material/Modal';

const backdropProps: ModalProps['BackdropProps'] = {
  onEntered: () => console.log('entered'),
};

<Modal open BackdropProps={{ onEntered: () => console.log('entered') }}>
  <div />
</Modal>;

<Modal
  open
  slotProps={{ backdrop: { invisible: true } }}
  componentsProps={{ backdrop: { transitionDuration: 300 } }}
>
  <div />
</Modal>;
