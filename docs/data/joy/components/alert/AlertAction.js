import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function AlertIcons() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <Alert
        icon={<PlaylistAddCheckCircleRoundedIcon />}
        variant="soft"
        color="success"
        action={
          <Button
            size="sm"
            variant="outlined"
            color="success"
            sx={{
              textTransform: 'uppercase',
              fontSize: 'xs',
              fontWeight: 'xl',
            }}
          >
            Close
          </Button>
        }
      >
        Your message was sent successfully.
      </Alert>
      <Alert
        icon={<AccountCircleRoundedIcon />}
        variant="outlined"
        color="neutral"
        action={
          <IconButton variant="outlined" size="sm" color="neutral">
            <CloseRoundedIcon />
          </IconButton>
        }
      >
        Your account was updated.
      </Alert>
    </Box>
  );
}
