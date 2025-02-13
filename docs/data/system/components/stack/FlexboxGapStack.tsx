import * as React from 'react';
import Stack from '@mui/system/Stack';
import Box from '@mui/system/Box';
import { styled } from '@mui/system';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  flexGrow: 1,
  ...theme.applyStyles('dark', {
    backgroundColor: '#262B32',
  }),
}));

export default function FlexboxGapStack() {
  return (
    <Box sx={{ width: 200 }}>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        sx={{ flexWrap: 'wrap' }}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Long content</Item>
      </Stack>
    </Box>
  );
}
