import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalDialogTitle from '@mui/joy/ModalDialogTitle';
import ModalDialogDescription from '@mui/joy/ModalDialogDescription';

export default function VariantModalDialog() {
  const [open, setOpen] = React.useState('');
  return (
    <React.Fragment>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button variant="plain" color="neutral" onClick={() => setOpen('plain')}>
          Plain
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => setOpen('outlined')}
        >
          Outlined
        </Button>
        <Button variant="soft" color="neutral" onClick={() => setOpen('soft')}>
          Soft
        </Button>
        <Button variant="solid" color="neutral" onClick={() => setOpen('solid')}>
          Solid
        </Button>
      </Stack>
      <Modal open={!!open} onClose={() => setOpen('')}>
        <ModalDialog variant={open}>
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
