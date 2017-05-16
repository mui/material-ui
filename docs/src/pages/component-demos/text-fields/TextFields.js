// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styleSheet = createStyleSheet('TextFields', (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
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
          onChange={(event) => this.setState({ name: event.target.value })}
        />
        <TextField
          id="uncontrolled"
          label="Uncontrolled"
          defaultValue="foo"
          className={classes.input}
        />
        <TextField
          required
          id="required"
          label="Required"
          defaultValue="Hello World"
          className={classes.input}
        />
        <TextField
          error
          id="error"
          label="Error"
          defaultValue="Hello World"
          className={classes.input}
        />
        <TextField
          id="password"
          label="Password"
          className={classes.input}
          type="password"
        />
        <TextField
          id="multiline-flexible"
          label="Multiline"
          multiline
          rowsMax="4"
          defaultValue="Default Value"
          className={classes.input}
        />
        <TextField
          id="multiline-static"
          label="Multiline"
          multiline
          rows="4"
          defaultValue="Default Value"
          className={classes.input}
        />
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(TextFields);
