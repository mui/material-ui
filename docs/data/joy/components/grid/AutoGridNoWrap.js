import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import Avatar from '@mui/joy/Avatar';
import Typography from '@mui/joy/Typography';

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.vars.palette.neutral[500],
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

export default function AutoGridNoWrap() {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <Item
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid>
            <Avatar>W</Avatar>
          </Grid>
          <Grid xs sx={{ minWidth: 0 }}>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </Item>
      <Item
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid>
            <Avatar>W</Avatar>
          </Grid>
          <Grid xs>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </Item>
      <Item
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid>
            <Avatar>W</Avatar>
          </Grid>
          <Grid xs>
            <Typography>{message}</Typography>
          </Grid>
        </Grid>
      </Item>
    </Box>
  );
}
