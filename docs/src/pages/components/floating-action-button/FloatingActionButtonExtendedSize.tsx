import * as React from 'react';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

export default function FloatingActionButtonExtendedSize() {
  return (
    <Box
      sx={{
        '& button': { m: 1 },
      }}
    >
      <Fab variant="extended" size="small" color="primary" aria-label="add">
        <NavigationIcon sx={{ mr: 1 }} />
        Extended
      </Fab>
      <Fab variant="extended" size="medium" color="primary" aria-label="add">
        <NavigationIcon sx={{ mr: 1 }} />
        Extended
      </Fab>
      <Fab variant="extended" color="primary" aria-label="add">
        <NavigationIcon sx={{ mr: 1 }} />
        Extended
      </Fab>
    </Box>
  );
}
