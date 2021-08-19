import * as React from 'react';
import NoSsr from '@material-ui/unstyled/NoSsr';
import Box from '@material-ui/core/Box';

export default function SxPropBoxMaterialUI() {
  return (
    <NoSsr defer>
      {new Array(1000).fill().map((_, index) => (
        <Box
          key={index}
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
    </NoSsr>
  );
}
