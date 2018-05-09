import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { FormGroup, FormControlLabel } from '@material-ui/core/Form';
import Switch from '@material-ui/core/Switch';

const styles = {
  switchBase: {
    color: green[50],
    '&$checked': {
      color: green[500],
      '& + $bar': {
        backgroundColor: green[500],
      },
    },
  },
  bar: {},
  checked: {},
};

class SwitchLabels extends React.Component {
  state = {
    checkedA: true,
    checkedB: true,
    checkedF: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedA}
              onChange={this.handleChange('checkedA')}
              value="checkedA"
            />
          }
          label="Secondary"
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedB}
              onChange={this.handleChange('checkedB')}
              value="checkedB"
              color="primary"
            />
          }
          label="Primary"
        />
        <FormControlLabel control={<Switch value="checkedC" />} label="Uncontrolled" />
        <FormControlLabel disabled control={<Switch value="checkedD" />} label="Disabled" />
        <FormControlLabel disabled control={<Switch checked value="checkedE" />} label="Disabled" />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedF}
              onChange={this.handleChange('checkedF')}
              value="checkedF"
              classes={{
                switchBase: classes.switchBase,
                checked: classes.checked,
                bar: classes.bar,
              }}
            />
          }
          label="Custom color"
        />
      </FormGroup>
    );
  }
}

SwitchLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwitchLabels);
