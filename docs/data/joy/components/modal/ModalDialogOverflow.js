import * as React from 'react';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Open
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalOverflow>
          <ModalDialog
            aria-labelledby="modal-dialog-overflow"
            sx={{ maxWidth: 500 }}
          >
            <ModalClose />
            <Typography id="modal-dialog-overflow" component="h2">
              Overflow content
            </Typography>
            <List>
              {[...Array(100)].map((item, index) => (
                <ListItem key={index}>Item number ({index})</ListItem>
              ))}
            </List>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
