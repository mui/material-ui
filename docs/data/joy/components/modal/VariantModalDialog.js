import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

export default function VariantModalDialog() {
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState(undefined);
  return (
    <React.Fragment>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button
          variant="plain"
          color="neutral"
          onClick={() => {
            setOpen(true);
            setVariant('plain');
          }}
        >
          Plain
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setOpen(true);
            setVariant('outlined');
          }}
        >
          Outlined
        </Button>
        <Button
          variant="soft"
          color="neutral"
          onClick={() => {
            setOpen(true);
            setVariant('soft');
          }}
        >
          Soft
        </Button>
        <Button
          variant="solid"
          color="neutral"
          onClick={() => {
            setOpen(true);
            setVariant('solid');
          }}
        >
          Solid
        </Button>
      </Stack>
      <Modal open={!!open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="variant-modal-title"
          aria-describedby="variant-modal-description"
          variant={variant}
        >
          <ModalClose />
          <Typography id="variant-modal-title" component="h2" level="inherit">
            Modal Dialog
          </Typography>
          <Typography id="variant-modal-description" textColor="inherit">
            This is a `{variant}` modal dialog.
          </Typography>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
