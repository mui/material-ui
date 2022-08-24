import * as React from 'react';
import Button from '@mui/joy/Button';
import TextField from '@mui/joy/TextField';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalDialogTitle from '@mui/joy/ModalDialogTitle';
import ModalDialogDescription from '@mui/joy/ModalDialogDescription';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        New project
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalDialogTitle>Create new project</ModalDialogTitle>
          <ModalDialogDescription sx={{ mb: 2 }}>
            <Typography id="modal-desc" textColor="text.tertiary">
              Fill in the information of the project.
            </Typography>
          </ModalDialogDescription>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <TextField label="Name" required />
              <TextField label="Description" required />
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
