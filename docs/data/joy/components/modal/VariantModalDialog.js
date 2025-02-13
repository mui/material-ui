import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';

export default function VariantModalDialog() {
  const [variant, setVariant] = React.useState(undefined);
  return (
    <React.Fragment>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
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
        <ModalDialog variant={variant}>
          <ModalClose />
          <DialogTitle>Modal Dialog</DialogTitle>
          <DialogContent>This is a `{variant}` modal dialog.</DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
