import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';

export default function VerticalDividerText() {
  const content = (
    <div>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
    </div>
  );

  return (
    <Stack spacing={2} direction="row" sx={{ fontSize: 'sm' }}>
      {content}
      <Divider orientation="vertical">Visual indicator</Divider>
      {content}
    </Stack>
  );
}
