import * as React from 'react';
import { DialogsProvider, useDialogs } from '@toolpad/core/useDialogs';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

function MyCustomDialog({ open, onClose }: Pick<DialogProps, 'open' | 'onClose'>) {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={(event: React.SyntheticEvent) => onClose?.(event, 'escapeKeyDown')}
    >
      <DialogTitle>Custom dialog</DialogTitle>
      <DialogContent>I am a custom dialog</DialogContent>
      <DialogActions>
        <Button
          onClick={(event: React.SyntheticEvent) =>
            onClose?.(event, 'escapeKeyDown')
          }
        >
          Close me
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function DemoContent() {
  const dialogs = useDialogs();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Button
        onClick={async () => {
          await dialogs.open(MyCustomDialog);
        }}
      >
        Open a custom dialog!
      </Button>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button
          onClick={async () => {
            await dialogs.alert('This is an alert dialog');
          }}
        >
          Alert
        </Button>
        <Button
          onClick={async () => {
            const confirmed = await dialogs.confirm(
              'Are you sure you want to delete this?',
              {
                okText: 'Confirm',
                cancelText: 'Cancel',
              },
            );
            if (confirmed) {
              dialogs.alert('Deleted!');
            }
          }}
        >
          Confirm
        </Button>
        <Button
          onClick={async () => {
            const name = await dialogs.prompt('Enter your name', {
              okText: 'Confirm',
              cancelText: 'Cancel',
            });
            dialogs.alert(`Hello, ${name}!`);
          }}
        >
          Prompt
        </Button>
      </div>
    </div>
  );
}

export default function ToolpadDialogs() {
  return (
    <DialogsProvider>
      <DemoContent />
    </DialogsProvider>
  );
}
