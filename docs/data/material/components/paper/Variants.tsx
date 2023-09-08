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

export default function Variants() {
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
      <DemoPaper variant="elevation">
        default variant
      </DemoPaper>
      <DemoPaper variant="outlined">outlined variant</DemoPaper>
    </Box>
  );
}
