import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PrintIcon from '@mui/icons-material/Print';

export default function SpeedDialA11yActions() {
  const [open, setOpen] = React.useState(true);
  return (
    <Box sx={{ height: 320, position: 'relative' }}>
      <SpeedDial
        ariaLabel="Document actions"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        icon={<SpeedDialIcon />}
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
      >
        <SpeedDialAction
          icon={<FileCopyIcon />}
          slotProps={{ tooltip: { title: 'Copy document' } }}
        />
        <SpeedDialAction
          icon={<PrintIcon />}
          slotProps={{ tooltip: { title: 'Print document' } }}
        />
      </SpeedDial>
    </Box>
  );
}
