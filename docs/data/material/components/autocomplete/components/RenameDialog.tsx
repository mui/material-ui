import * as React from 'react';
import { GridRowId, GridRowParams } from '@mui/x-data-grid-premium';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { RowModel } from '../types';

export interface RenameDialogProps {
  params: Pick<GridRowParams<RowModel>, 'row'> | null;
  open: boolean;
  container?: () => HTMLElement;
  onSave: (id: GridRowId, value: string) => void;
  onClose: () => void;
}

export function RenameDialog(props: RenameDialogProps) {
  const { params, open, container, onSave, onClose } = props;

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const value = formData.get('name') as string;

    onSave(params!.row.id, value);

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
