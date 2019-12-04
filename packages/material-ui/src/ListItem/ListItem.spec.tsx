import React from 'react';
import ListItem from '@material-ui/core/ListItem';

// button: boolean
function BooleanButtonTest() {
  // https://github.com/mui-org/material-ui/issues/14971

  function EditableItemValid(props: { editable?: boolean }) {
    const { editable } = props;
    return <ListItem button={editable}>Editable? {editable}</ListItem>;
  }
}
