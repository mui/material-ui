// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';

const styleSheet = createStyleSheet(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
}));

class ComposedTextField extends Component {
  state = {
    name: 'Composed TextField',
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" value={this.state.name} onChange={this.handleChange} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" value={this.state.name} onChange={this.handleChange} />
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} disabled>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" value={this.state.name} onChange={this.handleChange} />
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} error>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" value={this.state.name} onChange={this.handleChange} />
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
      </div>
    );
  }
}

ComposedTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ComposedTextField);
