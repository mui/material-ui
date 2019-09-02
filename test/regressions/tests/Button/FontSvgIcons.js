import React from 'react';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';

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
