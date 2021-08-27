import * as React from 'react';
import Stack from '@material-ui/core/Stack';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function FloatingActionButtonSize() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Fab size="small" color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
      <Fab size="medium" color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
      <Fab color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
    </Stack>
  );
}
