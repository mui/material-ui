import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

interface SideNavProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideNav({ open, toggleDrawer }: SideNavProps) {
  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          minWidth: '60dvw',
          p: 2,
          backgroundColor: 'background.paper',
          flexGrow: 1,
        }}
      >
        Content
      </Box>
    </Drawer>
  );
}
