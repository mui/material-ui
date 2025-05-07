import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Person from '@mui/icons-material/Person';

export default function JoyMaterialIcon() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
      <Stack spacing={2}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <Button key={size} size={size} startDecorator={<Person />}>
            Button
          </Button>
        ))}
      </Stack>
      <Stack spacing={2}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <Input
            key={size}
            size={size}
            startDecorator={<Person />}
            placeholder="Placeholder"
          />
        ))}
      </Stack>
      <Stack spacing={2}>
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <Typography key={size} startDecorator={<Person />} sx={{ fontSize: size }}>
            Hello World
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
