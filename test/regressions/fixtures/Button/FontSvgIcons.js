import * as React from 'react';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Icon from '@mui/material/Icon';

export default function FontSvgIcons() {
  return (
    <div>
      <Fab color="primary">
        <DeleteIcon />
      </Fab>
      <Fab color="primary">
        <Icon>delete_icon</Icon>
      </Fab>
      <IconButton>
        <DeleteIcon />
      </IconButton>
      <IconButton>
        <Icon>delete_icon</Icon>
      </IconButton>
    </div>
  );
}
