import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

export default function InputIntegration() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Input
        size="sm"
        startDecorator={<KeyRoundedIcon />}
        placeholder="Password"
        type="password"
        endDecorator={
          <IconButton color="neutral">
            <VisibilityRoundedIcon />
          </IconButton>
        }
      />
      <Input
        startDecorator={<KeyRoundedIcon />}
        placeholder="Password"
        type="password"
        endDecorator={
          <IconButton color="neutral">
            <VisibilityRoundedIcon />
          </IconButton>
        }
      />
      <Input
        size="lg"
        startDecorator={<KeyRoundedIcon />}
        placeholder="Password"
        type="password"
        endDecorator={
          <IconButton color="neutral">
            <VisibilityRoundedIcon />
          </IconButton>
        }
      />
    </Box>
  );
}
