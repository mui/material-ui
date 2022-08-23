import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalDialogTitle from '@mui/joy/ModalDialogTitle';
import ModalDialogDescription from '@mui/joy/ModalDialogDescription';

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function NestedModals({ random }) {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          layout="center"
          {...(random && {
            sx: {
              top: `${randomBetween(25, 75)}%`,
              left: `${randomBetween(25, 75)}%`,
            },
          })}
        >
          <ModalDialogTitle>Infinite modals</ModalDialogTitle>
          <ModalDialogDescription sx={{ mb: 1 }}>
            Welcome to the infinite nested modals.
          </ModalDialogDescription>
          <NestedModals random />
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
