import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  paddingTop: 20,
}));

export default function SquareCorners() {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <DemoPaper square={false}>
        {' '}
        {/* this is the default value */}
        rounded corners
      </DemoPaper>
      <DemoPaper square>square corners</DemoPaper>
    </Box>
  );
}
