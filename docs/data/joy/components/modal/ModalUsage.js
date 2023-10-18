import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import JoyUsageDemo, {
  prependLinesSpace,
} from 'docs/src/modules/components/JoyUsageDemo';

export default function ModalUsage() {
  const [open, setOpen] = React.useState(false);
  return (
    <JoyUsageDemo
      componentName="ModalDialog"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
          defaultValue: 'outlined',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'layout',
          knob: 'radio',
          options: ['center', 'fullscreen'],
          defaultValue: 'center',
        },
        {
          propName: 'children',
          defaultValue: '<ModalClose />\n  <Typography>Modal title</Typography>',
        },
      ]}
      getCodeBlock={(code) => `<Modal>
${prependLinesSpace(code, 2)}
</Modal>`}
      renderDemo={(props) => (
        <React.Fragment>
          <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
            Open modal
          </Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog {...props}>
              <ModalClose />
              <DialogTitle>Modal title</DialogTitle>
              <DialogContent>
                A description of the dialog should give primary message or purpose of
                the dialog.
              </DialogContent>
            </ModalDialog>
          </Modal>
        </React.Fragment>
      )}
    />
  );
}
