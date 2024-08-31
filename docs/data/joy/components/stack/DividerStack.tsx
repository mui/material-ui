import * as React from 'react';
import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
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
}));

export default function DividerStack() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" />}
        spacing={2}
        sx={{ justifyContent: 'center' }}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </Box>
  );
}
