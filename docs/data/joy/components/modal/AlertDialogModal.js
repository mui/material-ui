import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalDialogTitle from '@mui/joy/ModalDialogTitle';
import ModalDialogDescription from '@mui/joy/ModalDialogDescription';
import DeleteForever from '@mui/icons-material/DeleteForever';

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="danger"
        endIcon={<DeleteForever />}
        onClick={() => setOpen(true)}
      >
        Discard
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="solid" color="danger" role="alertdialog">
          <ModalDialogTitle>⚠️ Confirmation</ModalDialogTitle>
          <ModalDialogDescription sx={{ mb: 3 }}>
            Are you sure you want to discard all of your notes?
          </ModalDialogDescription>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
              No
            </Button>
            <Button variant="soft" color="danger" onClick={() => setOpen(false)}>
              Yes
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
