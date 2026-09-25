import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';

export default function ControlledMenu2() {
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState(null);

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      <Menu2
        open={open}
        onOpenChange={(nextOpen, eventDetails) => {
          setOpen(nextOpen);
          setReason(eventDetails.reason);
        }}
        trigger={
          <IconButton aria-label="More actions">
            <MoreVertIcon />
          </IconButton>
        }
      >
        <Menu2Item>Rename</Menu2Item>
        <Menu2Item>Duplicate</Menu2Item>
        <Menu2Item>Delete</Menu2Item>
      </Menu2>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {reason === null
          ? 'Open the menu, then close it.'
          : `${open ? 'Opened' : 'Closed'} with reason "${reason}".`}
      </Typography>
    </Stack>
  );
}
