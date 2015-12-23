import React from 'react';
import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';

const underlineStyle = {
  display: 'none',
};

const style = {
  marginLeft: 20,
};

const DividerExampleForm = () => (
  <Paper zDepth={2}>
    <TextField hintText="First name" underlineStyle={underlineStyle} style={style} />
    <Divider />
    <TextField hintText="Middle name" underlineStyle={underlineStyle} style={style} />
    <Divider />
    <TextField hintText="Last name" underlineStyle={underlineStyle} style={style} />
    <Divider />
    <TextField hintText="Email address" underlineStyle={underlineStyle} style={style} />
    <Divider />
  </Paper>
);

export default DividerExampleForm;
