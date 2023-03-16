import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

export default function VariantModalDialog() {
  const [variant, setVariant] = React.useState<
    ModalDialogProps['variant'] | undefined
  >(undefined);
  return (
    <React.Fragment>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button
          variant="plain"
          color="neutral"
          onClick={() => {
            setVariant('plain');
          }}
        >
          Plain
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setVariant('outlined');
          }}
        >
          Outlined
        </Button>
        <Button
          variant="soft"
          color="neutral"
          onClick={() => {
            setVariant('soft');
          }}
        >
          Soft
        </Button>
        <Button
          variant="solid"
          color="neutral"
          onClick={() => {
            setVariant('solid');
          }}
        >
          Solid
        </Button>
      </Stack>
      <Modal open={!!variant} onClose={() => setVariant(undefined)}>
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
