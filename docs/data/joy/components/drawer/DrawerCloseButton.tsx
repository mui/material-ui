import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import ModalClose from '@mui/joy/ModalClose';

export default function DrawerCloseButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <ModalClose />
        <DialogTitle>Title</DialogTitle>
      </Drawer>
    </Box>
  );
}
