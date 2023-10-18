import * as React from 'react';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Slider from '@mui/joy/Slider';
import Sheet from '@mui/joy/Sheet';

export default function DividerChildPosition() {
  const [position, setPosition] = React.useState<number | Array<number>>(50);
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={1} sx={{ fontSize: 'sm' }}>
        <Sheet variant="soft" sx={{ height: 40, borderRadius: 'xs' }} />
        <Divider sx={{ '--Divider-childPosition': `${position}%` }}>
          Visual indicator
        </Divider>
        <Sheet variant="soft" sx={{ height: 40, borderRadius: 'xs' }} />
      </Stack>
      <Slider
        value={position}
        min={0}
        max={100}
        step={1}
        valueLabelDisplay="on"
        valueLabelFormat={(value) => `${value}%`}
        onChange={(event, value) => setPosition(value)}
      />
    </Box>
  );
}
