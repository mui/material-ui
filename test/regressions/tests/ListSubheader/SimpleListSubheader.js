import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';

export default function SimpleListSubheader() {
  return (
    <div>
      <ListSubheader>Title</ListSubheader>
      <ListSubheader color="primary">Title</ListSubheader>
      <ListSubheader inset>Title</ListSubheader>
    </div>
  );
}
