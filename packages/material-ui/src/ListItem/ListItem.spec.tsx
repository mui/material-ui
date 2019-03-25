import React from 'react';
import ListItem from '@material-ui/core/ListItem';

// button: boolean
function BooleanButtonTest() {
  // https://github.com/mui-org/material-ui/issues/14971

  function EditableItemFail(props: { editable: boolean }) {
    const { editable } = props;
    // 'boolean' is not assignable to type 'true'
    return <ListItem button={editable}>Editable? {editable}</ListItem>; // $ExpectError
  }

  function EditableItemValid(props: { editable: boolean }) {
    const { editable } = props;
    if (editable) {
      <ListItem button>Editable? Yes</ListItem>;
    }
    return <ListItem>Editable? No</ListItem>;
  }
}
