import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function BoxSxPropMaterialUI() {
  return (
    <React.Fragment>
      {new Array(1000).fill().map(() => (
        <Box
          sx={{
            width: 200,
            height: 200,
            backgroundColor: [undefined, 'primary.light', 'primary.main', 'primary.dark'],
            borderWidth: '3px',
            borderColor: 'white',
            borderStyle: [undefined, 'dashed', 'solid', 'dotted'],
            ':hover': {
              backgroundColor: (theme) => theme.palette.secondary.dark,
            },
          }}
        >
          material-ui
        </Box>
      ))}
    </React.Fragment>
  );
}
