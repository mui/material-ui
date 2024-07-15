import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';

export default function LayoutModalDialog() {
  const [layout, setLayout] = React.useState(undefined);
  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setLayout('center');
          }}
        >
          Center
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setLayout('fullscreen');
          }}
        >
          Full screen
        </Button>
      </Stack>
      <Modal open={!!layout} onClose={() => setLayout(undefined)}>
        <ModalDialog layout={layout}>
          <ModalClose />
          <DialogTitle>Modal Dialog</DialogTitle>
          <DialogContent>
            <div>
              This is a <code>{layout}</code> modal dialog. Press <code>esc</code> to
              close it.
            </div>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
