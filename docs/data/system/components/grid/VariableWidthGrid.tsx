import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Grid';
import styled from '@mui/system/styled';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

export default function VariableWidthGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid xs="auto">
          <Item>Variable width item</Item>
        </Grid>
        <Grid xs={6}>
          <Item>xs=6</Item>
        </Grid>
        <Grid xs>
          <Item>xs</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
