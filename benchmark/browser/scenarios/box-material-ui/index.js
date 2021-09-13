import * as React from 'react';
import Box from '@mui/material/Box';

export default function SxPropBoxMaterialUI() {
  return (
    <React.Fragment>
      {new Array(1000).fill().map(() => (
        <Box
          sx={{
            width: 200,
            height: 200,
            borderWidth: '3px',
            borderColor: 'white',
            backgroundColor: ['primary.main', 'text.primary', 'background.paper'],
            borderStyle: ['dashed', 'solid', 'dotted'],
            '&:hover': {
              backgroundColor: (theme) => theme.palette.secondary.dark,
            },
          }}
        >
          test case
        </Box>
      ))}
    </React.Fragment>
  );
}
