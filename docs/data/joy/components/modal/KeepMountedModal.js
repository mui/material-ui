import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalDialogTitle from '@mui/joy/ModalDialogTitle';
import ModalDialogDescription from '@mui/joy/ModalDialogDescription';

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal keepMounted open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalDialogTitle>Keep mounted modal</ModalDialogTitle>
          <ModalDialogDescription>
            This modal is still in the DOM event though it is closed.
          </ModalDialogDescription>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
