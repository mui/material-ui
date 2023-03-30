import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

export default function SizeModalDialog() {
  const [size, setSize] = React.useState(undefined);

  return (
    <React.Fragment>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={() => setSize('sm')}
        >
          Small
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          size="md"
          onClick={() => setSize('md')}
        >
          Medium
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          size="lg"
          onClick={() => setSize('lg')}
        >
          Large
        </Button>
      </Stack>
      <Modal open={!!size} onClose={() => setSize(undefined)}>
        <ModalDialog
          aria-labelledby="size-modal-title"
          aria-describedby="size-modal-description"
          size={size}
        >
          <ModalClose />
          <Typography id="size-modal-title" component="h2">
            Modal Dialog
          </Typography>
          <Typography id="size-modal-description" level="inherit">
            This is a `{size}` modal dialog.
          </Typography>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
