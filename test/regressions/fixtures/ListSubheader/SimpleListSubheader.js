import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';

export default function SimpleListSubheader() {
  return (
    <div>
      <ListSubheader>Title</ListSubheader>
      <ListSubheader color="primary">Title</ListSubheader>
      <ListSubheader inset>Title</ListSubheader>
    </div>
  );
}
