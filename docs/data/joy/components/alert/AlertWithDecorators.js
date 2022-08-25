import * as React from 'react';
import Alert from '@mui/joy/Alert';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function AlertWithDecorators() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <Alert
        startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
        variant="soft"
        color="success"
        endDecorator={
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
        <Typography fontWeight="md" fontSize="sm">
          Your message was sent successfully.
        </Typography>
      </Alert>
      <Alert
        startDecorator={<AccountCircleRoundedIcon />}
        variant="outlined"
        color="neutral"
        endDecorator={
          <IconButton variant="outlined" size="sm" color="neutral">
            <CloseRoundedIcon />
          </IconButton>
        }
      >
        <Typography fontWeight="md" fontSize="sm">
          Your account was updated.
        </Typography>
      </Alert>
    </Box>
  );
}
