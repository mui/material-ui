import * as React from 'react';
import { Transition } from 'react-transition-group';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalDialogTitle from '@mui/joy/ModalDialogTitle';
import ModalDialogDescription from '@mui/joy/ModalDialogDescription';

export default function FadeModalDialog() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Transition in={open} timeout={400}>
        {(state) => {
          return (
            <Modal
              keepMounted
              open={open}
              onClose={() => setOpen(false)}
              componentsProps={{
                backdrop: {
                  sx: {
                    opacity: 0,
                    backdropFilter: 'none',
                    transition: `opacity 400ms, backdrop-filter 400ms`,
                    ...{
                      entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                      entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                    }[state],
                  },
                },
              }}
              sx={{
                visibility: state === 'exited' ? 'hidden' : 'visible',
              }}
            >
              <ModalDialog
                sx={{
                  opacity: 0,
                  transition: `opacity 300ms`,
                  ...{
                    entering: { opacity: 1 },
                    entered: { opacity: 1 },
                  }[state],
                }}
              >
                <ModalDialogTitle>Transition modal</ModalDialogTitle>
                <ModalDialogDescription>
                  Using `react-transition-group` to create a fade animation.
                </ModalDialogDescription>
              </ModalDialog>
            </Modal>
          );
        }}
      </Transition>
    </React.Fragment>
  );
}
