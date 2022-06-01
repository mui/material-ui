import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';

import Key from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDownRounded';

export default function InputIntegration() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
      <Input
        startDecorator={<Key />}
        placeholder="password"
        type="password"
        endDecorator={
          <IconButton color="neutral">
            <Visibility />
          </IconButton>
        }
      />
      <Input
        startDecorator={
          <Button
            variant="outlined"
            color="neutral"
            sx={{
              px: 1.5,
              pointerEvents: 'visible',
              '&:hover:not(:active)': { bgcolor: 'background.body' },
            }}
          >
            $ <KeyboardArrowDown fontSize="md" />
          </Button>
        }
        placeholder="donate amount"
        sx={{ '--Input-radius': '20px' }}
      />
    </Box>
  );
}
