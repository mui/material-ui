import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';

const AppBarExampleIconMultiple = () => (
  <AppBar
    title="Title"
    iconElementRight={
      [
        <FlatButton
          key={1}
          label="Save"
          style={{verticalAlign: 'middle', marginTop: 0}}
        />,
        <IconButton
          key={2}
          iconClassName="material-icons"
          style={{verticalAlign: 'middle'}}
        >
          {'person_add'}
        </IconButton>,
      ]
    }
  />
);

export default AppBarExampleIconMultiple;
