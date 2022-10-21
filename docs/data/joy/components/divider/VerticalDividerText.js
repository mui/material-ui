import * as React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';

export default function VerticalDividerText() {
  const content = (
    <Box sx={{ fontSize: 'sm', color: 'text.tertiary' }}>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
    </Box>
  );

  return (
    <Stack spacing={2} direction="row">
      {content}
      <Divider orientation="vertical">Visual indicator</Divider>
      {content}
    </Stack>
  );
}
