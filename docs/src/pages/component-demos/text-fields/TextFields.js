// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styleSheet = createStyleSheet('TextFields', theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
}));

class TextFields extends Component {
  state = {
    name: 'Cat in the Hat',
  };

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <TextField
          id="name"
          label="Name"
          className={classes.input}
          value={this.state.name}
          onChange={event => this.setState({ name: event.target.value })}
          marginForm
        />
        <TextField
          id="uncontrolled"
          label="Uncontrolled"
          defaultValue="foo"
          className={classes.input}
          marginForm
        />
        <TextField
          required
          id="required"
          label="Required"
          defaultValue="Hello World"
          className={classes.input}
          marginForm
        />
        <TextField
          error
          id="error"
          label="Error"
          defaultValue="Hello World"
          className={classes.input}
          marginForm
        />
        <TextField
          id="password"
          label="Password"
          className={classes.input}
          type="password"
          marginForm
        />
        <TextField
          id="multiline-flexible"
          label="Multiline"
          multiline
          rowsMax="4"
          defaultValue="Default Value"
          className={classes.input}
          marginForm
        />
        <TextField
          id="multiline-static"
          label="Multiline"
          multiline
          rows="4"
          defaultValue="Default Value"
          className={classes.input}
          marginForm
        />
        <TextField
          id="date"
          label="From date"
          type="date"
          defaultValue="2017-05-24"
          className={classes.input}
          marginForm
        />
        <TextField
          id="helperText"
          label="Helper text"
          type="text"
          defaultValue="Default Value"
          className={classes.input}
          helperText="Some important text"
          marginForm
        />
        <TextField
          id="placeholder"
          label="Label"
          className={classes.input}
          type="text"
          InputProps={{ placeholder: 'Placeholder' }}
          helperText="Helper text"
          marginForm
        />
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(TextFields);
