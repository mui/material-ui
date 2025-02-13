import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import { styled } from '@mui/joy/styles';

const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography['body-sm'],
  textAlign: 'center',
  fontWeight: theme.fontWeight.md,
  color: theme.vars.palette.text.secondary,
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: theme.spacing(1),
  borderRadius: theme.radius.md,
  flexGrow: 1,
}));

export default function FlexboxGapStack() {
  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={1} direction="row" useFlexGap sx={{ flexWrap: 'wrap' }}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Long content</Item>
      </Stack>
    </Box>
  );
}
