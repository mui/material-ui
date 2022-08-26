import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

export default function AlertWithDangerState() {
  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
      <Alert
        startDecorator={<WarningIcon sx={{ mx: 0.5 }} />}
        variant="soft"
        color="danger"
        endDecorator={
          <React.Fragment>
            <Button variant="soft" color="danger" sx={{ mr: 1 }}>
              Undo
            </Button>
            <IconButton variant="soft" size="sm" color="danger">
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <Typography color="danger" fontWeight="md">
          This file was successfully deleted
        </Typography>
      </Alert>
      <Alert
        startDecorator={<WarningIcon sx={{ mx: 0.5 }} />}
        variant="solid"
        color="danger"
        endDecorator={
          <React.Fragment>
            <Button variant="solid" color="danger" sx={{ mr: 1 }}>
              Undo
            </Button>
            <IconButton variant="solid" size="sm" color="danger">
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <Typography sx={{ color: 'white' }} fontWeight="md">
          This file was successfully deleted
        </Typography>
      </Alert>

      <Alert
        startDecorator={<WarningIcon sx={{ mx: 0.5 }} />}
        variant="outlined"
        color="danger"
        endDecorator={
          <React.Fragment>
            <Button variant="plain" color="danger" sx={{ mr: 1 }}>
              Undo
            </Button>
            <IconButton variant="soft" size="sm" color="danger">
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <Typography color="danger" fontWeight="md">
          This file was successfully deleted
        </Typography>
      </Alert>
    </Box>
  );
}
