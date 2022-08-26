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
        variant="soft"
        color="danger"
        startDecorator={
          <IconButton variant="soft" size="sm" color="danger">
            <WarningIcon />
          </IconButton>
        }
        endDecorator={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="soft" color="danger" sx={{ mr: 1, fontWeight: 'md' }}>
              Undo
            </Button>
            <IconButton variant="soft" size="sm" color="danger">
              <CloseIcon />
            </IconButton>
          </Box>
        }
      >
        <Typography color="danger" fontWeight="md">
          This file was successfully deleted
        </Typography>
      </Alert>
      <Alert
        variant="solid"
        color="danger"
        startDecorator={
          <IconButton variant="solid" size="sm" color="danger">
            <WarningIcon />
          </IconButton>
        }
        endDecorator={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="solid" color="danger" sx={{ mr: 1, fontWeight: 'md' }}>
              Undo
            </Button>
            <IconButton variant="solid" size="sm" color="danger">
              <CloseIcon />
            </IconButton>
          </Box>
        }
      >
        <Typography sx={{ color: 'white' }} fontWeight="md">
          This file was successfully deleted
        </Typography>
      </Alert>

      <Alert
        variant="outlined"
        color="danger"
        startDecorator={
          <IconButton variant="plain" size="sm" color="danger">
            <WarningIcon />
          </IconButton>
        }
        endDecorator={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="plain" color="danger" sx={{ mr: 1, fontWeight: 'md' }}>
              Undo
            </Button>
            <IconButton variant="solid" size="sm" color="danger">
              <CloseIcon />
            </IconButton>
          </Box>
        }
      >
        <Typography color="danger" fontWeight="md">
          This file was successfully deleted
        </Typography>
      </Alert>
    </Box>
  );
}
