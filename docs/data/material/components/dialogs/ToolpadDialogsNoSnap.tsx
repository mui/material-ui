import * as React from 'react';
import { DialogsProvider, useDialogs, DialogProps } from '@toolpad/core/useDialogs';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function DeleteDialog({ open, onClose, payload }: DialogProps<string>) {
  const [inputValue, setInputValue] = React.useState('');
  const isInputValid = inputValue === payload;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isInputValid) {
      onClose(inputValue);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={() => onClose()}>
      <DialogTitle>Are you sure you want to delete this project?</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          This action cannot be undone. This will permanently delete the project, its
          data, and remove all collaborator associations.
        </Typography>
        <Alert severity="error">
          Please type{' '}
          <strong>
            <code>{payload}</code>
          </strong>{' '}
          to confirm.
        </Alert>
        <TextField
          fullWidth
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          margin="normal"
          variant="outlined"
          size="small"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button
          color="error"
          disabled={!isInputValid}
          onClick={() => onClose(inputValue)}
        >
          I understand, delete this project
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mockApiDelete = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
};

function DeleteDialogTrigger({ name }: { name: string }) {
  const dialogs = useDialogs();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const handleDelete = async () => {
    const response = await dialogs.open(DeleteDialog, name);
    if (response === name) {
      try {
        setIsDeleting(true);
        await mockApiDelete();
        dialogs.alert(
          <p>
            Deleted project <code>{name}</code>.
          </p>,
        );
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <LoadingButton variant="contained" loading={isDeleting} onClick={handleDelete}>
      Delete
    </LoadingButton>
  );
}

export default function ToolpadDialogsNoSnap() {
  return (
    <DialogsProvider>
      <DeleteDialogTrigger name="demo" />
    </DialogsProvider>
  );
}
