import * as React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function RenameDialog(props) {
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

RenameDialog.propTypes = {
  container: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    row: PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      state: PropTypes.oneOf(['pending', 'uploaded']).isRequired,
      type: PropTypes.oneOf([
        'docx',
        'gif',
        'jpeg',
        'jpg',
        'mov',
        'mp4',
        'pdf',
        'png',
        'tiff',
        'txt',
        'webm',
        'webp',
        'zip',
      ]).isRequired,
      updatedAt: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export { RenameDialog };
