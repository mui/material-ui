/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visbility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class InputAdornments extends React.Component {
  state = {
    amount: '',
    password: '',
    weight: '',
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="amount">Amount</InputLabel>
          <Input id="amount" value={this.state.amount} onChange={this.handleChange('amount')}>
            <InputAdornment position="start">$</InputAdornment>
          </Input>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="weight">Weight</InputLabel>
          <Input id="weight" value={this.state.weight} onChange={this.handleChange('weight')}>
            <InputAdornment position="end">Kg</InputAdornment>
          </Input>
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
          >
            <InputAdornment position="end">
              <IconButton onClick={this.handleClickShowPasssword}>
                {this.state.showPassword ? <VisibilityOff /> : <Visbility />}
              </IconButton>
            </InputAdornment>
          </Input>
        </FormControl>
      </div>
    );
  }
}

InputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputAdornments);
