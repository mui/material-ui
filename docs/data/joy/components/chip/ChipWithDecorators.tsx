import Cloud from '@mui/icons-material/Cloud';
import Sun from '@mui/icons-material/LightMode';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import * as React from 'react';

export default function ChipWithDecorators() {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip variant="soft" startDecorator={<Sun />}>
        Today is sunny
      </Chip>
      <Chip variant="soft" startDecorator={<Cloud />}>
        Tomorrow is cloudy
      </Chip>
    </Box>
  );
}
