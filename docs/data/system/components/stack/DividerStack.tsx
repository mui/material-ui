import * as React from 'react';
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import { styled } from '@mui/system';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#262B32' : '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
}));

export default function DividerStack() {
  return (
    <div>
      <Stack
        direction="row"
        divider={
          <Box
            component="hr"
            sx={{
              border: (theme) =>
                `1px solid ${theme.palette.mode === 'dark' ? '#262B32' : '#fff'}`,
            }}
          />
        }
        spacing={2}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </div>
  );
}
