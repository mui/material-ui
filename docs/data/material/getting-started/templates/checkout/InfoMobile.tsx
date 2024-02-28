import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

import Info from './Info';

export default function InfoMobile() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 'auto', px: 3, pb: 3, pt:8}} role="presentation">
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <Info />
    </Box>
  );

  return (
    <div>
      <Button
        variant="text"
        endIcon={<ExpandMoreRoundedIcon />}
        onClick={toggleDrawer(true)}
      >
        View details
      </Button>
      <Drawer open={open} anchor="top" onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
