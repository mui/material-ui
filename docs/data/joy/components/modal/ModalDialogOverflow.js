import * as React from 'react';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState('');
  const [overflow, setOverflow] = React.useState(true);
  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" color="neutral" onClick={() => setOpen('center')}>
          Center
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => setOpen('fullscreen')}
        >
          Full screen
        </Button>
      </Stack>
      <Modal open={!!open} onClose={() => setOpen('')}>
        <ModalOverflow>
          <ModalDialog aria-labelledby="modal-dialog-overflow" layout={open}>
            <ModalClose />
            <Typography id="modal-dialog-overflow" component="h2">
              Overflow content
            </Typography>
            <Checkbox
              label="Long content"
              checked={overflow}
              onChange={(event) => setOverflow(event.target.checked)}
              sx={{ my: 2 }}
            />
            {overflow && (
              <List>
                {[...Array(100)].map((item, index) => (
                  <ListItem key={index}>Item number ({index})</ListItem>
                ))}
              </List>
            )}
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
