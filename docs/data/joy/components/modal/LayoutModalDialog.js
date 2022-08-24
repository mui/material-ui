import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalDialogTitle from '@mui/joy/ModalDialogTitle';
import ModalDialogDescription from '@mui/joy/ModalDialogDescription';

export default function LayoutModalDialog() {
  const [open, setOpen] = React.useState('');
  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => setOpen('fullScreen')}
        >
          Full screen
        </Button>
        <Button variant="outlined" color="neutral" onClick={() => setOpen('center')}>
          Center
        </Button>
      </Stack>
      <Modal open={!!open} onClose={() => setOpen('')}>
        <ModalDialog layout={open}>
          <ModalDialogTitle>Modal dialog</ModalDialogTitle>
          <ModalDialogDescription>
            This is a <code>{open}</code> modal dialog. Press <code>esc</code> to
            close it.
          </ModalDialogDescription>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
