import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

export default function KeepMountedModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal keepMounted open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Typography id="keep-mounted-modal-title" component="h2">
            Keep mounted modal
          </Typography>
          <Typography id="keep-mounted-modal-description" textColor="text.tertiary">
            This modal is still in the DOM event though it is closed.
          </Typography>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
