// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';

const styleSheet = createStyleSheet('ComposedTextField', () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: 10,
  },
}));

class ComposedTextField extends Component {
  state = {
    name: 'Composed TextField',
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <FormControl className={classes.input}>
          <InputLabel htmlFor="name">
            Name
          </InputLabel>
          <Input
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormControl>
      </div>
    );
  }
}

ComposedTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ComposedTextField);
