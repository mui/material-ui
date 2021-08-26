import * as React from 'react';
import Stack from '@material-ui/core/Stack';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

export default function FloatingActionButtonExtendedSize() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
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
    </Stack>
  );
}
