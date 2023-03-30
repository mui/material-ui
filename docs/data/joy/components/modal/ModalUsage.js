import * as React from 'react';
import JoyUsageDemo, {
  prependLinesSpace,
} from 'docs/src/modules/components/JoyUsageDemo';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

export default function ModalUsage() {
  const [open, setOpen] = React.useState(false);
  return (
    <JoyUsageDemo
      componentName="ModalDialog"
      data={[
        {
          propName: 'variant',
          knob: 'select',
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
            <ModalDialog
              {...props}
              aria-labelledby="modal-usage-title"
              aria-describedby="modal-usage-description"
            >
              <ModalClose />
              <Typography id="modal-usage-title" component="h2">
                Modal title
              </Typography>
              <Typography id="modal-usage-description">
                A description of the dialog should give primary message or purpose of
                the dialog.
              </Typography>
            </ModalDialog>
          </Modal>
        </React.Fragment>
      )}
    />
  );
}
