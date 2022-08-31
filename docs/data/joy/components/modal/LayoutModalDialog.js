import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

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
        <ModalDialog
          aria-labelledby="layout-modal-title"
          aria-describedby="layout-modal-description"
          layout={open || undefined}
        >
          <ModalClose />
          <Typography
            id="layout-modal-title"
            component="h2"
            level="inherit"
            fontSize="1.25em"
            mb="0.25em"
          >
            Modal Dialog
          </Typography>
          <Typography id="layout-modal-description" textColor="text.tertiary">
            This is a <code>{open}</code> modal dialog. Press <code>esc</code> to
            close it.
          </Typography>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
