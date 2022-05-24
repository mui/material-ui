import AlarmOn from '@mui/icons-material/AlarmOn';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Sun from '@mui/icons-material/LightMode';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import * as React from 'react';

export default function ChipWithDecorators() {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip variant="soft" startDecorator={<Sun />}>
        Turn on lights
      </Chip>
      <Chip variant="soft" startDecorator={<AlarmOn />}>
        Set alarm
      </Chip>
      <Chip
        variant="outlined"
        color="danger"
        endDecorator={
          <ChipDelete color="danger" variant="plain">
            <DeleteForever />
          </ChipDelete>
        }
      >
        Clear
      </Chip>
    </Box>
  );
}
