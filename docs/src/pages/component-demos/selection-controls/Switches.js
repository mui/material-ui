// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import Switch from 'material-ui/Switch';

const styleSheet = createStyleSheet({
  bar: {},
  checked: {
    color: green[500],
    '& + $bar': {
      backgroundColor: green[500],
    },
  },
});

class Switches extends Component {
  state = {
    checkedA: true,
    checkedB: false,
    checkedE: true,
  };

  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Switch
          checked={this.state.checkedA}
          onChange={this.handleChange('checkedA')}
          aria-label="checkedA"
        />
        <Switch
          checked={this.state.checkedB}
          onChange={this.handleChange('checkedB')}
          aria-label="checkedB"
        />
        <Switch checked={false} aria-label="checkedC" disabled />
        <Switch checked aria-label="checkedD" disabled />
        <Switch
          classes={{
            checked: classes.checked,
            bar: classes.bar,
          }}
          checked={this.state.checkedE}
          onChange={this.handleChange('checkedE')}
          aria-label="checkedD"
        />
      </div>
    );
  }
}

Switches.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Switches);
