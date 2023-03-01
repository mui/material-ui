import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog, {ModalDialogProps} from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

export default function SizeModalDialog() {
    const [open, setOpen] = React.useState<ModalDialogProps['size'] | undefined>(undefined);
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
      <Modal open={!!open} onClose={() => setOpen(undefined)}>
        <ModalDialog
          aria-labelledby="size-modal-title"
          aria-describedby="size-modal-description"
          size={open || undefined}
        >
          <ModalClose />
          <Typography id="size-modal-title" component="h2">
            Modal Dialog
          </Typography>
          <Typography id="size-modal-description" level="inherit">
            This is a `{open}` modal dialog.
          </Typography>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
