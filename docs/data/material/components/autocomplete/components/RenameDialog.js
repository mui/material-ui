import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export function RenameDialog(props) {
  const { params, open, container, onSave, onClose } = props;

  const handleSave = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const value = formData.get('name');

    onSave(params.row.id, value);

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="rename-dialog-title"
      container={container}
      PaperProps={{
        component: 'form',
        onSubmit: handleSave,
      }}
    >
      {params && (
        <React.Fragment>
          <DialogTitle id="rename-dialog-title">Rename file</DialogTitle>
          <DialogContent>
            <TextField
              name="name"
              defaultValue={params.row.name}
              sx={{ width: 260 }}
              fullWidth
              required
              autoFocus
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  );
}
