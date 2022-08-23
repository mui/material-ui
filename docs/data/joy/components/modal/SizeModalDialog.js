import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalDialogTitle from '@mui/joy/ModalDialogTitle';
import ModalDialogDescription from '@mui/joy/ModalDialogDescription';

export default function SizeModalDialog() {
  const [open, setOpen] = React.useState('');
  return (
    <React.Fragment>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={() => setOpen('sm')}
        >
          Small
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          size="md"
          onClick={() => setOpen('md')}
        >
          Medium
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          size="lg"
          onClick={() => setOpen('lg')}
        >
          Large
        </Button>
      </Stack>
      <Modal open={!!open} onClose={() => setOpen('')}>
        <ModalDialog size={open}>
          <ModalClose />
          <ModalDialogTitle>Modal Dialog</ModalDialogTitle>
          <ModalDialogDescription>
            This is a `{open}` modal dialog.
          </ModalDialogDescription>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
