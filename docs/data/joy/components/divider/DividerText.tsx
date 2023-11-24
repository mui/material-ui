import * as React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';

export default function DividerText() {
  const content = (
    <Box sx={{ fontSize: 'sm', color: 'text.tertiary' }}>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
    </Box>
  );

  return (
    <Stack spacing={1}>
      {content}
      <Divider>Visual indicator</Divider>
      {content}
      <Divider>
        <Chip variant="soft" color="neutral" size="sm">
          Visual indicator
        </Chip>
      </Divider>
      {content}
    </Stack>
  );
}
