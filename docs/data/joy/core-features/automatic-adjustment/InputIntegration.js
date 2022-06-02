import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';

import Key from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';

export default function InputIntegration() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Input
        size="sm"
        startDecorator={<Key />}
        placeholder="Password"
        type="password"
        endDecorator={
          <IconButton color="neutral" size="sm">
            <Visibility />
          </IconButton>
        }
      />
      <Input
        startDecorator={<Key />}
        placeholder="Password"
        type="password"
        endDecorator={
          <IconButton color="neutral" size="sm">
            <Visibility />
          </IconButton>
        }
      />
      <Input
        size="lg"
        startDecorator={<Key />}
        placeholder="Password"
        type="password"
        endDecorator={
          <IconButton color="neutral">
            <Visibility />
          </IconButton>
        }
      />
    </Box>
  );
}
