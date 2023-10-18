import * as React from 'react';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function AlertWithDecorators() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <Alert
        variant="soft"
        color="success"
        startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
        endDecorator={
          <Button size="sm" variant="solid" color="success">
            Close
          </Button>
        }
      >
        Your message was sent successfully.
      </Alert>
      <Alert
        variant="outlined"
        color="neutral"
        startDecorator={<AccountCircleRoundedIcon />}
        endDecorator={
          <IconButton variant="plain" size="sm" color="neutral">
            <CloseRoundedIcon />
          </IconButton>
        }
      >
        Your account was updated.
      </Alert>
    </Box>
  );
}
