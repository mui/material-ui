import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalDialogTitle from '@mui/joy/ModalDialogTitle';
import ModalDialogDescription from '@mui/joy/ModalDialogDescription';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Typography from '@mui/joy/Typography';

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
        <ModalDialog variant="outlined" role="alertdialog">
          <ModalDialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningRoundedIcon />
            <Typography
              component="h2"
              id="modal-title"
              level="h5"
              textColor="inherit"
              fontWeight="lg"
            >
              Confirmation
            </Typography>
          </ModalDialogTitle>
          <ModalDialogDescription sx={{ mb: 3 }}>
            <Typography id="modal-desc" textColor="text.tertiary">
              Are you sure you want to discard all of your notes?
            </Typography>
          </ModalDialogDescription>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
              Discard notes
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
