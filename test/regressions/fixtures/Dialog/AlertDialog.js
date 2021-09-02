import * as React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function AlertDialog() {
  return (
    <Paper
      elevation={8}
      style={{
        width: 300,
      }}
    >
      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Disagree</Button>
        <Button color="primary">Agree</Button>
      </DialogActions>
    </Paper>
  );
}
